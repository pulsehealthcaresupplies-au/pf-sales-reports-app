/**
 * Form Hooks for React Components - Sales Reports App
 * 
 * Provides hooks for form state management, validation, and error handling
 */

import { useState, useCallback, useEffect } from 'react';
import { FormErrors, ValidationSchema, validateField as validateFieldValue, validateForm, parseApiErrors, sanitizeFormData } from './form-validation';
import { toast } from 'sonner';

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: ValidationSchema;
  fieldTypes?: Record<keyof T, 'string' | 'email' | 'phone' | 'password' | 'name' | 'url' | 'textarea' | 'number'>;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: (values: T) => void;
  onError?: (errors: FormErrors, globalError?: string) => void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  globalError: string | undefined;
  isSubmitting: boolean;
  touched: Record<keyof T, boolean>;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string | null) => void;
  setErrors: (errors: FormErrors) => void;
  clearErrors: () => void;
  clearFieldError: (field: keyof T) => void;
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  validate: () => boolean;
  validateField: (field: keyof T) => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  resetErrors: () => void;
}

/**
 * Main form hook for managing form state, validation, and submission
 */
export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): UseFormReturn<T> {
  const {
    initialValues,
    validationSchema,
    fieldTypes,
    onSubmit,
    onSuccess,
    onError,
  } = options;

  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrorsState] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  // Clear errors when values change (after initial render)
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      // Only clear errors for fields that have been touched
      const newErrors = { ...errors };
      let hasChanges = false;

      for (const field of Object.keys(touched) as Array<keyof T>) {
        if (touched[field] && errors[field as string]) {
          delete newErrors[field as string];
          hasChanges = true;
        }
      }

      if (hasChanges) {
        setErrorsState(newErrors);
      }
    }
  }, [values]);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when value changes
    if (errors[field as string]) {
      setErrorsState((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((field: keyof T, error: string | null) => {
    setErrorsState((prev) => {
      if (error === null) {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      }
      return { ...prev, [field as string]: error };
    });
  }, []);

  const setErrors = useCallback((newErrors: FormErrors) => {
    setErrorsState(newErrors);
  }, []);

  const clearErrors = useCallback(() => {
    setErrorsState({});
    setGlobalError(undefined);
  }, []);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const handleChange = useCallback((field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
      setValue(field, value);
    };
  }, [setValue]);

  const validateFieldFn = useCallback((field: keyof T): boolean => {
    if (!validationSchema || !validationSchema[field as string]) {
      return true;
    }

    const fieldRules = validationSchema[field as string];
    const fieldValue = values[field];
    const error = validateFieldValue(field as string, fieldValue, fieldRules);

    if (error) {
      setErrorsState((prev) => ({ ...prev, [field as string]: error }));
      return false;
    } else {
      setErrorsState((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      return true;
    }
  }, [values, validationSchema]);

  const handleBlur = useCallback((field: keyof T) => {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      // Validate field on blur if schema exists
      if (validationSchema) {
        validateFieldFn(field);
      }
    };
  }, [validationSchema, validateFieldFn]);

  const validate = useCallback((): boolean => {
    if (!validationSchema) {
      return true;
    }

    const validationErrors = validateForm(values, validationSchema);
    setErrorsState(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validationSchema]);

  const validateField = validateFieldFn;

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Reset errors before new submission
    clearErrors();
    setTouched({} as Record<keyof T, boolean>);

    // Validate form
    if (validationSchema && !validate()) {
      // Mark all fields as touched
      const allTouched: Record<keyof T, boolean> = {} as Record<keyof T, boolean>;
      for (const field of Object.keys(validationSchema) as Array<keyof T>) {
        allTouched[field] = true;
      }
      setTouched(allTouched);
      return;
    }

    // Sanitize form data
    let sanitizedValues = values;
    if (fieldTypes) {
      sanitizedValues = sanitizeFormData(values, fieldTypes);
      setValuesState(sanitizedValues);
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(sanitizedValues);
      }

      if (onSuccess) {
        onSuccess(sanitizedValues);
      }
    } catch (error: any) {
      // Parse API errors
      const { fieldErrors, globalError: apiGlobalError } = parseApiErrors(error);

      // Set field errors
      if (Object.keys(fieldErrors).length > 0) {
        setErrorsState(fieldErrors);
      }

      // Set global error and show toaster
      if (apiGlobalError) {
        setGlobalError(apiGlobalError);
        toast.error(apiGlobalError);
      } else if (Object.keys(fieldErrors).length === 0) {
        // If no field errors and no global error, use generic message
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setGlobalError(errorMessage);
        toast.error(errorMessage);
      } else {
        // Show toaster for field errors summary
        toast.error('Please fix the errors in the form');
      }

      if (onError) {
        onError(fieldErrors, apiGlobalError);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationSchema, fieldTypes, onSubmit, onSuccess, onError, validate, clearErrors]);

  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrorsState({});
    setGlobalError(undefined);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  const resetErrors = useCallback(() => {
    setErrorsState({});
    setGlobalError(undefined);
  }, []);

  return {
    values,
    errors,
    globalError,
    isSubmitting,
    touched,
    setValue,
    setValues,
    setError,
    setErrors,
    clearErrors,
    clearFieldError,
    handleChange,
    handleBlur,
    validate,
    validateField,
    handleSubmit,
    reset,
    resetErrors,
  };
}

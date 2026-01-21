/**
 * Form Validation Utilities for Sales Reports App
 * 
 * Comprehensive form validation and error handling system.
 * Provides:
 * - Field-level validation
 * - API error mapping to form fields
 * - Input sanitization
 * - Error persistence and reset
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationSchema {
  [field: string]: ValidationRule | ValidationRule[];
}

export interface FormErrors {
  [field: string]: string | string[];
}

/**
 * Sanitize input based on type
 */
export function sanitizeInput(value: any, type: 'string' | 'email' | 'phone' | 'password' | 'name' | 'url' | 'textarea' | 'number'): any {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value).trim();

  switch (type) {
    case 'email':
      return stringValue.toLowerCase();
    
    case 'phone':
      // Remove all non-digit characters except + at the start
      return stringValue.replace(/(?!^\+)[^\d]/g, '');
    
    case 'password':
      // Don't trim passwords, but remove leading/trailing whitespace
      return String(value).replace(/^\s+|\s+$/g, '');
    
    case 'name':
      // Remove special characters except spaces, hyphens, and apostrophes
      return stringValue.replace(/[^a-zA-Z\s'-]/g, '');
    
    case 'url':
      return stringValue;
    
    case 'textarea':
      // Allow newlines and preserve formatting
      return String(value).trim();
    
    case 'number':
      const num = parseFloat(stringValue);
      return isNaN(num) ? '' : num;
    
    case 'string':
    default:
      return stringValue;
  }
}

/**
 * Validate a single field value against rules
 */
export function validateField(
  field: string,
  value: any,
  rules: ValidationRule | ValidationRule[]
): string | null {
  const ruleArray = Array.isArray(rules) ? rules : [rules];
  
  for (const rule of ruleArray) {
    // Required check
    if (rule.required) {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return rule.message || `${field} is required`;
      }
    }

    // Skip other validations if value is empty and not required
    if (!value && !rule.required) {
      continue;
    }

    const stringValue = String(value);

    // Min length check
    if (rule.minLength !== undefined && stringValue.length < rule.minLength) {
      return rule.message || `${field} must be at least ${rule.minLength} characters`;
    }

    // Max length check
    if (rule.maxLength !== undefined && stringValue.length > rule.maxLength) {
      return rule.message || `${field} must be no more than ${rule.maxLength} characters`;
    }

    // Pattern check
    if (rule.pattern && !rule.pattern.test(stringValue)) {
      return rule.message || `${field} format is invalid`;
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }
  }

  return null;
}

/**
 * Validate entire form against schema
 */
export function validateForm<T extends Record<string, any>>(
  formData: T,
  schema: ValidationSchema
): FormErrors {
  const errors: FormErrors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = formData[field];
    const error = validateField(field, value, rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * Common validation rules
 */
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  } as ValidationRule,

  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  } as ValidationRule,

  passwordConfirm: (password: string) => ({
    required: true,
    custom: (value: string) => {
      if (value !== password) {
        return 'Passwords do not match';
      }
      return null;
    },
  }) as ValidationRule,

  phone: {
    required: true,
    pattern: /^\+?[\d\s-()]+$/,
    message: 'Please enter a valid phone number',
  } as ValidationRule,

  emailOrPhone: {
    required: true,
    custom: (value: string) => {
      if (!value || value.trim() === '') {
        return 'Email or phone number is required';
      }
      // Check if it's an email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if it's a phone number
      const phonePattern = /^\+?[\d\s-()]+$/;
      
      if (emailPattern.test(value.trim())) {
        return null; // Valid email
      }
      if (phonePattern.test(value.trim())) {
        return null; // Valid phone
      }
      return 'Please enter a valid email address or phone number';
    },
  } as ValidationRule,

  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
  } as ValidationRule,

  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    message: 'Username must be 3-50 characters',
  } as ValidationRule,

  required: {
    required: true,
    message: 'This field is required',
  } as ValidationRule,
};

/**
 * Parse API error response and map to form fields
 * Handles both GraphQL errors and REST API errors
 */
export function parseApiErrors(error: any): { fieldErrors: FormErrors; globalError?: string } {
  const fieldErrors: FormErrors = {};
  let globalError: string | undefined;

  // GraphQL error structure
  if (error?.graphQLErrors) {
    for (const gqlError of error.graphQLErrors) {
      const extensions = gqlError.extensions || {};
      const field = extensions.field || extensions.path?.[0];
      const message = gqlError.message || extensions.message;

      if (field && message) {
        // Map common field names
        const mappedField = mapFieldName(field);
        fieldErrors[mappedField] = message;
      } else if (message) {
        globalError = message;
      }
    }
  }

  // Network error
  if (error?.networkError) {
    globalError = error.networkError.message || 'Network error occurred';
  }

  // Direct error message
  if (error?.message && !fieldErrors[error.field]) {
    if (error.field) {
      const mappedField = mapFieldName(error.field);
      fieldErrors[mappedField] = error.message;
    } else {
      globalError = error.message;
    }
  }

  // GraphQL response errors (from mutation response)
  if (error?.errors) {
    for (const err of error.errors) {
      const field = err.field || err.path?.[0];
      const message = err.message;

      if (field && message) {
        const mappedField = mapFieldName(field);
        fieldErrors[mappedField] = message;
      } else if (message) {
        globalError = message;
      }
    }
  }

  // Backend validation errors (common format)
  if (error?.validationErrors) {
    for (const validationError of error.validationErrors) {
      const field = validationError.field || validationError.fieldName;
      const message = validationError.message || validationError.error;

      if (field && message) {
        const mappedField = mapFieldName(field);
        fieldErrors[mappedField] = message;
      }
    }
  }

  // Check mutation response for field errors
  if (error?.data) {
    // Check common mutation response patterns
    const mutationKeys = Object.keys(error.data);
    for (const key of mutationKeys) {
      const response = error.data[key];
      if (response?.errors) {
        for (const err of response.errors) {
          const field = err.field || err.fieldName;
          const message = err.message || err.error;
          if (field && message) {
            const mappedField = mapFieldName(field);
            fieldErrors[mappedField] = message;
          }
        }
      }
      // Check for error field in response
      if (response?.error && !response?.success) {
        globalError = response.error;
      }
      // Check for field-level errors in response (common pattern)
      if (response?.fieldErrors) {
        for (const [field, message] of Object.entries(response.fieldErrors)) {
          const mappedField = mapFieldName(field);
          fieldErrors[mappedField] = message as string;
        }
      }
    }
  }

  // If no specific field errors but there's a message, treat as global
  if (Object.keys(fieldErrors).length === 0 && error?.message) {
    globalError = error.message;
  }

  return { fieldErrors, globalError };
}

/**
 * Map backend field names to frontend field names
 */
function mapFieldName(backendField: string): string {
  const fieldMap: Record<string, string> = {
    'email_address': 'email',
    'phone_number': 'phone',
    'first_name': 'firstName',
    'last_name': 'lastName',
    'password_confirm': 'passwordConfirm',
    'confirm_password': 'passwordConfirm',
    'current_password': 'currentPassword',
    'new_password': 'newPassword',
  };

  // Convert snake_case to camelCase
  const camelCase = backendField.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  
  return fieldMap[backendField] || fieldMap[camelCase] || camelCase;
}

/**
 * Sanitize form data based on field types
 */
export function sanitizeFormData<T extends Record<string, any>>(
  formData: T,
  fieldTypes: Record<keyof T, 'string' | 'email' | 'phone' | 'password' | 'name' | 'url' | 'textarea' | 'number'>
): T {
  const sanitized = { ...formData };

  for (const [field, type] of Object.entries(fieldTypes)) {
    if (field in sanitized) {
      sanitized[field as keyof T] = sanitizeInput(sanitized[field as keyof T], type) as T[keyof T];
    }
  }

  return sanitized;
}

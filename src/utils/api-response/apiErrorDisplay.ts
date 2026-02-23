/**
 * Extract display message and field errors from GraphQL/Apollo errors.
 *
 * API Gateway passes Pulse Core errors with:
 * - error.message = user-facing message (e.g. "Invalid username or password.")
 * - error.extensions.details = { "__all__": ["..."], "fieldName": ["..."] } for Django-style display
 *
 * Use message for toast/alert; use details for inline form errors (like Django templates).
 */

export type ApiErrorDetails = Record<string, string[]>;

export type ApiErrorDisplay = {
  message: string;
  fieldErrors: ApiErrorDetails;
  code?: string;
  status?: number;
  statusCode?: number;
};

/** Input type for getApiErrorDisplay / getApiErrorMessage. Use toApiErrorLike(error) to normalize unknown. */
export type ApiErrorLike = {
  message?: string;
  code?: string;
  statusCode?: number;
  success?: boolean;
  errors?: Array<{ message?: string; extensions?: { details?: ApiErrorDetails; code?: string; status?: number; statusCode?: number } }>;
  graphQLErrors?: Array<{
    message?: string;
    extensions?: { details?: ApiErrorDetails; pulse_core_error?: boolean; code?: string; status?: number; statusCode?: number };
  }>;
  networkError?: { message?: string };
};

export function toApiErrorLike(error: unknown): ApiErrorLike {
  if (error == null) return { message: 'An error occurred.' };
  if (typeof error === 'object' && ('message' in error || 'graphQLErrors' in error || 'errors' in error || 'success' in error)) {
    return error as ApiErrorLike;
  }
  if (error instanceof Error) return { message: error.message };
  return { message: String(error) };
}

export function getApiErrorDisplay(error: ApiErrorLike): ApiErrorDisplay {
  const fieldErrors: ApiErrorDetails = {};
  let message = error.message ?? "An error occurred.";
  let code: string | undefined = error.code;
  let status: number | undefined = error.statusCode;

  // Top-level API response body (gateway sends success, message, code, statusCode, errors)
  if (error.success === false && Array.isArray(error.errors) && error.errors.length > 0) {
    const first = error.errors[0];
    message = (error as { message?: string }).message ?? first.message ?? message;
    if (first.extensions?.details && typeof first.extensions.details === "object") {
      Object.assign(fieldErrors, first.extensions.details);
    }
    if (first.extensions?.code) code = String(first.extensions.code);
    if (first.extensions?.statusCode != null) status = Number(first.extensions.statusCode);
    else if (first.extensions?.status != null) status = Number(first.extensions.status);
  }

  const gqlErrors = error.graphQLErrors;
  if (gqlErrors?.length) {
    const first = gqlErrors[0];
    message = first.message ?? message;
    const ext = first.extensions;
    if (ext?.details && typeof ext.details === "object") {
      Object.assign(fieldErrors, ext.details);
    }
    if (ext?.code) code = String(ext.code);
    if (ext?.statusCode != null) status = Number(ext.statusCode);
    else if (ext?.status != null) status = Number(ext.status);
  }

  if (error.networkError?.message && !gqlErrors?.length && error.success !== false) {
    message = error.networkError.message;
  }

  return { message, fieldErrors, code, status, statusCode: status ?? undefined };
}

/**
 * Get a single message string for toast/alert (message + first __all__ if present).
 */
export function getApiErrorMessage(error: ApiErrorLike): string {
  const { message, fieldErrors } = getApiErrorDisplay(error);
  const all = fieldErrors["__all__"];
  if (all?.length) {
    return all[0];
  }
  return message;
}

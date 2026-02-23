/**
 * Extract display message and field errors from GraphQL/Apollo errors.
 * Supports API Gateway response body (success, message, code, statusCode, errors) and Apollo graphQLErrors.
 */

export type ApiErrorDetails = Record<string, string[]>;

export type ApiErrorDisplay = {
  message: string;
  fieldErrors: ApiErrorDetails;
  code?: string;
  status?: number;
  statusCode?: number;
};

export function getApiErrorDisplay(error: {
  message?: string;
  code?: string;
  statusCode?: number;
  success?: boolean;
  errors?: Array<{ message?: string; extensions?: { details?: ApiErrorDetails; code?: string; status?: number; statusCode?: number } }>;
  graphQLErrors?: Array<{
    message?: string;
    extensions?: { details?: ApiErrorDetails; code?: string; status?: number; statusCode?: number };
  }>;
  networkError?: { message?: string };
}): ApiErrorDisplay {
  const fieldErrors: ApiErrorDetails = {};
  let message = error.message ?? "An error occurred.";
  let code: string | undefined = error.code;
  let status: number | undefined = error.statusCode;

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

export function getApiErrorMessage(error: Parameters<typeof getApiErrorDisplay>[0]): string {
  const { message, fieldErrors } = getApiErrorDisplay(error);
  const all = fieldErrors["__all__"];
  if (all?.length) return all[0];
  return message;
}

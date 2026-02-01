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
};

/**
 * Get display message and field errors from an Apollo/GraphQL error.
 * Handles both mutation/query errors (graphQLErrors) and network errors.
 */
export function getApiErrorDisplay(error: {
  message?: string;
  graphQLErrors?: Array<{
    message?: string;
    extensions?: {
      details?: ApiErrorDetails;
      pulse_core_error?: boolean;
      code?: string;
      status?: number;
    };
  }>;
  networkError?: { message?: string };
}): ApiErrorDisplay {
  const fieldErrors: ApiErrorDetails = {};
  let message = error.message ?? "An error occurred.";
  let code: string | undefined;
  let status: number | undefined;

  const gqlErrors = error.graphQLErrors;
  if (gqlErrors?.length) {
    const first = gqlErrors[0];
    message = first.message ?? message;
    const ext = first.extensions;
    if (ext?.details && typeof ext.details === "object") {
      Object.assign(fieldErrors, ext.details);
    }
    if (ext?.code) code = String(ext.code);
    if (ext?.status != null) status = Number(ext.status);
  }

  if (error.networkError?.message && !gqlErrors?.length) {
    message = error.networkError.message;
  }

  return { message, fieldErrors, code, status };
}

/**
 * Get a single message string for toast/alert (prefers __all__[0] when present).
 */
export function getApiErrorMessage(error: Parameters<typeof getApiErrorDisplay>[0]): string {
  const { message, fieldErrors } = getApiErrorDisplay(error);
  const all = fieldErrors["__all__"];
  if (all?.length) {
    return all[0];
  }
  return message;
}

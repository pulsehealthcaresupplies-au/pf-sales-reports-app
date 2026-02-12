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

export type ApiErrorInput = {
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
};

/**
 * Get display message and field errors from an Apollo/GraphQL error.
 * Handles both mutation/query errors (graphQLErrors) and network errors.
 * Accepts unknown so it can be used in catch blocks.
 */
export function getApiErrorDisplay(error: unknown): ApiErrorDisplay {
  const e: ApiErrorInput = error && typeof error === "object" ? (error as ApiErrorInput) : {};
  const fieldErrors: ApiErrorDetails = {};
  let message = e.message ?? "An error occurred.";
  let code: string | undefined;
  let status: number | undefined;

  const gqlErrors = e.graphQLErrors;
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

  if (e.networkError?.message && !gqlErrors?.length) {
    message = e.networkError.message;
  }

  return { message, fieldErrors, code, status };
}

/**
 * Get a single message string for toast/alert (prefers __all__[0] when present).
 * Accepts unknown so it can be used in catch blocks.
 */
export function getApiErrorMessage(error: unknown): string {
  const { message, fieldErrors } = getApiErrorDisplay(error);
  const all = fieldErrors["__all__"];
  if (all?.length) {
    return all[0];
  }
  return message;
}

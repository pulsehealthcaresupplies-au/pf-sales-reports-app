/**
 * Standard Error Codes from API Gateway.
 * Synced with backend api-gateway/utils/graphql_error_formatter.py (ErrorCodes).
 *
 * Auth handling (UNAUTHENTICATED / TOKEN_EXPIRED / 401):
 * - Retry with refresh token; if refresh fails or returns same auth error, logout (clear tokens + redirect to login).
 */

export enum ErrorCode {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * HTTP Status Code mapping for error codes
 */
export const ERROR_CODE_STATUS_MAP: Record<ErrorCode, number> = {
  [ErrorCode.UNAUTHENTICATED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.TOKEN_EXPIRED]: 401,
};

/**
 * Check if an error code indicates an authentication error
 */
export function isAuthError(errorCode: string | undefined): boolean {
  return (
    errorCode === ErrorCode.UNAUTHENTICATED ||
    errorCode === ErrorCode.TOKEN_EXPIRED ||
    errorCode === 'UNAUTHENTICATED' ||
    errorCode === 'TOKEN_EXPIRED'
  );
}

/**
 * Check if an error code indicates an authorization/permission error
 */
export function isPermissionError(errorCode: string | undefined): boolean {
  return errorCode === ErrorCode.FORBIDDEN || errorCode === 'FORBIDDEN';
}

/**
 * Check if an error code indicates a client error (4xx)
 */
export function isClientError(errorCode: string | undefined): boolean {
  if (!errorCode) return false;
  const statusCode = ERROR_CODE_STATUS_MAP[errorCode as ErrorCode];
  return statusCode ? statusCode >= 400 && statusCode < 500 : false;
}

/**
 * Check if an error code indicates a server error (5xx)
 */
export function isServerError(errorCode: string | undefined): boolean {
  if (!errorCode) return false;
  const statusCode = ERROR_CODE_STATUS_MAP[errorCode as ErrorCode];
  return statusCode ? statusCode >= 500 : false;
}

/**
 * Extract error code from GraphQL error extensions
 */
export function extractErrorCode(error: {
  extensions?: { code?: string; statusCode?: number };
  message?: string;
}): string | undefined {
  return error.extensions?.code;
}

/**
 * Extract HTTP status code from GraphQL error extensions
 */
export function extractStatusCode(error: {
  extensions?: { code?: string; statusCode?: number };
}): number | undefined {
  return error.extensions?.statusCode;
}

/** Auth error codes — must match backend. On these or 401: retry with refresh; if refresh fails/same → logout. */
export const AUTH_ERROR_CODES: readonly string[] = ['UNAUTHENTICATED', 'TOKEN_EXPIRED'];

/**
 * Check if a full error indicates an auth error (for Apollo: retry with refresh; if refresh fails, logout).
 */
export function isAuthErrorFromError(err: {
  extensions?: { code?: string; statusCode?: number };
  message?: string;
  statusCode?: number;
}): boolean {
  const code = err?.extensions?.code;
  const statusCode = err?.extensions?.statusCode ?? err?.statusCode;
  const msg = (err?.message ?? '').toLowerCase();
  return (
    statusCode === 401 ||
    (typeof code === 'string' && AUTH_ERROR_CODES.includes(code)) ||
    /unauthenticated|unauthorized|token expired|authentication required/.test(msg)
  );
}

/**
 * Standard API response and error handling (aligned with API Gateway).
 */

export {
  parseApiResponse,
  getMessageFromResponse,
  getCodeFromResponse,
  getStatusCodeFromResponse,
  isSuccessResponse,
  fromApolloResult,
} from './api-response';
export type {
  SuccessResponse,
  ErrorResponse,
  ApiResponse,
  PaginatedItemsResult,
  ConnectionResult,
} from './api-response';

export {
  ErrorCode,
  ERROR_CODE_STATUS_MAP,
  AUTH_ERROR_CODES,
  isAuthError,
  isPermissionError,
  isClientError,
  isServerError,
  isAuthErrorFromError,
  extractErrorCode,
  extractStatusCode,
  extractMessage,
} from './error-codes';

export { getApiErrorDisplay, getApiErrorMessage } from './apiErrorDisplay';
export type { ApiErrorDisplay, ApiErrorDetails } from './apiErrorDisplay';

export { handleErrorRouting, createErrorRouter } from './error-router';
export type { ErrorRoutingConfig } from './error-router';

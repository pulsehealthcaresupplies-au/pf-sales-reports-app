/**
 * Common base for displaying and rendering API responses.
 * Covers: success, error, paginated, list, and single-object response types.
 * Use parseApiResponse / fromApolloResult for consistent handling; use getApiErrorDisplay / getApiErrorMessage for toasts and field errors.
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
  SingleResult,
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

export { getApiErrorDisplay, getApiErrorMessage, toApiErrorLike } from './apiErrorDisplay';
export type { ApiErrorDisplay, ApiErrorDetails, ApiErrorLike } from './apiErrorDisplay';

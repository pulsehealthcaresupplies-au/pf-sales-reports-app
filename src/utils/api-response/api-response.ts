/**
 * API Gateway response shapes (success, error, paginated, list, single object).
 * Matches backend docs/architecture/API_RESPONSE_SHAPES.md.
 * Use as common base for displaying and rendering API responses.
 */

export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  statusCode: number;
  errors: Array<{
    message: string;
    extensions?: { code?: string; statusCode?: number; status?: number; debug?: unknown };
  }>;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/** Paginated list: items + totalCount (admin, B2B/B2C catalog) */
export interface PaginatedItemsResult<T> {
  items: T[];
  totalCount: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  hasNextPage?: boolean;
}

/** Connection-style list: edges + pageInfo */
export interface ConnectionResult<T> {
  edges: Array<{ node: T; cursor: string }>;
  pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor?: string; endCursor?: string };
  totalCount?: number;
}

/** Single object success (e.g. getById) */
export interface SingleResult<T> {
  success: true;
  data: T;
}

/**
 * Normalize GraphQL/API response to a single shape.
 * Reads from top-level (success, message, code, statusCode) or from errors[0].
 */
export function parseApiResponse<T = unknown>(body: unknown): ApiResponse<T> {
  if (body == null || typeof body !== 'object') {
    return {
      success: false,
      message: 'Invalid response',
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
      errors: [],
    };
  }
  const obj = body as Record<string, unknown>;
  const errors = Array.isArray(obj.errors) ? obj.errors : [];
  const firstError = errors[0] as Record<string, unknown> | undefined;
  const ext = firstError?.extensions as Record<string, unknown> | undefined;

  if (obj.success === true && !errors.length) {
    return { success: true, data: obj.data as T };
  }

  return {
    success: false,
    message: (obj.message as string) ?? firstError?.message ?? 'An error occurred',
    code: (obj.code as string) ?? ext?.code ?? 'INTERNAL_SERVER_ERROR',
    statusCode: Number(obj.statusCode ?? ext?.statusCode ?? ext?.status ?? 500),
    errors: errors.map((e: unknown) => {
      const err = e as Record<string, unknown>;
      return {
        message: (err.message as string) ?? 'Error',
        extensions: err.extensions as ErrorResponse['errors'][0]['extensions'],
      };
    }),
  };
}

/**
 * Get user-facing message from response (top-level or first error).
 */
export function getMessageFromResponse(response: unknown): string {
  const parsed = parseApiResponse(response);
  return parsed.success ? '' : parsed.message;
}

/**
 * Get error code from response (top-level or first error).
 */
export function getCodeFromResponse(response: unknown): string | undefined {
  const parsed = parseApiResponse(response);
  return parsed.success ? undefined : parsed.code;
}

/**
 * Get HTTP status code from response (top-level or first error).
 */
export function getStatusCodeFromResponse(response: unknown): number | undefined {
  const parsed = parseApiResponse(response);
  return parsed.success ? undefined : parsed.statusCode;
}

/**
 * Check if response indicates success (no errors).
 */
export function isSuccessResponse(response: unknown): boolean {
  if (response != null && typeof response === 'object' && 'success' in response) {
    return (response as { success?: boolean }).success === true;
  }
  if (response != null && typeof response === 'object' && 'errors' in response) {
    const errs = (response as { errors?: unknown[] }).errors;
    return !Array.isArray(errs) || errs.length === 0;
  }
  return false;
}

/**
 * Build normalized API response from an Apollo useQuery/useMutation result.
 * Use when handling result.data / result.errors to get a single success/message/code/statusCode shape.
 */
export function fromApolloResult<T = unknown>(result: {
  data?: T | null;
  error?: { message?: string; graphQLErrors?: Array<{ message?: string; extensions?: { code?: string; statusCode?: number } }> };
  errors?: ReadonlyArray<{ message?: string; extensions?: { code?: string; statusCode?: number } }>;
}): ApiResponse<T> {
  const errors = result.errors ?? result.error?.graphQLErrors ?? [];
  if (!errors.length) {
    return { success: true, data: result.data as T };
  }
  const first = errors[0];
  const ext = first.extensions;
  return {
    success: false,
    message: first.message ?? 'An error occurred',
    code: ext?.code ?? 'INTERNAL_SERVER_ERROR',
    statusCode: ext?.statusCode ?? 500,
    errors: errors.map((e) => ({ message: e.message ?? 'Error', extensions: e.extensions })),
  };
}

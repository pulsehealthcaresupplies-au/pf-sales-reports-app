/**
 * Common utilities for use across the sales-reports app.
 * Import from '@/utils' for cn, API errors, auth headers, and export helpers.
 * Response types (success, error, paginated, list, single): use '@/utils/api-response'.
 */

export { cn } from '@/lib/utils';
export { getApiErrorMessage, getApiErrorDisplay } from '@/lib/utils/apiErrorDisplay';
export { getAccessToken, getAuthHeaders, getAuthHeadersForFetch, isAuthenticated, clearAuthTokens } from '@/lib/utils/authHeaders';
export { exportToCSV, exportToExcel } from '@/lib/utils/export';
export type { ExportData } from '@/lib/utils/export';
export { noop, sleep } from './common';
export * from './api-response';

/**
 * Authentication Guard for GraphQL Operations
 * Prevents queries/mutations/subscriptions from executing when not authenticated
 * (except for public operations)
 */

import { getAccessToken } from '@/lib/auth/token-manager';

// Public operations for sales-reports app (only auth and health checks)
const SALES_REPORTS_PUBLIC_OPERATIONS = new Set([
  'salesReportsLogin',
  'salesReportsRefreshToken',
  'health',
  '_service',
]);

/**
 * Check if an operation is public (doesn't require authentication)
 */
export function isPublicOperation(operationName: string | undefined): boolean {
  if (!operationName) return false;
  return SALES_REPORTS_PUBLIC_OPERATIONS.has(operationName);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const accessToken = getAccessToken();
    return accessToken !== null && accessToken.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * Guard function to prevent operations when not authenticated
 */
export function shouldBlockOperation(operationName: string | undefined): boolean {
  // Allow public operations
  if (isPublicOperation(operationName)) {
    return false;
  }
  
  // Block if not authenticated
  return !isAuthenticated();
}

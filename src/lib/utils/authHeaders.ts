/**
 * Authentication Headers Utility for Sales Reports App
 *
 * Uses token-manager for getAccessToken so session respects "Remember me" (localStorage vs sessionStorage).
 * clearAuthTokens uses clearAllAuthData from auth-keys.
 */

import { clearAllAuthData } from '@/lib/auth/auth-keys';
import { getAccessToken as getAccessTokenFromTokenManager } from '@/lib/auth/token-manager';

const APP_NAME_HEADER = 'SALES_REPORTS';

/**
 * Get the access token (from storage chosen by "Remember me" via token-manager)
 */
export function getAccessToken(): string | null {
  try {
    const token = getAccessTokenFromTokenManager();
    return token?.trim() || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

/**
 * Get authentication headers for API requests
 * 
 * @param additionalHeaders - Additional headers to include
 * @returns Headers object with Authorization, X-App-Name, and Content-Type
 */
export function getAuthHeaders(
  additionalHeaders: Record<string, string> = {}
): Record<string, string> {
  const token = getAccessToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-App-Name': APP_NAME_HEADER,
    ...additionalHeaders,
  };

  // Only add Authorization header if token exists and is not empty
  if (token && token.trim().length > 0) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Get authentication headers for fetch requests
 * Returns Headers object with Authorization header if token exists
 */
export function getAuthHeadersForFetch(
  additionalHeaders: Record<string, string> = {}
): Headers {
  const headers = new Headers();
  const token = getAccessToken();
  
  headers.set('Content-Type', 'application/json');
  headers.set('X-App-Name', APP_NAME_HEADER);
  
  // Add additional headers
  Object.entries(additionalHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  // Only add Authorization header if token exists and is not empty
  if (token && token.trim().length > 0) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

/**
 * Clear authentication tokens (prefixed keys via clearAllAuthData)
 */
export function clearAuthTokens(): void {
  if (typeof window === 'undefined') return;
  try {
    clearAllAuthData();
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
}

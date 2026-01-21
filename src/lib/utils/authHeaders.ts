/**
 * Authentication Headers Utility for Sales Reports App
 * 
 * Provides secure authentication header management for Sales Reports app.
 * Ensures consistent header format across all GraphQL requests:
 * - Authorization: Bearer <token>
 * - X-App-Name: SALES_REPORTS
 * - Content-Type: application/json
 * 
 * SECURITY FEATURES:
 * - Only includes Authorization header if token exists and is valid
 * - Never sends empty Authorization headers
 * - Works gracefully without authentication
 * - App-specific token storage to prevent conflicts
 */

// App-specific configuration
const APP_NAME = 'sales-reports';
const APP_NAME_HEADER = 'SALES_REPORTS';
const TOKEN_KEY = 'sales_reports_access_token';

/**
 * Get the access token from localStorage
 * Tries app-specific key first, then fallback keys
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    // Try app-specific key first
    let token = localStorage.getItem(TOKEN_KEY);
    
    // Fallback to common keys (for backward compatibility)
    if (!token) {
      token = localStorage.getItem('access_token') ||
              localStorage.getItem('auth_token') ||
              localStorage.getItem('token') ||
              null;
    }

    // Validate token format (basic check)
    if (token && token.trim().length > 0) {
      return token;
    }

    return null;
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
 * Clear authentication tokens
 * SECURITY: Clears all token storage locations
 */
export function clearAuthTokens(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Clear app-specific token
    localStorage.removeItem(TOKEN_KEY);
    
    // Clear common tokens (for backward compatibility)
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    
    // Clear app-specific user data
    localStorage.removeItem('sales_reports_user');
    localStorage.removeItem('sales_reports_refresh_token');
    localStorage.removeItem('sales_reports_expires_at');
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
}

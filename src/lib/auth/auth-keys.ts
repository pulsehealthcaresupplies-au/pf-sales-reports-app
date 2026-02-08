/**
 * Authentication Keys Configuration for Sales Reports App
 * 
 * Centralized configuration for all localStorage and cookie keys used for authentication.
 * This ensures consistency and makes it easy to clear all auth-related data during logout.
 */

export interface AuthKeys {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: string;
  /** Hash phrase for extra verification (secure headers); cleared on logout */
  hashPhrase: string;
  cookieAccessToken: string;
  cookieRefreshToken: string;
}

/**
 * Get authentication keys for sales-reports app
 */
export function getAuthKeys(): AuthKeys {
  return {
    accessToken: 'sales_reports_access_token',
    refreshToken: 'sales_reports_refresh_token',
    expiresAt: 'sales_reports_expires_at',
    user: 'sales_reports_user',
    hashPhrase: 'sales_reports_hash_phrase',
    cookieAccessToken: 'sales_reports_access_token',
    cookieRefreshToken: 'sales_reports_refresh_token',
  };
}

/**
 * Clear all authentication data from localStorage, sessionStorage, and cookies
 * This ensures complete session cleanup on logout
 */
export function clearAllAuthData(): void {
  if (typeof window === 'undefined') return;

  const keys = getAuthKeys();
  
  // Clear localStorage
  localStorage.removeItem(keys.accessToken);
  localStorage.removeItem(keys.refreshToken);
  localStorage.removeItem(keys.expiresAt);
  localStorage.removeItem(keys.user);
  if (keys.hashPhrase) localStorage.removeItem(keys.hashPhrase);

  // Clear sessionStorage (if any auth data is stored there)
  sessionStorage.removeItem(keys.accessToken);
  sessionStorage.removeItem(keys.refreshToken);
  sessionStorage.removeItem(keys.expiresAt);
  sessionStorage.removeItem(keys.user);
  if (keys.hashPhrase) sessionStorage.removeItem(keys.hashPhrase);

  // Clear cookies with proper path and domain
  const deleteCookie = (name: string) => {
    // Clear for current path
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    // Clear for root path (if different)
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; domain=${window.location.hostname}`;
  };

  deleteCookie(keys.cookieAccessToken);
  deleteCookie(keys.cookieRefreshToken);
  deleteCookie('auth-token'); // Legacy cookie
  deleteCookie('access_token'); // Legacy cookie
  deleteCookie('refresh_token'); // Legacy cookie
}

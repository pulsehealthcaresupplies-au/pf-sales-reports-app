/**
 * Token Manager - Secure token storage and automatic refresh
 * Handles access and refresh token lifecycle for authentication in Sales Reports App
 * Uses centralized auth-keys configuration for consistency
 */

import { getAuthKeys, clearAllAuthData } from './auth-keys';

const AUTH_KEYS = getAuthKeys();

const ACCESS_TOKEN_KEY = AUTH_KEYS.accessToken;
const REFRESH_TOKEN_KEY = AUTH_KEYS.refreshToken;
const USER_KEY = AUTH_KEYS.user;
const TOKEN_EXPIRY_KEY = AUTH_KEYS.expiresAt;

// Token refresh threshold: refresh 5 minutes before expiration
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number; // seconds until expiration (optional)
    expiresAt?: number; // timestamp (optional)
}

/**
 * Helper to set cookies
 */
const setCookie = (name: string, value: string, maxAge: number) => {
    if (typeof document === 'undefined') return;
    const isProduction = process.env.NODE_ENV === 'production';
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${isProduction ? '; Secure' : ''}`;
};

const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
};

/**
 * Store tokens securely in localStorage and Cookies
 */
export const setTokens = (tokenData: TokenData): void => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(ACCESS_TOKEN_KEY, tokenData.accessToken);
    if (tokenData.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    }

    // Calculate and store expiry
    let expiryTime = 0;
    if (tokenData.expiresAt) {
        expiryTime = tokenData.expiresAt;
    } else if (tokenData.expiresIn) {
        expiryTime = Date.now() + tokenData.expiresIn * 1000;
    }

    if (expiryTime > 0) {
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    // Set Cookie for Middleware
    const maxAge = 7 * 24 * 60 * 60; // 7 days
    setCookie(ACCESS_TOKEN_KEY, tokenData.accessToken, maxAge);
};

/**
 * Get current access token
 */
export const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token
 */
export const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Clear all tokens (logout)
 */
/**
 * Clear all tokens (logout)
 * Uses centralized auth-keys configuration to ensure all auth data is cleared
 */
export const clearTokens = (): void => {
    if (typeof window === 'undefined') return;

    // Use centralized clear function to ensure all keys are cleared
    clearAllAuthData();
};

/**
 * Check if current token is expired or about to expire
 */
export const isTokenExpired = (): boolean => {
    if (typeof window === 'undefined') return true;

    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;

    const timeUntilExpiry = parseInt(expiryTime, 10) - Date.now();
    return timeUntilExpiry <= 0;
};

/**
 * Check if token needs refresh (within threshold)
 */
export const shouldRefreshToken = (): boolean => {
    if (typeof window === 'undefined') return false;

    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return false;

    const timeUntilExpiry = parseInt(expiryTime, 10) - Date.now();
    return timeUntilExpiry <= REFRESH_THRESHOLD_MS && timeUntilExpiry > 0;
};

/**
 * Refresh access token using refresh token via GraphQL
 * 
 * NOTE: This function is kept for backward compatibility with Apollo Client error link.
 * For new code, use AuthContext.refreshAccessToken() which properly handles
 * user data, cookies, and API token setting.
 * 
 * @deprecated Use AuthContext.refreshAccessToken() instead
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        clearTokens();
        return null;
    }

    try {
        // Using generic refreshToken mutation from shared schema
        const query = `
            mutation RefreshToken($refreshToken: String!) {
                refreshToken(refreshToken: $refreshToken) {
                    accessToken
                    refreshToken
                    expiresAt
                    user {
                        id
                        email
                        phone
                        username
                        firstName
                        lastName
                        role
                    }
                }
            }
        `;

        const { getGraphQLEndpoint } = await import('@/config/endpoints');
        const endpoint = getGraphQLEndpoint('sales-reports');

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { refreshToken },
            }),
        });

        const result = await response.json();

        if (result.errors || !result.data?.refreshToken) {
            console.error('Refresh failed:', result.errors);
            clearTokens();
            return null;
        }

        const { accessToken, refreshToken: newRefreshToken, expiresAt, user } = result.data.refreshToken;

        const tokenData: TokenData = {
            accessToken,
            refreshToken: newRefreshToken || refreshToken,
            // normalize expiresAt to ms (Date.now() units)
            expiresAt: expiresAt
                ? (typeof expiresAt === 'string'
                    ? new Date(expiresAt).getTime()
                    : (expiresAt > 1e12 ? expiresAt : expiresAt * 1000))
                : undefined,
        };

        setTokens(tokenData);

        // Also store user data if returned (same as login)
        if (user && typeof window !== 'undefined') {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }

        // Set cookies for middleware (same as login)
        if (typeof window !== 'undefined') {
            const maxAge = 7 * 24 * 60 * 60; // 7 days
            setCookie(ACCESS_TOKEN_KEY, accessToken, maxAge);
            if (newRefreshToken || refreshToken) {
                const refreshMaxAge = 30 * 24 * 60 * 60; // 30 days
                setCookie(REFRESH_TOKEN_KEY, newRefreshToken || refreshToken, refreshMaxAge);
            }
        }

        return accessToken;
    } catch (error) {
        console.error('Token refresh execution failed:', error);
        clearTokens();
        return null;
    }
};

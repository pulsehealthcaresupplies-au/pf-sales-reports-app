/**
 * Token Manager - Secure token storage and automatic refresh
 * Handles access and refresh token lifecycle for authentication in Sales Reports App
 * Uses centralized auth-keys configuration for consistency
 */

import { getAuthKeys, clearAllAuthData } from './auth-keys';

const AUTH_KEYS = getAuthKeys();
const REMEMBER_ME_KEY = 'sales-reports-remember-me';

const ACCESS_TOKEN_KEY = AUTH_KEYS.accessToken;
const REFRESH_TOKEN_KEY = AUTH_KEYS.refreshToken;
const USER_KEY = AUTH_KEYS.user;
const TOKEN_EXPIRY_KEY = AUTH_KEYS.expiresAt;

export function getAuthStorage(): Storage | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true' ? localStorage : sessionStorage;
}

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

// deleteCookie reserved for future use (e.g. logout clear specific cookie)
// const deleteCookie = (name: string) => { ... };

export const setTokens = (tokenData: TokenData): void => {
    const storage = getAuthStorage();
    if (!storage) return;

    storage.setItem(ACCESS_TOKEN_KEY, tokenData.accessToken);
    if (tokenData.refreshToken) {
        storage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    }

    let expiryTime = 0;
    if (tokenData.expiresAt) {
        expiryTime = tokenData.expiresAt;
    } else if (tokenData.expiresIn) {
        expiryTime = Date.now() + tokenData.expiresIn * 1000;
    }

    if (expiryTime > 0) {
        storage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    const maxAge = 7 * 24 * 60 * 60;
    setCookie(ACCESS_TOKEN_KEY, tokenData.accessToken, maxAge);
};

/**
 * Get current access token
 */
export const getAccessToken = (): string | null => {
    const storage = getAuthStorage();
    return storage ? storage.getItem(ACCESS_TOKEN_KEY) : null;
};

export const getRefreshToken = (): string | null => {
    const storage = getAuthStorage();
    return storage ? storage.getItem(REFRESH_TOKEN_KEY) : null;
};

/**
 * Get hash phrase (secure verification header); prefixed key only
 */
export const getHashPhrase = (): string | null => {
    const storage = getAuthStorage();
    return storage ? storage.getItem(AUTH_KEYS.hashPhrase) : null;
};

export const setHashPhrase = (hashPhrase: string | null): void => {
    const storage = getAuthStorage();
    if (!storage) return;
    if (hashPhrase?.trim()) {
        storage.setItem(AUTH_KEYS.hashPhrase, hashPhrase.trim());
    } else {
        storage.removeItem(AUTH_KEYS.hashPhrase);
    }
};

/**
 * Clear all tokens (logout).
 * Uses centralized auth-keys configuration to ensure all auth data is cleared (same as admin-dashboard).
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
    const storage = getAuthStorage();
    if (!storage) return true;
    const expiryTime = storage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;
    const timeUntilExpiry = parseInt(expiryTime, 10) - Date.now();
    return timeUntilExpiry <= 0;
};

export const shouldRefreshToken = (): boolean => {
    const storage = getAuthStorage();
    if (!storage) return false;
    const expiryTime = storage.getItem(TOKEN_EXPIRY_KEY);
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
            clearTokens();
            return null;
        }

        const { accessToken, refreshToken: newRefreshToken, expiresAt, hashPhrase, user } = result.data.refreshToken;
        if (hashPhrase?.trim()) {
            setHashPhrase(hashPhrase);
        }

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

        if (user && typeof window !== 'undefined') {
            const storage = getAuthStorage();
            if (storage) storage.setItem(USER_KEY, JSON.stringify(user));
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
    } catch {
        clearTokens();
        return null;
    }
};

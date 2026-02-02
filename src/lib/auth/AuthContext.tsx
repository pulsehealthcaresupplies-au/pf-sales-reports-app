'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION, LOGOUT_MUTATION } from '@/lib/graphql/operations/mutations/auth-mutations';
import { getGraphQLEndpointPath } from '@/config/endpoints';
import {
    setTokens,
    clearTokens,
    setHashPhrase,
    refreshAccessToken as managerRefresh,
    getAccessToken,
    isTokenExpired
} from './token-manager';
import { setTokenGetter } from '@/lib/apollo/client';
import { ROUTES, getLoginUrl } from '@/config/routes';
import { getAuthKeys } from './auth-keys';

// Temporary types - will be replaced with generated types after codegen
interface User {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    user: User | null;
    isAuthenticated: boolean;
    isRefreshing: boolean;
}

interface AuthContextValue extends AuthState {
    login: (emailOrPhone: string, password: string) => Promise<void>; // Supports email or phone
    logout: () => Promise<void>;
    logoutAllDevices: () => Promise<void>;
    refreshAccessToken: () => Promise<string>;
    getValidToken: () => Promise<string | null>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Allowed roles for sales reports app (must match backend role_validator APP_ROLES['sales-reports'])
const ALLOWED_ROLES = [
    'SUPER_USER',
    'SUPER_ADMIN',
    'ADMIN',
    'WAREHOUSE_ADMIN',
    'FINANCE_ADMIN',
    'SALES_TEAM',
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [refreshMutation] = useMutation(REFRESH_TOKEN_MUTATION);

    const [authState, setAuthState] = useState<AuthState>({
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        user: null,
        isAuthenticated: false,
        isRefreshing: false,
    });

    const [isInitialized, setIsInitialized] = useState(false);

    // Valid token getter with automatic refresh strategy
    const getValidToken = useCallback(async (): Promise<string | null> => {
        if (!authState.accessToken || !authState.expiresAt) {
            return null;
        }

        // Check if token expires in next 60 seconds
        const expiresIn = (authState.expiresAt - Date.now()) / 1000;

        if (expiresIn < 60) {
            // Wait if already refreshing
            if (authState.isRefreshing) {
                return new Promise((resolve) => {
                    const checkInterval = setInterval(() => {
                        if (!authState.isRefreshing) {
                            clearInterval(checkInterval);
                            resolve(authState.accessToken);
                        }
                    }, 100);

                    setTimeout(() => {
                        clearInterval(checkInterval);
                        resolve(authState.accessToken);
                    }, 10000);
                });
            }

            // Refresh token
            try {
                if (expiresIn <= 0 && isTokenExpired()) return null;
                const newToken = await managerRefresh();
                // We should update local state if manager returned new token
                if (newToken) return newToken;
                return null;
            } catch (error) {
                return null;
            }
        }

        return authState.accessToken;
    }, [authState]);

    // Common function to process auth response (used by both login and refreshToken)
    const processAuthResponse = useCallback(
        async (
            accessToken: string,
            refreshToken: string | null,
            user: User | null,
            expiresAt: number | null
        ) => {
            const expiresAtTimestamp = expiresAt || Date.now() + 3600000;

            const newState: AuthState = {
                accessToken,
                refreshToken,
                expiresAt: expiresAtTimestamp,
                user,
                isAuthenticated: true,
                isRefreshing: false,
            };

            // Update auth state
            setAuthState(newState);

            // Token Manager for tokens (and cookies)
            setTokens({
                accessToken,
                refreshToken: refreshToken || '',
                expiresAt: expiresAtTimestamp,
            });

            // Persist user with key from auth-keys (same pattern as admin-dashboard)
            if (user) {
                localStorage.setItem(getAuthKeys().user, JSON.stringify(user));
            }
        },
        []
    );

    // Refresh access token
    const refreshAccessToken = useCallback(async (): Promise<string> => {
        if (!authState.refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            setAuthState((prev) => ({ ...prev, isRefreshing: true }));

            const { data } = await refreshMutation({
                variables: { refreshToken: authState.refreshToken },
                context: { skipAuth: true, endpoint: getGraphQLEndpointPath('sales-reports') },
            }) as any;

            if (data?.refreshToken) {
                const { accessToken, refreshToken, expiresAt, hashPhrase, user } = data.refreshToken;
                const expiresAtTimestamp = typeof expiresAt === 'number'
                    ? expiresAt
                    : expiresAt ? new Date(expiresAt).getTime() : Date.now() + 3600000;

                await processAuthResponse(
                    accessToken,
                    refreshToken || authState.refreshToken,
                    user || authState.user,
                    expiresAtTimestamp,
                    hashPhrase ?? undefined
                );

                return accessToken;
            }

            throw new Error('Token refresh failed');
        } catch (error) {
            console.error('Token refresh failed:', error);
            setAuthState((prev) => ({ ...prev, isRefreshing: false }));
            // Logout on hard fail - clear state directly to avoid circular dependency
            setAuthState({
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
                user: null,
                isAuthenticated: false,
                isRefreshing: false,
            });
            clearTokens();
            router.push('/login');
            throw error;
        }
    }, [authState.refreshToken, authState.user, refreshMutation, processAuthResponse, router]);

    // Update Apollo Client token getter
    useEffect(() => {
        setTokenGetter(getValidToken);
    }, [getValidToken]);

    // Helper to clear all auth data
    const clearAuthState = useCallback(() => {
        clearTokens();
    }, []);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const loadAuthState = () => {
            try {
                const keys = getAuthKeys();
                const accessToken = getAccessToken();
                const userStr = localStorage.getItem(keys.user);
                const refreshToken = localStorage.getItem(keys.refreshToken);
                const expiresAt = localStorage.getItem(keys.expiresAt);

                if (accessToken && refreshToken && expiresAt) {
                    const user = userStr ? JSON.parse(userStr) : null;
                    const expiresAtNum = parseInt(expiresAt, 10);

                    // Check if token is still valid
                    if (expiresAtNum > Date.now()) {
                        setAuthState({
                            accessToken,
                            refreshToken,
                            expiresAt: expiresAtNum,
                            user,
                            isAuthenticated: true,
                            isRefreshing: false,
                        });
                    } else {
                        // Token expired, clear storage
                        clearAuthState();
                    }
                }
            } catch (error) {
                console.error('Failed to load auth state:', error);
                clearAuthState();
            } finally {
                setIsInitialized(true);
            }
        };

        loadAuthState();
    }, [clearAuthState]);

    // Login function with role validation - supports email or phone
    const login = useCallback(
        async (email: string, password: string) => {
            try {
                // Determine if input is email or phone
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmail = emailPattern.test(email);

                console.log('🔐 Sales Reports Login attempt:', { email, isEmail });
                const { data } = await loginMutation({
                    variables: {
                        username: !isEmail ? email : undefined, // Phone number
                        email: isEmail ? email : undefined, // Email
                        password,
                        requireOtp: false, // OTP disabled for now
                        app: 'SALES_REPORTS',
                    },
                    context: { endpoint: getGraphQLEndpointPath('sales-reports') },
                }) as any;
                console.log('📡 Login response:', { hasData: !!data, hasLogin: !!data?.login });

                if (data?.login) {
                    const { accessToken, refreshToken, expiresAt: expiresAtRaw, expiresIn, user } = data.login;

                    // SECURITY: Verify user has allowed role (case-insensitive to match backend)
                    const userRole = user?.role?.toUpperCase?.() ?? '';
                    if (!userRole || !ALLOWED_ROLES.includes(userRole)) {
                        throw new Error('Access denied. Your role does not have permission to access Sales Reports.');
                    }

                    // Handle expiresAt
                    let expiresAt: number;
                    if (expiresAtRaw) {
                        expiresAt = expiresAtRaw > 1000000000000 ? expiresAtRaw : expiresAtRaw * 1000;
                    } else if (expiresIn) {
                        expiresAt = Date.now() + (expiresIn * 1000);
                    } else {
                        expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
                    }

                    await processAuthResponse(accessToken, refreshToken, user, expiresAt, hashPhrase ?? undefined);

                    console.log('✅ Login successful! Cookie set. isAuthenticated:', true);
                }
            } catch (error: any) {
                console.error('Login failed:', error);
                const { getApiErrorMessage } = await import('@/lib/utils/apiErrorDisplay');
                const errorMessage = getApiErrorMessage(error);
                const loginError = new Error(errorMessage);
                (loginError as any).graphQLErrors = error?.graphQLErrors;
                (loginError as any).networkError = error?.networkError;
                throw loginError;
            }
        },
        [loginMutation, processAuthResponse]
    );

    // Logout function with backend token revocation
    const logout = useCallback(async () => {
        try {
            // Call backend to revoke token (fire and forget)
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        accessToken: authState.accessToken,
                        refreshToken: authState.refreshToken
                    })
                });
            } catch (error) {
                console.warn('Backend logout failed, clearing client state anyway:', error);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear client state regardless of backend response
            setAuthState({
                accessToken: null,
                refreshToken: null,
                expiresAt: null,
                user: null,
                isAuthenticated: false,
                isRefreshing: false,
            });
            clearAuthState();

            // Redirect to login with redirect-back logic
            if (typeof window !== 'undefined') {
                const currentPath = window.location.pathname + window.location.search;
                const isAuthPage = currentPath.startsWith('/auth') && !currentPath.includes('login');
                const redirectUrl = (currentPath !== ROUTES.AUTH.LOGIN && !isAuthPage)
                    ? getLoginUrl(currentPath)
                    : ROUTES.AUTH.LOGIN;

                setTimeout(() => {
                    router.push(redirectUrl);
                }, 300);
            }
        }
    }, [authState.accessToken, authState.refreshToken, clearAuthState, router]);

    // Logout from all devices
    const logoutAllDevices = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/logout-all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accessToken: authState.accessToken,
                    refreshToken: authState.refreshToken
                })
            });

            if (!response.ok) {
                throw new Error('Failed to logout from all devices');
            }

            // Clear current session
            await logout();
        } catch (error) {
            console.error('Logout all devices error:', error);
            throw error;
        }
    }, [authState.accessToken, authState.refreshToken, logout]);

    // Proactive silent token refresh (added wrapper for consistent session management)
    useEffect(() => {
        if (!authState.expiresAt || !authState.isAuthenticated) return;

        const expiresAt = authState.expiresAt;
        const now = Date.now();

        // Schedule refresh 2 minutes (120000ms) before expiry
        const timeUntilRefresh = expiresAt - now - 120000;

        let timer: NodeJS.Timeout;

        if (timeUntilRefresh <= 0) {
            const timeRemaining = expiresAt - now;
            if (timeRemaining > 0 && !authState.isRefreshing) {
                refreshAccessToken().catch(e => console.warn("Background auto-refresh failed", e));
            }
        } else {
            timer = setTimeout(() => {
                if (!authState.isRefreshing) {
                    refreshAccessToken().catch(e => console.warn("Background auto-refresh failed", e));
                }
            }, timeUntilRefresh);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [authState.expiresAt, authState.isAuthenticated, authState.isRefreshing, refreshAccessToken]);

    const value: AuthContextValue = {
        ...authState,
        login,
        logout,
        logoutAllDevices,
        refreshAccessToken,
        getValidToken,
        loading: authState.isRefreshing || !isInitialized,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

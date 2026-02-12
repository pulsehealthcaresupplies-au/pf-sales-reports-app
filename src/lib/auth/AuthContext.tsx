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
    getAuthStorage,
    isTokenExpired
} from './token-manager';
import { setTokenGetter } from '@/lib/apollo/client';
import { ROUTES, getLoginUrl } from '@/config/routes';
import { getAuthKeys } from './auth-keys';
import { toast } from 'sonner';

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
    login: (emailOrPhone: string, password: string, rememberMe?: boolean) => Promise<void>;
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
    const [loginMutation] = useMutation(LOGIN_MUTATION, {
        errorPolicy: 'all', // Explicitly set to ensure errors are returned in result.error (Apollo Client 4)
    });
    const [refreshMutation] = useMutation(REFRESH_TOKEN_MUTATION, {
        errorPolicy: 'all', // Explicitly set to ensure errors are returned in result.error (Apollo Client 4)
    });
    const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
        errorPolicy: 'all', // Explicitly set to ensure errors are returned in result.error (Apollo Client 4)
    });

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
            } catch {
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
            expiresAt: number | null,
            hashPhrase?: string | null
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

            if (hashPhrase != null) {
                setHashPhrase(hashPhrase);
            }

            if (user) {
                const storage = getAuthStorage();
                if (storage) storage.setItem(getAuthKeys().user, JSON.stringify(user));
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

            const result = await refreshMutation({
                variables: { refreshToken: authState.refreshToken },
                context: { skipAuth: true, endpoint: getGraphQLEndpointPath('sales-reports') },
            });

            const data = (result.data as any)?.refreshToken;
            
            // Apollo Client 4 with errorPolicy: 'all' returns errors in result.error (singular) as CombinedGraphQLErrors
            const error = (result as any).error;
            
            // Check for GraphQL errors first
            if (error) {
                // Extract errors array from CombinedGraphQLErrors
                const graphQLErrors = error.errors || (error.message ? [error] : []);
                const { getApiErrorMessage } = await import('@/lib/utils/apiErrorDisplay');
                const errorMessage = getApiErrorMessage({
                    graphQLErrors: graphQLErrors,
                    message: error.message || graphQLErrors[0]?.message,
                });
                throw new Error(errorMessage);
            }

            if (!data || !data.accessToken) {
                throw new Error('Token refresh failed - Invalid response from server');
            }

            const { accessToken, refreshToken, expiresAt, hashPhrase, user } = data;
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

            // Show success notification for token refresh
            toast.success('Session refreshed successfully.', {
              duration: 3000,
            });

            return accessToken;
        } catch (err) {
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
            router.push(ROUTES.AUTH.LOGIN);
            throw err;
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

    // Load auth state from storage (chosen by "Remember me") on mount
    useEffect(() => {
        const loadAuthState = () => {
            try {
                const keys = getAuthKeys();
                const storage = getAuthStorage();
                if (!storage) {
                    setIsInitialized(true);
                    return;
                }
                const accessToken = storage.getItem(keys.accessToken);
                const userStr = storage.getItem(keys.user);
                const refreshToken = storage.getItem(keys.refreshToken);
                const expiresAt = storage.getItem(keys.expiresAt);

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
            } catch {
                clearAuthState();
            } finally {
                setIsInitialized(true);
            }
        };

        loadAuthState();
    }, [clearAuthState]);

    const login = useCallback(
        async (email: string, password: string, rememberMe?: boolean) => {
            try {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmail = emailPattern.test(email);

                const result = await loginMutation({
                    variables: {
                        username: !isEmail ? email : undefined,
                        email: isEmail ? email : undefined,
                        password,
                        requireOtp: false,
                        app: 'SALES_REPORTS',
                    },
                    context: { endpoint: getGraphQLEndpointPath('sales-reports') },
                });

                const data = (result.data as any)?.login;
                
                // Apollo Client 4 with errorPolicy: 'all' returns errors in result.error (singular) as CombinedGraphQLErrors
                // The error object has: error.message, error.errors (array), error.name = "CombinedGraphQLErrors"
                const error = (result as any).error;
                
                // Check for GraphQL errors first - if errors exist, return them regardless of data
                if (error) {
                    // Extract errors array from CombinedGraphQLErrors
                    const graphQLErrors = error.errors || (error.message ? [error] : []);
                    const { getApiErrorMessage } = await import('@/lib/utils/apiErrorDisplay');
                    const errorMessage = getApiErrorMessage({
                        graphQLErrors: graphQLErrors,
                        message: error.message || graphQLErrors[0]?.message,
                    });
                    throw new Error(errorMessage);
                }

                // Check if login data exists and has required fields
                if (!data || !data.accessToken) {
                    // If data is null or accessToken is missing, check if it's a role-based denial
                    if (data && data.user === null && data.accessToken === null) {
                        // Backend returned null user/token - likely role-based access denial
                        throw new Error('Access denied. Your role does not have permission to access Sales Reports.');
                    }
                    throw new Error('Login failed - Invalid response from server');
                }

                const { accessToken, refreshToken, expiresAt: expiresAtRaw, expiresIn, user, hashPhrase } = data;

                // Validate user role
                const userRole = user?.role?.toUpperCase?.() ?? '';
                if (!userRole || !ALLOWED_ROLES.includes(userRole)) {
                    throw new Error('Access denied. Your role does not have permission to access Sales Reports.');
                }

                if (typeof window !== 'undefined' && rememberMe !== undefined) {
                    localStorage.setItem('sales-reports-remember-me', rememberMe ? 'true' : 'false');
                }

                let expiresAt: number;
                if (expiresAtRaw) {
                    expiresAt = expiresAtRaw > 1000000000000 ? expiresAtRaw : expiresAtRaw * 1000;
                } else if (expiresIn) {
                    expiresAt = Date.now() + (expiresIn * 1000);
                } else {
                    expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
                }

                await processAuthResponse(
                    accessToken,
                    refreshToken ?? null,
                    user ?? null,
                    expiresAt,
                    hashPhrase ?? undefined
                );

                // Show welcome notification
                const name = user?.firstName || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'there');
                const hour = new Date().getHours();
                const timeOfDay = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
                const welcomeMsg = `Welcome back, ${name}! ${timeOfDay}!`;
                toast.success(welcomeMsg, {
                  description: user?.firstName ? `Welcome back, ${user.firstName}! You've been successfully logged in.` : 'Login successful! Welcome back.',
                  duration: 5000,
                });
            } catch (error: unknown) {
                // Re-throw if already a proper Error with message
                if (error instanceof Error && error.message) {
                    throw error;
                }
                
                // Otherwise, extract error message using getApiErrorMessage
                const { getApiErrorMessage } = await import('@/lib/utils/apiErrorDisplay');
                const errorMessage = getApiErrorMessage(error as any);
                throw new Error(errorMessage);
            }
        },
        [loginMutation, processAuthResponse]
    );

    // Logout function with backend token revocation
    const logout = useCallback(async () => {
        try {
            // Call GraphQL logout mutation to revoke token on backend
            try {
                await logoutMutation({
                    context: { endpoint: getGraphQLEndpointPath('sales-reports') },
                });
            } catch (logoutError) {
                // Log but don't fail - we'll clear client state anyway
                console.warn('Logout mutation failed:', logoutError);
            }

            // Also call API route for cookie cleanup (fire and forget)
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        accessToken: authState.accessToken,
                        refreshToken: authState.refreshToken
                    })
                });
            } catch {
                // Backend logout failed; clearing client state anyway
            }
        } catch {
            // Logout error; clearing client state in finally
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

            // Show logout success notification
            toast.success('You have been successfully logged out. See you soon!', {
              duration: 3000,
            });

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
    }, [authState.accessToken, authState.refreshToken, clearAuthState, router, logoutMutation]);

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
        } catch (err) {
            throw err;
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
                refreshAccessToken().catch(() => {});
            }
        } else {
            timer = setTimeout(() => {
                if (!authState.isRefreshing) {
                    refreshAccessToken().catch(() => {});
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

/**
 * Route constants for the Sales Reports application
 */
export const ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
    },
    DASHBOARD: '/dashboard',
    ABOUT: '/about',
    API: {
        AUTH: {
            LOGIN: '/api/auth/login',
            LOGOUT: '/api/auth/logout',
            LOGOUT_ALL: '/api/auth/logout-all',
            SET_TOKENS: '/api/auth/set-tokens',
        }
    }
};

export const AUTH_ROUTES = ROUTES.AUTH;

/**
 * Helper function to build login URL with redirect parameter
 * @param redirectTo - The path to redirect to after login (defaults to current pathname)
 * @returns Login URL with redirect query parameter
 */
export function getLoginUrl(redirectTo?: string): string {
    if (redirectTo) {
        return `${ROUTES.AUTH.LOGIN}?redirect=${encodeURIComponent(redirectTo)}`;
    }
    return ROUTES.AUTH.LOGIN;
}

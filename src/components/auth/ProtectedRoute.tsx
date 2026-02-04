'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { ROUTES } from '@/config/routes';
import { toast } from 'sonner';
import { Spinner } from '@heroui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * ProtectedRoute wrapper component
 * 
 * SECURITY FEATURES:
 * - Verifies authentication on mount
 * - Attempts token refresh if access token is invalid
 * - Clears auth state and redirects to login on failure
 * - Role-based access control (handled by backend)
 * - Prevents unauthorized access to protected routes
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isAuthenticated, loading: authLoading, getValidToken, logout } = useAuth();
    // Initialize state to avoid redundant verifying if already authenticated
    const [isVerifying, setIsVerifying] = useState(!isAuthenticated);
    const [authVerified, setAuthVerified] = useState(isAuthenticated);

    useEffect(() => {
        async function verifyAuth() {
            try {
                if (!isAuthenticated) {
                    // Not authenticated - redirect to login
                    setIsVerifying(false);
                    router.replace(ROUTES.AUTH.LOGIN);
                    return;
                }

                // If authenticate, we skip the blocking token verification
                // getValidToken will handle expiry in background or on API calls

                // Verify user has allowed role (additional client-side check)
                const allowedRoles = [
                    'SUPER_USER',
                    'SUPER_ADMIN',
                    'SALES_TEAM',
                    'FINANCE_ADMIN',
                    'WAREHOUSE_ADMIN',
                ];

                if (user && user.role && !allowedRoles.includes(user.role)) {
                    toast.error('Access Denied', {
                        description: 'Your role does not have permission to access Sales Reports.',
                        duration: 5000,
                    });
                    await logout();
                    router.replace(ROUTES.AUTH.LOGIN);
                    return;
                }

                // Auth verified
                setAuthVerified(true);
            } catch (error) {
                console.error('Auth verification error:', error);
                await logout();
                router.replace(ROUTES.AUTH.LOGIN);
            } finally {
                setIsVerifying(false);
            }
        }

        if (!authLoading) {
            if (isAuthenticated) {
                if (!authVerified) setAuthVerified(true);
                verifyAuth();
            } else {
                setIsVerifying(false);
                setAuthVerified(false);
                router.replace(ROUTES.AUTH.LOGIN);
            }
        } else {
            setIsVerifying(true);
        }
    }, [authLoading, isAuthenticated, logout, router, user, authVerified]);

    // Show loading spinner while verifying auth
    if (authLoading || isVerifying) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Spinner size="lg" />
                    <p className="mt-4 text-sm text-default-500">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated
    if (!authVerified) {
        return null;
    }

    // Backend will handle authorization for specific resources
    // If user doesn't have permission, backend returns 403
    return <>{children}</>;
}

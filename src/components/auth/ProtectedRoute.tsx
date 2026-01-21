'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
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
    const [isVerifying, setIsVerifying] = useState(true);
    const [authVerified, setAuthVerified] = useState(false);

    useEffect(() => {
        async function verifyAuth() {
            try {
                // Attempt to get a valid token (will refresh if needed)
                const token = await getValidToken();

                if (!token) {
                    // Token refresh failed - clear state and redirect to login
                    toast.error('Session Expired', {
                        description: 'Please log in again to continue',
                        duration: 4000,
                    });
                    await logout();
                    router.replace('/login');
                    return;
                }

                // Verify user has allowed role (additional client-side check)
                // Backend will also verify, but this provides early feedback
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
                    router.replace('/login');
                    return;
                }

                // Auth verified
                setAuthVerified(true);
            } catch (error) {
                console.error('Auth verification error:', error);
                // Auth error - clear state and redirect to login
                toast.error('Authentication Error', {
                    description: 'Please log in again',
                    duration: 4000,
                });
                await logout();
                router.replace('/login');
            } finally {
                setIsVerifying(false);
            }
        }

        // Only verify if auth context is ready and user appears authenticated
        if (!authLoading) {
            if (isAuthenticated) {
                verifyAuth();
            } else {
                // Not authenticated - redirect to login
                setIsVerifying(false);
                router.replace('/login');
            }
        }
    }, [authLoading, isAuthenticated, getValidToken, logout, router, user]);

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

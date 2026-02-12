'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { Navigation } from '@/components/layout/Navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@heroui/react';
import { LogOut, User, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

/**
 * Dashboard Layout
 * 
 * SECURITY FEATURES:
 * - ProtectedRoute wrapper ensures authentication
 * - Role-based access control (backend enforced)
 * - Secure logout with token revocation
 * - User information display
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push(ROUTES.AUTH.LOGIN);
        } catch {
            // Logout error handled by AuthContext
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-default-200 bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold">Sales Reports</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            {user && (
                                <div className="flex items-center gap-2 text-sm text-default-600">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        {user.firstName || user.email}
                                    </span>
                                    {user.role && (
                                        <span className="hidden sm:inline text-default-400">
                                            ({user.role})
                                        </span>
                                    )}
                                </div>
                            )}
                            <Link href="/dashboard/settings">
                                <Button
                                    size="sm"
                                    variant="light"
                                    isIconOnly
                                    aria-label="Settings"
                                >
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </Link>
                            <ThemeToggler />
                            <Button
                                size="sm"
                                variant="light"
                                startContent={<LogOut className="h-4 w-4" />}
                                onPress={handleLogout}
                            >
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Navigation */}
                <Navigation />

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}

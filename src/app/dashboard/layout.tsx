'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/lib/auth/AuthContext';

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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // Ensure useAuth is used only inside ProtectedRoute implicitly by being child of it, 
    // but here we are inside the layout component. 
    // Layout wraps page, but ProtectedRoute wraps children? 
    // Better to wrap entire layout content in ProtectedRoute.

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-background">
                <Sidebar
                    isMobileOpen={isMobileOpen}
                    onMobileOpenChange={setIsMobileOpen}
                />

                <div className="flex-1 flex flex-col min-h-screen lg:pl-72 transition-all duration-300">
                    <Header onMobileOpen={() => setIsMobileOpen(true)} />
                    <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

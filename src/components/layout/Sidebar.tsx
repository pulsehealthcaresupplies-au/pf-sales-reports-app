'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Package,
    TrendingUp,
    FileText,
    AlertTriangle,
    X,
    LogOut,
    Settings,
} from 'lucide-react';
import { Button, Avatar } from '@heroui/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/AuthContext';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { PulseLogo } from '@/components/PulseLogo';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, tab: null },
    { name: 'Sales Reports', href: '/dashboard?tab=sales', icon: BarChart3, tab: 'sales' },
    { name: 'Customer Reports', href: '/dashboard?tab=customers', icon: Users, tab: 'customers' },
    { name: 'Product Reports', href: '/dashboard?tab=products', icon: Package, tab: 'products' },
    { name: 'Profit Reports', href: '/dashboard?tab=profit', icon: TrendingUp, tab: 'profit' },
    { name: 'Credit Reports', href: '/dashboard?tab=credit', icon: FileText, tab: 'credit' },
    { name: 'Overdue', href: '/dashboard?tab=overdue', icon: AlertTriangle, tab: 'overdue' },
];

interface SidebarProps {
    isMobileOpen: boolean;
    onMobileOpenChange: (open: boolean) => void;
}

interface SidebarContentProps {
    pathname: string | null;
    currentTab: string | null;
    user: { firstName?: string; lastName?: string; email?: string; role?: string } | null;
    logout: () => void;
    onMobileOpenChange: (open: boolean) => void;
}

function SidebarContent({ pathname, currentTab, user, logout, onMobileOpenChange }: SidebarContentProps) {
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
        <div className="flex flex-col h-full bg-background border-r border-default-200">
            <div className="h-16 flex items-center px-6 border-b border-default-200">
                <div className="flex items-center gap-2">
                    <PulseLogo variant="icon" showName={false} width={32} height={32} className="text-primary" />
                    <span className="font-bold text-lg">Sales Reports</span>
                </div>
                <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => onMobileOpenChange(false)}
                    className="lg:hidden ml-auto"
                    aria-label="Close menu"
                >
                    <X size={20} />
                </Button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    // Check if this nav item is active
                    const isActive = pathname?.startsWith('/dashboard') && (
                        (item.tab === null && currentTab === null) ||
                        (item.tab !== null && currentTab === item.tab)
                    );

                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => onMobileOpenChange(false)}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-default-600 hover:bg-default-100 hover:text-foreground'
                            )}
                        >
                            <Icon size={20} className={cn('transition-transform duration-200', isActive ? 'scale-110' : 'group-hover:scale-105')} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-default-200 space-y-4">
                <div className="px-3 py-3 rounded-xl bg-default-50 border border-default-200 flex items-center gap-3">
                    <Avatar
                        size="sm"
                        src={`https://ui-avatars.com/api/?name=${user?.firstName || 'User'}+${user?.lastName || ''}&background=0ea5e9&color=fff&size=64`}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-default-500 truncate">{user?.email}</p>
                    </div>
                    <Link href="/dashboard/settings" className="p-1 rounded-lg hover:bg-default-200 text-default-500 transition-colors">
                        <Settings size={16} />
                    </Link>
                </div>
                <Button
                    variant="flat"
                    color="danger"
                    onPress={handleLogout}
                    className="w-full"
                    startContent={<LogOut size={18} />}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export function Sidebar({ isMobileOpen, onMobileOpenChange }: SidebarProps) {
    const pathname = usePathname();
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    // Using window.location.search because useSearchParams might be empty during SSR/hydration causing mismatch
    // Better approach: just use useSearchParams and suppress hydration warning if needed, or handle null safely.
    // Actually, for client component, useSearchParams is fine.

    // Re-getting params properly
    // Note: We can't use useSearchParams inside Sidebar directly if we want to be safe? 
    // Actually Sidebar is client component so fine.
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const currentTab = params?.get('tab') || null;

    const { user, logout } = useAuth();
    const isDesktop = useIsDesktop();

    // Mobile drawer portal
    const showMobileDrawer = !isDesktop && isMobileOpen;
    const mobileDrawerPortal =
        typeof document !== 'undefined' &&
        showMobileDrawer &&
        createPortal(
            <>
                <div
                    role="button"
                    tabIndex={0}
                    aria-label="Close menu"
                    className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm z-[9998]"
                    onClick={() => onMobileOpenChange(false)}
                />
                <div
                    className="fixed top-0 left-0 h-full w-72 bg-background shadow-2xl z-[9999] animate-in slide-in-from-left duration-300"
                >
                    <SidebarContent
                        pathname={pathname}
                        currentTab={currentTab}
                        user={user}
                        logout={logout}
                        onMobileOpenChange={onMobileOpenChange}
                    />
                </div>
            </>,
            document.body
        );

    return (
        <>
            {mobileDrawerPortal}
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    'hidden lg:block fixed top-0 left-0 h-screen w-72 bg-background border-r border-default-200 z-40',
                )}
            >
                <SidebarContent pathname={pathname} currentTab={currentTab} user={user} logout={logout} onMobileOpenChange={onMobileOpenChange} />
            </aside>
        </>
    );
}

'use client';

import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
} from '@heroui/react';
import {
    Menu,
    LayoutDashboard,
    FileText,
    Users,
    Package,
    DollarSign,
    CreditCard,
    Clock,
    AlertTriangle,
    ArrowLeft,
    Home,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

type QuickNavItem = { key: string; href: string; label: string; icon: React.ComponentType<{ size?: number | string }> };

const MAIN_NAV: QuickNavItem[] = [
    { key: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'sales', href: '/dashboard?tab=sales', label: 'Sales Report', icon: FileText },
    { key: 'customers', href: '/dashboard?tab=customers', label: 'Customer Report', icon: Users },
    { key: 'products', href: '/dashboard?tab=products', label: 'Product Performance', icon: Package },
    { key: 'profit', href: '/dashboard?tab=profit', label: 'Profit Report', icon: DollarSign },
    { key: 'credit', href: '/dashboard?tab=credit', label: 'Credit Report', icon: CreditCard },
    { key: 'overdue', href: '/dashboard?tab=overdue', label: 'Overdue Customers', icon: Clock },
    { key: 'due-soon', href: '/dashboard?tab=due-soon', label: 'Due Soon Customers', icon: AlertTriangle },
];

const SEGMENT_LABELS: Record<string, string> = {
    dashboard: 'Dashboard',
    sales: 'Sales Report',
    customers: 'Customer Report',
    products: 'Product Performance',
    profit: 'Profit Report',
    credit: 'Credit Report',
    overdue: 'Overdue Customers',
    'due-soon': 'Due Soon Customers',
};

function getDetailContext(pathname: string | null): { backHref: string; backLabel: string } | null {
    if (!pathname || !pathname.startsWith('/dashboard')) return null;
    const segments = pathname.replace(/^\/dashboard\/?/, '').split('/').filter(Boolean);
    if (segments.length < 1) return null;
    const [section] = segments;
    const label = SEGMENT_LABELS[section] ?? section.charAt(0).toUpperCase() + section.slice(1);
    return { backHref: '/dashboard', backLabel: label };
}

export function QuickMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const detail = getDetailContext(pathname);

    const handleNavigate = (key: string) => {
        if (key === 'back' && detail) {
            router.push(detail.backHref, { scroll: false });
            return;
        }
        if (key === 'home') {
            router.push('/dashboard', { scroll: false });
            return;
        }
        if (key === 'dashboard') {
            router.push('/dashboard', { scroll: false });
        } else {
            router.push(`/dashboard?tab=${key}`, { scroll: false });
        }
    };

    return (
        <div
            className="fixed bottom-6 right-6 z-[9999] lg:hidden"
            style={{ 
                position: 'fixed', 
                bottom: '1.5rem', 
                right: '1.5rem', 
                left: 'auto', 
                top: 'auto',
                pointerEvents: 'auto'
            }}
            aria-label="Quick navigation"
        >
            <Dropdown
                placement="top-end"
                classNames={{
                    content: 'dark:bg-white bg-gray-900 dark:text-gray-900 text-white shadow-2xl border-0',
                }}
            >
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        size="lg"
                        className="h-14 w-14 min-w-14 rounded-full shadow-2xl dark:bg-white bg-gray-900 dark:text-gray-900 text-white border-0 hover:scale-105 active:scale-95 transition-transform"
                        aria-label="Quick Menu"
                    >
                        <Menu size={24} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Quick Navigation"
                    variant="flat"
                    onAction={(key) => handleNavigate(key as string)}
                    classNames={{
                        base: 'dark:bg-white bg-gray-900 border-0',
                        list: 'dark:text-gray-900 text-white',
                    }}
                    itemClasses={{
                        base: 'dark:text-gray-900 text-white dark:data-[hover=true]:bg-gray-100 data-[hover=true]:bg-gray-800',
                    }}
                >
                    {detail && (
                        <DropdownSection 
                            title="This page" 
                            aria-label="Context actions" 
                            classNames={{ 
                                heading: 'dark:text-gray-700 text-gray-300 text-xs font-semibold uppercase tracking-wide px-2 py-1',
                                group: 'py-1',
                            }}
                        >
                            <DropdownItem 
                                key="back" 
                                startContent={<ArrowLeft size={18} />}
                                textValue={`Back to ${detail.backLabel}`}
                                className="dark:text-gray-900 text-white"
                            >
                                Back to {detail.backLabel}
                            </DropdownItem>
                            <DropdownItem 
                                key="home" 
                                startContent={<Home size={18} />}
                                textValue="Dashboard (Home)"
                                className="dark:text-gray-900 text-white"
                            >
                                Dashboard (Home)
                            </DropdownItem>
                        </DropdownSection>
                    )}
                    <DropdownSection 
                        title={detail ? 'Jump to' : 'Navigate'} 
                        aria-label="Main navigation" 
                        classNames={{ 
                            heading: 'dark:text-gray-700 text-gray-300 text-xs font-semibold uppercase tracking-wide px-2 py-1',
                            group: 'py-1',
                        }}
                    >
                        {MAIN_NAV.map((item) => {
                            const Icon = item.icon;
                            return (
                                <DropdownItem 
                                    key={item.key} 
                                    startContent={<Icon size={18} />}
                                    textValue={item.label}
                                    className="dark:text-gray-900 text-white"
                                >
                                    {item.label}
                                </DropdownItem>
                            );
                        })}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

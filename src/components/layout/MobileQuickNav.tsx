'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutDashboard, BarChart3, Users, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const QUICK_NAV_ITEMS: { href: string; label: string; tab: string | null; icon: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
  { href: '/dashboard', label: 'Dashboard', tab: null, icon: LayoutDashboard },
  { href: '/dashboard?tab=sales', label: 'Sales', tab: 'sales', icon: BarChart3 },
  { href: '/dashboard?tab=customers', label: 'Customers', tab: 'customers', icon: Users },
  { href: '/dashboard?tab=products', label: 'Products', tab: 'products', icon: Package },
];

/** Horizontal quick nav for mobile: major report sections. */
export function MobileQuickNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('tab') ?? null;

  return (
    <nav
      className="lg:hidden flex items-center gap-1 px-2 py-2 overflow-x-auto border-b border-default-200 bg-background shrink-0 scrollbar-none"
      aria-label="Quick navigation"
    >
      {QUICK_NAV_ITEMS.map((item) => {
        const isActive =
          pathname?.startsWith('/dashboard') &&
          (item.tab === null ? currentTab === null : currentTab === item.tab);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              isActive ? 'bg-primary/10 text-primary' : 'text-default-600 hover:bg-default-100 hover:text-foreground'
            )}
          >
            <Icon size={18} className="shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

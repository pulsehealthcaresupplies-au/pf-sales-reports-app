'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  TrendingUp,
  FileText,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, tab: null },
  { name: 'Sales Reports', href: '/dashboard', icon: BarChart3, tab: null },
  { name: 'Customer Reports', href: '/dashboard?tab=customers', icon: Users, tab: 'customers' },
  { name: 'Product Reports', href: '/dashboard?tab=products', icon: Package, tab: 'products' },
  { name: 'Credit Reports', href: '/dashboard?tab=credit', icon: TrendingUp, tab: 'credit' },
  { name: 'Overdue', href: '/dashboard?tab=overdue', icon: FileText, tab: 'overdue' },
];

export function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  return (
    <nav className="flex space-x-1 border-b border-default-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {navigation.map((item) => {
            // Check if this nav item is active
            const isActive = pathname === '/dashboard' && (
              (item.tab === null && currentTab === null) ||
              (item.tab !== null && currentTab === item.tab)
            );
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                  'border-b-2 border-transparent',
                  isActive
                    ? 'border-primary text-primary'
                    : 'text-default-600 hover:text-default-900 hover:border-default-300'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

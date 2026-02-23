'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { WelcomeGreeting } from '@/components/WelcomeGreeting';
import { useAuth } from '@/lib/auth/AuthContext';

// Next.js requires dynamic() options to be an object literal (see invalid-dynamic-options-type)
const loadingFallback = () => <div className="flex items-center justify-center min-h-[200px] text-default-500">Loading report…</div>;
const DashboardOverviewView = dynamic(() => import('./DashboardOverviewView').then((m) => m.DashboardOverviewView), { ssr: false, loading: loadingFallback });
const SalesReportView = dynamic(() => import('./SalesReportView').then((m) => m.SalesReportView), { ssr: false, loading: loadingFallback });
const CustomerReportView = dynamic(() => import('./CustomerReportView').then((m) => m.CustomerReportView), { ssr: false, loading: loadingFallback });
const ProductPerformanceView = dynamic(() => import('./ProductPerformanceView').then((m) => m.ProductPerformanceView), { ssr: false, loading: loadingFallback });
const ProfitReportView = dynamic(() => import('./ProfitReportView').then((m) => m.ProfitReportView), { ssr: false, loading: loadingFallback });
const CreditReportView = dynamic(() => import('./CreditReportView').then((m) => m.CreditReportView), { ssr: false, loading: loadingFallback });
const OverdueCustomersView = dynamic(() => import('./OverdueCustomersView').then((m) => m.OverdueCustomersView), { ssr: false, loading: loadingFallback });
const DueSoonCustomersView = dynamic(() => import('./DueSoonCustomersView').then((m) => m.DueSoonCustomersView), { ssr: false, loading: loadingFallback });

const tabBreadcrumbs: Record<string, { label: string }[]> = {
  dashboard: [{ label: 'Dashboard Overview' }],
  sales: [{ label: 'Sales Reports' }],
  customers: [{ label: 'Customer Reports' }],
  products: [{ label: 'Product Performance' }],
  profit: [{ label: 'Profit Report' }],
  credit: [{ label: 'Credit Reports' }],
  overdue: [{ label: 'Overdue Customers' }],
  'due-soon': [{ label: 'Due Soon Customers' }],
};

const validTabs = ['dashboard', 'sales', 'customers', 'products', 'profit', 'credit', 'overdue', 'due-soon'];

export function SalesReportsDashboard() {
  const searchParams = useSearchParams();
  const _router = useRouter();
  const { user } = useAuth();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'dashboard';
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState<{ firstName?: string; lastName?: string; fullName?: string; email?: string } | undefined>();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const shouldShow = sessionStorage.getItem('sales_reports_show_welcome_greeting') === 'true';
    if (!shouldShow) return;
    const userStr = sessionStorage.getItem('sales_reports_welcome_greeting_user');
    let userToShow = user
      ? {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName ?? user.lastName) ?? undefined,
        email: user.email,
      }
      : undefined;
    if (userStr) {
      try {
        userToShow = JSON.parse(userStr);
      } catch {
        // keep from context
      }
    }
    sessionStorage.removeItem('sales_reports_show_welcome_greeting');
    sessionStorage.removeItem('sales_reports_welcome_greeting_user');
    queueMicrotask(() => {
      setWelcomeUser(userToShow);
      setShowWelcome(true);
    });
  }, [user]);

  // Sync tab with URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    // Defer setState to avoid synchronous state updates in effects
    queueMicrotask(() => {
      if (tab && validTabs.includes(tab)) {
        setSelectedTab(tab);
      } else if (!tab) {
        setSelectedTab('dashboard');
      }
    });
  }, [searchParams]);



  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl relative min-h-screen">
      {showWelcome && welcomeUser && (
        <div className="mb-4">
          <WelcomeGreeting user={welcomeUser} standalone onDismiss={() => setShowWelcome(false)} autoDismissMs={5000} />
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="mb-4">
        <Breadcrumbs items={tabBreadcrumbs[selectedTab] || [{ label: 'Dashboard' }]} />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {tabBreadcrumbs[selectedTab]?.[0]?.label || 'Sales Reports'}
        </h1>
        <p className="text-default-500 text-sm">
          {selectedTab === 'dashboard' && 'Comprehensive overview of your business performance'}
          {selectedTab === 'sales' && 'Overview of sales performance and metrics'}
          {selectedTab === 'customers' && 'Detailed customer purchase history and analysis'}
          {selectedTab === 'products' && 'Product sales performance and trends'}
          {selectedTab === 'profit' && 'Profitability analysis by product and category'}
          {selectedTab === 'credit' && 'Credit utilization and limits'}
          {selectedTab === 'overdue' && 'Customers with overdue payments'}
          {selectedTab === 'due-soon' && 'Upcoming payment due dates'}
        </p>
      </div>

      <div className="w-full">
        {selectedTab === 'dashboard' && <DashboardOverviewView />}
        {selectedTab === 'sales' && <SalesReportView />}
        {selectedTab === 'customers' && <CustomerReportView />}
        {selectedTab === 'products' && <ProductPerformanceView />}
        {selectedTab === 'profit' && <ProfitReportView />}
        {selectedTab === 'credit' && <CreditReportView />}
        {selectedTab === 'overdue' && <OverdueCustomersView />}
        {selectedTab === 'due-soon' && <DueSoonCustomersView />}
      </div>
    </div>
  );
}

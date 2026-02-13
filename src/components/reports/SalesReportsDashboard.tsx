'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Tabs, Tab } from '@heroui/react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { WelcomeGreeting } from '@/components/WelcomeGreeting';
import { useAuth } from '@/lib/auth/AuthContext';
import { SalesReportView } from './SalesReportView';
import { CustomerReportView } from './CustomerReportView';
import { ProductPerformanceView } from './ProductPerformanceView';
import { ProfitReportView } from './ProfitReportView';
import { CreditReportView } from './CreditReportView';
import { OverdueCustomersView } from './OverdueCustomersView';
import { DueSoonCustomersView } from './DueSoonCustomersView';

const tabBreadcrumbs: Record<string, { label: string }[]> = {
  sales: [{ label: 'Sales Reports' }],
  customers: [{ label: 'Customer Reports' }],
  products: [{ label: 'Product Performance' }],
  credit: [{ label: 'Credit Reports' }],
  overdue: [{ label: 'Overdue Customers' }],
  'due-soon': [{ label: 'Due Soon Customers' }],
};

const validTabs = ['sales', 'customers', 'products', 'credit', 'overdue', 'due-soon'];

export function SalesReportsDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'sales';
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
        setSelectedTab('sales');
      }
    });
  }, [searchParams]);

  const handleTabChange = (key: string | number) => {
    const tabKey = key as string;
    setSelectedTab(tabKey);
    // Update URL without page reload
    const params = new URLSearchParams(searchParams.toString());
    if (tabKey === 'sales') {
      params.delete('tab');
    } else {
      params.set('tab', tabKey);
    }
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
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
        <h1 className="text-3xl font-bold mb-2">Sales Reports Dashboard</h1>
        <p className="text-default-500">Generate and export comprehensive sales reports</p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={handleTabChange}
            variant="underlined"
            classNames={{
              tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
              cursor: 'w-full bg-primary',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-primary',
            }}
          >
            <Tab key="sales" title="Sales Report" />
            <Tab key="customers" title="Customer Report" />
            <Tab key="products" title="Product Performance" />
            <Tab key="profit" title="Profit Report" />
            <Tab key="credit" title="Credit Report" />
            <Tab key="overdue" title="Overdue Customers" />
            <Tab key="due-soon" title="Due Soon Customers" />
          </Tabs>
        </CardHeader>
        <CardBody className="pt-6">
          {selectedTab === 'sales' && <SalesReportView />}
          {selectedTab === 'customers' && <CustomerReportView />}
          {selectedTab === 'products' && <ProductPerformanceView />}
          {selectedTab === 'profit' && <ProfitReportView />}
          {selectedTab === 'credit' && <CreditReportView />}
          {selectedTab === 'overdue' && <OverdueCustomersView />}
          {selectedTab === 'due-soon' && <DueSoonCustomersView />}
        </CardBody>
      </Card>
    </div>
  );
}

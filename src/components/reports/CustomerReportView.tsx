'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader, Button, Pagination } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { FileSpreadsheet, FileText, List as ListIcon, LayoutGrid } from 'lucide-react';
import { format } from 'date-fns';
import { GET_SALES_REPORTS_CUSTOMER_REPORT } from '@/graphql/operations/sales-reports-prefixed';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { toast } from 'sonner';
import { useRequestState } from '@/lib/hooks/useRequestState';
import { RequestStateWrapper } from '@/components/ui/RequestStateWrapper';

function getDefaultStartDate(): string {
  return format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
}
function getDefaultEndDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function CustomerReportView() {
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  const [endDate, setEndDate] = useState(getDefaultEndDate);
  const [customerType, setCustomerType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const queryResult = useQuery<any>(GET_SALES_REPORTS_CUSTOMER_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      customerType: customerType || null,
      page,
      pageSize,
    },
    fetchPolicy: 'network-only',
  });

  // Use request state hook
  const requestState = useRequestState(queryResult);

  const handleExportCSV = () => {
    const customerReport = (requestState.data as any)?.salesReportsCustomerReport;
    if (!customerReport) {
      toast.error('No data to export');
      return;
    }

    const report = customerReport;
    const customers = report.customers || report.topCustomers || []; // Fallback for old cache
    const exportData = {
      title: 'Customer Report',
      headers: ['Customer Name', 'Email', 'Revenue', 'Order Count'],
      rows: customers.map((customer: any) => [
        customer.name,
        customer.email,
        customer.revenue.toFixed(2),
        customer.orderCount,
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    const customerReport = (requestState.data as any)?.salesReportsCustomerReport;
    if (!customerReport) {
      toast.error('No data to export');
      return;
    }

    const report = customerReport;
    const customers = report.customers || report.topCustomers || [];
    const exportData = {
      title: 'Customer Report',
      headers: ['Customer Name', 'Email', 'Revenue', 'Order Count'],
      rows: customers.map((customer: any) => [
        customer.name,
        customer.email,
        customer.revenue.toFixed(2),
        customer.orderCount,
      ]),
    };

    await exportToExcel(exportData);
    toast.success('Excel file exported successfully');
  };

  const report = (requestState.data as any)?.salesReportsCustomerReport;
  const customers = report?.customers || report?.topCustomers || [];
  const metadata = report?.metadata || { totalCount: 0, totalPages: 1 };

  return (
    <RequestStateWrapper
      state={requestState.state}
      loading={requestState.loading}
      error={requestState.error}
      skeleton="report-chart"
      redirectOnAuthError={true}
    >
      {!report ? (
        <div className="text-center py-12">No data available</div>
      ) : (
        <div className="space-y-6">
          {/* Filters */}
          <FilterBar
            initialFilters={{ startDate, endDate, customerType }}
            onFilterChange={(newFilters: any) => {
              if (newFilters.startDate) setStartDate(newFilters.startDate);
              if (newFilters.endDate) setEndDate(newFilters.endDate);
              setCustomerType(newFilters.customerType);
              setPage(1); // Reset to page 1
              // Trigger refetch with new values
              setTimeout(() => {
                queryResult.refetch({
                  startDate: `${newFilters.startDate || startDate}T00:00:00Z`,
                  endDate: `${newFilters.endDate || endDate}T23:59:59Z`,
                  customerType: newFilters.customerType || customerType || null,
                  page: 1,
                  pageSize
                });
              }, 0);
            }}
            showDateRange={true}
            showCustomerType={true}
            customerTypes={[
              { value: 'all', label: 'All Types' },
              { value: 'B2B_CUSTOMER', label: 'B2B' },
              { value: 'B2C_CUSTOMER', label: 'B2C' }
            ]}
          >
            <div className="hidden sm:block">
              {/* Desktop View Toggle */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'bg-transparent text-default-500'}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <ListIcon size={20} />
                </button>
                <div className="w-[1px] h-full bg-divider"></div>
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'bg-transparent text-default-500'}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>
          </FilterBar>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardBody>
                <p className="text-sm text-default-500">Total Customers</p>
                <p className="text-2xl font-bold">{report.summary.totalCustomers}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm text-default-500">New Customers</p>
                <p className="text-2xl font-bold">{report.summary.newCustomers}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm text-default-500">Avg Lifetime Value</p>
                <p className="text-2xl font-bold">${report.summary.averageLifetimeValue.toLocaleString()}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-sm text-default-500">Avg Orders/Customer</p>
                <p className="text-2xl font-bold">{report.summary.averageOrdersPerCustomer.toFixed(1)}</p>
              </CardBody>
            </Card>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-between items-center">
            <p className="text-small text-default-500">
              Showing {customers.length} of {metadata.totalCount} customers
            </p>
            <div className="flex gap-2">
              <Button
                startContent={<FileText size={16} />}
                variant="bordered"
                size="sm"
                onClick={handleExportCSV}
              >
                Export CSV
              </Button>
              <Button
                startContent={<FileSpreadsheet size={16} />}
                variant="bordered"
                size="sm"
                onClick={handleExportExcel}
              >
                Export Excel
              </Button>
            </div>
          </div>

          {/* Customer Content */}
          {customers.length === 0 ? (
            <div className="text-center py-12 text-default-500">No customers found.</div>
          ) : (
            <>
              {/* Mobile/Tablet Grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${viewMode === 'list' ? 'md:hidden' : ''}`}>
                {customers.map((customer: any) => (
                  <Card key={customer.userId} className="w-full">
                    <CardBody>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-medium truncate">{customer.name}</h4>
                          <p className="text-tiny text-default-500 truncate">{customer.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1 mt-4">
                        <div className="flex justify-between text-small">
                          <span className="text-default-500">Revenue</span>
                          <span className="font-medium text-success-600">${customer.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-small">
                          <span className="text-default-500">Orders</span>
                          <span className="font-medium">{customer.orderCount}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Desktop Table */}
              <div className={`hidden md:block ${viewMode === 'grid' ? 'hidden' : ''}`}>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Top Customers</h3>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-default-50 border-b border-divider">
                          <tr>
                            <th className="p-4 text-small font-semibold text-default-500">Name</th>
                            <th className="p-4 text-small font-semibold text-default-500">Email</th>
                            <th className="p-4 text-small font-semibold text-default-500 text-right">Revenue</th>
                            <th className="p-4 text-small font-semibold text-default-500 text-right">Orders</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-divider">
                          {customers.map((customer: any) => (
                            <tr key={customer.userId} className="hover:bg-default-50/50 transition-colors">
                              <td className="p-4 font-medium">{customer.name}</td>
                              <td className="p-4 text-default-500">{customer.email}</td>
                              <td className="p-4 text-right font-medium text-success-600">${customer.revenue.toLocaleString()}</td>
                              <td className="p-4 text-right">{customer.orderCount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </>
          )}

          {/* Pagination */}
          {metadata.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={metadata.totalPages}
                page={page}
                onChange={(newPage) => {
                  setPage(newPage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  queryResult.refetch({
                    startDate: `${startDate}T00:00:00Z`,
                    endDate: `${endDate}T23:59:59Z`,
                    customerType: customerType || null,
                    page: newPage,
                    pageSize
                  });
                }}
                showControls
                color="primary"
              />
            </div>
          )}
        </div>
      )}
    </RequestStateWrapper>
  );
}

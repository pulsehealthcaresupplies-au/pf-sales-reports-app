'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Input } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { GET_CUSTOMER_REPORT } from '@/lib/graphql/operations/queries/sales-reports-queries';
// TODO: After running npm run codegen, replace useQuery with:
// import { useCustomerReportQuery, TopCustomer } from '@/lib/graphql/generated';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { toast } from 'sonner';
import { useRequestState } from '@/lib/hooks/useRequestState';
import { RequestStateWrapper } from '@/components/ui/RequestStateWrapper';

export function CustomerReportView() {
  const [startDate, setStartDate] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [customerType, setCustomerType] = useState<string | undefined>(undefined);

  const queryResult = useQuery<any>(GET_CUSTOMER_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      customerType: customerType || null,
    },
    fetchPolicy: 'network-only',
  });

  // Use request state hook
  const requestState = useRequestState(queryResult);

  const handleExportCSV = () => {
    const customerReport = (requestState.data as any)?.customerReport;
    if (!customerReport) {
      toast.error('No data to export');
      return;
    }

    const report = customerReport;
    const exportData = {
      title: 'Customer Report',
      headers: ['Customer Name', 'Email', 'Revenue', 'Order Count'],
      // TODO: After codegen, replace 'any' with: TopCustomer
      rows: report.topCustomers.map((customer: { name: string; email: string; revenue: number; orderCount: number }) => [
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
    const customerReport = (requestState.data as any)?.customerReport;
    if (!customerReport) {
      toast.error('No data to export');
      return;
    }

    const report = customerReport;
    const exportData = {
      title: 'Customer Report',
      headers: ['Customer Name', 'Email', 'Revenue', 'Order Count'],
      // TODO: After codegen, replace 'any' with: TopCustomer
      rows: report.topCustomers.map((customer: { name: string; email: string; revenue: number; orderCount: number }) => [
        customer.name,
        customer.email,
        customer.revenue.toFixed(2),
        customer.orderCount,
      ]),
    };

    await exportToExcel(exportData);
    toast.success('Excel file exported successfully');
  };

  const report = (requestState.data as any)?.customerReport;

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
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Filters</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Select
              label="Customer Type"
              selectedKeys={customerType ? [customerType] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setCustomerType(selected === 'all' ? undefined : selected);
              }}
            >
              <SelectItem key="all">All</SelectItem>
              <SelectItem key="B2B_CUSTOMER">B2B</SelectItem>
              <SelectItem key="B2C_CUSTOMER">B2C</SelectItem>
            </Select>
            <div className="flex items-end gap-2">
              <Button color="primary" onClick={() => requestState.refetch()}>
                Generate Report
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

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
      <div className="flex gap-2">
        <Button
          startContent={<FileText size={16} />}
          variant="bordered"
          onClick={handleExportCSV}
        >
          Export CSV
        </Button>
        <Button
          startContent={<FileSpreadsheet size={16} />}
          variant="bordered"
          onClick={handleExportExcel}
        >
          Export Excel
        </Button>
      </div>

      {/* Top Customers Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Customers</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-right p-2">Orders</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: After codegen, replace 'any' with: TopCustomer */}
                {report.topCustomers.map((customer: { userId: string; name: string; email: string; revenue: number; orderCount: number }) => (
                  <tr key={customer.userId} className="border-b">
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{customer.email}</td>
                    <td className="text-right p-2">${customer.revenue.toLocaleString()}</td>
                    <td className="text-right p-2">{customer.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
        </div>
      )}
    </RequestStateWrapper>
  );
}

'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { GET_SALES_REPORTS_CREDIT_REPORT } from '@/graphql/operations/sales-reports-prefixed';
// TODO: After running npm run codegen, replace useQuery with:
// import { useCreditReportQuery, OverdueCustomer, DueSoonCustomer } from '@/lib/graphql/generated';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { toast } from 'sonner';

export function CreditReportView() {
  const [creditType, setCreditType] = useState<string | undefined>(undefined);
  const [includeOverdue, setIncludeOverdue] = useState(true);
  const [includeDueSoon, setIncludeDueSoon] = useState(true);

  // Define provisional types until codegen is run
  interface CreditReportData {
    salesReportsCreditReport: {
      summary: any;
      overdueCustomers: any[];
      dueSoonCustomers: any[];
    };
  }

  const { data, loading, error, refetch } = useQuery<CreditReportData>(GET_SALES_REPORTS_CREDIT_REPORT, {
    variables: {
      creditType: creditType || null,
      includeOverdue,
      includeDueSoon,
    },
    fetchPolicy: 'network-only',
  });

  const handleExportCSV = () => {
    if (!data?.salesReportsCreditReport) {
      toast.error('No data to export');
      return;
    }

    const report = data.salesReportsCreditReport;
    const allCustomers = [
      // TODO: After codegen, replace 'any' with: OverdueCustomer | DueSoonCustomer
      ...report.overdueCustomers.map((c: any) => ({ ...c, type: 'Overdue' })),
      ...report.dueSoonCustomers.map((c: any) => ({ ...c, type: 'Due Soon' })),
    ];

    const exportData = {
      title: 'Credit Report',
      headers: ['Type', 'Customer Name', 'Email', 'Credit Balance', 'Days Overdue/Due'],
      // TODO: After codegen, replace 'any' with proper union type
      rows: allCustomers.map((customer: { type: string; userName: string; userEmail: string; creditBalance: number; daysOverdue?: number; daysUntilDue?: number }) => [
        customer.type,
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysOverdue || customer.daysUntilDue || 'N/A',
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    if (!data?.salesReportsCreditReport) {
      toast.error('No data to export');
      return;
    }

    const report = data.salesReportsCreditReport;
    const allCustomers = [
      // TODO: After codegen, replace 'any' with: OverdueCustomer | DueSoonCustomer
      ...report.overdueCustomers.map((c: any) => ({ ...c, type: 'Overdue' })),
      ...report.dueSoonCustomers.map((c: any) => ({ ...c, type: 'Due Soon' })),
    ];

    const exportData = {
      title: 'Credit Report',
      headers: ['Type', 'Customer Name', 'Email', 'Credit Balance', 'Days Overdue/Due'],
      // TODO: After codegen, replace 'any' with proper union type
      rows: allCustomers.map((customer: { type: string; userName: string; userEmail: string; creditBalance: number; daysOverdue?: number; daysUntilDue?: number }) => [
        customer.type,
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysOverdue || customer.daysUntilDue || 'N/A',
      ]),
    };

    await exportToExcel(exportData);
    toast.success('Excel file exported successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-danger">Error loading report: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const report = data?.salesReportsCreditReport;
  if (!report) {
    return <div className="text-center py-12">No data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {/* Filters */}
      <FilterBar
        initialFilters={{ creditType, includeOverdue, includeDueSoon }}
        onFilterChange={(newFilters: any) => {
          setCreditType(newFilters.creditType);
          if (newFilters.includeOverdue !== undefined) setIncludeOverdue(newFilters.includeOverdue);
          if (newFilters.includeDueSoon !== undefined) setIncludeDueSoon(newFilters.includeDueSoon);

          setTimeout(() => {
            refetch({
              creditType: newFilters.creditType || creditType || null,
              includeOverdue: newFilters.includeOverdue !== undefined ? newFilters.includeOverdue : includeOverdue,
              includeDueSoon: newFilters.includeDueSoon !== undefined ? newFilters.includeDueSoon : includeDueSoon
            });
          }, 0);
        }}
        showDateRange={false}
        showCreditType={true}
        showOverdue={true}
        showDueSoon={true}
        creditTypes={[
          { value: 'all', label: 'All Types' },
          { value: 'B2B_CUSTOMER', label: 'B2B Customer' },
          { value: 'DOCTOR', label: 'Doctor' },
          { value: 'SUPPLIER', label: 'Supplier' }
        ]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Accounts</p>
            <p className="text-2xl font-bold">{report.summary.totalAccounts}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Credit Limit</p>
            <p className="text-2xl font-bold">${report.summary.totalCreditLimit.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Balance</p>
            <p className="text-2xl font-bold">${report.summary.totalCreditBalance.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Utilization Rate</p>
            <p className="text-2xl font-bold">{report.summary.utilizationRate.toFixed(1)}%</p>
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

      {/* Overdue Customers */}
      {report.overdueCustomers.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Overdue Customers</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-right p-2">Balance</th>
                    <th className="text-right p-2">Days Overdue</th>
                  </tr>
                </thead>
                <tbody>
                  {/* TODO: After codegen, replace 'any' with: OverdueCustomer */}
                  {report.overdueCustomers.map((customer: { accountId: string; userName: string; userEmail: string; creditBalance: number; daysOverdue: number }) => (
                    <tr key={customer.accountId} className="border-b">
                      <td className="p-2">{customer.userName}</td>
                      <td className="p-2">{customer.userEmail}</td>
                      <td className="text-right p-2">${customer.creditBalance.toLocaleString()}</td>
                      <td className="text-right p-2 text-danger">{customer.daysOverdue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Due Soon Customers */}
      {report.dueSoonCustomers.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Due Soon Customers</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-right p-2">Balance</th>
                    <th className="text-right p-2">Days Until Due</th>
                  </tr>
                </thead>
                <tbody>
                  {/* TODO: After codegen, replace 'any' with: DueSoonCustomer */}
                  {report.dueSoonCustomers.map((customer: { accountId: string; userName: string; userEmail: string; creditBalance: number; daysUntilDue: number }) => (
                    <tr key={customer.accountId} className="border-b">
                      <td className="p-2">{customer.userName}</td>
                      <td className="p-2">{customer.userEmail}</td>
                      <td className="text-right p-2">${customer.creditBalance.toLocaleString()}</td>
                      <td className="text-right p-2 text-warning">{customer.daysUntilDue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

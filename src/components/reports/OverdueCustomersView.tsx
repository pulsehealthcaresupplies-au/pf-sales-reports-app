'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Input } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { GET_SALES_REPORTS_OVERDUE_CUSTOMERS } from '@/graphql/operations/sales-reports-prefixed';
// TODO: After running npm run codegen, replace useQuery with:
// import { useOverdueCustomersQuery, OverdueCustomer } from '@/lib/graphql/generated';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { TablePaginationFooter } from '@/components/ui/TablePaginationFooter';
import { toast } from 'sonner';

export function OverdueCustomersView() {
  const [daysOverdue, setDaysOverdue] = useState(0);
  const [creditType, setCreditType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, loading, error, refetch } = useQuery<any>(GET_SALES_REPORTS_OVERDUE_CUSTOMERS, {
    variables: {
      daysOverdue,
      creditType: creditType || null,
      page,
      pageSize,
    },
    fetchPolicy: 'network-only',
  });

  const handleExportCSV = () => {
    if (!data?.salesReportsOverdueCustomers?.customers?.length) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Overdue Customers',
      headers: ['Customer Name', 'Email', 'Credit Balance', 'Days Overdue'],
      // TODO: After codegen, replace 'any' with: OverdueCustomer
      rows: data.overdueCustomers.customers.map((customer: { userName: string; userEmail: string; creditBalance: number; daysOverdue: number }) => [
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysOverdue,
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    if (!data?.salesReportsOverdueCustomers?.customers?.length) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Overdue Customers',
      headers: ['Customer Name', 'Email', 'Credit Balance', 'Days Overdue'],
      // TODO: After codegen, replace 'any' with: OverdueCustomer
      rows: data.overdueCustomers.customers.map((customer: { userName: string; userEmail: string; creditBalance: number; daysOverdue: number }) => [
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysOverdue,
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

  const customers = data?.salesReportsOverdueCustomers;
  if (!customers || customers.customers.length === 0) {
    return <div className="text-center py-12">No overdue customers found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      {/* Filters */}
      <FilterBar
        initialFilters={{ creditType }}
        onFilterChange={(newFilters: any) => {
          setCreditType(newFilters.creditType);
          setTimeout(() => {
            refetch({
              daysOverdue, // This creates a slight sync issue if daysOverdue changed without Apply? 
              // But FilterBar "Apply" triggers this. So if daysOverdue changed via input underneath, state `daysOverdue` is updated.
              // So using `daysOverdue` from closure is correct.
              creditType: newFilters.creditType || creditType || null,
              page: 1, // Reset page on filter change
              pageSize
            });
          }, 0);
        }}
        showDateRange={false}
        showCreditType={true}
        creditTypes={[
          { value: 'all', label: 'All Types' },
          { value: 'B2B_CUSTOMER', label: 'B2B Customer' },
          { value: 'DOCTOR', label: 'Doctor' },
          { value: 'SUPPLIER', label: 'Supplier' }
        ]}
      >
        <Input
          type="number"
          label="Min Days Overdue"
          placeholder="0"
          value={daysOverdue.toString()}
          onChange={(e) => setDaysOverdue(parseInt(e.target.value) || 0)}
          className="max-w-[150px]"
        />
      </FilterBar>

      {/* Summary */}
      <Card>
        <CardBody>
          <p className="text-lg">
            Total Overdue Customers: <span className="font-bold">{customers.totalCount}</span>
          </p>
        </CardBody>
      </Card>

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

      {/* Customers Table */}
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
                  <th className="text-right p-2">Credit Balance</th>
                  <th className="text-right p-2">Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: After codegen, replace 'any' with: OverdueCustomer */}
                {customers.customers.map((customer: { accountId: string; userName: string; userEmail: string; creditBalance: number; daysOverdue: number }) => (
                  <tr key={customer.accountId} className="border-b">
                    <td className="p-2">{customer.userName}</td>
                    <td className="p-2">{customer.userEmail}</td>
                    <td className="text-right p-2">${customer.creditBalance.toLocaleString()}</td>
                    <td className="text-right p-2 text-danger font-semibold">{customer.daysOverdue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePaginationFooter
            currentPage={page}
            totalCount={customers.totalCount}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
            pageSizeOptions={[10, 20, 50, 100]}
            itemLabel="customers"
            alwaysShow
          />
        </CardBody>
      </Card>
    </div>
  );
}

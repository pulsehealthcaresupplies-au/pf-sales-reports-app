'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Input } from '@heroui/react';
import { Select, SelectItem } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { GET_SALES_REPORTS_DUE_SOON_CUSTOMERS } from '@/graphql/operations/sales-reports-prefixed';
// TODO: After running npm run codegen, replace useQuery with:
// import { useDueSoonCustomersQuery, DueSoonCustomer } from '@/lib/graphql/generated';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { TablePaginationFooter } from '@/components/ui/TablePaginationFooter';
import { toast } from 'sonner';

export function DueSoonCustomersView() {
  const [days, setDays] = useState(7);
  const [creditType, setCreditType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, loading, error, refetch } = useQuery<any>(GET_SALES_REPORTS_DUE_SOON_CUSTOMERS, {
    variables: {
      days,
      creditType: creditType || null,
      page,
      pageSize,
    },
    fetchPolicy: 'network-only',
  });

  const handleExportCSV = () => {
    if (!data?.salesReportsDueSoonCustomers?.customers?.length) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Due Soon Customers',
      headers: ['Customer Name', 'Email', 'Credit Balance', 'Days Until Due'],
      // TODO: After codegen, replace 'any' with: DueSoonCustomer
      rows: data.dueSoonCustomers.customers.map((customer: { userName: string; userEmail: string; creditBalance: number; daysUntilDue: number }) => [
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysUntilDue,
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    if (!data?.salesReportsDueSoonCustomers?.customers?.length) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Due Soon Customers',
      headers: ['Customer Name', 'Email', 'Credit Balance', 'Days Until Due'],
      // TODO: After codegen, replace 'any' with: DueSoonCustomer
      rows: data.dueSoonCustomers.customers.map((customer: { userName: string; userEmail: string; creditBalance: number; daysUntilDue: number }) => [
        customer.userName,
        customer.userEmail,
        customer.creditBalance.toFixed(2),
        customer.daysUntilDue,
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

  const customers = data?.salesReportsDueSoonCustomers;
  if (!customers || customers.customers.length === 0) {
    return <div className="text-center py-12">No customers due soon</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Filters</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              label="Days Ahead"
              value={days.toString()}
              onChange={(e) => setDays(parseInt(e.target.value) || 7)}
            />
            <Select
              label="Credit Type"
              selectedKeys={creditType ? [creditType] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setCreditType(selected === 'all' ? undefined : selected);
              }}
            >
              <SelectItem key="all">All</SelectItem>
              <SelectItem key="B2B_CUSTOMER">B2B Customer</SelectItem>
              <SelectItem key="DOCTOR">Doctor</SelectItem>
              <SelectItem key="SUPPLIER">Supplier</SelectItem>
            </Select>
            <div className="flex items-end gap-2">
              <Button color="primary" onClick={() => refetch()}>
                Refresh
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Summary */}
      <Card>
        <CardBody>
          <p className="text-lg">
            Customers Due Within {days} Days: <span className="font-bold">{customers.totalCount}</span>
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
          <h3 className="text-lg font-semibold">Due Soon Customers</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Customer</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-right p-2">Credit Balance</th>
                  <th className="text-right p-2">Days Until Due</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: After codegen, replace 'any' with: DueSoonCustomer */}
                {customers.customers.map((customer: { accountId: string; userName: string; userEmail: string; creditBalance: number; daysUntilDue: number }) => (
                  <tr key={customer.accountId} className="border-b">
                    <td className="p-2">{customer.userName}</td>
                    <td className="p-2">{customer.userEmail}</td>
                    <td className="text-right p-2">${customer.creditBalance.toLocaleString()}</td>
                    <td className="text-right p-2 text-warning font-semibold">{customer.daysUntilDue}</td>
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

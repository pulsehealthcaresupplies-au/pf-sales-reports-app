'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_SALES_REPORTS_SALES_REPORT } from '@/graphql/operations/sales-reports-prefixed';
import { Card, CardBody, CardHeader, Button, Input, Select, SelectItem, Spinner } from '@heroui/react';
import { Download, FileText, FileSpreadsheet, Filter, RefreshCw, Smartphone, Tablet, Monitor } from 'lucide-react';
import * as Types from '@/lib/graphql/generated/types';
import { format } from 'date-fns';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useRequestState } from '@/lib/hooks/useRequestState';
import { RequestStateWrapper } from '@/components/ui/RequestStateWrapper';

interface SalesReportViewProps {
  initialData?: any; // Replace with proper type if available from page
}

export function SalesReportView({ initialData }: SalesReportViewProps) {
  const [startDate, setStartDate] = useState(format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [groupBy, setGroupBy] = useState('day');
  const [warehouseId, setWarehouseId] = useState<string | undefined>(undefined);

  const { data, loading, error, refetch } = useQuery(GET_SALES_REPORTS_SALES_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      groupBy,
      warehouseId: warehouseId || null,
    },
    fetchPolicy: 'network-only',
  });

  // Use request state hook
  const requestState = useRequestState<any>({ data, loading, error, refetch });

  const handleExportCSV = () => {
    const report = requestState.data?.salesReportsSalesReport;
    if (!report) {
      toast.error('No data to export');
      return;
    }
    const exportData = {
      title: 'Sales Report',
      headers: ['Period', 'Revenue', 'Order Count'],
      rows: (report.revenueByPeriod || [])
        .filter((item: Types.PeriodRevenue | null | undefined): item is Types.PeriodRevenue => !!item)
        .map((item: Types.PeriodRevenue) => [
          item.period,
          (item.revenue || 0).toFixed(2),
          item.orderCount,
        ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    const report = requestState.data?.salesReportsSalesReport;
    if (!report) {
      toast.error('No data to export');
      return;
    }
    const exportData = {
      title: 'Sales Report',
      headers: ['Period', 'Revenue', 'Order Count'],
      rows: (report.revenueByPeriod || [])
        .filter((item: Types.PeriodRevenue | null | undefined): item is Types.PeriodRevenue => !!item)
        .map((item: Types.PeriodRevenue) => [
          item.period,
          (item.revenue || 0).toFixed(2),
          item.orderCount,
        ]),
    };

    await exportToExcel(exportData);
    toast.success('Excel file exported successfully');
  };

  const report = requestState.data?.salesReportsSalesReport;

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
      {/* Filters — warehouse-based report; default All Warehouses for access to all */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Filters</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              label="Warehouse"
              placeholder="All Warehouses"
              selectedKeys={warehouseId ? [warehouseId] : ['all']}
              onSelectionChange={(keys) => {
                const k = Array.from(keys)[0] as string;
                setWarehouseId(k && k !== 'all' ? k : undefined);
              }}
              description="All warehouses by default"
            >
              <SelectItem key="all" textValue="All Warehouses">
                All Warehouses
              </SelectItem>
              {(report?.revenueByWarehouse || []).map((w: { warehouseId: string; warehouseName: string }) => (
                <SelectItem key={w.warehouseId} textValue={w.warehouseName}>
                  {w.warehouseName}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Group By"
              selectedKeys={[groupBy]}
              onSelectionChange={(keys) => setGroupBy(Array.from(keys)[0] as string)}
            >
              <SelectItem key="day">Day</SelectItem>
              <SelectItem key="week">Week</SelectItem>
              <SelectItem key="month">Month</SelectItem>
            </Select>
            <div className="flex items-end gap-2">
              <Button color="primary" onPress={() => requestState.refetch?.()}>
                Generate Report
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Revenue</p>
            <p className="text-2xl font-bold">${report.summary?.totalRevenue?.toLocaleString() ?? '0'}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Total Orders</p>
            <p className="text-2xl font-bold">{report.summary?.totalOrders ?? 0}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-default-500">Average Order Value</p>
            <p className="text-2xl font-bold">${report.summary?.averageOrderValue?.toLocaleString() ?? '0'}</p>
          </CardBody>
        </Card>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2">
        <Button
          startContent={<FileText size={16} />}
          variant="bordered"
          onPress={handleExportCSV}
        >
          Export CSV
        </Button>
        <Button
          startContent={<FileSpreadsheet size={16} />}
          variant="bordered"
          onPress={handleExportExcel}
        >
          Export Excel
        </Button>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Revenue by Period</h3>
        </CardHeader>
        <CardBody>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.revenueByPeriod || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Products</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-right p-2">Quantity Sold</th>
                  <th className="text-right p-2">Orders</th>
                </tr>
              </thead>
              <tbody>
                {(report.topProducts || [])
                  .filter((product: Types.ProductSales | null | undefined): product is Types.ProductSales => !!product)
                  .map((product: Types.ProductSales) => (
                    <tr key={product.productId} className="border-b">
                      <td className="p-2">{product.productName}</td>
                      <td className="text-right p-2">${product.revenue.toFixed(2)}</td>
                      <td className="text-right p-2">{product.quantitySold}</td>
                      <td className="text-right p-2">{product.orderCount}</td>
                    </tr>
                  ))}
                {(!report.topProducts || report.topProducts.length === 0) && (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-default-500">
                      No products found
                    </td>
                  </tr>
                )}
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

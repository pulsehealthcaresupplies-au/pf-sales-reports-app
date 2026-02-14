'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_SALES_REPORTS_SALES_REPORT } from '@/graphql/operations/sales-reports-prefixed';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { FileText, FileSpreadsheet } from 'lucide-react';
import * as Types from '@/lib/graphql/generated/types';
import { format } from 'date-fns';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { useRequestState } from '@/lib/hooks/useRequestState';
import { RequestStateWrapper } from '@/components/ui/RequestStateWrapper';

interface SalesReportViewProps {
  initialData?: unknown;
}

export function SalesReportView(props: SalesReportViewProps) {
  void props.initialData; // reserved for future SSR/preload
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
  const requestState = useRequestState<{ salesReportsSalesReport?: Types.SalesReport }>({ data, loading, error, refetch });

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
          {/* Filters */}
          <FilterBar
            initialFilters={{ startDate, endDate, groupBy, warehouseId }}
            onFilterChange={(newFilters: any) => {
              if (newFilters.startDate) setStartDate(newFilters.startDate);
              if (newFilters.endDate) setEndDate(newFilters.endDate);
              if (newFilters.groupBy) setGroupBy(newFilters.groupBy);
              // Handle warehouseId separately if needed, or unify state
              setWarehouseId(newFilters.warehouseId);
              // Trigger refetch with new values
              setTimeout(() => {
                refetch({
                  startDate: `${newFilters.startDate || startDate}T00:00:00Z`,
                  endDate: `${newFilters.endDate || endDate}T23:59:59Z`,
                  groupBy: newFilters.groupBy || groupBy,
                  warehouseId: newFilters.warehouseId || warehouseId || null
                });
              }, 0);
            }}
            showDateRange={true}
            showGroupBy={true}
            showWarehouse={true}
            // Mock warehouses for now, ideally fetch from API
            warehouses={[
              { value: 'all', label: 'All Warehouses' },
              ...(report?.revenueByWarehouse || []).map((w: any) => ({ value: w.warehouseId, label: w.warehouseName }))
            ]}
            loading={loading}
            groupOptions={[
              { value: 'day', label: 'Daily' },
              { value: 'week', label: 'Weekly' },
              { value: 'month', label: 'Monthly' }
            ]}
          />

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
              <div className="h-[300px] w-full min-w-0">
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
              {/* Mobile List View */}
              <div className="md:hidden space-y-4">
                {(report.topProducts || [])
                  .filter((product: Types.ProductSales | null | undefined): product is Types.ProductSales => !!product)
                  .map((product: Types.ProductSales) => (
                    <div key={product.productId} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-small">{product.productName}</h4>
                      </div>
                      <div className="flex justify-between text-tiny">
                        <span className="text-default-500">Revenue</span>
                        <span className="font-medium">${product.revenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-tiny">
                        <span className="text-default-500">Qty Sold</span>
                        <span className="font-medium">{product.quantitySold}</span>
                      </div>
                      <div className="flex justify-between text-tiny">
                        <span className="text-default-500">Orders</span>
                        <span className="font-medium">{product.orderCount}</span>
                      </div>
                    </div>
                  ))}
                {(!report.topProducts || report.topProducts.length === 0) && (
                  <div className="text-center p-4 text-default-500">No products found</div>
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
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

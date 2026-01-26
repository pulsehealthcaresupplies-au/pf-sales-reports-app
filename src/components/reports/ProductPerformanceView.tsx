'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Input } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { FileSpreadsheet, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { GET_SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT } from '@/graphql/operations/sales-reports-prefixed';
// TODO: After running npm run codegen, replace useQuery with:
// import { useProductPerformanceReportQuery, ProductPerformance } from '@/lib/graphql/generated';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { toast } from 'sonner';

export function ProductPerformanceView() {
  const [startDate, setStartDate] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [limit, setLimit] = useState(20);

  const { data, loading, error, refetch } = useQuery<any>(GET_SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      limit,
    },
    fetchPolicy: 'network-only',
  });

  const handleExportCSV = () => {
    if (!data?.salesReportsProductPerformanceReport) {
      toast.error('No data to export');
      return;
    }

    const report = data.salesReportsProductPerformanceReport;
    const exportData = {
      title: 'Product Performance Report',
      headers: ['Product Name', 'SKU', 'Category', 'Revenue', 'Quantity Sold', 'Orders', 'Avg Price'],
      // TODO: After codegen, replace 'any' with: ProductPerformance
      rows: report.products.map((product: { productName: string; sku: string; categoryName: string | null; revenue: number; quantitySold: number; orderCount: number; averagePrice: number }) => [
        product.productName,
        product.sku,
        product.categoryName || 'N/A',
        product.revenue.toFixed(2),
        product.quantitySold,
        product.orderCount,
        product.averagePrice.toFixed(2),
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    if (!data?.salesReportsProductPerformanceReport) {
      toast.error('No data to export');
      return;
    }

    const report = data.salesReportsProductPerformanceReport;
    const exportData = {
      title: 'Product Performance Report',
      headers: ['Product Name', 'SKU', 'Category', 'Revenue', 'Quantity Sold', 'Orders', 'Avg Price'],
      // TODO: After codegen, replace 'any' with: ProductPerformance
      rows: report.products.map((product: { productName: string; sku: string; categoryName: string | null; revenue: number; quantitySold: number; orderCount: number; averagePrice: number }) => [
        product.productName,
        product.sku,
        product.categoryName || 'N/A',
        product.revenue.toFixed(2),
        product.quantitySold,
        product.orderCount,
        product.averagePrice.toFixed(2),
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

  const report = data?.productPerformanceReport;
  if (!report) {
    return <div className="text-center py-12">No data available</div>;
  }

  return (
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
            <Input
              type="number"
              label="Limit"
              value={limit.toString()}
              onChange={(e) => setLimit(parseInt(e.target.value) || 20)}
            />
            <div className="flex items-end gap-2">
              <Button color="primary" onClick={() => refetch()}>
                Generate Report
              </Button>
            </div>
          </div>
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

      {/* Products Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Product Performance</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">SKU</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Revenue</th>
                  <th className="text-right p-2">Quantity</th>
                  <th className="text-right p-2">Orders</th>
                  <th className="text-right p-2">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: After codegen, replace 'any' with: ProductPerformance */}
                {report.products.map((product: { productId: string; productName: string; sku: string; categoryName: string | null; revenue: number; quantitySold: number; orderCount: number; averagePrice: number }) => (
                  <tr key={product.productId} className="border-b">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">{product.sku}</td>
                    <td className="p-2">{product.categoryName || 'N/A'}</td>
                    <td className="text-right p-2">${product.revenue.toLocaleString()}</td>
                    <td className="text-right p-2">{product.quantitySold}</td>
                    <td className="text-right p-2">{product.orderCount}</td>
                    <td className="text-right p-2">${product.averagePrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

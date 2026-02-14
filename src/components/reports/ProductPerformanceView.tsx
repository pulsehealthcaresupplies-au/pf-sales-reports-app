'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader, Pagination, Button, Input, Spinner, Select, SelectItem, Tab, Tabs } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { FileSpreadsheet, FileText, LayoutGrid, List as ListIcon } from 'lucide-react';
import { format } from 'date-fns';
import { GET_SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT } from '@/graphql/operations/sales-reports-prefixed';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { toast } from 'sonner';

function getDefaultStartDate(): string {
  return format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
}
function getDefaultEndDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function ProductPerformanceView() {
  const [startDate, setStartDate] = useState(getDefaultStartDate);
  const [endDate, setEndDate] = useState(getDefaultEndDate);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { data, loading, error, refetch } = useQuery<any>(GET_SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      page,
      pageSize,
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
      rows: report.products.map((product: any) => [
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
      rows: report.products.map((product: any) => [
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
        <Button onPress={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const report = data?.salesReportsProductPerformanceReport;
  const products = report?.products || [];
  const metadata = report?.metadata || { totalCount: 0, totalPages: 1 };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <FilterBar
        initialFilters={{ startDate, endDate }}
        onFilterChange={(newFilters: any) => {
          if (newFilters.startDate) setStartDate(newFilters.startDate);
          if (newFilters.endDate) setEndDate(newFilters.endDate);
          setPage(1); // Reset to page 1 on filter change
          setTimeout(() => {
            refetch({
              startDate: `${newFilters.startDate || startDate}T00:00:00Z`,
              endDate: `${newFilters.endDate || endDate}T23:59:59Z`,
              page: 1,
              pageSize
            });
          }, 0);
        }}
        showDateRange={true}
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

      {/* Action Bar (Export) */}
      <div className="flex justify-between items-center">
        <p className="text-small text-default-500">
          Showing {products.length} of {metadata.totalCount} products
        </p>
        <div className="flex gap-2">
          <Button
            startContent={<FileText size={16} />}
            variant="bordered"
            size="sm"
            onPress={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            startContent={<FileSpreadsheet size={16} />}
            variant="bordered"
            size="sm"
            onPress={handleExportExcel}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {!products.length ? (
        <div className="text-center py-12 text-default-500">No products found for this period.</div>
      ) : (
        <>
          {/* Mobile/Tablet Grid (Always visible on small screens, or if viewMode is grid) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${viewMode === 'list' ? 'md:hidden' : ''}`}>
            {products.map((product: any) => (
              <Card key={product.productId} className="w-full">
                <CardBody>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-medium truncate" title={product.productName}>
                        {product.productName}
                      </h4>
                      <p className="text-tiny text-default-500">{product.sku}</p>
                    </div>
                    <span className="text-tiny px-2 py-1 bg-default-100 rounded-full">{product.categoryName || 'N/A'}</span>
                  </div>
                  <div className="space-y-1 mt-4">
                    <div className="flex justify-between text-small">
                      <span className="text-default-500">Revenue</span>
                      <span className="font-medium">${product.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-small">
                      <span className="text-default-500">Sold</span>
                      <span className="font-medium">{product.quantitySold}</span>
                    </div>
                    <div className="flex justify-between text-small">
                      <span className="text-default-500">Orders</span>
                      <span className="font-medium">{product.orderCount}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Desktop Table (Visible on md+ if viewMode is list) */}
          <div className={`hidden md:block ${viewMode === 'grid' ? 'hidden' : ''}`}>
            <Card>
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-default-50 border-b border-divider">
                      <tr>
                        <th className="p-4 text-small font-semibold text-default-500">Product</th>
                        <th className="p-4 text-small font-semibold text-default-500">SKU</th>
                        <th className="p-4 text-small font-semibold text-default-500">Category</th>
                        <th className="p-4 text-small font-semibold text-default-500 text-right">Revenue</th>
                        <th className="p-4 text-small font-semibold text-default-500 text-right">Quantity</th>
                        <th className="p-4 text-small font-semibold text-default-500 text-right">Orders</th>
                        <th className="p-4 text-small font-semibold text-default-500 text-right">Avg Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-divider">
                      {products.map((product: any) => (
                        <tr key={product.productId} className="hover:bg-default-50/50 transition-colors">
                          <td className="p-4 font-medium">{product.productName}</td>
                          <td className="p-4 text-default-500">{product.sku}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-default-100 rounded-full text-tiny">
                              {product.categoryName || 'N/A'}
                            </span>
                          </td>
                          <td className="p-4 text-right font-medium text-success-600">${product.revenue.toLocaleString()}</td>
                          <td className="p-4 text-right">{product.quantitySold}</td>
                          <td className="p-4 text-right">{product.orderCount}</td>
                          <td className="p-4 text-right">${product.averagePrice.toLocaleString()}</td>
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

      {/* Pagination Controls */}
      {metadata.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            total={metadata.totalPages}
            page={page}
            onChange={(newPage) => {
              setPage(newPage);
              // Scroll to top of list/grid
              window.scrollTo({ top: 0, behavior: 'smooth' });
              refetch({
                startDate: `${startDate}T00:00:00Z`,
                endDate: `${endDate}T23:59:59Z`,
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
  );
}

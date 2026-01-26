'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_SALES_REPORTS_PROFIT_REPORT } from '@/graphql/operations/sales-reports-prefixed';
import { Card, CardBody, CardHeader, Button, Input, Select, SelectItem } from '@heroui/react';
import { Download, FileSpreadsheet, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { format } from 'date-fns';
import { exportToCSV, exportToExcel } from '@/lib/utils/export';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function ProfitReportView() {
  const [startDate, setStartDate] = useState(format(new Date(new Date().setDate(new Date().getDate() - 30)), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [groupBy, setGroupBy] = useState('day');

  const { data, loading, error, refetch } = useQuery(GET_PROFIT_REPORT, {
    variables: {
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T23:59:59Z`,
      groupBy,
    },
    fetchPolicy: 'network-only',
  });

  const report = data?.salesReportsProfitReport;

  const handleExportCSV = () => {
    if (!report) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Profit Report',
      headers: ['Date', 'Revenue', 'Cost', 'Profit', 'Margin %'],
      rows: (report.history || []).map((item: any) => [
        item.date,
        (item.revenue || 0).toFixed(2),
        (item.cost || 0).toFixed(2),
        (item.profit || 0).toFixed(2),
        ((item.margin || 0) * 100).toFixed(2) + '%',
      ]),
    };

    exportToCSV(exportData);
    toast.success('CSV exported successfully');
  };

  const handleExportExcel = async () => {
    if (!report) {
      toast.error('No data to export');
      return;
    }

    const exportData = {
      title: 'Profit Report',
      headers: ['Date', 'Revenue', 'Cost', 'Profit', 'Margin %'],
      rows: (report.history || []).map((item: any) => [
        item.date,
        (item.revenue || 0).toFixed(2),
        (item.cost || 0).toFixed(2),
        (item.profit || 0).toFixed(2),
        ((item.margin || 0) * 100).toFixed(2) + '%',
      ]),
    };

    await exportToExcel(exportData);
    toast.success('Excel file exported successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading profit report: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!report) {
    return <div className="text-center py-12">No data available</div>;
  }

  const summary = report.summary;
  const history = report.history || [];

  // Prepare chart data
  const chartData = history.map((item: any) => ({
    date: format(new Date(item.date), 'MMM dd'),
    revenue: item.revenue || 0,
    cost: item.cost || 0,
    profit: item.profit || 0,
    margin: ((item.margin || 0) * 100).toFixed(1),
  }));

  // Profit vs Cost comparison
  const profitComparison = [
    { name: 'Revenue', value: summary.totalRevenue },
    { name: 'Cost', value: summary.totalCost },
    { name: 'Profit', value: summary.grossProfit },
  ];

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
              <Button color="primary" onPress={() => refetch()}>
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Total Revenue</p>
                <p className="text-2xl font-bold">${(summary.totalRevenue || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Total Cost</p>
                <p className="text-2xl font-bold">${(summary.totalCost || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Gross Profit</p>
                <p className="text-2xl font-bold text-green-600">${(summary.grossProfit || 0).toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Average Margin</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {((summary.averageMargin || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                <Percent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          startContent={<Download className="h-4 w-4" />}
          onPress={handleExportCSV}
        >
          Export CSV
        </Button>
        <Button
          variant="outline"
          startContent={<FileSpreadsheet className="h-4 w-4" />}
          onPress={handleExportExcel}
        >
          Export Excel
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Trend */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Profit Trend</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0088FE" name="Revenue" />
                <Line type="monotone" dataKey="cost" stroke="#FF8042" name="Cost" />
                <Line type="monotone" dataKey="profit" stroke="#00C49F" name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Revenue vs Cost Comparison */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Revenue vs Cost</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                <Bar dataKey="cost" fill="#FF8042" name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Profit Breakdown Pie Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Profit Breakdown</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitComparison}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {profitComparison.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Profit History Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Profit History</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Revenue
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Cost
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Profit
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {history.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-4 py-2 text-sm">{format(new Date(item.date), 'MMM dd, yyyy')}</td>
                    <td className="px-4 py-2 text-sm text-right">${(item.revenue || 0).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-right">${(item.cost || 0).toLocaleString()}</td>
                    <td className={`px-4 py-2 text-sm text-right font-semibold ${
                      (item.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${(item.profit || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-right">
                      {((item.margin || 0) * 100).toFixed(1)}%
                    </td>
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

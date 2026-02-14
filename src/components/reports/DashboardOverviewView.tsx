'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardBody, CardHeader, Button, Spinner } from '@heroui/react';
import { FilterBar } from './FilterBar';
import { TrendingUp, DollarSign, ShoppingCart, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import {
    GET_SALES_REPORT,
    GET_PROFIT_REPORT,
    GET_CREDIT_SUMMARY
} from '@/graphql/operations';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

export function DashboardOverviewView() {
    const router = useRouter();
    const [startDate, setStartDate] = useState(format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [groupBy, setGroupBy] = useState('day');
    const [warehouseId, setWarehouseId] = useState<string | undefined>(undefined);

    const { data: salesData, loading: salesLoading } = useQuery(GET_SALES_REPORT, {
        variables: {
            startDate: `${startDate}T00:00:00Z`,
            endDate: `${endDate}T23:59:59Z`,
            groupBy,
            warehouseId: warehouseId || null,
        },
        fetchPolicy: 'network-only',
    });

    const { data: profitData, loading: profitLoading } = useQuery(GET_PROFIT_REPORT, {
        variables: {
            startDate: `${startDate}T00:00:00Z`,
            endDate: `${endDate}T23:59:59Z`,
            groupBy,
        },
        fetchPolicy: 'network-only',
    });

    const { data: creditData, loading: creditLoading } = useQuery(GET_CREDIT_SUMMARY, {
        variables: {},
        fetchPolicy: 'network-only',
    });

    const loading = salesLoading || profitLoading || creditLoading;
    const salesReport = (salesData as any)?.salesReportsSalesReport;
    const profitReport = (profitData as any)?.salesReportsProfitReport;
    const creditSummary = (creditData as any)?.salesReportsCreditSummary;

    const handleFilterChange = (newFilters: any) => {
        if (newFilters.startDate) setStartDate(newFilters.startDate);
        if (newFilters.endDate) setEndDate(newFilters.endDate);
        if (newFilters.groupBy) setGroupBy(newFilters.groupBy);
        setWarehouseId(newFilters.warehouseId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }

    const revenue = salesReport?.summary?.totalRevenue || 0;
    const orders = salesReport?.summary?.totalOrders || 0;
    const profit = profitReport?.summary?.grossProfit || 0;
    const margin = profitReport?.summary?.averageMargin || 0;
    const creditBalance = creditSummary?.overdue?.totalAmount || 0;

    const revenueChartData = (salesReport?.revenueByPeriod || []).map((item: any) => ({
        period: item.period,
        revenue: item.revenue || 0,
    }));

    const profitChartData = (profitReport?.history || []).map((item: any) => ({
        date: format(new Date(item.date), 'MMM dd'),
        profit: item.profit || 0,
    }));

    return (
        <div className="space-y-6">
            < FilterBar
                initialFilters={{ startDate, endDate, groupBy, warehouseId }
                }
                onFilterChange={handleFilterChange}
                showDateRange={true}
                showGroupBy={true}
                showWarehouse={true}
                warehouses={
                    [
                        { value: 'all', label: 'All Warehouses' },
                        ...(salesReport?.revenueByWarehouse || []).map((w: any) => ({
                            value: w.warehouseId,
                            label: w.warehouseName
                        }))
                    ]
                }
                groupOptions={
                    [
                        { value: 'day', label: 'Daily' },
                        { value: 'week', label: 'Weekly' },
                        { value: 'month', label: 'Monthly' },
                        { value: 'year', label: 'Yearly' }
                    ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                < Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={() => router.push('/dashboard?tab=sales')}>
                    < CardBody >
                        <div className="flex items-center justify-between">
                            < div >
                                <p className="text-sm text-default-500 mb-1">Total Revenue</p>
                                < p className="text-2xl font-bold">${revenue.toLocaleString()}</p>
                            </div >
                            <div className="p-3 rounded-lg bg-success-50 dark:bg-success-900/20">
                                < DollarSign className="h-6 w-6 text-success-600 dark:text-success-400" />
                            </div >
                        </div >
                    </CardBody >
                </Card >

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={() => router.push('/dashboard?tab=sales')}>
                    <CardBody>
                        <div className="flex items-center justify-between">
                            < div >
                                <p className="text-sm text-default-500 mb-1">Total Orders</p>
                                < p className="text-2xl font-bold">{orders.toLocaleString()}</p>
                            </div >
                            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                                < ShoppingCart className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                            </div >
                        </div >
                    </CardBody >
                </Card >

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={() => router.push('/dashboard?tab=profit')}>
                    <CardBody>
                        <div className="flex items-center justify-between">
                            < div >
                                <p className="text-sm text-default-500 mb-1">Gross Profit</p>
                                < p className="text-2xl font-bold text-success-600">${profit.toLocaleString()}</p>
                                < p className="text-xs text-default-500 mt-1">Margin: {(margin * 100).toFixed(1)}%</p>
                            </div >
                            <div className="p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20">
                                < TrendingUp className="h-6 w-6 text-warning-600 dark:text-warning-400" />
                            </div >
                        </div >
                    </CardBody >
                </Card >

                <Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={() => router.push('/dashboard?tab=credit')}>
                    <CardBody>
                        <div className="flex items-center justify-between">
                            < div >
                                <p className="text-sm text-default-500 mb-1">Credit Overdue</p>
                                < p className="text-2xl font-bold text-danger-600">${creditBalance.toLocaleString()}</p>
                                < p className="text-xs text-default-500 mt-1">{creditSummary?.overdue?.count || 0} accounts</p>
                            </div >
                            <div className="p-3 rounded-lg bg-danger-50 dark:bg-danger-900/20">
                                < CreditCard className="h-6 w-6 text-danger-600 dark:text-danger-400" />
                            </div >
                        </div >
                    </CardBody >
                </Card >
            </div >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                < Card >
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Revenue Trend</h3>
                    </CardHeader >
                    <CardBody>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="period" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#0ea5e9" name="Revenue ($)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div >
                    </CardBody >
                </Card >

                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Profit Analysis</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={profitChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit ($)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div >
                    </CardBody >
                </Card >
            </div >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                < Card >
                    <CardHeader className="flex justify-between items-center">
                        < h3 className="text-lg font-semibold">Top Products</h3>
                        < Button size="sm" variant="light" onPress={() => router.push('/dashboard?tab=products')}>
                            View All
                        </Button >
                    </CardHeader >
                    <CardBody>
                        <div className="space-y-3">
                            {(salesReport?.topProducts || []).slice(0, 5).map((product: any, index: number) => (
                                <div key={product.productId} className="flex items-center justify-between p-3 rounded-lg bg-default-50 hover:bg-default-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{product.productName}</p>
                                            <p className="text-xs text-default-500">{product.quantitySold} sold</p>
                                        </div >
                                    </div >
                                    <p className="font-semibold text-success-600">${product.revenue.toLocaleString()}</p>
                                </div >
                            ))}
                            {
                                (!salesReport?.topProducts || salesReport.topProducts.length === 0) && (
                                    <div className="text-center py-8 text-default-500">No products data available</div>
                                )
                            }
                        </div >
                    </CardBody >
                </Card >

                <Card>
                    <CardHeader className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Top Categories</h3>
                        <Button size="sm" variant="light" onPress={() => router.push('/dashboard?tab=sales')}>
                            View All
                        </Button >
                    </CardHeader >
                    <CardBody>
                        <div className="space-y-3">
                            {(salesReport?.topCategories || []).slice(0, 5).map((category: any, index: number) => (
                                <div key={category.categoryId} className="flex items-center justify-between p-3 rounded-lg bg-default-50 hover:bg-default-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning-100 text-warning-600 font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{category.categoryName}</p>
                                            <p className="text-xs text-default-500">{category.quantitySold} items</p>
                                        </div >
                                    </div >
                                    <p className="font-semibold text-success-600">${category.revenue.toLocaleString()}</p>
                                </div >
                            ))}
                            {
                                (!salesReport?.topCategories || salesReport.topCategories.length === 0) && (
                                    <div className="text-center py-8 text-default-500">No categories data available</div>
                                )
                            }
                        </div >
                    </CardBody >
                </Card >
            </div >
        </div >
    );
}

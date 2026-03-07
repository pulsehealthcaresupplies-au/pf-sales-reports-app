/**
 * GraphQL generated types (stub when codegen has not been run).
 * Run: npm run codegen (or codegen:sync) to regenerate from schema.
 */
export interface PeriodRevenue {
  period?: string | null;
  revenue?: number | null;
  orderCount?: number | null;
}

export interface WarehouseRevenue {
  warehouseId?: string | null;
  warehouseName?: string | null;
  revenue?: number | null;
  orderCount?: number | null;
}

export interface SalesReportSummary {
  totalRevenue?: number | null;
  totalOrders?: number | null;
  averageOrderValue?: number | null;
}

export interface ProductSales {
  productId?: string | null;
  productName?: string | null;
  revenue?: number | null;
  quantitySold?: number | null;
  orderCount?: number | null;
}

export interface SalesReport {
  revenueByPeriod?: (PeriodRevenue | null)[] | null;
  revenueByWarehouse?: (WarehouseRevenue | null)[] | null;
  summary?: SalesReportSummary | null;
  topProducts?: (ProductSales | null)[] | null;
}

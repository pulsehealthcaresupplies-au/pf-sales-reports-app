/**
 * Subscription Response Types for Sales Reports App
 * 
 * TypeScript types for GraphQL subscription responses.
 * These types match the backend GraphQL schema exactly.
 * 
 * Last Updated: 2026-02-06
 */

// ============================================
// Sales Report Subscription Types
// ============================================

/**
 * Period - Report period information
 */
export interface Period {
  startDate: string;
  endDate: string;
  groupBy?: string;
}

/**
 * SalesReportSummary - Summary statistics for sales report
 */
export interface SalesReportSummary {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  completedRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
}

/**
 * RevenueByPeriod - Revenue breakdown by period
 */
export interface RevenueByPeriod {
  period: string;
  revenue: number;
  orderCount: number;
}

/**
 * SalesReport - Response from salesReportsSalesReportUpdated subscription
 * Matches: type SalesReport { period: Period!, summary: SalesReportSummary!, revenueByPeriod: [RevenueByPeriod!]! }
 */
export interface SalesReport {
  period: Period;
  summary: SalesReportSummary;
  revenueByPeriod: RevenueByPeriod[];
}

/**
 * SalesReportsSalesReportUpdatedSubscriptionResponse - Full subscription response
 */
export interface SalesReportsSalesReportUpdatedSubscriptionResponse {
  salesReportsSalesReportUpdated?: SalesReport;
}

// ============================================
// Credit Report Subscription Types
// ============================================

/**
 * CreditReportSummary - Summary statistics for credit report
 */
export interface CreditReportSummary {
  totalAccounts: number;
  totalCreditLimit: number;
  totalCreditBalance: number;
  totalAvailableCredit: number;
  utilizationRate: number;
}

/**
 * OverdueCustomer - Customer with overdue credit
 */
export interface OverdueCustomer {
  accountId: string;
  userId: string;
  userEmail: string;
  userName: string;
  creditBalance: number;
  daysOverdue: number;
}

/**
 * DueSoonCustomer - Customer with credit due soon
 */
export interface DueSoonCustomer {
  accountId: string;
  userId: string;
  userEmail: string;
  userName: string;
  creditBalance: number;
  daysUntilDue: number;
}

/**
 * CreditReport - Response from salesReportsCreditReportUpdated subscription
 * Matches: type CreditReport { summary: CreditReportSummary!, overdueCustomers: [OverdueCustomer!]!, dueSoonCustomers: [DueSoonCustomer!]! }
 */
export interface CreditReport {
  summary: CreditReportSummary;
  overdueCustomers: OverdueCustomer[];
  dueSoonCustomers: DueSoonCustomer[];
}

/**
 * SalesReportsCreditReportUpdatedSubscriptionResponse - Full subscription response
 */
export interface SalesReportsCreditReportUpdatedSubscriptionResponse {
  salesReportsCreditReportUpdated?: CreditReport;
}

// ============================================
// Product Performance Subscription Types
// ============================================

/**
 * ProductPerformanceItem - Product performance data
 */
export interface ProductPerformanceItem {
  productId: string;
  productName: string;
  sku: string;
  categoryName?: string;
  revenue: number;
  quantitySold: number;
  orderCount: number;
  averagePrice: number;
}

/**
 * ProductPerformanceReport - Response from salesReportsProductPerformanceUpdated subscription
 * Matches: type ProductPerformanceReport { period: Period!, products: [ProductPerformanceItem!]! }
 */
export interface ProductPerformanceReport {
  period: Period;
  products: ProductPerformanceItem[];
}

/**
 * SalesReportsProductPerformanceUpdatedSubscriptionResponse - Full subscription response
 */
export interface SalesReportsProductPerformanceUpdatedSubscriptionResponse {
  salesReportsProductPerformanceUpdated?: ProductPerformanceReport;
}

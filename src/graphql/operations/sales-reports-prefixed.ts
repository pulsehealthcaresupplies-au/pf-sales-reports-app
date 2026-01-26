import { gql } from '@apollo/client';
import {
  SALES_REPORT_PERIOD_FRAGMENT,
  SALES_REPORT_SUMMARY_FRAGMENT,
  PERIOD_REVENUE_FRAGMENT,
  STATUS_REVENUE_FRAGMENT,
  PAYMENT_METHOD_REVENUE_FRAGMENT,
  WAREHOUSE_REVENUE_FRAGMENT,
  PRODUCT_SALES_FRAGMENT,
  CATEGORY_SALES_FRAGMENT,
  CUSTOMER_REPORT_PERIOD_FRAGMENT,
  CUSTOMER_SUMMARY_FRAGMENT,
  TOP_CUSTOMER_FRAGMENT,
  PRODUCT_REPORT_PERIOD_FRAGMENT,
  PRODUCT_PERFORMANCE_FRAGMENT,
  CREDIT_SUMMARY_FRAGMENT,
  OVERDUE_CUSTOMER_FRAGMENT,
  DUE_SOON_CUSTOMER_FRAGMENT,
  CREDIT_DASHBOARD_SUMMARY_FRAGMENT,
} from '../fragments';

/**
 * Prefix-Based Sales Reports GraphQL Operations
 * All operations use salesReports prefix for clarity and safety
 * Following warehouse/picker app pattern
 */

/**
 * Sales Report Query (Prefix-based)
 */
export const GET_SALES_REPORTS_SALES_REPORT = gql`
  query GetSalesReportsSalesReport($startDate: String, $endDate: String, $warehouseId: ID, $groupBy: String) {
    salesReportsSalesReport(startDate: $startDate, endDate: $endDate, warehouseId: $warehouseId, groupBy: $groupBy) {
      period {
        ...SalesReportPeriod
      }
      summary {
        ...SalesSummary
      }
      revenueByPeriod {
        ...PeriodRevenue
      }
      revenueByStatus {
        ...StatusRevenue
      }
      revenueByPaymentMethod {
        ...PaymentMethodRevenue
      }
      revenueByWarehouse {
        ...WarehouseRevenue
      }
      topProducts {
        ...ProductSales
      }
      topCategories {
        ...CategorySales
      }
    }
  }
  ${SALES_REPORT_PERIOD_FRAGMENT}
  ${SALES_REPORT_SUMMARY_FRAGMENT}
  ${PERIOD_REVENUE_FRAGMENT}
  ${STATUS_REVENUE_FRAGMENT}
  ${PAYMENT_METHOD_REVENUE_FRAGMENT}
  ${WAREHOUSE_REVENUE_FRAGMENT}
  ${PRODUCT_SALES_FRAGMENT}
  ${CATEGORY_SALES_FRAGMENT}
`;

/**
 * Customer Report Query (Prefix-based)
 */
export const GET_SALES_REPORTS_CUSTOMER_REPORT = gql`
  query GetSalesReportsCustomerReport($startDate: String, $endDate: String, $customerType: String) {
    salesReportsCustomerReport(startDate: $startDate, endDate: $endDate, customerType: $customerType) {
      period {
        ...CustomerReportPeriod
      }
      summary {
        ...CustomerSummary
      }
      topCustomers {
        ...TopCustomer
      }
    }
  }
  ${CUSTOMER_REPORT_PERIOD_FRAGMENT}
  ${CUSTOMER_SUMMARY_FRAGMENT}
  ${TOP_CUSTOMER_FRAGMENT}
`;

/**
 * Profit Report Query (Prefix-based)
 */
export const GET_SALES_REPORTS_PROFIT_REPORT = gql`
  query GetSalesReportsProfitReport($startDate: String, $endDate: String, $groupBy: String) {
    salesReportsProfitReport(startDate: $startDate, endDate: $endDate, groupBy: $groupBy) {
      period {
        startDate
        endDate
        groupBy
      }
      summary {
        totalRevenue
        totalCost
        grossProfit
        averageMargin
      }
      history {
        date
        revenue
        cost
        profit
        margin
      }
    }
  }
`;

/**
 * Product Performance Report Query (Prefix-based)
 */
export const GET_SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT = gql`
  query GetSalesReportsProductPerformanceReport($startDate: String, $endDate: String, $categoryId: ID, $limit: Int) {
    salesReportsProductPerformanceReport(startDate: $startDate, endDate: $endDate, categoryId: $categoryId, limit: $limit) {
      period {
        ...ProductReportPeriod
      }
      products {
        ...ProductPerformance
      }
    }
  }
  ${PRODUCT_REPORT_PERIOD_FRAGMENT}
  ${PRODUCT_PERFORMANCE_FRAGMENT}
`;

/**
 * Credit Report Query (Prefix-based)
 */
export const GET_SALES_REPORTS_CREDIT_REPORT = gql`
  query GetSalesReportsCreditReport($creditType: String, $includeOverdue: Boolean, $includeDueSoon: Boolean) {
    salesReportsCreditReport(creditType: $creditType, includeOverdue: $includeOverdue, includeDueSoon: $includeDueSoon) {
      summary {
        ...CreditSummary
      }
      overdueCustomers {
        ...OverdueCustomer
      }
      dueSoonCustomers {
        ...DueSoonCustomer
      }
    }
  }
  ${CREDIT_SUMMARY_FRAGMENT}
  ${OVERDUE_CUSTOMER_FRAGMENT}
  ${DUE_SOON_CUSTOMER_FRAGMENT}
`;

/**
 * Overdue Customers Query (Prefix-based)
 */
export const GET_SALES_REPORTS_OVERDUE_CUSTOMERS = gql`
  query GetSalesReportsOverdueCustomers($daysOverdue: Int, $creditType: String, $page: Int, $pageSize: Int) {
    salesReportsOverdueCustomers(daysOverdue: $daysOverdue, creditType: $creditType, page: $page, pageSize: $pageSize) {
      customers {
        ...OverdueCustomer
      }
      count
      totalCount
      page
      pageSize
    }
  }
  ${OVERDUE_CUSTOMER_FRAGMENT}
`;

/**
 * Due Soon Customers Query (Prefix-based)
 */
export const GET_SALES_REPORTS_DUE_SOON_CUSTOMERS = gql`
  query GetSalesReportsDueSoonCustomers($days: Int, $creditType: String, $page: Int, $pageSize: Int) {
    salesReportsDueSoonCustomers(days: $days, creditType: $creditType, page: $page, pageSize: $pageSize) {
      customers {
        ...DueSoonCustomer
      }
      count
      totalCount
      page
      pageSize
    }
  }
  ${DUE_SOON_CUSTOMER_FRAGMENT}
`;

/**
 * Credit Summary Query (Prefix-based)
 */
export const GET_SALES_REPORTS_CREDIT_SUMMARY = gql`
  query GetSalesReportsCreditSummary($creditType: String, $daysAhead: Int) {
    salesReportsCreditSummary(creditType: $creditType, daysAhead: $daysAhead) {
      ...CreditDashboardSummary
    }
  }
  ${CREDIT_DASHBOARD_SUMMARY_FRAGMENT}
`;

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
 * GraphQL Queries for Sales Reports
 * All queries use fragments for consistent field selection and type safety
 */

export const GET_SALES_REPORT = gql`
  query GetSalesReport($startDate: String, $endDate: String, $warehouseId: ID, $groupBy: String) {
    salesReport(startDate: $startDate, endDate: $endDate, warehouseId: $warehouseId, groupBy: $groupBy) {
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

export const GET_CUSTOMER_REPORT = gql`
  query GetCustomerReport($startDate: String, $endDate: String, $customerType: String) {
    customerReport(startDate: $startDate, endDate: $endDate, customerType: $customerType) {
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

export const GET_PRODUCT_PERFORMANCE_REPORT = gql`
  query GetProductPerformanceReport($startDate: String, $endDate: String, $categoryId: ID, $limit: Int) {
    productPerformanceReport(startDate: $startDate, endDate: $endDate, categoryId: $categoryId, limit: $limit) {
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

export const GET_CREDIT_REPORT = gql`
  query GetCreditReport($creditType: String, $includeOverdue: Boolean, $includeDueSoon: Boolean) {
    creditReport(creditType: $creditType, includeOverdue: $includeOverdue, includeDueSoon: $includeDueSoon) {
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

export const GET_OVERDUE_CUSTOMERS = gql`
  query GetOverdueCustomers($daysOverdue: Int, $creditType: String, $page: Int, $pageSize: Int) {
    overdueCustomers(daysOverdue: $daysOverdue, creditType: $creditType, page: $page, pageSize: $pageSize) {
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

export const GET_DUE_SOON_CUSTOMERS = gql`
  query GetDueSoonCustomers($days: Int, $creditType: String, $page: Int, $pageSize: Int) {
    dueSoonCustomers(days: $days, creditType: $creditType, page: $page, pageSize: $pageSize) {
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

export const GET_CREDIT_SUMMARY = gql`
  query GetCreditSummary($creditType: String, $daysAhead: Int) {
    creditSummary(creditType: $creditType, daysAhead: $daysAhead) {
      ...CreditDashboardSummary
    }
  }
  ${CREDIT_DASHBOARD_SUMMARY_FRAGMENT}
`;

export const GET_PROFIT_REPORT = gql`
  query GetProfitReport($startDate: String, $endDate: String, $groupBy: String) {
    profitReport(startDate: $startDate, endDate: $endDate, groupBy: $groupBy) {
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

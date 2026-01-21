import { gql } from '@apollo/client';

/**
 * Fragments for Sales Reports
 * These fragments ensure consistent field selection across queries
 */

export const SALES_REPORT_PERIOD_FRAGMENT = gql`
  fragment SalesReportPeriod on ReportPeriod {
    startDate
    endDate
    groupBy
  }
`;

export const SALES_REPORT_SUMMARY_FRAGMENT = gql`
  fragment SalesSummary on SalesSummary {
    totalOrders
    totalRevenue
    completedOrders
    completedRevenue
    averageOrderValue
    conversionRate
  }
`;

export const PERIOD_REVENUE_FRAGMENT = gql`
  fragment PeriodRevenue on PeriodRevenue {
    period
    revenue
    orderCount
  }
`;

export const STATUS_REVENUE_FRAGMENT = gql`
  fragment StatusRevenue on StatusRevenue {
    status
    revenue
    orderCount
  }
`;

export const PAYMENT_METHOD_REVENUE_FRAGMENT = gql`
  fragment PaymentMethodRevenue on PaymentMethodRevenue {
    paymentMethod
    revenue
    orderCount
  }
`;

export const WAREHOUSE_REVENUE_FRAGMENT = gql`
  fragment WarehouseRevenue on WarehouseRevenue {
    warehouseId
    warehouseName
    revenue
    orderCount
  }
`;

export const PRODUCT_SALES_FRAGMENT = gql`
  fragment ProductSales on ProductSales {
    productId
    productName
    sku
    revenue
    quantitySold
    orderCount
  }
`;

export const CATEGORY_SALES_FRAGMENT = gql`
  fragment CategorySales on CategorySales {
    categoryName
    revenue
    orderCount
  }
`;

export const CUSTOMER_REPORT_PERIOD_FRAGMENT = gql`
  fragment CustomerReportPeriod on CustomerReportPeriod {
    startDate
    endDate
  }
`;

export const CUSTOMER_SUMMARY_FRAGMENT = gql`
  fragment CustomerSummary on CustomerSummary {
    totalCustomers
    newCustomers
    averageLifetimeValue
    averageOrdersPerCustomer
  }
`;

export const TOP_CUSTOMER_FRAGMENT = gql`
  fragment TopCustomer on TopCustomer {
    userId
    email
    name
    revenue
    orderCount
  }
`;

export const PRODUCT_REPORT_PERIOD_FRAGMENT = gql`
  fragment ProductReportPeriod on ProductReportPeriod {
    startDate
    endDate
  }
`;

export const PRODUCT_PERFORMANCE_FRAGMENT = gql`
  fragment ProductPerformance on ProductPerformance {
    productId
    productName
    sku
    categoryName
    revenue
    quantitySold
    orderCount
    averagePrice
  }
`;

export const CREDIT_SUMMARY_FRAGMENT = gql`
  fragment CreditSummary on CreditSummary {
    totalAccounts
    totalCreditLimit
    totalCreditBalance
    totalAvailableCredit
    utilizationRate
  }
`;

export const OVERDUE_CUSTOMER_FRAGMENT = gql`
  fragment OverdueCustomer on OverdueCustomer {
    accountId
    userId
    userEmail
    userName
    creditBalance
    daysOverdue
  }
`;

export const DUE_SOON_CUSTOMER_FRAGMENT = gql`
  fragment DueSoonCustomer on DueSoonCustomer {
    accountId
    userId
    userEmail
    userName
    creditBalance
    daysUntilDue
  }
`;

export const CREDIT_DASHBOARD_SUMMARY_FRAGMENT = gql`
  fragment CreditDashboardSummary on CreditDashboardSummary {
    overdue {
      count
      totalAmount
    }
    dueSoon {
      count
      totalAmount
      daysAhead
    }
    pendingApproval {
      count
    }
    active {
      count
      totalCreditLimit
      totalCreditBalance
      totalAvailableCredit
    }
  }
`;

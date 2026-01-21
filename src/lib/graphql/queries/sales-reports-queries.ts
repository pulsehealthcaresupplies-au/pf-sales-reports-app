/**
 * @deprecated This file is deprecated. Use src/lib/graphql/operations/queries/sales-reports-queries.ts instead.
 * This file is kept for backward compatibility during migration.
 */

import { gql } from '@apollo/client';

export const GET_SALES_REPORT = gql`
  query GetSalesReport($startDate: String, $endDate: String, $warehouseId: ID, $groupBy: String) {
    salesReport(startDate: $startDate, endDate: $endDate, warehouseId: $warehouseId, groupBy: $groupBy) {
      period {
        startDate
        endDate
        groupBy
      }
      summary {
        totalOrders
        totalRevenue
        completedOrders
        completedRevenue
        averageOrderValue
        conversionRate
      }
      revenueByPeriod {
        period
        revenue
        orderCount
      }
      revenueByStatus {
        status
        revenue
        orderCount
      }
      revenueByPaymentMethod {
        paymentMethod
        revenue
        orderCount
      }
      revenueByWarehouse {
        warehouseId
        warehouseName
        revenue
        orderCount
      }
      topProducts {
        productId
        productName
        sku
        revenue
        quantitySold
        orderCount
      }
      topCategories {
        categoryName
        revenue
        orderCount
      }
    }
  }
`;

export const GET_CUSTOMER_REPORT = gql`
  query GetCustomerReport($startDate: String, $endDate: String, $customerType: String) {
    customerReport(startDate: $startDate, endDate: $endDate, customerType: $customerType) {
      period {
        startDate
        endDate
      }
      summary {
        totalCustomers
        newCustomers
        averageLifetimeValue
        averageOrdersPerCustomer
      }
      topCustomers {
        userId
        email
        name
        revenue
        orderCount
      }
    }
  }
`;

export const GET_PRODUCT_PERFORMANCE_REPORT = gql`
  query GetProductPerformanceReport($startDate: String, $endDate: String, $categoryId: ID, $limit: Int) {
    productPerformanceReport(startDate: $startDate, endDate: $endDate, categoryId: $categoryId, limit: $limit) {
      period {
        startDate
        endDate
      }
      products {
        productId
        productName
        sku
        categoryName
        revenue
        quantitySold
        orderCount
        averagePrice
      }
    }
  }
`;

export const GET_CREDIT_REPORT = gql`
  query GetCreditReport($creditType: String, $includeOverdue: Boolean, $includeDueSoon: Boolean) {
    creditReport(creditType: $creditType, includeOverdue: $includeOverdue, includeDueSoon: $includeDueSoon) {
      summary {
        totalAccounts
        totalCreditLimit
        totalCreditBalance
        totalAvailableCredit
        utilizationRate
      }
      overdueCustomers {
        accountId
        userId
        userEmail
        userName
        creditBalance
        daysOverdue
      }
      dueSoonCustomers {
        accountId
        userId
        userEmail
        userName
        creditBalance
        daysUntilDue
      }
    }
  }
`;

export const GET_OVERDUE_CUSTOMERS = gql`
  query GetOverdueCustomers($daysOverdue: Int, $creditType: String, $page: Int, $pageSize: Int) {
    overdueCustomers(daysOverdue: $daysOverdue, creditType: $creditType, page: $page, pageSize: $pageSize) {
      customers {
        accountId
        userId
        userEmail
        userName
        creditBalance
        daysOverdue
      }
      count
      totalCount
      page
      pageSize
    }
  }
`;

export const GET_DUE_SOON_CUSTOMERS = gql`
  query GetDueSoonCustomers($days: Int, $creditType: String, $page: Int, $pageSize: Int) {
    dueSoonCustomers(days: $days, creditType: $creditType, page: $page, pageSize: $pageSize) {
      customers {
        accountId
        userId
        userEmail
        userName
        creditBalance
        daysUntilDue
      }
      count
      totalCount
      page
      pageSize
    }
  }
`;

export const GET_CREDIT_SUMMARY = gql`
  query GetCreditSummary($creditType: String, $daysAhead: Int) {
    creditSummary(creditType: $creditType, daysAhead: $daysAhead) {
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
  }
`;

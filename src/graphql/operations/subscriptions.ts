import { gql } from '@apollo/client';

/**
 * Sales Reports App Subscriptions
 * Prefix-based subscriptions for real-time updates
 */

/**
 * Sales Report Updated Subscription (Prefix-based)
 */
export const SALES_REPORTS_SALES_REPORT_UPDATED = gql`
  subscription SalesReportsSalesReportUpdated($warehouseId: ID) {
    salesReportsSalesReportUpdated(warehouseId: $warehouseId) {
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
    }
  }
`;

/**
 * Credit Report Updated Subscription (Prefix-based)
 */
export const SALES_REPORTS_CREDIT_REPORT_UPDATED = gql`
  subscription SalesReportsCreditReportUpdated {
    salesReportsCreditReportUpdated {
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

/**
 * Product Performance Updated Subscription (Prefix-based)
 */
export const SALES_REPORTS_PRODUCT_PERFORMANCE_UPDATED = gql`
  subscription SalesReportsProductPerformanceUpdated($categoryId: ID) {
    salesReportsProductPerformanceUpdated(categoryId: $categoryId) {
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

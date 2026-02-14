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
    CREDIT_SUMMARY_FRAGMENT,
    OVERDUE_CUSTOMER_FRAGMENT,
    DUE_SOON_CUSTOMER_FRAGMENT,
    PRODUCT_REPORT_PERIOD_FRAGMENT,
    PRODUCT_PERFORMANCE_FRAGMENT,
} from '../fragments';

/**
 * GraphQL Subscriptions for Sales Reports
 * Uses salesReports prefix convention matching backend
 */

export const SALES_REPORT_UPDATED_SUBSCRIPTION = gql`
  subscription SalesReportUpdated($warehouseId: ID) {
    salesReportsSalesReportUpdated(warehouseId: $warehouseId) {
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

export const CREDIT_REPORT_UPDATED_SUBSCRIPTION = gql`
  subscription CreditReportUpdated {
    salesReportsCreditReportUpdated {
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

export const PRODUCT_PERFORMANCE_UPDATED_SUBSCRIPTION = gql`
  subscription ProductPerformanceUpdated($categoryId: ID) {
    salesReportsProductPerformanceUpdated(categoryId: $categoryId) {
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

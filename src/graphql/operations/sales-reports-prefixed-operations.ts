/**
 * Sales Reports App - Prefix-Based GraphQL Operations
 * All operations use salesReports prefix to match backend schema
 */

import { gql } from '@apollo/client';

// ============================================================================
// QUERIES
// ============================================================================

export const SALES_REPORTS_SALES_REPORT = gql`
  query SalesReportsSalesReport(
    $startDate: String
    $endDate: String
    $warehouseId: ID
    $groupBy: String = "day"
  ) {
    salesReportsSalesReport(
      startDate: $startDate
      endDate: $endDate
      warehouseId: $warehouseId
      groupBy: $groupBy
    ) {
      totalSales
      totalOrders
      averageOrderValue
      period {
        startDate
        endDate
      }
      data {
        period
        sales
        orders
        averageOrderValue
      }
      byWarehouse {
        warehouse {
          id
          name
        }
        sales
        orders
      }
    }
  }
`;

export const SALES_REPORTS_CUSTOMER_REPORT = gql`
  query SalesReportsCustomerReport(
    $startDate: String
    $endDate: String
    $customerType: String
  ) {
    salesReportsCustomerReport(
      startDate: $startDate
      endDate: $endDate
      customerType: $customerType
    ) {
      totalCustomers
      newCustomers
      returningCustomers
      topCustomers {
        customer {
          id
          email
          firstName
          lastName
          customerType
        }
        totalOrders
        totalSpent
        averageOrderValue
      }
      customersByType {
        customerType
        count
        totalSpent
      }
      period {
        startDate
        endDate
      }
    }
  }
`;

export const SALES_REPORTS_PROFIT_REPORT = gql`
  query SalesReportsProfitReport(
    $startDate: String
    $endDate: String
    $groupBy: String = "day"
  ) {
    salesReportsProfitReport(
      startDate: $startDate
      endDate: $endDate
      groupBy: $groupBy
    ) {
      totalRevenue
      totalCost
      totalProfit
      profitMargin
      period {
        startDate
        endDate
      }
      data {
        period
        revenue
        cost
        profit
        profitMargin
      }
      byCategory {
        category {
          id
          name
        }
        revenue
        cost
        profit
        profitMargin
      }
    }
  }
`;

export const SALES_REPORTS_PRODUCT_PERFORMANCE_REPORT = gql`
  query SalesReportsProductPerformanceReport(
    $startDate: String
    $endDate: String
    $categoryId: ID
    $limit: Int = 20
  ) {
    salesReportsProductPerformanceReport(
      startDate: $startDate
      endDate: $endDate
      categoryId: $categoryId
      limit: $limit
    ) {
      topProducts {
        product {
          id
          name
          sku
          category {
            id
            name
          }
          brand {
            id
            name
          }
        }
        quantitySold
        revenue
        profit
        profitMargin
      }
      productsByCategory {
        category {
          id
          name
        }
        products {
          product {
            id
            name
            sku
          }
          quantitySold
          revenue
        }
        totalRevenue
      }
      period {
        startDate
        endDate
      }
    }
  }
`;

export const SALES_REPORTS_CREDIT_REPORT = gql`
  query SalesReportsCreditReport(
    $creditType: String
    $includeOverdue: Boolean = true
    $includeDueSoon: Boolean = true
  ) {
    salesReportsCreditReport(
      creditType: $creditType
      includeOverdue: $includeOverdue
      includeDueSoon: $includeDueSoon
    ) {
      totalCredit
      totalOutstanding
      overdueAmount
      dueSoonAmount
      creditByType {
        creditType
        totalCredit
        outstanding
        overdue
        dueSoon
      }
      customers {
        customer {
          id
          email
          firstName
          lastName
          customerType
        }
        creditLimit
        availableCredit
        outstanding
        overdue
        dueDate
      }
    }
  }
`;

export const SALES_REPORTS_OVERDUE_CUSTOMERS = gql`
  query SalesReportsOverdueCustomers(
    $daysOverdue: Int = 0
    $creditType: String
    $page: Int = 1
    $pageSize: Int = 20
  ) {
    salesReportsOverdueCustomers(
      daysOverdue: $daysOverdue
      creditType: $creditType
      page: $page
      pageSize: $pageSize
    ) {
      customers {
        customer {
          id
          email
          firstName
          lastName
          customerType
          company {
            id
            name
          }
        }
        creditLimit
        outstanding
        overdue
        daysOverdue
        dueDate
        lastPaymentDate
      }
      totalCount
      totalOverdue
      page
      pageSize
      totalPages
    }
  }
`;

export const SALES_REPORTS_DUE_SOON_CUSTOMERS = gql`
  query SalesReportsDueSoonCustomers(
    $days: Int = 7
    $creditType: String
    $page: Int = 1
    $pageSize: Int = 20
  ) {
    salesReportsDueSoonCustomers(
      days: $days
      creditType: $creditType
      page: $page
      pageSize: $pageSize
    ) {
      customers {
        customer {
          id
          email
          firstName
          lastName
          customerType
          company {
            id
            name
          }
        }
        creditLimit
        outstanding
        dueSoon
        daysUntilDue
        dueDate
      }
      totalCount
      totalDueSoon
      page
      pageSize
      totalPages
    }
  }
`;

export const SALES_REPORTS_CREDIT_SUMMARY = gql`
  query SalesReportsCreditSummary($creditType: String, $daysAhead: Int = 7) {
    salesReportsCreditSummary(creditType: $creditType, daysAhead: $daysAhead) {
      totalCreditLimit
      totalOutstanding
      totalAvailable
      overdueAmount
      dueSoonAmount
      creditUtilization
      topCustomers {
        customer {
          id
          email
          firstName
          lastName
        }
        outstanding
        dueDate
      }
      alerts {
        type
        message
        severity
      }
    }
  }
`;

// ============================================================================
// SUBSCRIPTIONS
// ============================================================================

export const SALES_REPORTS_UPDATED = gql`
  subscription SalesReportsUpdated {
    salesReportsUpdated {
      reportType
      data {
        totalSales
        totalOrders
        timestamp
      }
      timestamp
    }
  }
`;

export const SALES_REPORTS_CREDIT_ALERT = gql`
  subscription SalesReportsCreditAlert {
    salesReportsCreditAlert {
      alert {
        type
        customer {
          id
          email
          firstName
          lastName
        }
        amount
        dueDate
        severity
      }
      timestamp
    }
  }
`;

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface SalesReport {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  period: {
    startDate: string;
    endDate: string;
  };
  data: Array<{
    period: string;
    sales: number;
    orders: number;
    averageOrderValue: number;
  }>;
  byWarehouse: Array<{
    warehouse: {
      id: string;
      name: string;
    };
    sales: number;
    orders: number;
  }>;
}

export interface CustomerReport {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  topCustomers: Array<{
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      customerType: string;
    };
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
  }>;
  customersByType: Array<{
    customerType: string;
    count: number;
    totalSpent: number;
  }>;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface ProfitReport {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitMargin: number;
  period: {
    startDate: string;
    endDate: string;
  };
  data: Array<{
    period: string;
    revenue: number;
    cost: number;
    profit: number;
    profitMargin: number;
  }>;
  byCategory: Array<{
    category: {
      id: string;
      name: string;
    };
    revenue: number;
    cost: number;
    profit: number;
    profitMargin: number;
  }>;
}

export interface ProductPerformanceReport {
  topProducts: Array<{
    product: {
      id: string;
      name: string;
      sku: string;
      category?: {
        id: string;
        name: string;
      };
      brand?: {
        id: string;
        name: string;
      };
    };
    quantitySold: number;
    revenue: number;
    profit: number;
    profitMargin: number;
  }>;
  productsByCategory: Array<{
    category: {
      id: string;
      name: string;
    };
    products: Array<{
      product: {
        id: string;
        name: string;
        sku: string;
      };
      quantitySold: number;
      revenue: number;
    }>;
    totalRevenue: number;
  }>;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface CreditReport {
  totalCredit: number;
  totalOutstanding: number;
  overdueAmount: number;
  dueSoonAmount: number;
  creditByType: Array<{
    creditType: string;
    totalCredit: number;
    outstanding: number;
    overdue: number;
    dueSoon: number;
  }>;
  customers: Array<{
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      customerType: string;
    };
    creditLimit: number;
    availableCredit: number;
    outstanding: number;
    overdue: number;
    dueDate?: string;
  }>;
}

export interface OverdueCustomersResponse {
  customers: Array<{
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      customerType: string;
      company?: {
        id: string;
        name: string;
      };
    };
    creditLimit: number;
    outstanding: number;
    overdue: number;
    daysOverdue: number;
    dueDate: string;
    lastPaymentDate?: string;
  }>;
  totalCount: number;
  totalOverdue: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DueSoonCustomersResponse {
  customers: Array<{
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      customerType: string;
      company?: {
        id: string;
        name: string;
      };
    };
    creditLimit: number;
    outstanding: number;
    dueSoon: number;
    daysUntilDue: number;
    dueDate: string;
  }>;
  totalCount: number;
  totalDueSoon: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreditDashboardSummary {
  totalCreditLimit: number;
  totalOutstanding: number;
  totalAvailable: number;
  overdueAmount: number;
  dueSoonAmount: number;
  creditUtilization: number;
  topCustomers: Array<{
    customer: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    outstanding: number;
    dueDate?: string;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: string;
  }>;
}

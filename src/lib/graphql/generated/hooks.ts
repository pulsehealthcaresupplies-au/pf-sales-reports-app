// @ts-nocheck
import * as Types from './types';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export const SalesReportPeriodFragmentDoc = gql`
    fragment SalesReportPeriod on ReportPeriod {
  startDate
  endDate
  groupBy
}
    `;
export const SalesSummaryFragmentDoc = gql`
    fragment SalesSummary on SalesSummary {
  totalOrders
  totalRevenue
  completedOrders
  completedRevenue
  averageOrderValue
  conversionRate
}
    `;
export const PeriodRevenueFragmentDoc = gql`
    fragment PeriodRevenue on PeriodRevenue {
  period
  revenue
  orderCount
}
    `;
export const StatusRevenueFragmentDoc = gql`
    fragment StatusRevenue on StatusRevenue {
  status
  revenue
  orderCount
}
    `;
export const PaymentMethodRevenueFragmentDoc = gql`
    fragment PaymentMethodRevenue on PaymentMethodRevenue {
  paymentMethod
  revenue
  orderCount
}
    `;
export const WarehouseRevenueFragmentDoc = gql`
    fragment WarehouseRevenue on WarehouseRevenue {
  warehouseId
  warehouseName
  revenue
  orderCount
}
    `;
export const ProductSalesFragmentDoc = gql`
    fragment ProductSales on ProductSales {
  productId
  productName
  sku
  revenue
  quantitySold
  orderCount
}
    `;
export const CategorySalesFragmentDoc = gql`
    fragment CategorySales on CategorySales {
  categoryName
  revenue
  orderCount
}
    `;
export const CustomerReportPeriodFragmentDoc = gql`
    fragment CustomerReportPeriod on CustomerReportPeriod {
  startDate
  endDate
}
    `;
export const CustomerSummaryFragmentDoc = gql`
    fragment CustomerSummary on CustomerSummary {
  totalCustomers
  newCustomers
  averageLifetimeValue
  averageOrdersPerCustomer
}
    `;
export const TopCustomerFragmentDoc = gql`
    fragment TopCustomer on TopCustomer {
  userId
  email
  name
  revenue
  orderCount
}
    `;
export const ProductReportPeriodFragmentDoc = gql`
    fragment ProductReportPeriod on ProductReportPeriod {
  startDate
  endDate
}
    `;
export const ProductPerformanceFragmentDoc = gql`
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
export const CreditSummaryFragmentDoc = gql`
    fragment CreditSummary on CreditSummary {
  totalAccounts
  totalCreditLimit
  totalCreditBalance
  totalAvailableCredit
  utilizationRate
}
    `;
export const OverdueCustomerFragmentDoc = gql`
    fragment OverdueCustomer on OverdueCustomer {
  accountId
  userId
  userEmail
  userName
  creditBalance
  daysOverdue
}
    `;
export const DueSoonCustomerFragmentDoc = gql`
    fragment DueSoonCustomer on DueSoonCustomer {
  accountId
  userId
  userEmail
  userName
  creditBalance
  daysUntilDue
}
    `;
export const CreditDashboardSummaryFragmentDoc = gql`
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
export const GetSalesReportDocument = gql`
    query GetSalesReport($startDate: String, $endDate: String, $warehouseId: ID, $groupBy: String) {
  salesReport(
    startDate: $startDate
    endDate: $endDate
    warehouseId: $warehouseId
    groupBy: $groupBy
  ) {
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
    ${SalesReportPeriodFragmentDoc}
${SalesSummaryFragmentDoc}
${PeriodRevenueFragmentDoc}
${StatusRevenueFragmentDoc}
${PaymentMethodRevenueFragmentDoc}
${WarehouseRevenueFragmentDoc}
${ProductSalesFragmentDoc}
${CategorySalesFragmentDoc}`;

/**
 * __useGetSalesReportQuery__
 *
 * To run a query within a React component, call `useGetSalesReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesReportQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      warehouseId: // value for 'warehouseId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetSalesReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>(GetSalesReportDocument, options);
      }
export function useGetSalesReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>(GetSalesReportDocument, options);
        }
// @ts-ignore
export function useGetSalesReportSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>;
export function useGetSalesReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetSalesReportQuery | undefined, Types.GetSalesReportQueryVariables>;
export function useGetSalesReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>(GetSalesReportDocument, options);
        }
export type GetSalesReportQueryHookResult = ReturnType<typeof useGetSalesReportQuery>;
export type GetSalesReportLazyQueryHookResult = ReturnType<typeof useGetSalesReportLazyQuery>;
export type GetSalesReportSuspenseQueryHookResult = ReturnType<typeof useGetSalesReportSuspenseQuery>;
export type GetSalesReportQueryResult = Apollo.QueryResult<Types.GetSalesReportQuery, Types.GetSalesReportQueryVariables>;
export const GetCustomerReportDocument = gql`
    query GetCustomerReport($startDate: String, $endDate: String, $customerType: String) {
  customerReport(
    startDate: $startDate
    endDate: $endDate
    customerType: $customerType
  ) {
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
    ${CustomerReportPeriodFragmentDoc}
${CustomerSummaryFragmentDoc}
${TopCustomerFragmentDoc}`;

/**
 * __useGetCustomerReportQuery__
 *
 * To run a query within a React component, call `useGetCustomerReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerReportQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      customerType: // value for 'customerType'
 *   },
 * });
 */
export function useGetCustomerReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>(GetCustomerReportDocument, options);
      }
export function useGetCustomerReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>(GetCustomerReportDocument, options);
        }
// @ts-ignore
export function useGetCustomerReportSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>;
export function useGetCustomerReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCustomerReportQuery | undefined, Types.GetCustomerReportQueryVariables>;
export function useGetCustomerReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>(GetCustomerReportDocument, options);
        }
export type GetCustomerReportQueryHookResult = ReturnType<typeof useGetCustomerReportQuery>;
export type GetCustomerReportLazyQueryHookResult = ReturnType<typeof useGetCustomerReportLazyQuery>;
export type GetCustomerReportSuspenseQueryHookResult = ReturnType<typeof useGetCustomerReportSuspenseQuery>;
export type GetCustomerReportQueryResult = Apollo.QueryResult<Types.GetCustomerReportQuery, Types.GetCustomerReportQueryVariables>;
export const GetProductPerformanceReportDocument = gql`
    query GetProductPerformanceReport($startDate: String, $endDate: String, $categoryId: ID, $limit: Int) {
  productPerformanceReport(
    startDate: $startDate
    endDate: $endDate
    categoryId: $categoryId
    limit: $limit
  ) {
    period {
      ...ProductReportPeriod
    }
    products {
      ...ProductPerformance
    }
  }
}
    ${ProductReportPeriodFragmentDoc}
${ProductPerformanceFragmentDoc}`;

/**
 * __useGetProductPerformanceReportQuery__
 *
 * To run a query within a React component, call `useGetProductPerformanceReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductPerformanceReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductPerformanceReportQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      categoryId: // value for 'categoryId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetProductPerformanceReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>(GetProductPerformanceReportDocument, options);
      }
export function useGetProductPerformanceReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>(GetProductPerformanceReportDocument, options);
        }
// @ts-ignore
export function useGetProductPerformanceReportSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>;
export function useGetProductPerformanceReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetProductPerformanceReportQuery | undefined, Types.GetProductPerformanceReportQueryVariables>;
export function useGetProductPerformanceReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>(GetProductPerformanceReportDocument, options);
        }
export type GetProductPerformanceReportQueryHookResult = ReturnType<typeof useGetProductPerformanceReportQuery>;
export type GetProductPerformanceReportLazyQueryHookResult = ReturnType<typeof useGetProductPerformanceReportLazyQuery>;
export type GetProductPerformanceReportSuspenseQueryHookResult = ReturnType<typeof useGetProductPerformanceReportSuspenseQuery>;
export type GetProductPerformanceReportQueryResult = Apollo.QueryResult<Types.GetProductPerformanceReportQuery, Types.GetProductPerformanceReportQueryVariables>;
export const GetCreditReportDocument = gql`
    query GetCreditReport($creditType: String, $includeOverdue: Boolean, $includeDueSoon: Boolean) {
  creditReport(
    creditType: $creditType
    includeOverdue: $includeOverdue
    includeDueSoon: $includeDueSoon
  ) {
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
    ${CreditSummaryFragmentDoc}
${OverdueCustomerFragmentDoc}
${DueSoonCustomerFragmentDoc}`;

/**
 * __useGetCreditReportQuery__
 *
 * To run a query within a React component, call `useGetCreditReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditReportQuery({
 *   variables: {
 *      creditType: // value for 'creditType'
 *      includeOverdue: // value for 'includeOverdue'
 *      includeDueSoon: // value for 'includeDueSoon'
 *   },
 * });
 */
export function useGetCreditReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>(GetCreditReportDocument, options);
      }
export function useGetCreditReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>(GetCreditReportDocument, options);
        }
// @ts-ignore
export function useGetCreditReportSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>;
export function useGetCreditReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCreditReportQuery | undefined, Types.GetCreditReportQueryVariables>;
export function useGetCreditReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>(GetCreditReportDocument, options);
        }
export type GetCreditReportQueryHookResult = ReturnType<typeof useGetCreditReportQuery>;
export type GetCreditReportLazyQueryHookResult = ReturnType<typeof useGetCreditReportLazyQuery>;
export type GetCreditReportSuspenseQueryHookResult = ReturnType<typeof useGetCreditReportSuspenseQuery>;
export type GetCreditReportQueryResult = Apollo.QueryResult<Types.GetCreditReportQuery, Types.GetCreditReportQueryVariables>;
export const GetOverdueCustomersDocument = gql`
    query GetOverdueCustomers($daysOverdue: Int, $creditType: String, $page: Int, $pageSize: Int) {
  overdueCustomers(
    daysOverdue: $daysOverdue
    creditType: $creditType
    page: $page
    pageSize: $pageSize
  ) {
    customers {
      ...OverdueCustomer
    }
    count
    totalCount
    page
    pageSize
  }
}
    ${OverdueCustomerFragmentDoc}`;

/**
 * __useGetOverdueCustomersQuery__
 *
 * To run a query within a React component, call `useGetOverdueCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOverdueCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOverdueCustomersQuery({
 *   variables: {
 *      daysOverdue: // value for 'daysOverdue'
 *      creditType: // value for 'creditType'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetOverdueCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>(GetOverdueCustomersDocument, options);
      }
export function useGetOverdueCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>(GetOverdueCustomersDocument, options);
        }
// @ts-ignore
export function useGetOverdueCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>;
export function useGetOverdueCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetOverdueCustomersQuery | undefined, Types.GetOverdueCustomersQueryVariables>;
export function useGetOverdueCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>(GetOverdueCustomersDocument, options);
        }
export type GetOverdueCustomersQueryHookResult = ReturnType<typeof useGetOverdueCustomersQuery>;
export type GetOverdueCustomersLazyQueryHookResult = ReturnType<typeof useGetOverdueCustomersLazyQuery>;
export type GetOverdueCustomersSuspenseQueryHookResult = ReturnType<typeof useGetOverdueCustomersSuspenseQuery>;
export type GetOverdueCustomersQueryResult = Apollo.QueryResult<Types.GetOverdueCustomersQuery, Types.GetOverdueCustomersQueryVariables>;
export const GetDueSoonCustomersDocument = gql`
    query GetDueSoonCustomers($days: Int, $creditType: String, $page: Int, $pageSize: Int) {
  dueSoonCustomers(
    days: $days
    creditType: $creditType
    page: $page
    pageSize: $pageSize
  ) {
    customers {
      ...DueSoonCustomer
    }
    count
    totalCount
    page
    pageSize
  }
}
    ${DueSoonCustomerFragmentDoc}`;

/**
 * __useGetDueSoonCustomersQuery__
 *
 * To run a query within a React component, call `useGetDueSoonCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDueSoonCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDueSoonCustomersQuery({
 *   variables: {
 *      days: // value for 'days'
 *      creditType: // value for 'creditType'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetDueSoonCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>(GetDueSoonCustomersDocument, options);
      }
export function useGetDueSoonCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>(GetDueSoonCustomersDocument, options);
        }
// @ts-ignore
export function useGetDueSoonCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>;
export function useGetDueSoonCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetDueSoonCustomersQuery | undefined, Types.GetDueSoonCustomersQueryVariables>;
export function useGetDueSoonCustomersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>(GetDueSoonCustomersDocument, options);
        }
export type GetDueSoonCustomersQueryHookResult = ReturnType<typeof useGetDueSoonCustomersQuery>;
export type GetDueSoonCustomersLazyQueryHookResult = ReturnType<typeof useGetDueSoonCustomersLazyQuery>;
export type GetDueSoonCustomersSuspenseQueryHookResult = ReturnType<typeof useGetDueSoonCustomersSuspenseQuery>;
export type GetDueSoonCustomersQueryResult = Apollo.QueryResult<Types.GetDueSoonCustomersQuery, Types.GetDueSoonCustomersQueryVariables>;
export const GetCreditSummaryDocument = gql`
    query GetCreditSummary($creditType: String, $daysAhead: Int) {
  creditSummary(creditType: $creditType, daysAhead: $daysAhead) {
    ...CreditDashboardSummary
  }
}
    ${CreditDashboardSummaryFragmentDoc}`;

/**
 * __useGetCreditSummaryQuery__
 *
 * To run a query within a React component, call `useGetCreditSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditSummaryQuery({
 *   variables: {
 *      creditType: // value for 'creditType'
 *      daysAhead: // value for 'daysAhead'
 *   },
 * });
 */
export function useGetCreditSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>(GetCreditSummaryDocument, options);
      }
export function useGetCreditSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>(GetCreditSummaryDocument, options);
        }
// @ts-ignore
export function useGetCreditSummarySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>;
export function useGetCreditSummarySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetCreditSummaryQuery | undefined, Types.GetCreditSummaryQueryVariables>;
export function useGetCreditSummarySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>(GetCreditSummaryDocument, options);
        }
export type GetCreditSummaryQueryHookResult = ReturnType<typeof useGetCreditSummaryQuery>;
export type GetCreditSummaryLazyQueryHookResult = ReturnType<typeof useGetCreditSummaryLazyQuery>;
export type GetCreditSummarySuspenseQueryHookResult = ReturnType<typeof useGetCreditSummarySuspenseQuery>;
export type GetCreditSummaryQueryResult = Apollo.QueryResult<Types.GetCreditSummaryQuery, Types.GetCreditSummaryQueryVariables>;
export const GetProfitReportDocument = gql`
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

/**
 * __useGetProfitReportQuery__
 *
 * To run a query within a React component, call `useGetProfitReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfitReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfitReportQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetProfitReportQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>(GetProfitReportDocument, options);
      }
export function useGetProfitReportLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>(GetProfitReportDocument, options);
        }
// @ts-ignore
export function useGetProfitReportSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>;
export function useGetProfitReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<Types.GetProfitReportQuery | undefined, Types.GetProfitReportQueryVariables>;
export function useGetProfitReportSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>(GetProfitReportDocument, options);
        }
export type GetProfitReportQueryHookResult = ReturnType<typeof useGetProfitReportQuery>;
export type GetProfitReportLazyQueryHookResult = ReturnType<typeof useGetProfitReportLazyQuery>;
export type GetProfitReportSuspenseQueryHookResult = ReturnType<typeof useGetProfitReportSuspenseQuery>;
export type GetProfitReportQueryResult = Apollo.QueryResult<Types.GetProfitReportQuery, Types.GetProfitReportQueryVariables>;
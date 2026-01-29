# Component Update Guide - Using Generated Types

This guide shows how to update each component after running `npm run codegen`.

## Prerequisites

1. ✅ Dependencies installed: `npm install`
2. ✅ Types generated: `npm run codegen`
3. ✅ Verify generated files exist in `src/lib/graphql/generated/`

## Update Pattern

### 1. SalesReportView.tsx

#### Before:
```typescript
import { useQuery } from '@apollo/client';
import { GET_SALES_REPORT } from '@/lib/graphql/queries/sales-reports-queries';

const { data, loading, error, refetch } = useQuery(GET_SALES_REPORT, {
  variables: { startDate: '...', endDate: '...' }
});

const report = data?.salesReport;
report.revenueByPeriod.map((item: any) => ...)
```

#### After:
```typescript
import { 
  useSalesReportQuery,
  SalesReportQueryVariables,
  PeriodRevenue
} from '@/lib/graphql/generated';

const { data, loading, error, refetch } = useSalesReportQuery({
  variables: {
    startDate: `${startDate}T00:00:00Z`,
    endDate: `${endDate}T23:59:59Z`,
    groupBy,
    warehouseId: warehouseId || null,
  } as SalesReportQueryVariables,
  fetchPolicy: 'network-only',
});

const report = data?.salesReport;
report?.revenueByPeriod.map((item: PeriodRevenue) => [
  item.period,
  item.revenue.toFixed(2),
  item.orderCount,
])
```

### 2. CustomerReportView.tsx

#### After:
```typescript
import { 
  useCustomerReportQuery,
  CustomerReportQueryVariables,
  TopCustomer
} from '@/lib/graphql/generated';

const { data, loading, error } = useCustomerReportQuery({
  variables: {
    startDate: `${startDate}T00:00:00Z`,
    endDate: `${endDate}T23:59:59Z`,
    customerType: customerType || null,
  } as CustomerReportQueryVariables,
});

const report = data?.customerReport;
report?.topCustomers.map((customer: TopCustomer) => ...)
```

### 3. ProductPerformanceView.tsx

#### After:
```typescript
import { 
  useProductPerformanceReportQuery,
  ProductPerformanceReportQueryVariables,
  ProductPerformance
} from '@/lib/graphql/generated';

const { data, loading, error } = useProductPerformanceReportQuery({
  variables: {
    startDate: `${startDate}T00:00:00Z`,
    endDate: `${endDate}T23:59:59Z`,
    categoryId: categoryId || null,
    limit: 20,
  } as ProductPerformanceReportQueryVariables,
});

const report = data?.productPerformanceReport;
report?.products.map((product: ProductPerformance) => ...)
```

### 4. CreditReportView.tsx

#### After:
```typescript
import { 
  useCreditReportQuery,
  CreditReportQueryVariables,
  OverdueCustomer,
  DueSoonCustomer
} from '@/lib/graphql/generated';

const { data, loading, error } = useCreditReportQuery({
  variables: {
    creditType: creditType || null,
    includeOverdue: true,
    includeDueSoon: true,
  } as CreditReportQueryVariables,
});

const report = data?.creditReport;
report?.overdueCustomers.map((customer: OverdueCustomer) => ...)
report?.dueSoonCustomers.map((customer: DueSoonCustomer) => ...)
```

### 5. OverdueCustomersView.tsx

#### After:
```typescript
import { 
  useOverdueCustomersQuery,
  OverdueCustomersQueryVariables,
  OverdueCustomer
} from '@/lib/graphql/generated';

const { data, loading, error } = useOverdueCustomersQuery({
  variables: {
    daysOverdue: daysOverdue || 0,
    creditType: creditType || null,
    page: currentPage,
    pageSize: 20,
  } as OverdueCustomersQueryVariables,
});

const customers = data?.overdueCustomers?.customers || [];
customers.map((customer: OverdueCustomer) => ...)
```

### 6. DueSoonCustomersView.tsx

#### After:
```typescript
import { 
  useDueSoonCustomersQuery,
  DueSoonCustomersQueryVariables,
  DueSoonCustomer
} from '@/lib/graphql/generated';

const { data, loading, error } = useDueSoonCustomersQuery({
  variables: {
    days: days || 7,
    creditType: creditType || null,
    page: currentPage,
    pageSize: 20,
  } as DueSoonCustomersQueryVariables,
});

const customers = data?.dueSoonCustomers?.customers || [];
customers.map((customer: DueSoonCustomer) => ...)
```

### 7. AuthContext.tsx

#### After:
```typescript
import { 
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  LoginMutationVariables,
  RefreshTokenMutationVariables,
  User
} from '@/lib/graphql/generated/auth';
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION, LOGOUT_MUTATION } from '@/lib/graphql/operations/mutations/auth-mutations';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [refreshMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  // Remove temporary User interface, use generated User type
  // interface User { ... } // DELETE THIS

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await loginMutation({
          variables: { 
            email, 
            password, 
            app: "SALES_REPORTS" 
          } as LoginMutationVariables,
          context: { endpoint: '/graphql/auth' },
        });

        if (data?.login) {
          const { accessToken, refreshToken, expiresAt, user } = data.login;
          // user is now typed as User from generated types
          // ...
        }
      } catch (error) {
        // ...
      }
    },
    [loginMutation]
  );

  // Similar updates for refreshToken and logout...
}
```

## Common Patterns

### Type Imports
```typescript
// Import from main generated index
import { 
  useSalesReportQuery,
  SalesReport,
  SalesReportQueryVariables,
  PeriodRevenue,
  StatusRevenue,
  PaymentMethodRevenue,
  WarehouseRevenue,
  ProductSales,
  CategorySales
} from '@/lib/graphql/generated';

// Import from auth generated index
import {
  useLoginMutation,
  User,
  LoginMutationVariables
} from '@/lib/graphql/generated/auth';
```

### Using Generated Hooks
```typescript
// Instead of useQuery, use generated hook
const { data, loading, error, refetch } = useSalesReportQuery({
  variables: {
    // Typed variables
  } as SalesReportQueryVariables,
  fetchPolicy: 'network-only',
});
```

### Type-Safe Data Access
```typescript
// Data is now properly typed
const report: SalesReport | undefined = data?.salesReport;

// Array items are typed
report?.revenueByPeriod.forEach((item: PeriodRevenue) => {
  // item.period, item.revenue, item.orderCount are all typed
});
```

### Error Handling
```typescript
// Error is properly typed
if (error) {
  // error.message, error.graphQLErrors, etc. are typed
  console.error('GraphQL Error:', error.message);
}
```

## Verification Steps

After updating each component:

1. **Type Check**: `npm run type-check`
2. **Lint**: `npm run lint`
3. **Build**: `npm run build` (should succeed)
4. **Test**: Run the app and verify functionality

## Troubleshooting

### "Cannot find module '@/lib/graphql/generated'"
- Run `npm run codegen` first
- Check that `src/lib/graphql/generated/index.ts` exists

### "Type 'X' is not assignable to type 'Y'"
- Regenerate types: `npm run codegen`
- Check that fragments match schema
- Verify variable types match query signature

### "Property 'X' does not exist on type 'Y'"
- Check fragment includes the field
- Regenerate types after updating fragments
- Verify schema has the field

## Next Steps

After updating all components:
1. Remove all `any` type annotations
2. Remove temporary type definitions
3. Remove TODO comments
4. Run full type check: `npm run type-check`
5. Test all report views
6. Commit changes

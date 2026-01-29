# Migration Guide: Using Generated GraphQL Types

## Prerequisites

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Types** (requires API Gateway running on localhost:8000):
   ```bash
   npm run codegen
   ```

   This generates:
   - `src/lib/graphql/generated/types.ts` - All GraphQL types
   - `src/lib/graphql/generated/hooks.ts` - React Apollo hooks
   - `src/lib/graphql/generated/operations.ts` - Operation documents
   - `src/lib/graphql/generated/auth/types.ts` - Auth types
   - `src/lib/graphql/generated/auth/hooks.ts` - Auth hooks

## Migration Steps

### Step 1: Update Imports

#### Before:
```typescript
import { useQuery } from '@apollo/client';
import { GET_SALES_REPORT } from '@/lib/graphql/queries/sales-reports-queries';
```

#### After:
```typescript
import { 
  useSalesReportQuery,
  SalesReportQuery,
  SalesReportQueryVariables,
  SalesReport,
  RevenueByPeriod
} from '@/lib/graphql/generated';
```

### Step 2: Replace useQuery with Generated Hooks

#### Before:
```typescript
const { data, loading, error, refetch } = useQuery(GET_SALES_REPORT, {
  variables: {
    startDate: `${startDate}T00:00:00Z`,
    endDate: `${endDate}T23:59:59Z`,
    groupBy,
    warehouseId: warehouseId || null,
  },
  fetchPolicy: 'network-only',
});
```

#### After:
```typescript
const { data, loading, error, refetch } = useSalesReportQuery({
  variables: {
    startDate: `${startDate}T00:00:00Z`,
    endDate: `${endDate}T23:59:59Z`,
    groupBy,
    warehouseId: warehouseId || null,
  } as SalesReportQueryVariables,
  fetchPolicy: 'network-only',
});
```

### Step 3: Replace `any` Types with Generated Types

#### Before:
```typescript
const report = data?.salesReport;
report.revenueByPeriod.map((item: any) => [
  item.period,
  item.revenue.toFixed(2),
  item.orderCount,
]);
```

#### After:
```typescript
const report: SalesReport | undefined = data?.salesReport;
report?.revenueByPeriod.map((item: RevenueByPeriod) => [
  item.period,
  item.revenue.toFixed(2),
  item.orderCount,
]);
```

### Step 4: Update AuthContext

#### Before:
```typescript
const LOGIN_MUTATION = gql`...`;
interface User { ... }
```

#### After:
```typescript
import { 
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  LoginMutation,
  LoginMutationVariables,
  User
} from '@/lib/graphql/generated/auth';
import { LOGIN_MUTATION } from '@/lib/graphql/operations/mutations/auth-mutations';

const [loginMutation] = useLoginMutation();
```

## Available Generated Types

After running `npm run codegen`, you'll have access to:

### Sales Reports Types
- `SalesReport`
- `SalesReportQuery`
- `SalesReportQueryVariables`
- `SalesReportSummary`
- `RevenueByPeriod`
- `RevenueByStatus`
- `RevenueByPaymentMethod`
- `RevenueByWarehouse`
- `TopProduct`
- `TopCategory`
- `CustomerReport`
- `ProductPerformance`
- `CreditReport`
- `OverdueCustomer`
- `DueSoonCustomer`
- `CreditSummary`

### Auth Types
- `User`
- `LoginMutation`
- `LoginMutationVariables`
- `RefreshTokenMutation`
- `RefreshTokenMutationVariables`
- `LogoutMutation`
- `AuthPayload`

### Hooks
- `useSalesReportQuery`
- `useCustomerReportQuery`
- `useProductPerformanceReportQuery`
- `useCreditReportQuery`
- `useOverdueCustomersQuery`
- `useDueSoonCustomersQuery`
- `useCreditSummaryQuery`
- `useLoginMutation`
- `useRefreshTokenMutation`
- `useLogoutMutation`

## Type Safety Benefits

1. **Autocomplete**: IDE will suggest available fields
2. **Type Checking**: TypeScript will catch errors at compile time
3. **Refactoring Safety**: Renaming fields will update all usages
4. **Documentation**: Types serve as inline documentation
5. **Consistency**: Fragments ensure consistent field selection

## Troubleshooting

### Types Not Found
- Ensure `npm run codegen` has been run
- Check that API Gateway is running on `http://localhost:8000`
- Verify codegen config files are correct

### Type Errors
- Check that fragments match the schema
- Ensure all required fields are selected
- Verify variable types match the schema

### Import Errors
- Use `@/lib/graphql/generated` for main types
- Use `@/lib/graphql/generated/auth` for auth types
- Check that `src/lib/graphql/generated/index.ts` exports correctly

# GraphQL Types Setup for Sales Reports App

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Ensure API Gateway is running**:
   - The codegen needs the GraphQL endpoints to be available
   - Start the backend: `make start-backend` (from root)
   - Or ensure API Gateway is running on `http://localhost:8000`

3. **Generate types**:
   ```bash
   npm run codegen
   ```

   This will generate:
   - `src/lib/graphql/generated/types.ts` - All GraphQL types
   - `src/lib/graphql/generated/hooks.ts` - React Apollo hooks
   - `src/lib/graphql/generated/operations.ts` - Operation documents
   - `src/lib/graphql/generated/auth/types.ts` - Auth types
   - `src/lib/graphql/generated/auth/hooks.ts` - Auth hooks

4. **Update components** to use generated types (see `MIGRATION_TO_TYPES.md`)

## Codegen Scripts

- `npm run codegen` - Generate all types (sales-reports + auth)
- `npm run codegen:sales-reports` - Generate only sales-reports types
- `npm run codegen:auth` - Generate only auth types
- `npm run codegen:watch` - Watch mode (auto-regenerate on schema changes)
- `npm run codegen:sync` - Alias for `npm run codegen`

## File Structure

```
src/lib/graphql/
├── generated/              # Auto-generated (DO NOT EDIT)
│   ├── index.ts
│   ├── types.ts
│   ├── hooks.ts
│   ├── operations.ts
│   └── auth/
│       ├── types.ts
│       ├── hooks.ts
│       └── operations.ts
├── operations/             # GraphQL operations (queries, mutations, fragments)
│   ├── queries/
│   │   ├── sales-reports-queries.ts
│   │   └── auth-queries.ts
│   ├── mutations/
│   │   └── auth-mutations.ts
│   └── fragments/
│       └── report-fragments.ts
└── queries/                # Deprecated (kept for backward compatibility)
    └── sales-reports-queries.ts
```

## Using Generated Types

### Import Pattern

```typescript
// Import from generated index
import { 
  useSalesReportQuery,
  SalesReport,
  SalesReportQueryVariables,
  RevenueByPeriod
} from '@/lib/graphql/generated';

// Import auth types
import {
  useLoginMutation,
  User,
  LoginMutationVariables
} from '@/lib/graphql/generated/auth';
```

### Example Usage

```typescript
import { useSalesReportQuery, SalesReport, RevenueByPeriod } from '@/lib/graphql/generated';

function SalesReportComponent() {
  const { data, loading, error } = useSalesReportQuery({
    variables: {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    },
  });

  const report: SalesReport | undefined = data?.salesReport;
  
  if (report) {
    report.revenueByPeriod.forEach((item: RevenueByPeriod) => {
      console.log(item.period, item.revenue);
    });
  }
}
```

## Troubleshooting

### "Cannot find module '@/lib/graphql/generated'"
- Run `npm run codegen` first
- Check that `src/lib/graphql/generated/index.ts` exists

### "Type 'X' is not assignable to type 'Y'"
- Regenerate types: `npm run codegen`
- Check that fragments match the schema
- Verify API Gateway is running and accessible

### Codegen fails with connection error
- Ensure API Gateway is running on `http://localhost:8000`
- Check network connectivity
- Verify endpoints are accessible: `curl http://localhost:8000/graphql/sales-reports`

## Next Steps

After generating types, update components to use them:
1. Replace `useQuery` with generated hooks
2. Replace `any` types with generated types
3. Use typed variables for queries/mutations
4. See `MIGRATION_TO_TYPES.md` for detailed migration guide

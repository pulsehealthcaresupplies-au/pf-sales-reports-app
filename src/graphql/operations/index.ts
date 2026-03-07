/**
 * Sales Reports App GraphQL Operations
 * Centralized export of all GraphQL operations
 */

// Prefix-based operations (recommended)
export * from './sales-reports-prefixed';

// Comprehensive prefix-based operations
export * from './sales-reports-prefixed-operations';

// Subscriptions
export * from './subscriptions';

// Xero status (for sales-reports dashboard)
export * from './xero';

// Legacy operations (for backward compatibility)
export * from '../../lib/graphql/operations/queries/sales-reports-queries';

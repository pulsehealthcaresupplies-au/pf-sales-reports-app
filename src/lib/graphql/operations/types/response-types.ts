/**
 * Request state and hook types for GraphQL operations.
 * Used by RequestStateWrapper and useRequestState.
 */

export type RequestState = 'idle' | 'loading' | 'success' | 'error';

export interface RequestStateHook<T = unknown> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  state: RequestState;
  refetch?: () => Promise<unknown>;
}

/**
 * Request State Hook
 * 
 * Provides consistent request state management (loading, error, success, idle)
 * for all GraphQL operations with proper type safety.
 * 
 * Supports both standard Apollo Client query results and Next.js App Router Result types.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { ApolloQueryResult } from '@apollo/client';
import type { RequestState, RequestStateHook } from '@/lib/graphql/operations/types/response-types';

type ApolloError = Error & {
    graphQLErrors?: unknown[];
    networkError?: Error | null;
    extraInfo?: unknown;
};

interface UseRequestStateOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    autoRefetch?: boolean;
    refetchInterval?: number;
}

// Type guard to check if result is a Next.js App Router Result type
function isNextJsResult<T>(result: unknown): result is { data?: T; dataState?: string; loading?: boolean; error?: unknown; refetch?: () => Promise<unknown> } {
    return !!result && typeof result === 'object' && 'dataState' in result;
}

// Type guard to check if result is a standard Apollo Client query result
function isStandardApolloResult<T>(result: unknown): result is { data?: T | null; loading: boolean; error?: ApolloError | null; refetch?: () => Promise<ApolloQueryResult<T>> } {
    return !!result && typeof result === 'object' && 'loading' in result && typeof (result as { loading: unknown }).loading === 'boolean';
}

/**
 * Hook for managing request state with loading, error, and success states
 * Supports both standard Apollo Client query results and Next.js App Router Result types
 */
export function useRequestState<T>(
    queryResult: unknown,
    options: UseRequestStateOptions<T> = {}
): RequestStateHook<T> {
    const { onSuccess, onError, autoRefetch = false, refetchInterval } = options;

    const [state, setState] = useState<RequestState>('idle');
    const [error, setError] = useState<Error | null>(null);

    // Normalize the query result to a standard format
    const normalizedResult = (() => {
        if (isNextJsResult<T>(queryResult)) {
            // Next.js App Router Result type
            return {
                data: queryResult.data,
                loading: queryResult.loading ?? (queryResult.dataState === 'empty' || queryResult.dataState === 'streaming'),
                error: queryResult.error ? (queryResult.error instanceof Error ? queryResult.error : new Error(String(queryResult.error))) : null,
                refetch: queryResult.refetch ? async () => {
                    if (queryResult.refetch) {
                        const result = await queryResult.refetch();
                        return result as ApolloQueryResult<T>;
                    }
                    return {} as ApolloQueryResult<T>;
                } : undefined,
            };
        } else if (isStandardApolloResult<T>(queryResult)) {
            // Standard Apollo Client query result
            return queryResult;
        } else {
            // Fallback: try to extract common properties (queryResult is unknown)
            const q = queryResult as { data?: T | null; loading?: boolean; error?: unknown; refetch?: () => Promise<ApolloQueryResult<T>> } | null | undefined;
            return {
                data: q?.data ?? null,
                loading: q?.loading ?? false,
                error: q?.error ? (q.error instanceof Error ? q.error : new Error(String(q.error))) : null,
                refetch: q?.refetch,
            };
        }
    })();

    // Update state based on query result
    useEffect(() => {
        // Defer setState calls to avoid synchronous state updates in effects
        if (normalizedResult.loading) {
            queueMicrotask(() => {
                setState('loading');
                setError(null);
            });
        } else if (normalizedResult.error) {
            queueMicrotask(() => {
                setState('error');
                const err = normalizedResult.error instanceof Error ? normalizedResult.error : new Error(String(normalizedResult.error));
                setError(err);
                onError?.(err);
            });
        } else if (normalizedResult.data != null) {
            const data = normalizedResult.data;
            queueMicrotask(() => {
                setState('success');
                setError(null);
                onSuccess?.(data);
            });
        } else {
            queueMicrotask(() => {
                setState('idle');
            });
        }
    }, [normalizedResult.loading, normalizedResult.error, normalizedResult.data, onSuccess, onError]);

    const refetchFnRef = useRef(normalizedResult.refetch);
    // Update ref in effect to avoid accessing ref.current during render
    useEffect(() => {
        refetchFnRef.current = normalizedResult.refetch;
    }, [normalizedResult.refetch]);

    // Auto-refetch functionality
    useEffect(() => {
        if (autoRefetch && refetchInterval && normalizedResult.refetch) {
            const interval = setInterval(() => {
                refetchFnRef.current?.();
            }, refetchInterval);

            return () => clearInterval(interval);
        }
    }, [autoRefetch, refetchInterval, normalizedResult.refetch]);

    const refetch = useCallback(async () => {
        const fn = refetchFnRef.current;
        if (fn) {
            setState('loading');
            try {
                await fn();
            } catch (err) {
                setState('error');
                setError(err instanceof Error ? err : new Error('Refetch failed'));
            }
        }
    }, []);

    return {
        data: normalizedResult.data ?? null,
        loading: normalizedResult.loading,
        error,
        state,
        refetch,
    };
}

/**
 * Hook for mutation state management
 * @typeParam TData - mutation result data type
 * @typeParam _TVariables - mutation variables type (reserved for API)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- type param for API
export function useMutationState<TData, _TVariables = Record<string, unknown>>(
    mutationResult: {
        data?: TData | null;
        loading: boolean;
        error?: ApolloError | null;
    },
    options: UseRequestStateOptions<TData> = {}
): Omit<RequestStateHook<TData>, 'refetch'> & { reset: () => void } {
    const { onSuccess, onError } = options;

    const [state, setState] = useState<RequestState>('idle');
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Defer setState calls to avoid synchronous state updates in effects
        if (mutationResult.loading) {
            queueMicrotask(() => {
                setState('loading');
                setError(null);
            });
        } else if (mutationResult.error) {
            queueMicrotask(() => {
                setState('error');
                const err = new Error(mutationResult.error?.message ?? 'An error occurred');
                setError(err);
                onError?.(err);
            });
        } else if (mutationResult.data != null) {
            const data = mutationResult.data;
            queueMicrotask(() => {
                setState('success');
                setError(null);
                onSuccess?.(data);
            });
        } else {
            queueMicrotask(() => {
                setState('idle');
            });
        }
    }, [mutationResult.loading, mutationResult.error, mutationResult.data, onSuccess, onError]);

    const reset = useCallback(() => {
        setState('idle');
        setError(null);
    }, []);

    return {
        data: mutationResult.data ?? null,
        loading: mutationResult.loading,
        error,
        state,
        reset,
    };
}

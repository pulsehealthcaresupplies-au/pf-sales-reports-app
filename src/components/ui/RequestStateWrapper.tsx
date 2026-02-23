'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { RequestState } from '@/lib/graphql/operations/types/response-types';
import { ROUTES } from '@/config/routes';
import { getApiErrorMessage, toApiErrorLike, isAuthErrorFromError } from '@/utils/api-response';
import { DashboardSkeleton, TableSkeleton, CardSkeleton, ListSkeleton, ReportChartSkeleton } from '@/components/loading-skeleton';

interface RequestStateWrapperProps {
    state: RequestState;
    loading?: boolean;
    error?: Error | null;
    children: ReactNode;
    skeleton?: 'dashboard' | 'table' | 'card' | 'list' | 'report-chart' | ReactNode;
    skeletonProps?: {
        rows?: number;
        columns?: number;
        count?: number;
    };
    onError?: (error: Error) => void;
    redirectOnAuthError?: boolean;
    redirectPath?: string;
}

/**
 * RequestStateWrapper
 * 
 * Wraps components with request state handling:
 * - Shows loading skeleton during loading state
 * - Handles error states with optional redirect
 * - Shows children on success
 * - Handles authentication errors with redirect
 */
export function RequestStateWrapper({
    state,
    loading,
    error,
    children,
    skeleton = 'dashboard',
    skeletonProps,
    onError,
    redirectOnAuthError = true,
    redirectPath = ROUTES.AUTH.LOGIN,
}: RequestStateWrapperProps) {
    const router = useRouter();

    // Handle authentication errors (use standard code/status from API Gateway)
    useEffect(() => {
        if (error && redirectOnAuthError) {
            const isAuth =
                isAuthErrorFromError(error as { message?: string; extensions?: { code?: string; statusCode?: number }; statusCode?: number }) ||
                error.message?.toLowerCase().includes('unauthenticated') ||
                error.message?.toLowerCase().includes('unauthorized') ||
                error.message?.toLowerCase().includes('token');

            if (isAuth) {
                router.push(redirectPath);
                return;
            }
        }

        if (error && onError) {
            onError(error);
        }
    }, [error, redirectOnAuthError, redirectPath, router, onError]);

    // Loading state
    if (state === 'loading' || loading) {
        if (typeof skeleton === 'string') {
            switch (skeleton) {
                case 'dashboard':
                    return <DashboardSkeleton />;
                case 'table':
                    return <TableSkeleton rows={skeletonProps?.rows} columns={skeletonProps?.columns} />;
                case 'card':
                    return <CardSkeleton />;
                case 'list':
                    return <ListSkeleton count={skeletonProps?.count} />;
                case 'report-chart':
                    return <ReportChartSkeleton />;
                default:
                    return <DashboardSkeleton />;
            }
        }
        return <>{skeleton}</>;
    }

    // Error state
    if (state === 'error' && error) {
        const isAuth =
            isAuthErrorFromError(error as { message?: string; extensions?: { code?: string; statusCode?: number }; statusCode?: number }) ||
            error.message?.toLowerCase().includes('unauthenticated') ||
            error.message?.toLowerCase().includes('unauthorized') ||
            error.message?.toLowerCase().includes('token');

        if (isAuth && redirectOnAuthError) {
            return null; // Will redirect
        }

        const displayMessage = getApiErrorMessage(toApiErrorLike(error));

        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                        Error Loading Data
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{displayMessage}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Success or idle state
    return <>{children}</>;
}

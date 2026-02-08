'use client';

import React from 'react';
import { useBackendHealth } from '@/hooks/useBackendHealth';
import { BackendUnavailableBanner } from './BackendUnavailableBanner';

export interface BackendHealthGateProps {
  apiBaseUrl: string;
  children: React.ReactNode;
  variant?: 'maintenance' | 'coming-soon' | 'custom';
  pollIntervalMs?: number;
}

export function BackendHealthGate({
  apiBaseUrl,
  children,
  variant = 'maintenance',
  pollIntervalMs = 60 * 1000,
}: BackendHealthGateProps) {
  const { isHealthy, isLoading, retry } = useBackendHealth(apiBaseUrl, {
    pollIntervalMs: pollIntervalMs || undefined,
    disabled: !apiBaseUrl,
  });

  return (
    <>
      {!isLoading && !isHealthy && (
        <BackendUnavailableBanner variant={variant} onRetry={retry} />
      )}
      {children}
    </>
  );
}

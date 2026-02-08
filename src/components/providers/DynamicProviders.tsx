'use client';

import type { ReactNode } from 'react';
import { Providers } from '@/components/providers/Providers';

interface DynamicProvidersProps {
  children: ReactNode;
  apiBaseUrl?: string;
}

/**
 * Client-only wrapper for app providers.
 * Uses direct import (no dynamic + ssr:false) to avoid ChunkLoadError.
 * Providers already guards with mounted state to prevent hydration mismatch.
 */
export function DynamicProviders({ children, apiBaseUrl = '' }: DynamicProvidersProps) {
  return <Providers apiBaseUrl={apiBaseUrl}>{children}</Providers>;
}

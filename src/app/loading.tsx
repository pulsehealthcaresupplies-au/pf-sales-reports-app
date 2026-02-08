'use client';

import { PageLoading } from '@/components/LoadingSpinner';

/** Route transition: heart pulse loader. Use custom `text` per route by adding loading.tsx in that segment. */
export default function Loading() {
  return <PageLoading text="Loading..." />;
}

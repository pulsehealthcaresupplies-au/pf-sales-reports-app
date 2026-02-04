'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { ROUTES } from '@/config/routes';
import { Spinner } from '@heroui/react';

/**
 * Home Page
 * 
 * Redirects authenticated users to dashboard
 * Redirects unauthenticated users to login
 */
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace(ROUTES.AUTH.LOGIN);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-default-500">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}

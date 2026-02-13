'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApolloProvider } from '@apollo/client/react';
import { getApolloClient, setRouterInstance } from '@/lib/apollo/client';
import { AuthProvider, useAuth } from '@/lib/auth/AuthContext';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { Toaster, toast } from 'sonner';
import { BackendHealthGate } from '@/components/BackendHealthGate';
import { InactivityProvider } from '@/components/providers/InactivityProvider';
import { useInactivityTimeoutConfig } from '@/hooks/useInactivityTimeoutConfig';
import { ROUTES } from '@/config/routes';

interface ProvidersProps {
  children: ReactNode;
  apiBaseUrl?: string;
}

/**
 * Client Providers Component
 * 
 * Wraps the app with all necessary providers:
 * - ThemeProvider: Theme management (light/dark/system)
 * - ApolloProvider: GraphQL client with authentication
 * - AuthProvider: Authentication context and state management
 * - Toaster: Toast notifications
 * 
 * SECURITY: Providers are ordered to ensure proper authentication flow
 */
function InactivityWrapper({ children }: { children: ReactNode }) {
  const { refreshAccessToken } = useAuth();
  const inactivityTimeout = useInactivityTimeoutConfig();
  
  return (
    <InactivityProvider
      appName="SALES_REPORTS"
      tokenKey="sales_reports_access_token"
      refreshTokenKey="sales_reports_refresh_token"
      loginRoute={ROUTES.AUTH.LOGIN}
      inactivityPeriod={inactivityTimeout}
      onRefreshToken={async () => {
        await refreshAccessToken();
      }}
    >
      {children}
    </InactivityProvider>
  );
}

export function Providers({ children, apiBaseUrl = '' }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set router instance for Apollo Client error links to use Next.js navigation
    setRouterInstance(router);

    // Defer setState to avoid synchronous state updates in effects
    queueMicrotask(() => {
      setMounted(true);
    });

    const handleTokenExpired = (event: CustomEvent) => {
      const message = event.detail?.message || 'Your session has expired. Please log in again.';
      toast.error('Session Expired', {
        description: message,
        duration: 5000,
      });
    };
    window.addEventListener('auth:token-expired', handleTokenExpired as EventListener);
    return () => {
      window.removeEventListener('auth:token-expired', handleTokenExpired as EventListener);
    };
  }, [router]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <BackendHealthGate apiBaseUrl={apiBaseUrl}>
      <ThemeProvider>
        <ApolloProvider client={getApolloClient()}>
          <AuthProvider>
            <InactivityWrapper>
              {children}
              <Toaster position="top-right" richColors />
            </InactivityWrapper>
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </BackendHealthGate>
  );
}

'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { getApolloClient } from '@/lib/apollo/client';
import { AuthProvider, useAuth } from '@/lib/auth/AuthContext';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { Toaster } from 'sonner';
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

  useEffect(() => {
    // Defer setState to avoid synchronous state updates in effects
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

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

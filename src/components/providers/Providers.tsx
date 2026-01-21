'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { getApolloClient } from '@/lib/apollo/client';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
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
export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <ApolloProvider client={getApolloClient()}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

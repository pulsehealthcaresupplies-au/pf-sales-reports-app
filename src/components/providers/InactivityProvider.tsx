/**
 * Inactivity Provider Component for Sales Reports App
 * 
 * Wraps the app and provides inactivity timeout functionality.
 * Customized for Sales Reports App with app-specific auth utilities and GraphQL mutations.
 */

'use client';

import { ReactNode, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { InactivityWarningModal } from '@/components/InactivityWarningModal';
import { clearTokens, getAccessToken } from '@/lib/auth/token-manager';
import { ROUTES } from '@/config/routes';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/AuthContext';

export interface InactivityProviderProps {
  children: ReactNode;
  /** App name for activity tracking */
  appName: string;
  /** Token key in localStorage */
  tokenKey?: string;
  /** Refresh token key in localStorage */
  refreshTokenKey?: string;
  /** Login route */
  loginRoute?: string;
  /** Custom logout handler */
  onLogout?: () => Promise<void> | void;
  /** Custom token refresh handler - called when user confirms to stay logged in */
  onRefreshToken?: () => Promise<void>;
  /** Inactivity period in milliseconds (default: 5 minutes) */
  inactivityPeriod?: number;
  /** Warning period in milliseconds (default: 30 seconds) */
  warningPeriod?: number;
}

export function InactivityProvider({
  children,
  appName,
  tokenKey = 'sales_reports_access_token',
  refreshTokenKey = 'sales_reports_refresh_token',
  loginRoute = ROUTES.AUTH.LOGIN,
  onLogout,
  onRefreshToken,
  inactivityPeriod = 5 * 60 * 1000, // Default: 5 minutes
  warningPeriod = 30 * 1000, // Default: 30 seconds
}: InactivityProviderProps) {
  const router = useRouter();
  const { logout: authLogout, refreshAccessToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle logout
  const handleLogout = useCallback(async () => {
    if (onLogout) {
      await onLogout();
    } else {
      // Use auth logout if available, otherwise clear tokens and redirect
      try {
        if (authLogout) {
          await authLogout();
        } else {
          // Fallback: clear tokens manually
          clearTokens();
          router.push(loginRoute);
        }
      } catch (error) {
        console.error('[InactivityProvider] Error during logout:', error);
        // Fallback: clear tokens manually
        clearTokens();
        router.push(loginRoute);
      }
    }
  }, [onLogout, authLogout, loginRoute, router]);

  // Inactivity timeout hook - must be called before handleStayLoggedIn to declare resetTimer
  const { isWarningActive, warningRemainingSeconds, resetTimer } = useInactivityTimeout({
    inactivityPeriod,
    warningPeriod,
    onShowWarning: () => {
      console.log(`[InactivityProvider] Warning: User inactive for ${inactivityPeriod / 60000} minutes`);
    },
    onWarningTick: (remainingSeconds) => {
      // Optional: Log countdown
      if (remainingSeconds % 10 === 0) {
        console.log(`[InactivityProvider] Warning: ${remainingSeconds} seconds remaining`);
      }
    },
    onLogout: handleLogout,
    trackWhenHidden: true, // Continue tracking when app is hidden
  });

  // Handle stay logged in - refresh token and reset timer
  const handleStayLoggedIn = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Refresh token if handler provided, otherwise use auth context refresh
      if (onRefreshToken) {
        await onRefreshToken();
      } else if (refreshAccessToken) {
        await refreshAccessToken();
      }
      
      // Reset inactivity timer
      resetTimer();
      
      // Show success notification
      toast.success('Session continued. Your session has been refreshed.');
    } catch (error) {
      console.error('[InactivityProvider] Failed to refresh token:', error);
      toast.error('Failed to refresh session. Please try again.');
      // Still reset timer to give user another chance
      resetTimer();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefreshToken, refreshAccessToken, resetTimer]);

  return (
    <>
      {children}
      <InactivityWarningModal
        isOpen={isWarningActive}
        remainingSeconds={warningRemainingSeconds}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogout}
        appName={appName}
        isLoading={isRefreshing}
      />
    </>
  );
}

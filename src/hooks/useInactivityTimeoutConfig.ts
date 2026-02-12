/**
 * Hook to get inactivity timeout from system config
 * For Sales Reports app - fetches from systemConfiguration GraphQL query
 */

import { useSystemConfig } from './useSystemConfig';

export function useInactivityTimeoutConfig() {
  const { inactivityTimeout, loading } = useSystemConfig();
  
  // Return the inactivity timeout from system config (already in milliseconds)
  // Falls back to 5 minutes (300000ms) if not available
  return inactivityTimeout || 5 * 60 * 1000;
}

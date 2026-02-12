/**
 * Hook to fetch system configuration including inactivity timeout
 * For Sales Reports app - fetches from GraphQL systemConfiguration query
 */

import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { getGraphQLEndpointPath } from '@/config/endpoints';

const GET_SYSTEM_CONFIGURATION = gql`
  query GetSystemConfiguration {
    systemConfiguration {
      id
      inactivityTimeout
      sessionTimeout
      maintenanceMode
    }
  }
`;

interface SystemConfiguration {
  id: string;
  inactivityTimeout: number;
  sessionTimeout: number;
  maintenanceMode: boolean;
}

interface SystemConfigData {
  systemConfiguration: SystemConfiguration;
}

export function useSystemConfig() {
  const { data, loading, error } = useQuery<SystemConfigData>(GET_SYSTEM_CONFIGURATION, {
    fetchPolicy: 'cache-and-network',
    context: { endpoint: getGraphQLEndpointPath('sales-reports') },
    skip: typeof window === 'undefined',
    errorPolicy: 'all', // Continue even if query fails (e.g., not available in schema)
  });

  const inactivityTimeout = data?.systemConfiguration?.inactivityTimeout ?? 5; // Default: 5 minutes
  // Ensure range 5-10 minutes
  const inactivityTimeoutMinutes = Math.max(5, Math.min(10, inactivityTimeout));

  return {
    config: data?.systemConfiguration ?? null,
    inactivityTimeout: inactivityTimeoutMinutes * 60 * 1000, // Convert to milliseconds
    loading,
    error,
  };
}

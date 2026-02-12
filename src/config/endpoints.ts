/**
 * Endpoints Configuration (Backward Compatibility Layer)
 * 
 * This file now uses the centralized app-config.ts for all configuration.
 * It maintains backward compatibility with existing code that imports from this file.
 * 
 * @deprecated For new code, use '@/config/app-config' directly
 */

import { 
  appConfig, 
  getGraphQLEndpointPath as _getGraphQLEndpointPath,
  getGraphQLEndpoint as _getGraphQLEndpoint,
  getWebSocketEndpoint as _getWebSocketEndpoint,
  getNotificationsWebSocketEndpoint as _getNotificationsWebSocketEndpoint,
} from './app-config';

// Re-export endpoints object for backward compatibility
export const endpoints = {
  apiBaseUrl: appConfig.services.apiGateway.url,
  appUrl: appConfig.services.app.url,
  graphql: {
    salesReports: {
      endpoint: appConfig.services.apiGateway.graphql.salesReports.endpoint,
      fullUrl: appConfig.services.apiGateway.graphql.salesReports.fullUrl,
    },
    auth: {
      endpoint: appConfig.services.apiGateway.graphql.auth.endpoint,
      fullUrl: appConfig.services.apiGateway.graphql.auth.fullUrl,
    },
  },
  websocket: {
    graphql: {
      salesReports: appConfig.services.apiGateway.websocket.salesReports,
      auth: appConfig.services.apiGateway.websocket.auth,
    },
    notifications: appConfig.services.apiGateway.websocket.notifications,
  },
} as const;

// Re-export helper functions
export const getGraphQLEndpointPath = _getGraphQLEndpointPath;
export const getGraphQLEndpoint = _getGraphQLEndpoint;
export const getWebSocketEndpoint = _getWebSocketEndpoint;
export const getNotificationsWebSocketEndpoint = _getNotificationsWebSocketEndpoint;

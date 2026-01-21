/**
 * Endpoint configuration for Sales Reports App
 * GraphQL-only endpoints for queries, mutations, and subscriptions
 * Production-ready, secure configuration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const GRAPHQL_SALES_REPORTS_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/graphql/sales-reports';
const GRAPHQL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT || '/graphql/auth';

export const endpoints = {
  // Base API URL
  apiBaseUrl: API_BASE_URL,

  // GraphQL HTTP endpoints (for queries and mutations)
  graphql: {
    salesReports: {
      endpoint: GRAPHQL_SALES_REPORTS_ENDPOINT,
      fullUrl: GRAPHQL_SALES_REPORTS_ENDPOINT.startsWith('http')
        ? GRAPHQL_SALES_REPORTS_ENDPOINT
        : `${API_BASE_URL}${GRAPHQL_SALES_REPORTS_ENDPOINT}`,
    },
    auth: {
      endpoint: GRAPHQL_AUTH_ENDPOINT,
      fullUrl: GRAPHQL_AUTH_ENDPOINT.startsWith('http')
        ? GRAPHQL_AUTH_ENDPOINT
        : `${API_BASE_URL}${GRAPHQL_AUTH_ENDPOINT}`,
    },
  },

  // WebSocket endpoints (for subscriptions)
  websocket: {
    graphql: {
      salesReports:
        process.env.NEXT_PUBLIC_WS_URL ||
        (() => {
          const base = API_BASE_URL.replace(/^https?:\/\//, '');
          // Use wss:// for https:// base URLs, ws:// for http://
          const protocol = API_BASE_URL.startsWith('https://') ? 'wss://' : 'ws://';
          return `${protocol}${base}${GRAPHQL_SALES_REPORTS_ENDPOINT}/ws`;
        })(),
      auth:
        process.env.NEXT_PUBLIC_WS_AUTH_URL ||
        (() => {
          const base = API_BASE_URL.replace(/^https?:\/\//, '');
          // Use wss:// for https:// base URLs, ws:// for http://
          const protocol = API_BASE_URL.startsWith('https://') ? 'wss://' : 'ws://';
          return `${protocol}${base}${GRAPHQL_AUTH_ENDPOINT}/ws`;
        })(),
    },
    notifications:
      process.env.NEXT_PUBLIC_WS_NOTIFICATIONS_URL ||
      (() => {
        const base = API_BASE_URL.replace(/^https?:\/\//, '');
        // Use wss:// for https:// base URLs, ws:// for http://
        const protocol = API_BASE_URL.startsWith('https://') ? 'wss://' : 'ws://';
        return `${protocol}${base}/ws/notifications`;
      })(),
  },
} as const;

/**
 * Get GraphQL endpoint path for Apollo Client context
 * @param type - 'sales-reports' for sales reports operations, 'auth' for authentication
 * @returns GraphQL endpoint path (e.g., '/graphql/sales-reports')
 */
export function getGraphQLEndpointPath(type: 'sales-reports' | 'auth' = 'sales-reports'): string {
  return type === 'sales-reports' ? endpoints.graphql.salesReports.endpoint : endpoints.graphql.auth.endpoint;
}

/**
 * Get GraphQL endpoint URL for HTTP requests (queries and mutations)
 * @param type - 'sales-reports' for sales reports operations, 'auth' for authentication
 * @returns Full GraphQL endpoint URL
 */
export function getGraphQLEndpoint(type: 'sales-reports' | 'auth' = 'sales-reports'): string {
  return type === 'sales-reports' ? endpoints.graphql.salesReports.fullUrl : endpoints.graphql.auth.fullUrl;
}

/**
 * Get WebSocket endpoint URL for subscriptions
 * @param type - 'sales-reports' for sales reports subscriptions, 'auth' for auth subscriptions
 * @returns WebSocket endpoint URL
 */
export function getWebSocketEndpoint(type: 'sales-reports' | 'auth' = 'sales-reports'): string {
  return type === 'sales-reports' ? endpoints.websocket.graphql.salesReports : endpoints.websocket.graphql.auth;
}

/**
 * Get notifications WebSocket endpoint
 * @returns WebSocket endpoint URL for notifications
 */
export function getNotificationsWebSocketEndpoint(): string {
  return endpoints.websocket.notifications;
}

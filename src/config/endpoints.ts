/**
 * Endpoint configuration for Sales Reports App
 * GraphQL-only endpoints for queries, mutations, and subscriptions.
 * Set NEXT_PUBLIC_API_URL (or NEXT_PUBLIC_API_GATEWAY_URL) and NEXT_PUBLIC_APP_URL in .env / .env.local.
 */
function requireEnv(name: string, devDefault?: string): string {
  const v = process.env[name];
  const trimmed = v != null ? String(v).trim() : '';
  if (trimmed) return trimmed;
  if (devDefault) return devDefault;
  throw new Error(`${name} is required. Set it in .env or .env.local.`);
}
const normalizeBaseUrl = (url: string): string => {
  let n = url.replace(/\/+$/, '');
  if (!n.startsWith('http://') && !n.startsWith('https://')) n = `http://${n}`;
  return n;
};

// API base: NEXT_PUBLIC_API_URL preferred; NEXT_PUBLIC_API_GATEWAY_URL accepted (align with admin-dashboard).
const API_BASE_URL = normalizeBaseUrl(
  requireEnv(
    'NEXT_PUBLIC_API_URL',
    process.env.NEXT_PUBLIC_API_GATEWAY_URL?.trim() || 'http://localhost:8000'
  )
);
const APP_URL = normalizeBaseUrl(requireEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3004'));
const GRAPHQL_SALES_REPORTS_PATH = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/graphql/sales-reports';
const GRAPHQL_PROXY_PATH = '/api/graphql/sales-reports';
const GRAPHQL_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT || '/graphql/auth';

const salesReportsFullUrl =
  typeof window !== 'undefined'
    ? GRAPHQL_PROXY_PATH
    : GRAPHQL_SALES_REPORTS_PATH.startsWith('http')
      ? GRAPHQL_SALES_REPORTS_PATH
      : `${API_BASE_URL.replace(/\/$/, '')}${GRAPHQL_SALES_REPORTS_PATH.startsWith('/') ? '' : '/'}${GRAPHQL_SALES_REPORTS_PATH}`;

export const endpoints = {
  apiBaseUrl: API_BASE_URL,
  appUrl: APP_URL,

  graphql: {
    salesReports: {
      endpoint: GRAPHQL_SALES_REPORTS_PATH,
      fullUrl: salesReportsFullUrl,
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
          return `${protocol}${base}${GRAPHQL_SALES_REPORTS_PATH}/ws`;
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

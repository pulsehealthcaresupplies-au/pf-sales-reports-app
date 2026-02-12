/**
 * Centralized Application Configuration Service - Sales Reports App
 * 
 * Single source of truth for all environment variables and application settings.
 * This file consolidates all backend service connections and configuration.
 * 
 * Usage:
 *   import { appConfig } from '@/config/app-config';
 *   const apiUrl = appConfig.services.apiGateway.url;
 *   const graphqlUrl = appConfig.services.apiGateway.graphql.salesReports.fullUrl;
 */

function normalizeUrl(url: string, defaultProtocol: 'http' | 'https' = 'http'): string {
  let normalized = url.trim().replace(/\/+$/, '');
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `${defaultProtocol}://${normalized}`;
  }
  return normalized;
}

function getEnv(name: string, defaultValue?: string, required = false): string {
  const rawValue = process.env[name];
  const value = rawValue && typeof rawValue === 'string' ? rawValue.trim() : '';
  
  if (value) return value;
  if (defaultValue) return defaultValue;
  
  const isProduction = process.env.NODE_ENV === 'production';
  if (required && isProduction && !value) {
    throw new Error(
      `Required environment variable ${name} is not set. ` +
      `Set it as a Docker build arg (ARG ${name}) or runtime environment variable. ` +
      `Example: docker build --build-arg ${name}=value ...`
    );
  }
  
  return '';
}

function getBoolEnv(name: string, defaultValue = false): boolean {
  const value = process.env[name]?.toLowerCase().trim();
  if (!value) return defaultValue;
  return value === 'true' || value === '1';
}

function getNumberEnv(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

function deriveWebSocketUrl(httpUrl: string, path: string): string {
  const base = httpUrl.replace(/^https?:\/\//, '');
  const protocol = httpUrl.startsWith('https://') ? 'wss://' : 'ws://';
  return `${protocol}${base}${path}`;
}

export interface AppConfig {
  env: {
    nodeEnv: 'development' | 'production' | 'test';
    deploymentMode: 'development' | 'staging' | 'production';
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
  };

  services: {
    apiGateway: {
      url: string;
      graphql: {
        salesReports: {
          endpoint: string;
          fullUrl: string;
          proxyPath: string; // Client-side proxy path
        };
        auth: {
          endpoint: string;
          fullUrl: string;
        };
      };
      websocket: {
        salesReports: string;
        auth: string;
        notifications: string;
      };
    };

    pulseCore: {
      url: string;
    };

    app: {
      url: string;
      baseUrl: string;
    };
  };

  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableErrorReporting: boolean;
    enablePerformanceMonitoring: boolean;
    enableDarkMode: boolean;
  };

  security: {
    csp: {
      imgOrigins: string[];
      connectSrcOrigins: string[];
    };
  };

  api: {
    timeout: number;
    retries: number;
    retryDelay: number;
  };

  graphql: {
    timeout: number;
  };
}

function buildConfig(): AppConfig {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
  const deploymentMode = (getEnv('NEXT_PUBLIC_DEPLOYMENT_MODE') || 
    (nodeEnv === 'production' ? 'production' : 'development')) as 'development' | 'staging' | 'production';

  // Supports both NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_GATEWAY_URL
  const apiGatewayUrl = normalizeUrl(
    getEnv('NEXT_PUBLIC_API_URL') || getEnv('NEXT_PUBLIC_API_GATEWAY_URL') || 'http://localhost:8000',
    nodeEnv === 'production' ? 'https' : 'http'
  );

  const graphqlSalesReportsPath = getEnv('NEXT_PUBLIC_GRAPHQL_ENDPOINT', '/graphql/sales-reports')
    .replace(/^\/+/, '/');
  const graphqlAuthEndpoint = getEnv('NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT', '/graphql/auth')
    .replace(/^\/+/, '/');
  
  // Client-side proxy path (used in browser)
  const graphqlProxyPath = '/api/graphql/sales-reports';

  const pulseCoreEnv = getEnv('NEXT_PUBLIC_PULSE_CORE_URL');
  const pulseCoreUrl = pulseCoreEnv
    ? normalizeUrl(pulseCoreEnv, nodeEnv === 'production' ? 'https' : 'http')
    : apiGatewayUrl;

  const appUrl = normalizeUrl(
    getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3004', true),
    nodeEnv === 'production' ? 'https' : 'http'
  );

  // Full URL: use proxy path in browser, direct URL on server
  const salesReportsFullUrl = typeof window !== 'undefined'
    ? graphqlProxyPath
    : graphqlSalesReportsPath.startsWith('http')
      ? graphqlSalesReportsPath
      : `${apiGatewayUrl.replace(/\/$/, '')}${graphqlSalesReportsPath}`;

  const wsSalesReports = getEnv('NEXT_PUBLIC_WS_URL') || 
    deriveWebSocketUrl(apiGatewayUrl, `${graphqlSalesReportsPath}/ws`);
  const wsAuth = getEnv('NEXT_PUBLIC_WS_AUTH_URL') || 
    deriveWebSocketUrl(apiGatewayUrl, `${graphqlAuthEndpoint}/ws`);
  const wsNotifications = getEnv('NEXT_PUBLIC_WS_NOTIFICATIONS_URL') || 
    deriveWebSocketUrl(apiGatewayUrl, '/ws/notifications');

  const cspImgOrigins: string[] = [];
  try {
    if (apiGatewayUrl) cspImgOrigins.push(new URL(apiGatewayUrl).origin);
    if (pulseCoreUrl) cspImgOrigins.push(new URL(pulseCoreUrl).origin);
    const extraOrigins = getEnv('NEXT_PUBLIC_CSP_IMG_ORIGINS');
    if (extraOrigins) {
      extraOrigins.split(',').forEach(origin => {
        const trimmed = origin.trim();
        if (trimmed) {
          try {
            cspImgOrigins.push(new URL(trimmed).origin);
          } catch {}
        }
      });
    }
  } catch {}

  const cspConnectSrcOrigins: string[] = [...new Set(cspImgOrigins)];
  cspImgOrigins.forEach(origin => {
    try {
      const url = new URL(origin);
      if (url.protocol === 'https:') {
        cspConnectSrcOrigins.push(`wss://${url.host}`);
      } else {
        cspConnectSrcOrigins.push(`ws://${url.host}`);
        cspConnectSrcOrigins.push(`wss://${url.host}`);
      }
    } catch {}
  });
  [wsSalesReports, wsAuth, wsNotifications].forEach(wsUrl => {
    if (wsUrl) {
      try {
        cspConnectSrcOrigins.push(new URL(wsUrl).origin);
      } catch {}
    }
  });

  return {
    env: {
      nodeEnv,
      deploymentMode,
      isDevelopment: nodeEnv === 'development',
      isProduction: nodeEnv === 'production',
      isTest: nodeEnv === 'test',
    },

    services: {
      apiGateway: {
        url: apiGatewayUrl,
        graphql: {
          salesReports: {
            endpoint: graphqlSalesReportsPath,
            fullUrl: salesReportsFullUrl,
            proxyPath: graphqlProxyPath,
          },
          auth: {
            endpoint: graphqlAuthEndpoint,
            fullUrl: `${apiGatewayUrl.replace(/\/+$/, '')}${graphqlAuthEndpoint}`,
          },
        },
        websocket: {
          salesReports: wsSalesReports,
          auth: wsAuth,
          notifications: wsNotifications,
        },
      },
      pulseCore: {
        url: pulseCoreUrl,
      },
      app: {
        url: appUrl,
        baseUrl: appUrl,
      },
    },

    features: {
      enableAnalytics: getBoolEnv('NEXT_PUBLIC_ENABLE_ANALYTICS', true),
      enableNotifications: getBoolEnv('NEXT_PUBLIC_ENABLE_NOTIFICATIONS', true),
      enableErrorReporting: getBoolEnv('NEXT_PUBLIC_ENABLE_ERROR_REPORTING', true),
      enablePerformanceMonitoring: getBoolEnv('NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING', true),
      enableDarkMode: getBoolEnv('NEXT_PUBLIC_ENABLE_DARK_MODE', true),
    },

    security: {
      csp: {
        imgOrigins: [...new Set(cspImgOrigins)],
        connectSrcOrigins: [...new Set(cspConnectSrcOrigins)],
      },
    },

    api: {
      timeout: getNumberEnv('NEXT_PUBLIC_API_TIMEOUT', 10000),
      retries: getNumberEnv('NEXT_PUBLIC_API_RETRIES', 3),
      retryDelay: getNumberEnv('NEXT_PUBLIC_API_RETRY_DELAY', 1000),
    },

    graphql: {
      timeout: getNumberEnv('NEXT_PUBLIC_GRAPHQL_TIMEOUT', 30000),
    },
  };
}

export const appConfig = buildConfig();

export const getDeploymentMode = () => appConfig.env.deploymentMode;
export const isDevelopment = appConfig.env.isDevelopment;
export const isProduction = appConfig.env.isProduction;
export const isTest = appConfig.env.isTest;

export const getGraphQLEndpointPath = (type: 'sales-reports' | 'auth' = 'sales-reports'): string => {
  return type === 'sales-reports' 
    ? appConfig.services.apiGateway.graphql.salesReports.endpoint
    : appConfig.services.apiGateway.graphql.auth.endpoint;
};

export const getGraphQLEndpoint = (type: 'sales-reports' | 'auth' = 'sales-reports'): string => {
  return type === 'sales-reports'
    ? appConfig.services.apiGateway.graphql.salesReports.fullUrl
    : appConfig.services.apiGateway.graphql.auth.fullUrl;
};

export const getWebSocketEndpoint = (type: 'sales-reports' | 'auth' = 'sales-reports'): string => {
  return type === 'sales-reports'
    ? appConfig.services.apiGateway.websocket.salesReports
    : appConfig.services.apiGateway.websocket.auth;
};

export const getNotificationsWebSocketEndpoint = (): string => {
  return appConfig.services.apiGateway.websocket.notifications;
};

export const getCspAllowedOrigins = (): string[] => {
  return appConfig.security.csp.imgOrigins;
};

export const getCspConnectSrcOrigins = (): string[] => {
  return appConfig.security.csp.connectSrcOrigins;
};

export const isFeatureEnabled = (feature: keyof AppConfig['features']): boolean => {
  return appConfig.features[feature];
};

export default appConfig;

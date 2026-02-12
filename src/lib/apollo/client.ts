'use client';

/* eslint-disable no-console -- Apollo/WebSocket debug logging */
import { ApolloClient, InMemoryCache, createHttpLink, from, Observable, ApolloLink, split, CombinedGraphQLErrors, ServerError } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getGraphQLEndpoint, getWebSocketEndpoint } from '@/config/endpoints';
import { ROUTES } from '@/config/routes';
import {
  getAccessToken,
  getHashPhrase,
  refreshAccessToken,
  clearTokens
} from '../auth/token-manager';

// Types for logger
type LogMessage = string | Error | unknown;
type LogMeta = Record<string, unknown> | undefined;

// Simple logger replacement
const logger = {
  error: (msg: LogMessage, meta?: LogMeta) => console.error(msg, meta),
  warn: (msg: LogMessage, meta?: LogMeta) => console.warn(msg, meta),
  info: (msg: LogMessage, meta?: LogMeta) => console.info(msg, meta),
};

// Types for GraphQL errors
interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface GraphQLErrorResponse {
  graphQLErrors?: readonly GraphQLError[];
}

// Simple error handler replacement
const errorHandler = {
  handleGraphQLError: ({ graphQLErrors }: GraphQLErrorResponse) => {
    graphQLErrors?.forEach((err: GraphQLError) => console.error('[GraphQL error]:', err));
  },
  handleNetworkError: (error: Error | unknown) => {
    console.error('[Network error]:', error);
  },
};

// Token Getter Logic
let tokenGetter: () => string | null | Promise<string | null> = () => {
  return getAccessToken();
};

export const setTokenGetter = (getter: () => string | null | Promise<string | null>) => {
  tokenGetter = getter;
};

const httpLink = createHttpLink({
  uri: getGraphQLEndpoint('sales-reports'),
  credentials: 'include',
});

// Auth link with secure header management
const authLink = setContext(async (_, { headers, skipAuth }) => {
  // Skip auth if explicitly requested (for public queries)
  if (skipAuth || typeof window === 'undefined') {
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'x-app': 'SALES_REPORTS',  // App identifier
        'X-App-Name': 'SALES_REPORTS',  // Legacy support
      },
    };
  }

  const token = await tokenGetter();
  const hashPhrase = getHashPhrase();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      ...(hashPhrase ? { 'Hash-Phrase': hashPhrase } : {}),
      'Content-Type': 'application/json',
      'x-app': 'SALES_REPORTS',
      'X-App-Name': 'SALES_REPORTS',
    },
  };
});

// Error Link with Refresh Logic
// Apollo Client 4.x uses ErrorLink with unified error property
const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!error || !operation || !forward) {
    return undefined;
  }

  // Check if it's a GraphQL error
  if (CombinedGraphQLErrors.is(error)) {
    for (const graphQLError of error.errors) {
      const errorCode = graphQLError.extensions?.code;
      const errorMessage = graphQLError.message || '';

      // Check for authentication errors
      if (errorCode === 'UNAUTHENTICATED' || errorCode === 'FORBIDDEN' || errorMessage.toLowerCase().includes('unauthenticated')) {
        console.log('🔄 Token expired, attempting refresh...');

        // Create an observable to handle the async refresh and retry
        return new Observable<ApolloLink.Result>((observer) => {
          refreshAccessToken()
            .then((newToken) => {
              if (newToken) {
                console.log('✅ Token refreshed successfully, retrying request...');
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newToken}`,
                  },
                });

                forward(operation).subscribe(observer);
              } else {
                console.log('❌ Refresh failed (no token), logging out...');
                clearTokens();
                if (typeof window !== 'undefined') {
                  window.location.href = ROUTES.AUTH.LOGIN;
                }
                observer.error(graphQLError);
              }
            })
            .catch((e) => {
              console.error('❌ Refresh failed with error, logging out...', e);
              clearTokens();
              if (typeof window !== 'undefined') {
                window.location.href = ROUTES.AUTH.LOGIN;
              }
              observer.error(e);
            });
        });
      }

      logger.error('GraphQL error', {
        message: graphQLError.message,
        locations: graphQLError.locations,
        path: graphQLError.path,
        operation: operation.operationName,
      });
      // Convert GraphQLFormattedError to our GraphQLError interface format
      const formattedError: GraphQLError = {
        message: graphQLError.message,
        extensions: (graphQLError.extensions as { code?: string; [key: string]: unknown }) || {},
      };
      errorHandler.handleGraphQLError({ graphQLErrors: [formattedError] });
    }
    // After processing all GraphQL errors, return undefined
    return undefined;
  } else {
    // Network error (not a GraphQL error)
    const statusCode = ServerError.is(error) ? error.statusCode : (error as Error & { statusCode?: number }).statusCode;
    
    if (statusCode === 401) {
      console.log('🔄 Network 401, attempting token refresh...');
      return new Observable<ApolloLink.Result>((observer) => {
        refreshAccessToken()
          .then((newToken) => {
            if (newToken) {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: { ...oldHeaders, authorization: `Bearer ${newToken}` },
              });
              forward(operation).subscribe(observer);
            } else {
              clearTokens();
              if (typeof window !== 'undefined' && window.location.pathname !== ROUTES.AUTH.LOGIN) {
                window.location.href = ROUTES.AUTH.LOGIN;
              }
              observer.error(error);
            }
          })
          .catch((e) => {
            console.error('❌ Refresh failed:', e);
            clearTokens();
            if (typeof window !== 'undefined' && window.location.pathname !== ROUTES.AUTH.LOGIN) {
              window.location.href = ROUTES.AUTH.LOGIN;
            }
            observer.error(e);
          });
      });
    }

    logger.error('Network error', {
      error: error.message,
      operation: operation.operationName,
    });
    errorHandler.handleNetworkError(error);
  }
  
  return undefined;
});

// Retry Link
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => {
      // Don't retry if it's a 4xx error (except 429 maybe, but simplifying)
      // Retry on 5xx or network errors
      interface ErrorWithStatusCode {
        statusCode?: number;
      }
      const err = error as ErrorWithStatusCode | null;
      return !!err && ((err.statusCode !== undefined && err.statusCode >= 500) || err.statusCode === undefined);
    },
  },
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Add field policies for pagination if needed
      },
    },
  },
});

let apolloClient: ApolloClient | null = null;

export function getApolloClient(): ApolloClient {
  if (typeof window === 'undefined') {
    // Server-side: create new client for each request
    return new ApolloClient({
      ssrMode: true,
      link: from([errorLink, retryLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }

  // Client-side: reuse singleton instance with WebSocket support
  if (!apolloClient) {
    // WebSocket link for subscriptions (client-side only)
    let wsLink: ApolloLink | null = null;
    try {
      const wsEndpoint = getWebSocketEndpoint('sales-reports');
      const wsClient = createClient({
        url: wsEndpoint,
        connectionParams: async () => {
          const token = await tokenGetter();
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
        on: {
          connected: () => {
            console.log('[Sales Reports] WebSocket connected');
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('websocket:connected', {
                detail: { service: 'sales-reports', timestamp: new Date().toISOString() }
              }));
            }
          },
          closed: () => {
            console.warn('[Sales Reports] WebSocket connection closed');
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('websocket:closed', {
                detail: { service: 'sales-reports', timestamp: new Date().toISOString() }
              }));
            }
          },
          error: (error) => {
            console.error('[Sales Reports] WebSocket error:', error);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('websocket:error', {
                detail: { service: 'sales-reports', error: String(error), timestamp: new Date().toISOString() }
              }));
            }
          },
        },
        // Reconnection configuration - retry 5 times
        shouldRetry: () => true,
        retryAttempts: 5,
        keepAlive: 10000,
      });

      wsLink = new GraphQLWsLink(wsClient);
    } catch (error) {
      console.error('Failed to create WebSocket link:', error);
      wsLink = null;
    }

    // Split link: subscriptions over WebSocket, queries/mutations over HTTP
    const link = wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
            );
          },
          wsLink,
          from([errorLink, retryLink, authLink, httpLink])
        )
      : from([errorLink, retryLink, authLink, httpLink]);

    apolloClient = new ApolloClient({
      link,
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'all',
          notifyOnNetworkStatusChange: true,
        },
        query: {
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all', // Ensure mutations also return errors in result.error
        },
      },
    });
  }

  return apolloClient;
}

export default getApolloClient;

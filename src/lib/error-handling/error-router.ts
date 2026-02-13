/**
 * Error-based Routing Utility
 * Handles navigation/routing based on error codes from API Gateway
 */

import { ErrorCode, isAuthError, isPermissionError, extractErrorCode, extractStatusCode } from './error-codes';

export interface ErrorRoutingConfig {
  /**
   * Login route for authentication errors
   */
  loginRoute: string;
  
  /**
   * Route for access denied/forbidden errors
   */
  forbiddenRoute?: string;
  
  /**
   * Route for not found errors
   */
  notFoundRoute?: string;
  
  /**
   * Function to get current path for returnUrl
   */
  getCurrentPath?: () => string;
  
  /**
   * Function to navigate (router.push or window.location.href)
   */
  navigate: (url: string) => void;
  
  /**
   * Function to clear tokens/auth state
   */
  clearAuth?: () => void;
  
  /**
   * Custom handler for specific error codes
   */
  customHandlers?: Record<string, (error: any) => void>;
}

/**
 * Handle error-based routing
 * 
 * @param error - GraphQL error or network error
 * @param config - Routing configuration
 * @returns true if error was handled and routing occurred
 */
export function handleErrorRouting(
  error: {
    extensions?: { code?: string; statusCode?: number };
    message?: string;
    statusCode?: number;
  },
  config: ErrorRoutingConfig
): boolean {
  const errorCode = extractErrorCode(error);
  const statusCode = extractStatusCode(error) || error.statusCode;
  
  // Check custom handlers first
  if (errorCode && config.customHandlers?.[errorCode]) {
    config.customHandlers[errorCode](error);
    return true;
  }
  
  // Handle authentication errors
  if (isAuthError(errorCode) || statusCode === 401) {
    if (config.clearAuth) {
      config.clearAuth();
    }
    
    const currentPath = config.getCurrentPath?.() || '';
    const returnUrl = currentPath ? `?returnUrl=${encodeURIComponent(currentPath)}` : '';
    const loginUrl = `${config.loginRoute}${returnUrl}`;
    
    config.navigate(loginUrl);
    return true;
  }
  
  // Handle permission/forbidden errors
  if (isPermissionError(errorCode) || statusCode === 403) {
    if (config.forbiddenRoute) {
      config.navigate(config.forbiddenRoute);
      return true;
    }
    // If no forbidden route, stay on current page but could show toast/notification
    return false;
  }
  
  // Handle not found errors
  if (errorCode === ErrorCode.NOT_FOUND || statusCode === 404) {
    if (config.notFoundRoute) {
      config.navigate(config.notFoundRoute);
      return true;
    }
    return false;
  }
  
  // Other errors don't trigger navigation
  return false;
}

/**
 * Create error routing handler for Apollo Client error links
 */
export function createErrorRouter(config: ErrorRoutingConfig) {
  return (error: any) => {
    return handleErrorRouting(error, config);
  };
}

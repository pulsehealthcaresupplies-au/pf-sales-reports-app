/**
 * Error-based Routing Utility – navigation based on error codes from API Gateway
 */

import { ErrorCode, isAuthError, isPermissionError, extractErrorCode, extractStatusCode } from './error-codes';

export interface ErrorRoutingConfig {
  loginRoute: string;
  forbiddenRoute?: string;
  notFoundRoute?: string;
  getCurrentPath?: () => string;
  navigate: (url: string) => void;
  clearAuth?: () => void;
  customHandlers?: Record<string, (error: unknown) => void>;
}

export function handleErrorRouting(
  error: {
    extensions?: { code?: string; statusCode?: number };
    message?: string;
    statusCode?: number;
  },
  config: ErrorRoutingConfig
): boolean {
  const errorCode = extractErrorCode(error);
  const statusCode = extractStatusCode(error) ?? error.statusCode;

  if (errorCode && config.customHandlers?.[errorCode]) {
    config.customHandlers[errorCode](error);
    return true;
  }

  if (isAuthError(errorCode) || statusCode === 401) {
    if (config.clearAuth) config.clearAuth();
    const currentPath = config.getCurrentPath?.() ?? '';
    const returnUrl = currentPath ? `?returnUrl=${encodeURIComponent(currentPath)}` : '';
    config.navigate(`${config.loginRoute}${returnUrl}`);
    return true;
  }

  if (isPermissionError(errorCode) || statusCode === 403) {
    if (config.forbiddenRoute) {
      config.navigate(config.forbiddenRoute);
      return true;
    }
    return false;
  }

  if (errorCode === ErrorCode.NOT_FOUND || statusCode === 404) {
    if (config.notFoundRoute) {
      config.navigate(config.notFoundRoute);
      return true;
    }
    return false;
  }

  return false;
}

export function createErrorRouter(config: ErrorRoutingConfig) {
  return (error: unknown) => handleErrorRouting(error as Parameters<typeof handleErrorRouting>[0], config);
}

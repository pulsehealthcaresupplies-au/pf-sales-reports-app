'use client';

import { useEffect } from 'react';

/**
 * Suppresses console logs in production environment.
 * Only allows console logs in development/staging environments.
 * This component should be added to the root layout of each app individually.
 */
export function ConsoleSuppressor() {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (!isProduction) {
      // In development, no suppression needed
      return;
    }
    
    // Store original console methods
    const originalConsole = {
      log: console.log,
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    };

    // Override console methods to no-op in production
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    // Keep warn and error for critical issues, but you can suppress them too if needed
    // console.warn = () => {};
    // console.error = () => {};

    // Cleanup: restore original console methods on unmount
    return () => {
      console.log = originalConsole.log;
      console.debug = originalConsole.debug;
      console.info = originalConsole.info;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
    };
  }, []);

  return null;
}

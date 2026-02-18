/**
 * Inactivity Timeout Hook for Sales Reports App
 * 
 * Monitors user activity and triggers logout warning after inactivity period.
 * Similar to banking apps - shows 30-second countdown before automatic logout.
 * 
 * Features:
 * - Configurable inactivity period → Show 30-second logout warning
 * - Any user activity resets the timer
 * - Works even when app is hidden/minimized
 * - Tracks activity via mouse, keyboard, touch, scroll events
 * - WebSocket activity also resets timer
 * - app:pageActivity (from Apollo/link): page ops reset timer; health/refreshToken do NOT.
 */

import { useEffect, useRef, useCallback, useState } from 'react';

export interface InactivityTimeoutConfig {
  /** Inactivity period in milliseconds before showing warning (default: 5 minutes) */
  inactivityPeriod?: number;
  /** Warning countdown period in milliseconds (default: 30 seconds) */
  warningPeriod?: number;
  /** Callback when warning should be shown */
  onShowWarning?: (remainingSeconds: number) => void;
  /** Callback when warning countdown updates */
  onWarningTick?: (remainingSeconds: number) => void;
  /** Callback when user should be logged out */
  onLogout?: () => void;
  /** Callback to update activity timestamp on backend */
  onActivityUpdate?: () => Promise<void>;
  /** Interval to update backend activity (default: 2 minutes) */
  activityUpdateInterval?: number;
  /** Whether to track activity when app is hidden (default: true) */
  trackWhenHidden?: boolean;
}

const DEFAULT_INACTIVITY_PERIOD = 5 * 60 * 1000; // 5 minutes
const DEFAULT_WARNING_PERIOD = 30 * 1000; // 30 seconds
const DEFAULT_ACTIVITY_UPDATE_INTERVAL = 2 * 60 * 1000; // 2 minutes

export function useInactivityTimeout(config: InactivityTimeoutConfig) {
  const {
    inactivityPeriod = DEFAULT_INACTIVITY_PERIOD,
    warningPeriod = DEFAULT_WARNING_PERIOD,
    onShowWarning,
    onWarningTick,
    onLogout,
    onActivityUpdate,
    activityUpdateInterval = DEFAULT_ACTIVITY_UPDATE_INTERVAL,
    trackWhenHidden = true,
  } = config;

  const [isWarningActive, setIsWarningActive] = useState(false);
  const [warningRemainingSeconds, setWarningRemainingSeconds] = useState(0);
  
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activityUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const warningCancelledRef = useRef<boolean>(false); // Track if warning was cancelled to prevent race conditions

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;

    // Mark warning as cancelled to prevent race conditions
    warningCancelledRef.current = true;

    // Clear existing timers
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (warningIntervalRef.current) {
      clearInterval(warningIntervalRef.current);
      warningIntervalRef.current = null;
    }

    // Hide warning if active
    if (isWarningActive) {
      setIsWarningActive(false);
      setWarningRemainingSeconds(0);
    }

    // Set new inactivity timer
    inactivityTimerRef.current = setTimeout(() => {
      // Reset cancellation flag for new warning cycle
      warningCancelledRef.current = false;
      
      // Show warning
      setIsWarningActive(true);
      setWarningRemainingSeconds(Math.floor(warningPeriod / 1000));
      
      if (onShowWarning) {
        onShowWarning(Math.floor(warningPeriod / 1000));
      }

      // Start warning countdown
      let remaining = Math.floor(warningPeriod / 1000);
      warningIntervalRef.current = setInterval(() => {
        // Check if warning was cancelled before proceeding
        if (warningCancelledRef.current) {
          if (warningIntervalRef.current) {
            clearInterval(warningIntervalRef.current);
            warningIntervalRef.current = null;
          }
          return;
        }

        remaining -= 1;
        setWarningRemainingSeconds(remaining);
        
        if (onWarningTick) {
          onWarningTick(remaining);
        }

        if (remaining <= 0) {
          // Check again before logout to prevent race condition
          if (warningCancelledRef.current) {
            if (warningIntervalRef.current) {
              clearInterval(warningIntervalRef.current);
              warningIntervalRef.current = null;
            }
            return;
          }
          
          // Time's up - logout
          if (warningIntervalRef.current) {
            clearInterval(warningIntervalRef.current);
            warningIntervalRef.current = null;
          }
          setIsWarningActive(false);
          if (onLogout) {
            onLogout();
          }
        }
      }, 1000);

      // Set final logout timer as backup
      warningTimerRef.current = setTimeout(() => {
        // Check if warning was cancelled before logout
        if (warningCancelledRef.current) {
          if (warningIntervalRef.current) {
            clearInterval(warningIntervalRef.current);
            warningIntervalRef.current = null;
          }
          return;
        }

        if (warningIntervalRef.current) {
          clearInterval(warningIntervalRef.current);
          warningIntervalRef.current = null;
        }
        setIsWarningActive(false);
        if (onLogout) {
          onLogout();
        }
      }, warningPeriod);
    }, inactivityPeriod);
  }, [inactivityPeriod, warningPeriod, isWarningActive, onShowWarning, onWarningTick, onLogout]);

  // Handle user activity
  const handleActivity = useCallback(() => {
    resetInactivityTimer();
    
    // Update backend activity if callback provided
    if (onActivityUpdate) {
      // Debounce backend updates to avoid excessive API calls
      if (!activityUpdateTimerRef.current) {
        activityUpdateTimerRef.current = setTimeout(async () => {
          try {
            await onActivityUpdate();
          } catch (error) {
            console.warn('[InactivityTimeout] Failed to update activity:', error);
          } finally {
            activityUpdateTimerRef.current = null;
          }
        }, 5000); // Wait 5 seconds before updating backend
      }
    }
  }, [resetInactivityTimer, onActivityUpdate]);

  // Activity event handlers
  useEffect(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'keydown',
    ];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Handle visibility change (app hidden/shown)
    const handleVisibilityChange = () => {
      if (trackWhenHidden || !document.hidden) {
        // If app becomes visible and we're tracking when hidden, check if we need to reset
        if (!document.hidden) {
          const timeSinceLastActivity = Date.now() - lastActivityRef.current;
          // If app was hidden for less than inactivity period, reset timer
          if (timeSinceLastActivity < inactivityPeriod) {
            handleActivity();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle WebSocket activity (custom event)
    const handleWebSocketActivity = () => {
      handleActivity();
    };
    
    window.addEventListener('websocket:activity', handleWebSocketActivity);
    const handlePageActivity = () => handleActivity();
    window.addEventListener('app:pageActivity', handlePageActivity);

    // Initialize timer
    resetInactivityTimer();

    // Set up periodic backend activity updates
    if (onActivityUpdate && activityUpdateInterval > 0) {
      activityUpdateTimerRef.current = setInterval(async () => {
        try {
          await onActivityUpdate();
        } catch (error) {
          console.warn('[InactivityTimeout] Failed to update activity:', error);
        }
      }, activityUpdateInterval);
    }

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('websocket:activity', handleWebSocketActivity);
      window.removeEventListener('app:pageActivity', handlePageActivity);

      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
      if (warningIntervalRef.current) {
        clearInterval(warningIntervalRef.current);
      }
      if (activityUpdateTimerRef.current) {
        clearInterval(activityUpdateTimerRef.current);
      }
    };
  }, [handleActivity, resetInactivityTimer, inactivityPeriod, trackWhenHidden, onActivityUpdate, activityUpdateInterval]);

  // Expose manual activity trigger (for WebSocket events, etc.)
  const triggerActivity = useCallback(() => {
    handleActivity();
  }, [handleActivity]);

  // Expose manual reset (for "Stay Logged In" button)
  const resetTimer = useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  return {
    isWarningActive,
    warningRemainingSeconds,
    triggerActivity,
    resetTimer,
  };
}

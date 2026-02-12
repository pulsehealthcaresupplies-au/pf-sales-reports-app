/**
 * Welcome Greeting Component for Sales Reports App
 * 
 * Displays a personalized welcome message after successful login.
 * Shows current session status and user information.
 */

'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export interface WelcomeGreetingProps {
  /** User information for personalized greeting */
  user?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
  };
  /** Whether to show as a standalone component (vs toast) */
  standalone?: boolean;
  /** Callback when greeting is dismissed */
  onDismiss?: () => void;
  /** Auto-dismiss after milliseconds (0 = no auto-dismiss) */
  autoDismissMs?: number;
}

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good morning!';
  } else if (hour < 17) {
    return 'Good afternoon!';
  } else {
    return 'Good evening!';
  }
}

function getWelcomeMessage(user?: { firstName?: string; fullName?: string }): string {
  const name = user?.firstName || user?.fullName?.split(' ')[0] || 'there';
  const timeOfDay = getTimeOfDayGreeting();
  
  return `Welcome back, ${name}! ${timeOfDay}`;
}

export function WelcomeGreeting({
  user,
  standalone = false,
  onDismiss,
  autoDismissMs = 5000,
}: WelcomeGreetingProps) {
  const [isVisible, setIsVisible] = useState(true);

  const message = getWelcomeMessage({
    firstName: user?.firstName,
    fullName: user?.fullName || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : undefined),
  });

  useEffect(() => {
    if (autoDismissMs > 0 && standalone) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) {
          setTimeout(onDismiss, 300); // Wait for fade-out animation
        }
      }, autoDismissMs);

      return () => clearTimeout(timer);
    }
  }, [autoDismissMs, standalone, onDismiss]);

  // Show as toast notification by default (defer setState to avoid synchronous setState in effect)
  useEffect(() => {
    if (!standalone && isVisible) {
      toast.success(message, {
        description: 'You have been successfully logged in.',
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5" />,
      });
      queueMicrotask(() => setIsVisible(false));
    }
  }, [standalone, isVisible, message]);

  if (!isVisible && standalone) {
    return null;
  }

  if (standalone) {
    return (
      <div
        className={`
          flex items-center gap-3 p-4 rounded-lg border
          bg-success-50 dark:bg-success-900/20
          border-success-200 dark:border-success-800
          text-success-800 dark:text-success-200
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          <p className="text-sm text-success-600 dark:text-success-400 mt-1">
            You have been successfully logged in.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Sparkles className="w-4 h-4 text-success-500" />
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Hook to get welcome message for toast notifications
 */
export function useWelcomeMessage(user?: { firstName?: string; fullName?: string }): string {
  return getWelcomeMessage({
    firstName: user?.firstName,
    fullName: user?.fullName,
  });
}

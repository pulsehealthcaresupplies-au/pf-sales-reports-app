/**
 * Inactivity Warning Modal Component for Sales Reports App
 * 
 * Displays a modal warning when user is about to be logged out due to inactivity.
 * Shows a 30-second countdown timer and provides option to stay logged in.
 */

'use client';

import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress } from '@heroui/react';
import { AlertCircle, Clock } from 'lucide-react';

export interface InactivityWarningModalProps {
  /** Whether the warning modal is visible */
  isOpen: boolean;
  /** Remaining seconds until logout */
  remainingSeconds: number;
  /** Callback when user clicks "Stay Logged In" - should refresh token */
  onStayLoggedIn: () => Promise<void> | void;
  /** Callback when user clicks "Logout Now" */
  onLogoutNow?: () => void;
  /** App name for display */
  appName?: string;
  /** Whether to show loading state during token refresh */
  isLoading?: boolean;
}

export function InactivityWarningModal({
  isOpen,
  remainingSeconds,
  onStayLoggedIn,
  onLogoutNow,
  appName: _appName = 'Application',
  isLoading = false,
}: InactivityWarningModalProps) {
  const [progress, setProgress] = useState(100);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleStayLoggedIn = async () => {
    setIsRefreshing(true);
    try {
      await onStayLoggedIn();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Calculate progress based on 60 seconds (1 minute) warning period
    const totalSeconds = 60;
    const progressValue = (remainingSeconds / totalSeconds) * 100;
    setProgress(Math.max(0, Math.min(100, progressValue)));
  }, [remainingSeconds]);

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
      size="md"
      classNames={{
        base: 'bg-background',
        header: 'border-b border-divider',
        footer: 'border-t border-divider',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="text-lg font-semibold">Session Timeout Warning</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <p className="text-foreground-600">
              You&apos;ve been inactive for a while. For security reasons, you&apos;ll be automatically logged out in:
            </p>
            
            <div className="flex items-center justify-center gap-2 py-4">
              <Clock className="w-6 h-6 text-warning" />
              <span className="text-3xl font-bold text-warning">
                {remainingSeconds}
              </span>
              <span className="text-lg text-foreground-600">
                {remainingSeconds === 1 ? 'second' : 'seconds'}
              </span>
            </div>

            <Progress
              aria-label="Logout countdown"
              value={progress}
              color="warning"
              className="w-full"
              classNames={{
                indicator: 'bg-warning',
              }}
            />

            <p className="text-sm text-foreground-500 text-center">
              Click &quot;Stay Logged In&quot; to continue your session, or you&apos;ll be logged out automatically.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2 w-full">
            {onLogoutNow && (
              <Button
                variant="light"
                color="danger"
                onPress={onLogoutNow}
                className="flex-1"
              >
                Logout Now
              </Button>
            )}
            <Button
              color="primary"
              onPress={handleStayLoggedIn}
              isLoading={isRefreshing || isLoading}
              isDisabled={isRefreshing || isLoading}
              className={onLogoutNow ? 'flex-1' : 'w-full'}
            >
              {isRefreshing || isLoading ? 'Refreshing Session...' : 'Stay Logged In'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

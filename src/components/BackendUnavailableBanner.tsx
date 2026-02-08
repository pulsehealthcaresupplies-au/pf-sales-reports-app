'use client';

import React from 'react';

const PULSE_TEAL = '#0e9fb8';

export interface BackendUnavailableBannerProps {
  variant?: 'maintenance' | 'coming-soon' | 'custom';
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  hideRetry?: boolean;
}

export function BackendUnavailableBanner({
  variant = 'maintenance',
  title,
  message,
  onRetry,
  className = '',
  hideRetry = false,
}: BackendUnavailableBannerProps) {
  const defaultTitle = variant === 'coming-soon' ? 'Coming soon' : 'Under maintenance';
  const defaultMessage =
    variant === 'coming-soon'
      ? 'We are preparing something great. Please check back later.'
      : 'We cannot connect to the service right now. Please try again in a few minutes.';

  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center w-full min-h-[200px] p-6 text-center border-b-2 ${className}`.trim()}
      style={{
        borderBottomColor: PULSE_TEAL,
        backgroundColor: 'rgba(14, 159, 184, 0.06)',
      }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: PULSE_TEAL }}>
        {title ?? defaultTitle}
      </h2>
      <p className="text-sm text-default-500 max-w-md mb-4">
        {message ?? defaultMessage}
      </p>
      {!hideRetry && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: PULSE_TEAL }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

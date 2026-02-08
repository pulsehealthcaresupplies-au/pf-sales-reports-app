'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const LOGO_LIGHT_BG = '/assets/pulse-logo-light-bg.png';
const LOGO_DARK_BG = '/assets/pulse-logo-dark-bg.png';
const LOGO_DEFAULT = '/assets/pulse-logo.png';
const LOGO_ICON = '/assets/pulse-logo-icon.png';

export const COMPANY_NAME_PRIMARY = 'Pulse';
export const COMPANY_NAME_SECONDARY = 'Healthcare Supplies';
export const COMPANY_NAME_FULL = 'Pulse Healthcare Supplies';

export interface PulseLogoProps {
  showName?: boolean;
  variant?: 'header' | 'footer' | 'icon';
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function PulseLogo({
  showName = false,
  variant = 'icon',
  width = 140,
  height = 42,
  className = 'h-8 w-auto sm:h-10',
  priority = false,
  alt = COMPANY_NAME_FULL,
}: PulseLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSrc, setLogoSrc] = useState(LOGO_DEFAULT);
  const [logoError, setLogoError] = useState(false);
  const [iconError, setIconError] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);
  useEffect(() => {
    if (!mounted || resolvedTheme === undefined) return;
    queueMicrotask(() => {
      if (variant === 'footer') {
        setLogoSrc(resolvedTheme === 'dark' ? LOGO_LIGHT_BG : LOGO_DARK_BG);
      } else {
        setLogoSrc(resolvedTheme === 'dark' ? LOGO_DARK_BG : LOGO_LIGHT_BG);
      }
      setLogoError(false);
      setIconError(false);
    });
  }, [mounted, resolvedTheme, variant]);

  const textFallback = (
    <div className={`flex flex-col justify-center ${className}`} style={{ minHeight: height }}>
      <span className="font-bold text-foreground leading-tight">{COMPANY_NAME_PRIMARY}</span>
      <span className="text-xs text-muted-foreground -mt-0.5">{COMPANY_NAME_SECONDARY}</span>
    </div>
  );

  const nameBlock = (
    <div className="flex flex-col min-w-0">
      <span className="font-bold text-foreground text-sm sm:text-base md:text-lg xl:text-xl truncate">
        {COMPANY_NAME_PRIMARY}
      </span>
      <span className="text-xs text-muted-foreground -mt-0.5 hidden sm:block truncate">
        {COMPANY_NAME_SECONDARY}
      </span>
    </div>
  );

  if (variant === 'header' && showName) {
    const imgOrFallback = logoError ? (
      <span className="font-bold text-foreground text-sm sm:text-base">{COMPANY_NAME_PRIMARY}</span>
    ) : (
      <Image
        src={LOGO_DEFAULT}
        alt=""
        width={width}
        height={height}
        className="h-8 w-auto sm:h-10 shrink-0 object-contain"
        priority={priority}
        onError={() => setLogoError(true)}
        aria-hidden
      />
    );
    return (
      <div className="flex items-center gap-2 min-w-0">
        {imgOrFallback}
        {nameBlock}
      </div>
    );
  }

  if (showName) {
    const iconSizePx = 40;
    const iconOrTextFallback = iconError ? (
      <span className="font-bold text-foreground text-sm sm:text-base">{COMPANY_NAME_PRIMARY}</span>
    ) : (
      <Image
        src={LOGO_ICON}
        alt=""
        width={iconSizePx}
        height={iconSizePx}
        className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain"
        priority={priority}
        onError={() => setIconError(true)}
        aria-hidden
      />
    );
    return (
      <div className="flex items-center gap-2 min-w-0">
        {iconOrTextFallback}
        {nameBlock}
      </div>
    );
  }

  const imageOrFallback = logoError ? (
    textFallback
  ) : (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setLogoError(true)}
    />
  );
  return imageOrFallback;
}

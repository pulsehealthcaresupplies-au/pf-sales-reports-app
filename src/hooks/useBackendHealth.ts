'use client';

import { useState, useEffect, useCallback } from 'react';

export interface BackendHealthState {
  isHealthy: boolean;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

const DEFAULT_INTERVAL_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 10 * 1000;

export function useBackendHealth(
  healthUrl: string,
  options?: { pollIntervalMs?: number; disabled?: boolean }
): BackendHealthState {
  const { pollIntervalMs = DEFAULT_INTERVAL_MS, disabled = false } = options ?? {};
  const [isHealthy, setIsHealthy] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async () => {
    if (!healthUrl || disabled) {
      setIsLoading(false);
      return;
    }
    const base = healthUrl.replace(/\/+$/, '');
    const url = base.endsWith('/health') ? base : `${base}/health`;
    setIsLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch(url, { method: 'GET', mode: 'cors', signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) {
        setIsHealthy(false);
        setError(`Backend returned ${res.status}`);
        return;
      }
      const data = await res.json().catch(() => ({}));
      const ok = data?.status === 'healthy' || res.ok;
      setIsHealthy(!!ok);
      setError(ok ? null : 'Backend reported unhealthy');
    } catch (e) {
      setIsHealthy(false);
      setError(e instanceof Error ? e.message : 'Cannot reach backend');
    } finally {
      setIsLoading(false);
    }
  }, [healthUrl, disabled]);

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    if (disabled || !healthUrl || !pollIntervalMs) return;
    const id = setInterval(check, pollIntervalMs);
    return () => clearInterval(id);
  }, [disabled, healthUrl, pollIntervalMs, check]);

  return { isHealthy, isLoading, error, retry: check };
}

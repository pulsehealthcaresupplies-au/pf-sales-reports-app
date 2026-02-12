'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { ThemeMode, ThemePreference } from './types';
import { THEME_CONFIG } from './types';

/**
 * Hook for accessing and manipulating theme
 */
export function useTheme() {
    const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const currentTheme = (theme as ThemeMode) || 'system';
    const effectiveTheme = resolvedTheme as 'light' | 'dark';

    return {
        theme: currentTheme,
        setTheme: (mode: ThemeMode) => setTheme(mode),
        systemTheme: systemTheme as 'light' | 'dark' | undefined,
        effectiveTheme,
        mounted,
        isDark: mounted && effectiveTheme === 'dark',
        isLight: mounted && effectiveTheme === 'light',
    };
}

/**
 * Hook for syncing theme with backend after authentication
 */
export function useThemeSync(userId?: string) {
    const { theme } = useTheme();
    const [syncing, setSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState<number | null>(null);

    useEffect(() => {
        if (!userId || !theme) return;

        const syncTheme = async () => {
            setSyncing(true);
            try {
                // TODO: Implement GraphQL mutation to sync theme preference
                const preference: ThemePreference = {
                    mode: theme as ThemeMode,
                    lastUpdated: Date.now(),
                };

                // Store locally for now
                localStorage.setItem(
                    `${THEME_CONFIG.storageKey}-${userId}`,
                    JSON.stringify(preference)
                );

                setLastSynced(Date.now());
            } catch {
                // Sync theme preference failed
            } finally {
                setSyncing(false);
            }
        };

        // Debounce theme sync
        const timeoutId = setTimeout(syncTheme, 1000);
        return () => clearTimeout(timeoutId);
    }, [theme, userId]);

    return {
        syncing,
        lastSynced,
    };
}

/**
 * Hook for loading user theme preference from backend
 */
export function useLoadUserTheme(userId?: string) {
    const { setTheme } = useTheme();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const loadTheme = async () => {
            setLoading(true);
            try {
                // TODO: Implement GraphQL query to fetch user preferences
                // For now, load from localStorage
                const stored = localStorage.getItem(`${THEME_CONFIG.storageKey}-${userId}`);
                if (stored) {
                    const preference: ThemePreference = JSON.parse(stored);
                    setTheme(preference.mode);
                }
            } catch {
                // Load theme preference failed
            } finally {
                setLoading(false);
            }
        };

        loadTheme();
    }, [userId, setTheme]);

    return { loading };
}

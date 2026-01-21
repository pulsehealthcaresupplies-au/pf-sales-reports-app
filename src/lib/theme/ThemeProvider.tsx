'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { THEME_CONFIG } from './types';

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * Combined theme provider for HeroUI and next-themes
 * Provides theme management with system preference support
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <NextThemesProvider
                attribute={THEME_CONFIG.attribute}
                defaultTheme={THEME_CONFIG.defaultTheme}
                themes={THEME_CONFIG.themes}
                storageKey={THEME_CONFIG.storageKey}
                enableSystem
                disableTransitionOnChange={false}
            >
                {children}
            </NextThemesProvider>
        </HeroUIProvider>
    );
}

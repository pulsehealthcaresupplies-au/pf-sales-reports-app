/**
 * Theme types and configuration
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemePreference {
    mode: ThemeMode;
    lastUpdated: number;
}

export interface ThemeConfig {
    storageKey: string;
    attribute: 'class';
    defaultTheme: ThemeMode;
    themes: ThemeMode[];
}

export const THEME_CONFIG: ThemeConfig = {
    storageKey: 'sales-reports-theme-preference',
    attribute: 'class',
    defaultTheme: 'system',
    themes: ['light', 'dark', 'system'],
};

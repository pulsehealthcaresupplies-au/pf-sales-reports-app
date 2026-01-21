'use client';

import { Button } from '@heroui/react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@heroui/react';
import { useTheme } from '@/lib/theme';
import { ThemeMode } from '@/lib/theme/types';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * ThemeToggler Component
 * Provides a dropdown menu to switch between light, dark, and system themes
 * Uses HeroUI Dropdown and Button components
 */
export function ThemeToggler() {
    const { theme, setTheme, mounted } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <Button
                isIconOnly
                variant="light"
                aria-label="Theme"
                className="opacity-0"
            >
                <Sun className="h-5 w-5" />
            </Button>
        );
    }

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun className="h-5 w-5" />;
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'system':
                return <Monitor className="h-5 w-5" />;
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    const themes = [
        { key: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
        { key: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
        { key: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
    ];

    return (
        <Dropdown
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            placement="bottom-end"
            classNames={{
                content: 'min-w-[140px]',
            }}
        >
            <DropdownTrigger>
                <Button
                    isIconOnly
                    variant="light"
                    aria-label="Toggle theme"
                    className="hover:bg-default-100"
                >
                    {getIcon()}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Theme selection"
                selectedKeys={new Set([theme])}
                selectionMode="single"
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as ThemeMode;
                    setTheme(selected);
                    setIsOpen(false);
                }}
            >
                {themes.map((themeOption) => (
                    <DropdownItem
                        key={themeOption.key}
                        startContent={themeOption.icon}
                        className="gap-2"
                    >
                        {themeOption.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

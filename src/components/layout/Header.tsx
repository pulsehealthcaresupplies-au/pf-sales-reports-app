'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Avatar, Input } from '@heroui/react';
import { Menu, LogOut, Settings, Search, X, Bell } from 'lucide-react';
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { toast } from 'sonner';

interface HeaderProps {
    onMobileOpen: () => void;
}

export function Header({ onMobileOpen }: HeaderProps) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const isDesktop = useIsDesktop();
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const mobileSearchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mobileSearchOpen) {
            const t = setTimeout(() => {
                (mobileSearchInputRef.current as HTMLInputElement | null)?.focus();
            }, 50);
            return () => clearTimeout(t);
        }
    }, [mobileSearchOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push(ROUTES.AUTH.LOGIN);
        } catch {
            // Logout error handled by AuthContext
        }
    };

    const userDisplayName = user?.firstName
        ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`.trim()
        : user?.email?.split('@')[0] || 'User';

    return (
        <header className="sticky top-0 z-30 w-full h-16 border-b border-default-200 bg-background/80 backdrop-blur-md">
            <div className="flex items-center justify-between h-full px-4 sm:px-6">
                <div className="flex items-center gap-4">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={onMobileOpen}
                        className="lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </Button>
                    <h1 className="text-xl font-bold lg:hidden">Sales Reports</h1>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search icon/bar - tablet and below: positioned on right */}
                    {!isDesktop && (
                        <>
                            {!mobileSearchOpen ? (
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    className="min-w-9 min-h-9 w-9 h-9"
                                    aria-label="Search"
                                    onPress={() => setMobileSearchOpen(true)}
                                >
                                    <Search className="h-5 w-5 text-foreground" />
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2 min-w-0 flex-1 max-w-xs">
                                    <Input
                                        ref={mobileSearchInputRef}
                                        type="search"
                                        placeholder="Search reports..."
                                        value={searchQuery}
                                        autoFocus
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                // Navigate to search results or filter current view
                                                router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
                                                setMobileSearchOpen(false);
                                                setSearchQuery('');
                                            }
                                        }}
                                        startContent={<Search className="text-muted-foreground" size={18} />}
                                        endContent={
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                size="sm"
                                                aria-label="Close search"
                                                onPress={() => {
                                                    setMobileSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                            >
                                                <X size={18} />
                                            </Button>
                                        }
                                        variant="bordered"
                                        classNames={{
                                            input: 'text-sm',
                                            inputWrapper: 'bg-muted/50 border-border',
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* Theme Toggle */}
                    <div className="hidden sm:flex">
                        <ThemeToggler />
                    </div>

                    {/* Notifications - Visible on all devices */}
                    {user && (
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="min-w-9 min-h-9 w-9 h-9 relative"
                            aria-label="Notifications"
                            onPress={() => {
                                toast.info('Notifications feature coming soon');
                            }}
                        >
                            <Bell className="h-5 w-5 text-foreground" />
                        </Button>
                    )}

                    {/* User Profile Dropdown */}
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Button
                                variant="light"
                                className="p-0 min-w-unit-8 h-unit-10 data-[hover=true]:bg-transparent"
                                radius="full"
                                isIconOnly
                            >
                                <Avatar
                                    size="sm"
                                    src={`https://ui-avatars.com/api/?name=${user?.firstName || 'User'}+${user?.lastName || ''}&background=0ea5e9&color=fff&size=64`}
                                    name={user?.firstName ? user.firstName.charAt(0) : user?.email?.charAt(0)}
                                    classNames={{
                                        base: "bg-gradient-to-br from-primary to-primary/80",
                                        name: "text-primary-foreground font-semibold"
                                    }}
                                />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownSection showDivider>
                                <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
                                    <div className="flex flex-col">
                                        <p className="font-semibold">{userDisplayName}</p>
                                        <p className="text-xs text-default-400">{user?.email}</p>
                                        {user?.role && (
                                            <p className="text-xs text-primary mt-0.5 capitalize">
                                                {user.role.toLowerCase().replace('_', ' ')}
                                            </p>
                                        )}
                                    </div>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider>
                                <DropdownItem
                                    key="settings"
                                    startContent={<Settings className="h-4 w-4" />}
                                    href="/dashboard/settings"
                                >
                                    Settings
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    startContent={<LogOut className="h-4 w-4" />}
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}

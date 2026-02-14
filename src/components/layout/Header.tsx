'use client';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Avatar } from '@heroui/react';
import { Menu, User as UserIcon, LogOut, Settings } from 'lucide-react';
import { ThemeToggler } from '@/components/theme/ThemeToggler';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';

interface HeaderProps {
    onMobileOpen: () => void;
}

export function Header({ onMobileOpen }: HeaderProps) {
    const { user, logout } = useAuth();
    const router = useRouter();

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
                    {/* Theme Toggle */}
                    <div className="hidden sm:flex">
                        <ThemeToggler />
                    </div>

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

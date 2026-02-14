'use client';

import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from '@heroui/react';
import {
    Menu,
    LayoutDashboard,
    FileText,
    Users,
    Package,
    DollarSign,
    CreditCard,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function QuickMenu() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleNavigate = (key: string) => {
        if (key === 'dashboard') {
            router.push('/dashboard', { scroll: false });
        } else {
            router.push(`/dashboard?tab=${key}`, { scroll: false });
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 lg:hidden">
            <Dropdown placement="top-end">
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        color="primary"
                        size="lg"
                        className="shadow-lg h-14 w-14 rounded-full"
                        aria-label="Quick Menu"
                    >
                        <Menu size={24} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Quick Navigation"
                    variant="flat"
                    onAction={(key) => handleNavigate(key as string)}
                >
                    <DropdownItem key="dashboard" startContent={<LayoutDashboard size={18} />}>
                        Dashboard
                    </DropdownItem>
                    <DropdownItem key="sales" startContent={<FileText size={18} />}>
                        Sales Report
                    </DropdownItem>
                    <DropdownItem key="customers" startContent={<Users size={18} />}>
                        Customer Report
                    </DropdownItem>
                    <DropdownItem key="products" startContent={<Package size={18} />}>
                        Product Performance
                    </DropdownItem>
                    <DropdownItem key="profit" startContent={<DollarSign size={18} />}>
                        Profit Report
                    </DropdownItem>
                    <DropdownItem key="credit" startContent={<CreditCard size={18} />}>
                        Credit Report
                    </DropdownItem>
                    <DropdownItem key="overdue" startContent={<Clock size={18} />}>
                        Overdue Customers
                    </DropdownItem>
                    <DropdownItem key="due-soon" startContent={<AlertTriangle size={18} />}>
                        Due Soon Customers
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

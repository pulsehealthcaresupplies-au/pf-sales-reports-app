import React, { useState } from 'react';
import { Card, CardBody, Input, Select, SelectItem, Button, Checkbox } from "@heroui/react";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    onFilterChange: (filters: any) => void;
    initialFilters: any;
    showDateRange?: boolean;
    showWarehouse?: boolean;
    showCustomerType?: boolean;
    showCategory?: boolean;
    showGroupBy?: boolean;
    showCreditType?: boolean;
    showOverdue?: boolean;
    showDueSoon?: boolean;
    customerTypes?: FilterOption[];
    creditTypes?: FilterOption[];
    groupOptions?: FilterOption[];
    warehouses?: FilterOption[];
    categories?: FilterOption[];
    loading?: boolean;
    children?: React.ReactNode;
}

export function FilterBar({
    onFilterChange,
    initialFilters,
    showDateRange = true,
    showWarehouse = false,
    showCustomerType = false,
    showCategory = false,
    showGroupBy = false,
    showCreditType = false,
    showOverdue = false,
    showDueSoon = false,
    customerTypes = [
        { value: 'ALL', label: 'All Types' },
        { value: 'B2B', label: 'B2B' },
        { value: 'B2C', label: 'B2C' }
    ],
    creditTypes = [
        { value: 'ALL', label: 'All Types' },
        { value: 'Standard', label: 'Standard' },
        { value: 'Premium', label: 'Premium' },
        { value: 'Net30', label: 'Net 30' }
    ],
    groupOptions = [
        { value: 'day', label: 'Daily' },
        { value: 'week', label: 'Weekly' },
        { value: 'month', label: 'Monthly' }
    ],
    warehouses = [], // Should be populated from API
    categories = [], // Should be populated from API
    loading = false,
    children
}: FilterBarProps) {
    const [filters, setFilters] = useState(initialFilters);

    const handleChange = (key: string, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        // Automatically trigger for dropdowns/checkboxes if desired, 
        // or wait for "Apply" button. Let's wait for Apply button for dates, 
        // but maybe instant for others? For now, let's keep it manual with "Apply"
    };

    const handleApply = () => {
        onFilterChange(filters);
    }

    const handleClear = () => {
        setFilters({});
        onFilterChange({});
    }

    return (
        <Card className="mb-6 w-full">
            <CardBody className="gap-4">
                <div className="flex flex-wrap gap-4 items-end">
                    {showDateRange && (
                        <>
                            <Input
                                type="date"
                                label="Start Date"
                                placeholder="Start Date"
                                value={filters.startDate || ''}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                className="max-w-[150px]"
                            />
                            <Input
                                type="date"
                                label="End Date"
                                placeholder="End Date"
                                value={filters.endDate || ''}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                className="max-w-[150px]"
                            />
                        </>
                    )}

                    {showGroupBy && (
                        <Select
                            label="Group By"
                            placeholder="Select grouping"
                            selectedKeys={filters.groupBy ? [filters.groupBy] : []}
                            onChange={(e) => handleChange('groupBy', e.target.value)}
                            className="max-w-[150px]"
                        >
                            {groupOptions.map((option) => (
                                <SelectItem key={option.value} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {showCustomerType && (
                        <Select
                            label="Customer Type"
                            placeholder="All Types"
                            selectedKeys={filters.customerType ? [filters.customerType] : []}
                            onChange={(e) => handleChange('customerType', e.target.value)}
                            className="max-w-[150px]"
                        >
                            {customerTypes.map((option) => (
                                <SelectItem key={option.value} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {showCreditType && (
                        <Select
                            label="Credit Type"
                            placeholder="All Types"
                            selectedKeys={filters.creditType ? [filters.creditType] : []}
                            onChange={(e) => handleChange('creditType', e.target.value)}
                            className="max-w-[150px]"
                        >
                            {creditTypes.map((option) => (
                                <SelectItem key={option.value} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {showWarehouse && warehouses.length > 0 && (
                        <Select
                            label="Warehouse"
                            placeholder="All Warehouses"
                            selectedKeys={filters.warehouseId ? [filters.warehouseId] : []}
                            onChange={(e) => handleChange('warehouseId', e.target.value)}
                            className="max-w-[200px]"
                        >
                            {warehouses.map((option) => (
                                <SelectItem key={option.value} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                    {showCategory && categories.length > 0 && (
                        <Select
                            label="Category"
                            placeholder="All Categories"
                            selectedKeys={filters.categoryId ? [filters.categoryId] : []}
                            onChange={(e) => handleChange('categoryId', e.target.value)}
                            className="max-w-[200px]"
                        >
                            {categories.map((option) => (
                                <SelectItem key={option.value} textValue={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                    {children}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    {showOverdue && (
                        <Checkbox
                            isSelected={filters.includeOverdue !== false}
                            onValueChange={(isSelected) => handleChange('includeOverdue', isSelected)}
                        >
                            Include Overdue
                        </Checkbox>
                    )}
                    {showDueSoon && (
                        <Checkbox
                            isSelected={filters.includeDueSoon !== false}
                            onValueChange={(isSelected) => handleChange('includeDueSoon', isSelected)}
                        >
                            Include Due Soon
                        </Checkbox>
                    )}

                    <div className="flex-grow"></div>

                    <Button
                        color="danger"
                        variant="light"
                        onPress={handleClear}
                        isDisabled={loading}
                    >
                        Clear Filters
                    </Button>
                    <Button
                        color="primary"
                        isLoading={loading}
                        onPress={handleApply}
                    >
                        Apply Filters
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}

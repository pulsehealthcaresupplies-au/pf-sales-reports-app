'use client';

import { useQuery } from '@apollo/client/react';
import { Building2, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardBody, Spinner, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { GET_WAREHOUSES_XERO_STATUS, XERO_CONNECTIONS } from '@/graphql/operations/xero';

type WarehouseXeroStatus = { warehouseId: string; warehouseName: string; warehouseCode?: string; hasValidConfig: boolean; hasConnection: boolean; connectionStatus?: string };
type XeroStatusResult = { warehouses?: WarehouseXeroStatus[]; configuredCount?: number; connectedCount?: number };
type XeroConnection = { id?: string; name: string; status?: string; tenantDisplay?: string; warehouseId?: string; warehouseName?: string; isTokenExpired?: boolean };

export default function XeroPage() {
    const { data: statusData, loading: statusLoading } = useQuery<{ getWarehousesXeroStatus?: XeroStatusResult }>(GET_WAREHOUSES_XERO_STATUS, {
        fetchPolicy: 'cache-and-network',
    });
    const { data: connectionsData } = useQuery<{ xeroConnections?: XeroConnection[] }>(XERO_CONNECTIONS, { fetchPolicy: 'cache-and-network' });

    const warehouses = statusData?.getWarehousesXeroStatus?.warehouses ?? [];
    const configuredCount = statusData?.getWarehousesXeroStatus?.configuredCount ?? 0;
    const connectedCount = statusData?.getWarehousesXeroStatus?.connectedCount ?? 0;
    const connections = connectionsData?.xeroConnections ?? [];
    const connectionsByWarehouseId = connections.reduce<Record<string, XeroConnection[]>>((acc, conn) => {
        const wid = conn.warehouseId ?? '';
        if (!acc[wid]) acc[wid] = [];
        acc[wid].push(conn);
        return acc;
    }, {});

    if (statusLoading && !statusData) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Xero Accounting</h1>
                <p className="text-default-500 mt-1">View Xero connection status for reporting and sync</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-success/5 border-success/20">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-success/10 rounded-xl text-success">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-default-500 font-semibold">Configured</p>
                            <p className="text-lg font-bold">{configuredCount}</p>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-default-500 font-semibold">Connected</p>
                            <p className="text-lg font-bold">{connectedCount}</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardBody className="p-0">
                    <Table aria-label="Xero warehouses status" removeWrapper>
                        <TableHeader>
                            <TableColumn>Warehouse</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Connection</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="No warehouses found">
                            {warehouses.map((warehouse: WarehouseXeroStatus) => {
                                const warehouseConnections = connectionsByWarehouseId[String(warehouse.warehouseId)] ?? [];
                                const primaryConnection = warehouseConnections[0];
                                return (
                                    <TableRow key={warehouse.warehouseId}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Building2 size={14} className="text-default-400" />
                                                <div>
                                                    <div className="font-semibold">{warehouse.warehouseName}</div>
                                                    <div className="text-xs text-default-500">{warehouse.warehouseCode}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {warehouse.hasValidConfig ? (
                                                <Chip color="success" variant="flat" size="sm" startContent={<CheckCircle size={14} />}>
                                                    Configured
                                                </Chip>
                                            ) : (
                                                <Chip color="danger" variant="flat" size="sm" startContent={<XCircle size={14} />}>
                                                    Not configured
                                                </Chip>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {primaryConnection ? (
                                                <Chip
                                                    color={primaryConnection.isTokenExpired ? 'warning' : 'success'}
                                                    variant="flat"
                                                    size="sm"
                                                >
                                                    {primaryConnection.tenantDisplay || primaryConnection.name}
                                                </Chip>
                                            ) : warehouse.hasConnection ? (
                                                <Chip color="success" variant="flat" size="sm">
                                                    {warehouse.connectionStatus || 'Connected'}
                                                </Chip>
                                            ) : (
                                                <Chip color="default" variant="flat" size="sm">
                                                    No connection
                                                </Chip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}

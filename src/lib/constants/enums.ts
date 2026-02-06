/**
 * Order and pick task status enums – aligned with backend (pulse-core/core/constants.py)
 * and API-Gateway GraphQL schema. Use for filters, display, and comparisons.
 * Keep in sync with shared/constants/enums.ts when present.
 */
export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  PICKER_ASSIGNED: 'PICKER_ASSIGNED',
  PICKING_ITEMS: 'PICKING_ITEMS',
  SCANNED: 'SCANNED',
  PICKED: 'PICKED',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
  REFUNDED: 'REFUNDED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
} as const;

export type OrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PickTaskStatus = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type PickTaskStatusValue = (typeof PickTaskStatus)[keyof typeof PickTaskStatus];

export const PickTaskPriority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

export type PickTaskPriorityValue = (typeof PickTaskPriority)[keyof typeof PickTaskPriority];

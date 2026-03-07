/**
 * Xero status and connections (sales-reports app)
 */

import { gql } from '@apollo/client'

export const GET_WAREHOUSES_XERO_STATUS = gql`
  query GetWarehousesXeroStatus {
    getWarehousesXeroStatus {
      success
      warehouses {
        warehouseId
        warehouseName
        warehouseCode
        isConfigured
        isEnabled
        hasValidConfig
        hasConnection
        connectionStatus
      }
      totalCount
      configuredCount
      unconfiguredCount
      connectedCount
    }
  }
`

export const XERO_CONNECTIONS = gql`
  query XeroConnections {
    xeroConnections {
      id
      name
      status
      tenantDisplay
      warehouseId
      warehouseName
      isTokenExpired
    }
  }
`

import { useApi } from '../hooks/useApi'

// Customer entities
export const useCustomers = (tenantId) => {
  return useApi(tenantId ? `/api/customers/tenant/${tenantId}` : null)
}

// Order analytics entities
export const useTotalOrders = (tenantId) => {
  return useApi(tenantId ? `/api/orders/${tenantId}/analytics/total-orders` : null)
}

export const useTotalRevenue = (tenantId) => {
  return useApi(tenantId ? `/api/orders/${tenantId}/analytics/total-revenue` : null)
}

export const useOrdersTrend = (tenantId) => {
  return useApi(tenantId ? `/api/orders/${tenantId}/analytics/orders-trend` : null)
}

export const useTopCustomers = (tenantId, limit = 5) => {
  return useApi(tenantId ? `/api/orders/${tenantId}/analytics/top-customers?limit=${limit}` : null)
}

// Product entities
export const useProducts = (tenantId) => {
  return useApi(tenantId ? `/api/products/tenant/${tenantId}` : null)
}

// Combined dashboard data hook
export const useDashboardData = (tenantId) => {
  const customers = useCustomers(tenantId)
  const totalOrders = useTotalOrders(tenantId)
  const totalRevenue = useTotalRevenue(tenantId)
  const ordersTrend = useOrdersTrend(tenantId)
  const topCustomers = useTopCustomers(tenantId)
  const products = useProducts(tenantId)

  const loading = customers.loading || totalOrders.loading || totalRevenue.loading || 
                  ordersTrend.loading || topCustomers.loading || products.loading

  const error = customers.error || totalOrders.error || totalRevenue.error || 
                ordersTrend.error || topCustomers.error || products.error

  const refetchAll = () => {
    customers.refetch()
    totalOrders.refetch()
    totalRevenue.refetch()
    ordersTrend.refetch()
    topCustomers.refetch()
    products.refetch()
  }

  return {
    data: {
      customers: customers.data,
      totalOrders: totalOrders.data,
      totalRevenue: totalRevenue.data,
      ordersTrend: ordersTrend.data,
      topCustomers: topCustomers.data,
      products: products.data,
    },
    loading,
    error,
    refetch: refetchAll,
  }
}
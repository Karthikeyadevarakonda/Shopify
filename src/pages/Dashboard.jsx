import { useState } from 'react'
import { useDashboardData } from '../entities/all'
import MetricCard from '../components/dashboard/MetricCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import OrdersChart from '../components/dashboard/OrdersChart'
import TopCustomersTable from '../components/dashboard/TopCustomersTable'
import ProductPerformance from '../components/dashboard/ProductPerformance'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { formatCurrency, formatNumber } from '../lib/utils'
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  RefreshCw,
  AlertCircle,
  Building2
} from 'lucide-react'

const Dashboard = () => {
  const [selectedTenant, setSelectedTenant] = useState('tenant1')
  const { data, loading, error, refetch } = useDashboardData(selectedTenant)

  // Mock tenant options - replace with actual tenant data
  const tenantOptions = [
    { value: 'tenant1', label: 'Store Alpha' },
    { value: 'tenant2', label: 'Store Beta' },
    { value: 'tenant3', label: 'Store Gamma' },
  ]

  const handleRefresh = () => {
    refetch()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Error Loading Dashboard
              </CardTitle>
              <CardDescription>
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 pt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your store performance and analytics
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedTenant} onValueChange={setSelectedTenant}>
              <SelectTrigger className="w-48">
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                {tenantOptions.map((tenant) => (
                  <SelectItem key={tenant.value} value={tenant.value}>
                    {tenant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Customers"
            value={formatNumber(data.customers?.length || 0)}
            icon={Users}
            trend="up"
            trendValue="+12% from last month"
            loading={loading}
          />
          <MetricCard
            title="Total Orders"
            value={formatNumber(data.totalOrders?.total || 0)}
            icon={ShoppingCart}
            trend="up"
            trendValue="+8% from last month"
            loading={loading}
          />
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(data.totalRevenue?.total || 0)}
            icon={DollarSign}
            trend="up"
            trendValue="+15% from last month"
            loading={loading}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart 
            data={data.ordersTrend} 
            loading={loading}
          />
          <OrdersChart 
            data={data.ordersTrend} 
            loading={loading}
          />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopCustomersTable 
            data={data.topCustomers} 
            loading={loading}
          />
          <ProductPerformance 
            data={data.products} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
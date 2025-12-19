import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconTrendingUp, IconUsers, IconPackage, IconShield, IconDatabase, IconShoppingCart } from "@tabler/icons-react"
import { dashboardService } from "@/services/dashboardService"

export function SectionCards({ 
  variant = "overview", 
  customStats = null,
  showLoading = true 
}) {
  const [stats, setStats] = useState(customStats || [])
  const [loading, setLoading] = useState(!customStats)

  // Default stats configurations for different variants
  const getDefaultStats = (variant) => {
    switch (variant) {
      case "users":
        return [
          { title: "Total Members", value: "...", change: "...", icon: IconUsers, trend: "up", loading: true },
          { title: "Staff Members", value: "...", change: "...", icon: IconShield, trend: "up", loading: true },
          { title: "Regular Users", value: "...", change: "...", icon: IconUsers, trend: "up", loading: true },
          { title: "Active Sessions", value: "...", change: "...", icon: IconTrendingUp, trend: "stable", loading: true },
        ]
      case "sales":
        return [
          { title: "Today's Sales", value: "...", change: "...", icon: IconTrendingUp, trend: "up", loading: true },
          { title: "Monthly Revenue", value: "...", change: "...", icon: IconShoppingCart, trend: "up", loading: true },
          { title: "Orders", value: "...", change: "...", icon: IconPackage, trend: "down", loading: true },
          { title: "Conversion Rate", value: "...", change: "...", icon: IconDatabase, trend: "stable", loading: true },
        ]
      default:
        return [
          { title: "Today's Sales", value: "...", change: "...", icon: IconTrendingUp, trend: "up", loading: true },
          { title: "Active Users", value: "...", change: "...", icon: IconUsers, trend: "up", loading: true },
          { title: "Orders Pending", value: "...", change: "...", icon: IconPackage, trend: "down", loading: true },
          { title: "System Health", value: "...", change: "...", icon: IconShield, trend: "stable", loading: true },
        ]
    }
  }

  // Load stats data
  const loadStats = async () => {
    if (customStats) {
      setStats(customStats)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const data = await dashboardService.getOverviewStats()
      
      const updatedStats = getDefaultStats(variant).map((stat, index) => {
        switch (variant) {
          case "users":
            return {
              ...stat,
              value: index === 0 ? data.totalMembers?.toLocaleString() || '0' :
                     index === 1 ? data.staffMembers?.toLocaleString() || '0' :
                     index === 2 ? data.regularUsers?.toLocaleString() || '0' :
                     data.activeUsers?.toLocaleString() || '0',
              change: data[`${stat.title.toLowerCase().replace(/\s+/g, '')}Change`] || "+0%",
              loading: false
            }
          case "sales":
            return {
              ...stat,
              value: index === 0 ? dashboardService.formatCurrency(data.todaySales || 0) :
                     index === 1 ? dashboardService.formatCurrency(data.monthlyRevenue || 0) :
                     index === 2 ? data.totalOrders?.toLocaleString() || '0' :
                     `${data.conversionRate || 0}%`,
              change: data[`${stat.title.toLowerCase().replace(/\s+/g, '')}Change`] || "+0%",
              loading: false
            }
          default:
            return {
              ...stat,
              value: index === 0 ? dashboardService.formatCurrency(data.todaySales || 0) :
                     index === 1 ? data.activeUsers?.toLocaleString() || '0' :
                     index === 2 ? data.pendingOrders?.toLocaleString() || '0' :
                     `${data.systemHealth || 99.9}%`,
              change: data[`${stat.title.toLowerCase().replace(/\s+/g, '')}Change`] || "+0%",
              loading: false
            }
        }
      })
      
      setStats(updatedStats)
    } catch (error) {
      console.error('Failed to load stats:', error)
      // Keep loading state on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [variant, customStats])

  if (!showLoading && loading) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : stat.value}
            </div>
            {!loading && (
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
                {' '}from yesterday
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

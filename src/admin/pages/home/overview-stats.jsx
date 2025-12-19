import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconTrendingUp, IconUsers, IconPackage, IconShield } from "@tabler/icons-react"
import { dashboardService } from "@/services/dashboardService"

export function OverviewStats() {
  const [overviewStats, setOverviewStats] = useState([
    { title: "Today's Sales", value: "...", change: "...", icon: IconTrendingUp, trend: "up", loading: true },
    { title: "Active Users", value: "...", change: "...", icon: IconUsers, trend: "up", loading: true },
    { title: "Orders Pending", value: "...", change: "...", icon: IconPackage, trend: "down", loading: true },
    { title: "System Health", value: "...", change: "...", icon: IconShield, trend: "stable", loading: true },
  ])

  // Load overview stats
  const loadOverviewStats = async () => {
    try {
      const stats = await dashboardService.getOverviewStats()

      setOverviewStats([
        {
          title: "Today's Sales",
          value: dashboardService.formatCurrency(stats.todaySales || 0),
          change: stats.todaySalesChange || "+0%",
          icon: IconTrendingUp,
          trend: stats.todaySalesChange?.startsWith('+') ? "up" : stats.todaySalesChange?.startsWith('-') ? "down" : "stable",
          loading: false
        },
        {
          title: "Active Users",
          value: stats.activeUsers?.toLocaleString() || '0',
          change: stats.activeUsersChange || "+0%",
          icon: IconUsers,
          trend: stats.activeUsersChange?.startsWith('+') ? "up" : stats.activeUsersChange?.startsWith('-') ? "down" : "stable",
          loading: false
        },
        {
          title: "Orders Pending",
          value: stats.pendingOrders?.toLocaleString() || '0',
          change: stats.pendingOrdersChange || "+0%",
          icon: IconPackage,
          trend: stats.pendingOrdersChange?.startsWith('+') ? "up" : stats.pendingOrdersChange?.startsWith('-') ? "down" : "stable",
          loading: false
        },
        {
          title: "System Health",
          value: `${stats.systemHealth || 99.9}%`,
          change: "0%",
          icon: IconShield,
          trend: "stable",
          loading: false
        },
      ])
    } catch (error) {
      console.error('Failed to load overview stats:', error)
      // Keep loading state on error
    }
  }

  useEffect(() => {
    loadOverviewStats()
  }, [])

  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
                {' '}from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconHome, 
  IconUsers, 
  IconChartBar, 
  IconPackage, 
  IconBell, 
  IconTrendingUp,
  IconSettings,
  IconPlus,
  IconMail,
  IconShield
} from "@tabler/icons-react"

export default function Home() {
  const currentTime = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const quickActions = [
    { icon: IconPlus, label: "Add Product", color: "bg-blue-500", action: "add-product" },
    { icon: IconUsers, label: "Manage Users", color: "bg-green-500", action: "manage-users" },
    { icon: IconChartBar, label: "View Analytics", color: "bg-purple-500", action: "view-analytics" },
    { icon: IconPackage, label: "Stock Review", color: "bg-orange-500", action: "stock-review" },
  ]

  const recentActivities = [
    { type: "sale", message: "New order #1234 from John Doe", time: "5 minutes ago", status: "success" },
    { type: "user", message: "New user registration", time: "1 hour ago", status: "info" },
    { type: "stock", message: "Low stock alert: Running Shoes", time: "2 hours ago", status: "warning" },
    { type: "system", message: "Backup completed successfully", time: "4 hours ago", status: "success" },
  ]

  const overviewStats = [
    { title: "Today's Sales", value: "$2,450", change: "+12%", icon: IconTrendingUp, trend: "up" },
    { title: "Active Users", value: "1,234", change: "+5%", icon: IconUsers, trend: "up" },
    { title: "Orders Pending", value: "23", change: "-8%", icon: IconPackage, trend: "down" },
    { title: "System Health", value: "99.9%", change: "0%", icon: IconShield, trend: "stable" },
  ]

  return (

    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-orange-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconHome className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Welcome back, Admin!</h1>
                <p className="text-orange-100 text-sm md:text-base drop-shadow">{currentTime}</p>
              </div>
            </div>
            <p className="text-orange-50 max-w-2xl text-sm drop-shadow">
              Manage your Fit Tech operations efficiently. Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`${action.color} rounded-full p-3 shadow-lg`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
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


        {/* Recent Activity & System Status */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Recent Activities */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconBell className="h-5 w-5" />
                  <CardTitle>Recent Activities</CardTitle>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-orange-500' :
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>


          {/* System Status */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconShield className="h-5 w-5" />
                <CardTitle>System Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge variant="default" className="bg-green-500">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-500">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response</span>
                <Badge variant="default" className="bg-green-500">Fast</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>



      </div>
    </div>
  )
}


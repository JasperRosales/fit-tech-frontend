import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconDashboard, 
  IconUsers, 
  IconChartBar, 
  IconPackage, 
  IconCalendar,
  IconHeart,
  IconTrendingUp,
  IconTrendingDown,
  IconPlus,
  IconClock,
  IconShield,
  IconStar
} from "@tabler/icons-react"

export default function Dashboard() {
  const currentTime = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const quickActions = [
    { icon: IconPlus, label: "New Reservation", color: "bg-blue-500", action: "new-reservation" },
    { icon: IconUsers, label: "Customer List", color: "bg-green-500", action: "customer-list" },
    { icon: IconChartBar, label: "View Analytics", color: "bg-purple-500", action: "view-analytics" },
    { icon: IconPackage, label: "Check Stock", color: "bg-orange-500", action: "check-stock" },
  ]

  const recentActivities = [
    { type: "reservation", message: "New reservation for Sarah Johnson", time: "5 minutes ago", status: "success" },
    { type: "customer", message: "New customer registration: Mike Wilson", time: "1 hour ago", status: "info" },
    { type: "stock", message: "Low stock alert: Running Shoes (Size 8)", time: "2 hours ago", status: "warning" },
    { type: "feedback", message: "Customer feedback: 5-star rating", time: "3 hours ago", status: "success" },
  ]

  const overviewStats = [
    { 
      title: "Today's Customers", 
      value: "47", 
      change: "+18%", 
      icon: IconUsers, 
      trend: "up",
      description: "Customers served today"
    },
    { 
      title: "Active Reservations", 
      value: "12", 
      change: "+25%", 
      icon: IconCalendar, 
      trend: "up",
      description: "Today's appointments"
    },
    { 
      title: "Customer Satisfaction", 
      value: "4.8/5", 
      change: "+0.2", 
      icon: IconStar, 
      trend: "up",
      description: "Average rating"
    },
    { 
      title: "Stock Alerts", 
      value: "3", 
      change: "-60%", 
      icon: IconPackage, 
      trend: "down",
      description: "Items need restocking"
    },
  ]

  const todaysSchedule = [
    { time: "09:00", customer: "Sarah Johnson", service: "Consultation", status: "confirmed" },
    { time: "10:30", customer: "Mike Wilson", service: "Fitting", status: "confirmed" },
    { time: "11:00", customer: "Emma Davis", service: "Follow-up", status: "pending" },
    { time: "14:00", customer: "John Smith", service: "Consultation", status: "confirmed" },
    { time: "15:30", customer: "Lisa Brown", service: "Fitting", status: "confirmed" },
    { time: "16:00", customer: "David Lee", service: "Follow-up", status: "pending" },
  ]

  const customerFeedback = [
    { customer: "Sarah Johnson", rating: 5, comment: "Excellent service and great fitting experience!", time: "2 hours ago" },
    { customer: "Mike Wilson", rating: 5, comment: "Very professional staff and quick service.", time: "4 hours ago" },
    { customer: "Emma Davis", rating: 4, comment: "Good experience, will recommend to friends.", time: "6 hours ago" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-blue-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconDashboard className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Welcome to Staff Dashboard!</h1>
                <p className="text-blue-100 text-sm md:text-base drop-shadow">{currentTime}</p>
              </div>
            </div>
            <p className="text-blue-50 max-w-2xl text-sm drop-shadow">
              Manage customer relationships and operations efficiently. Here's your daily overview of customer metrics and activities.
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
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span className={`${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    } font-medium`}>
                      {stat.change}
                    </span>
                    <span>from yesterday</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

          {/* Today's Schedule */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconCalendar className="h-5 w-5" />
                  <CardTitle>Today's Schedule</CardTitle>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysSchedule.slice(0, 5).map((appointment, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-xs font-mono text-muted-foreground min-w-[50px]">
                    {appointment.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{appointment.customer}</p>
                    <p className="text-xs text-muted-foreground">{appointment.service}</p>
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Customer Feedback */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconHeart className="h-5 w-5" />
                <CardTitle>Recent Feedback</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerFeedback.map((feedback, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{feedback.customer}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <IconStar 
                          key={i} 
                          className={`h-3 w-3 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">"{feedback.comment}"</p>
                  <p className="text-xs text-muted-foreground">{feedback.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconClock className="h-5 w-5" />
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
        </div>
      </div>
    </div>
  )
}

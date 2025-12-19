import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconChartBar, 
  IconUsers, 
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
  IconStar,
  IconFilter,
  IconDownload,
  IconTarget,
  IconHeart,
} from "@tabler/icons-react"

export default function CustomerAnalytics() {
  const customerMetrics = [
    { 
      title: "Total Customers", 
      value: "1,247", 
      change: "+12%", 
      icon: IconUsers, 
      trend: "up",
      description: "Registered customers"
    },
    { 
      title: "Active This Month", 
      value: "342", 
      change: "+8%", 
      icon: IconCalendar, 
      trend: "up",
      description: "Customers with recent activity"
    },
    { 
      title: "Customer Satisfaction", 
      value: "4.7/5", 
      change: "+0.3", 
      icon: IconStar, 
      trend: "up",
      description: "Average rating"
    },
    { 
      title: "Retention Rate", 
      value: "87%", 
      change: "+5%", 
      icon: IconHeart, 
      trend: "up",
      description: "Returning customers"
    },
  ]

  const customerSegments = [
    { name: "New Customers", count: 89, percentage: 26, color: "bg-blue-500" },
    { name: "Regular Customers", count: 156, percentage: 46, color: "bg-green-500" },
    { name: "VIP Customers", count: 67, percentage: 20, color: "bg-purple-500" },
    { name: "Inactive", count: 30, percentage: 8, color: "bg-gray-400" },
  ]

  const topCustomers = [
    { name: "Sarah Johnson", visits: 12, satisfaction: 5, revenue: "$1,240", segment: "VIP" },
    { name: "Mike Wilson", visits: 8, satisfaction: 5, revenue: "$890", segment: "Regular" },
    { name: "Emma Davis", visits: 6, satisfaction: 4, revenue: "$650", segment: "Regular" },
    { name: "John Smith", visits: 15, satisfaction: 5, revenue: "$1,580", segment: "VIP" },
    { name: "Lisa Brown", visits: 4, satisfaction: 5, revenue: "$420", segment: "New" },
  ]

  const servicePerformance = [
    { service: "Consultations", customers: 89, satisfaction: 4.8, revenue: "$2,670" },
    { service: "Fittings", customers: 67, satisfaction: 4.9, revenue: "$2,010" },
    { service: "Follow-ups", customers: 45, satisfaction: 4.7, revenue: "$900" },
    { service: "Emergency Repairs", customers: 23, satisfaction: 4.6, revenue: "$1,150" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-purple-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconChartBar className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Customer Analytics</h1>
                <p className="text-purple-100 text-sm md:text-base drop-shadow">
                  Insights and metrics about your customer base
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconDownload className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Customer Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span className={`${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    } font-medium`}>
                      {metric.change}
                    </span>
                    <span>from last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Customer Segments */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTarget className="h-5 w-5" />
                <CardTitle>Customer Segments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{segment.name}</span>
                    <span className="text-sm text-muted-foreground">{segment.count} customers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${segment.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{segment.percentage}% of total</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconUsers className="h-5 w-5" />
                  <CardTitle>Top Customers</CardTitle>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{customer.name}</p>
                      <Badge variant={
                        customer.segment === "VIP" ? "default" : 
                        customer.segment === "Regular" ? "secondary" : "outline"
                      }>
                        {customer.segment}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{customer.visits} visits</span>
                      <div className="flex items-center gap-1">
                        <IconStar className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{customer.satisfaction}</span>
                      </div>
                      <span>{customer.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Service Performance */}
        <div className="px-4 lg:px-6">
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTrendingUp className="h-5 w-5" />
                <CardTitle>Service Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Service</th>
                      <th className="text-left p-2">Customers</th>
                      <th className="text-left p-2">Satisfaction</th>
                      <th className="text-left p-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePerformance.map((service, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{service.service}</td>
                        <td className="p-2">{service.customers}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            <IconStar className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{service.satisfaction}</span>
                          </div>
                        </td>
                        <td className="p-2">{service.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

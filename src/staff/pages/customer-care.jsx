import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconHeart, 
  IconMessage,
  IconPhone,
  IconMail,
  IconStar,
  IconClock,
  IconAlertTriangle,
  IconCheck,
  IconUser,
  IconFilter,
  IconSearch,
  IconMessageReply,
  IconThumbUp,
  IconThumbDown} from "@tabler/icons-react"

export default function CustomerCare() {
  const careMetrics = [
    { 
      title: "Open Tickets", 
      value: "8", 
      change: "-3", 
      icon: IconMessage, 
      trend: "down",
      description: "Need staff attention"
    },
    { 
      title: "Resolved Today", 
      value: "15", 
      change: "+5", 
      icon: IconCheck, 
      trend: "up",
      description: "Issues resolved"
    },
    { 
      title: "Avg Response Time", 
      value: "2.3h", 
      change: "-0.5h", 
      icon: IconClock, 
      trend: "down",
      description: "Response time"
    },
    { 
      title: "Satisfaction Rate", 
      value: "94%", 
      change: "+2%", 
      icon: IconStar, 
      trend: "up",
      description: "Customer satisfaction"
    },
  ]

  const recentTickets = [
    { 
      id: "#1234", 
      customer: "Sarah Johnson", 
      subject: "Size exchange request", 
      priority: "medium", 
      status: "open", 
      time: "2 hours ago",
      lastUpdate: "1 hour ago"
    },
    { 
      id: "#1235", 
      customer: "Mike Wilson", 
      subject: "Product damage report", 
      priority: "high", 
      status: "in-progress", 
      time: "4 hours ago",
      lastUpdate: "30 minutes ago"
    },
    { 
      id: "#1236", 
      customer: "Emma Davis", 
      subject: "Return refund inquiry", 
      priority: "low", 
      status: "open", 
      time: "6 hours ago",
      lastUpdate: "5 hours ago"
    },
    { 
      id: "#1237", 
      customer: "John Smith", 
      subject: "Delivery delay complaint", 
      priority: "medium", 
      status: "resolved", 
      time: "1 day ago",
      lastUpdate: "2 hours ago"
    },
    { 
      id: "#1238", 
      customer: "Lisa Brown", 
      subject: "Product quality issue", 
      priority: "high", 
      status: "open", 
      time: "3 hours ago",
      lastUpdate: "2 hours ago"
    },
  ]

  const feedbackSummary = [
    { 
      category: "Product Quality", 
      rating: 4.8, 
      reviews: 45, 
      trend: "up",
      positive: 38, 
      negative: 7 
    },
    { 
      category: "Customer Service", 
      rating: 4.9, 
      reviews: 38, 
      trend: "up",
      positive: 35, 
      negative: 3 
    },
    { 
      category: "Delivery Speed", 
      rating: 4.2, 
      reviews: 52, 
      trend: "down",
      positive: 42, 
      negative: 10 
    },
    { 
      category: "Value for Money", 
      rating: 4.6, 
      reviews: 41, 
      trend: "stable",
      positive: 36, 
      negative: 5 
    },
  ]

  const customerInteractions = [
    { 
      type: "chat", 
      customer: "Sarah Johnson", 
      message: "Hi, I need help with my order", 
      time: "10 minutes ago", 
      status: "new" 
    },
    { 
      type: "email", 
      customer: "Mike Wilson", 
      message: "Refund request for order #5678", 
      time: "1 hour ago", 
      status: "replied" 
    },
    { 
      type: "phone", 
      customer: "Emma Davis", 
      message: "Called regarding product return", 
      time: "2 hours ago", 
      status: "completed" 
    },
    { 
      type: "chat", 
      customer: "John Smith", 
      message: "Thank you for the quick resolution!", 
      time: "3 hours ago", 
      status: "completed" 
    },
  ]

  const topIssues = [
    { issue: "Size Exchange", count: 12, percentage: 35, color: "bg-blue-500" },
    { issue: "Product Quality", count: 8, percentage: 24, color: "bg-red-500" },
    { issue: "Delivery Issues", count: 6, percentage: 18, color: "bg-orange-500" },
    { issue: "Returns/Refunds", count: 5, percentage: 15, color: "bg-purple-500" },
    { issue: "General Inquiry", count: 3, percentage: 8, color: "bg-gray-400" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-pink-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconHeart className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Customer Care Center</h1>
                <p className="text-pink-100 text-sm md:text-base drop-shadow">
                  Manage customer support and feedback
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconSearch className="h-4 w-4 mr-2" />
                Search Tickets
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Care Metrics */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Support Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careMetrics.map((metric, index) => (
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
                    <span>from yesterday</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Recent Support Tickets */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconMessage className="h-5 w-5" />
                    <CardTitle>Recent Support Tickets</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTickets.map((ticket, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm font-bold">{ticket.id}</div>
                      <div className="text-xs text-muted-foreground">{ticket.priority}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{ticket.customer}</h4>
                        <Badge variant={
                          ticket.status === "open" ? "destructive" :
                          ticket.status === "in-progress" ? "secondary" : "default"
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created: {ticket.time}</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <IconMessageReply className="h-3 w-3" />
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <IconCheck className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Customer Interactions */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconUser className="h-5 w-5" />
                <CardTitle>Recent Interactions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {customerInteractions.map((interaction, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {interaction.type === "chat" && <IconMessage className="h-4 w-4 text-blue-500" />}
                      {interaction.type === "email" && <IconMail className="h-4 w-4 text-green-500" />}
                      {interaction.type === "phone" && <IconPhone className="h-4 w-4 text-purple-500" />}
                      <span className="text-sm font-medium">{interaction.customer}</span>
                    </div>
                    <Badge variant={
                      interaction.status === "new" ? "destructive" :
                      interaction.status === "replied" ? "secondary" : "default"
                    }>
                      {interaction.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{interaction.message}</p>
                  <p className="text-xs text-muted-foreground">{interaction.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Feedback Summary and Top Issues */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Feedback Summary */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStar className="h-5 w-5" />
                <CardTitle>Feedback Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackSummary.map((feedback, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{feedback.category}</h4>
                    <div className="flex items-center gap-1">
                      <IconStar className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{feedback.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{feedback.reviews} reviews</span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <IconThumbUp className="h-3 w-3" />
                        <span>{feedback.positive}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <IconThumbDown className="h-3 w-3" />
                        <span>{feedback.negative}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Issues */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconAlertTriangle className="h-5 w-5" />
                <CardTitle>Common Issues</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topIssues.map((issue, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{issue.issue}</span>
                    <span className="text-sm text-muted-foreground">{issue.count} cases</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${issue.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${issue.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{issue.percentage}% of total issues</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
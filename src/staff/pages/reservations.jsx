import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconCalendar, 
  IconClock,
  IconUser,
  IconPhone,
  IconMail,
  IconMapPin,
  IconCheck,
  IconX,
  IconEdit,
  IconPlus,
  IconFilter,
  IconSearch,
  IconAlertTriangle,
  IconTrendingUp,
  IconUsers
} from "@tabler/icons-react"

export default function Reservations() {
  const reservationMetrics = [
    { 
      title: "Today's Reservations", 
      value: "12", 
      change: "+3", 
      icon: IconCalendar, 
      trend: "up",
      description: "Scheduled for today"
    },
    { 
      title: "Pending Approval", 
      value: "5", 
      change: "-2", 
      icon: IconAlertTriangle, 
      trend: "down",
      description: "Need staff attention"
    },
    { 
      title: "Completed Today", 
      value: "8", 
      change: "+1", 
      icon: IconCheck, 
      trend: "up",
      description: "Services completed"
    },
    { 
      title: "No-show Rate", 
      value: "5%", 
      change: "-2%", 
      icon: IconTrendingUp, 
      trend: "down",
      description: "Customer attendance"
    },
  ]

  const todaysReservations = [
    { 
      time: "09:00", 
      customer: "Sarah Johnson", 
      service: "Fitting Consultation", 
      duration: "60 min", 
      status: "confirmed", 
      phone: "+1 (555) 123-4567",
      notes: "First-time customer"
    },
    { 
      time: "10:30", 
      customer: "Mike Wilson", 
      service: "Follow-up", 
      duration: "30 min", 
      status: "confirmed", 
      phone: "+1 (555) 234-5678",
      notes: "Return customer"
    },
    { 
      time: "11:00", 
      customer: "Emma Davis", 
      service: "Emergency Repair", 
      duration: "45 min", 
      status: "pending", 
      phone: "+1 (555) 345-6789",
      notes: "Urgent repair needed"
    },
    { 
      time: "14:00", 
      customer: "John Smith", 
      service: "Product Consultation", 
      duration: "60 min", 
      status: "confirmed", 
      phone: "+1 (555) 456-7890",
      notes: "Interested in premium products"
    },
    { 
      time: "15:30", 
      customer: "Lisa Brown", 
      service: "Fitting Session", 
      duration: "45 min", 
      status: "confirmed", 
      phone: "+1 (555) 567-8901",
      notes: "Size consultation"
    },
    { 
      time: "16:00", 
      customer: "David Lee", 
      service: "Follow-up", 
      duration: "30 min", 
      status: "cancelled", 
      phone: "+1 (555) 678-9012",
      notes: "Customer cancelled"
    },
  ]

  const upcomingReservations = [
    { 
      date: "Tomorrow", 
      time: "09:00", 
      customer: "Alice Cooper", 
      service: "Fitting", 
      status: "confirmed" 
    },
    { 
      date: "Tomorrow", 
      time: "10:30", 
      customer: "Bob Wilson", 
      service: "Consultation", 
      status: "pending" 
    },
    { 
      date: "Tomorrow", 
      time: "14:00", 
      customer: "Carol Davis", 
      service: "Follow-up", 
      status: "confirmed" 
    },
    { 
      date: "Wednesday", 
      time: "09:00", 
      customer: "Daniel Brown", 
      service: "Emergency Repair", 
      status: "confirmed" 
    },
    { 
      date: "Wednesday", 
      time: "11:00", 
      customer: "Eva Green", 
      service: "Product Demo", 
      status: "pending" 
    },
  ]

  const serviceTypes = [
    { name: "Fitting Consultation", count: 45, duration: "60 min", price: "$50" },
    { name: "Follow-up", count: 32, duration: "30 min", price: "$25" },
    { name: "Emergency Repair", count: 18, duration: "45 min", price: "$75" },
    { name: "Product Demo", count: 23, duration: "45 min", price: "$40" },
    { name: "Custom Fitting", count: 15, duration: "90 min", price: "$100" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-indigo-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconCalendar className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Reservations Management</h1>
                <p className="text-indigo-100 text-sm md:text-base drop-shadow">
                  Manage customer appointments and bookings
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconPlus className="h-4 w-4 mr-2" />
                New Reservation
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconFilter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconSearch className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Reservation Metrics */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Reservation Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reservationMetrics.map((metric, index) => (
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

          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconClock className="h-5 w-5" />
                    <CardTitle>Today's Schedule</CardTitle>
                  </div>
                  <Button variant="outline" size="sm">View Calendar</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysReservations.map((reservation, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <div className="text-center min-w-[60px]">
                      <div className="text-lg font-bold">{reservation.time}</div>
                      <div className="text-xs text-muted-foreground">{reservation.duration}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{reservation.customer}</h4>
                        <Badge variant={
                          reservation.status === "confirmed" ? "default" :
                          reservation.status === "pending" ? "secondary" : "destructive"
                        }>
                          {reservation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{reservation.service}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <IconPhone className="h-3 w-3" />
                          <span>{reservation.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconMail className="h-3 w-3" />
                          <span>{reservation.customer.toLowerCase().replace(' ', '.')}@email.com</span>
                        </div>
                      </div>
                      {reservation.notes && (
                        <p className="text-xs text-blue-600 mt-1">{reservation.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <IconEdit className="h-3 w-3" />
                      </Button>
                      {reservation.status === "pending" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <IconCheck className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Reservations */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconCalendar className="h-5 w-5" />
                <CardTitle>Upcoming</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReservations.map((reservation, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{reservation.date}</span>
                    <Badge variant={
                      reservation.status === "confirmed" ? "default" : "secondary"
                    }>
                      {reservation.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">{reservation.time}</div>
                  <div className="text-sm text-muted-foreground">{reservation.customer}</div>
                  <div className="text-xs text-muted-foreground">{reservation.service}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Service Types Performance */}
        <div className="px-4 lg:px-6">
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconUsers className="h-5 w-5" />
                <CardTitle>Service Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Service Type</th>
                      <th className="text-left p-2">Bookings (30 days)</th>
                      <th className="text-left p-2">Duration</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceTypes.map((service, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{service.name}</td>
                        <td className="p-2">{service.count}</td>
                        <td className="p-2">{service.duration}</td>
                        <td className="p-2">{service.price}</td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <IconEdit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <IconPlus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
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

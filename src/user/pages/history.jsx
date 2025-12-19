import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { 
  IconHistory, 
  IconSearch,
  IconDownload,
  IconEye,
  IconRepeat,
  IconStar,
  IconTruck,
  IconCheck,
  IconClock,
  IconPackage,
  IconCreditCard,
  IconFilter,
  IconCalendar,
  IconTrendingUp,
} from "@tabler/icons-react"
import { useState } from "react"

export default function History() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      statusColor: "default",
      items: [
        { name: "Running Shoes Pro", price: 89.99, quantity: 1, image: "🏃‍♂️" },
        { name: "Athletic Shorts", price: 24.99, quantity: 2, image: "🩳" }
      ],
      subtotal: 139.97,
      shipping: 0,
      tax: 11.20,
      total: 151.17,
      tracking: "TRK123456789",
      deliveryDate: "2024-01-18",
      rating: 5,
      reviewSubmitted: true,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-12",
      status: "Shipped",
      statusColor: "secondary",
      items: [
        { name: "Fitness Tracker", price: 149.99, quantity: 1, image: "⌚" },
        { name: "Water Bottle Smart", price: 19.99, quantity: 1, image: "💧" }
      ],
      subtotal: 169.98,
      shipping: 0,
      tax: 13.60,
      total: 183.58,
      tracking: "TRK987654321",
      deliveryDate: null,
      rating: null,
      reviewSubmitted: false,
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-08",
      status: "Processing",
      statusColor: "outline",
      items: [
        { name: "Yoga Mat Premium", price: 29.99, quantity: 1, image: "🧘‍♀️" },
        { name: "Sports Jacket", price: 59.99, quantity: 1, image: "🧥" }
      ],
      subtotal: 89.98,
      shipping: 9.99,
      tax: 7.20,
      total: 107.17,
      tracking: null,
      deliveryDate: null,
      rating: null,
      reviewSubmitted: false,
    },
    {
      id: "ORD-2023-156",
      date: "2023-12-28",
      status: "Delivered",
      statusColor: "default",
      items: [
        { name: "Training Shoes", price: 69.99, quantity: 1, image: "👟" },
        { name: "Protein Powder", price: 39.99, quantity: 1, image: "🥤" }
      ],
      subtotal: 109.98,
      shipping: 0,
      tax: 8.80,
      total: 118.78,
      tracking: "TRK555666777",
      deliveryDate: "2023-12-31",
      rating: 4,
      reviewSubmitted: true,
    },
    {
      id: "ORD-2023-155",
      date: "2023-12-20",
      status: "Cancelled",
      statusColor: "destructive",
      items: [
        { name: "Smart Watch", price: 199.99, quantity: 1, image: "⌚" }
      ],
      subtotal: 199.99,
      shipping: 0,
      tax: 16.00,
      total: 215.99,
      tracking: null,
      deliveryDate: null,
      rating: null,
      reviewSubmitted: false,
    },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    
    let matchesTime = true
    if (timeFilter !== "all") {
      const orderDate = new Date(order.date)
      const now = new Date()
      const diffTime = Math.abs(now - orderDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      switch (timeFilter) {
        case "7days":
          matchesTime = diffDays <= 7
          break
        case "30days":
          matchesTime = diffDays <= 30
          break
        case "90days":
          matchesTime = diffDays <= 90
          break
        case "year":
          matchesTime = diffDays <= 365
          break
      }
    }
    
    return matchesSearch && matchesStatus && matchesTime
  })

  const stats = [
    { 
      title: "Total Orders", 
      value: orders.length.toString(), 
      icon: IconPackage, 
      color: "text-blue-600" 
    },
    { 
      title: "Total Spent", 
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`, 
      icon: IconCreditCard, 
      color: "text-green-600" 
    },
    { 
      title: "Average Order", 
      value: `$${(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2)}`, 
      icon: IconTrendingUp, 
      color: "text-purple-600" 
    },
    { 
      title: "Delivered", 
      value: orders.filter(o => o.status === "Delivered").length.toString(), 
      icon: IconCheck, 
      color: "text-emerald-600" 
    },
  ]

  const reorderOrder = (orderId) => {
    console.log("Reordering:", orderId)
    // Implementation for reordering
  }

  const downloadReceipt = (orderId) => {
    console.log("Downloading receipt for:", orderId)
    // Implementation for downloading receipt
  }

  const submitReview = (orderId) => {
    console.log("Submitting review for:", orderId)
    // Implementation for submitting review
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-green-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconHistory className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Order History</h1>
                <p className="text-green-100 text-sm md:text-base drop-shadow">Track and manage your purchase history</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Purchase Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconFilter className="h-5 w-5" />
                Filter Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders or items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="px-4 lg:px-6">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <IconHistory className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" || timeFilter !== "all" 
                      ? "Try adjusting your filters to see more results." 
                      : "You haven't placed any orders yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>
                          Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={order.statusColor}>
                          {order.status}
                        </Badge>
                        <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl">{item.image}</div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} • ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Delivery & Tracking</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {order.tracking && (
                            <div className="flex items-center gap-2">
                              <IconTruck className="h-4 w-4" />
                              <span>Tracking: {order.tracking}</span>
                            </div>
                          )}
                          {order.deliveryDate && (
                            <div className="flex items-center gap-2">
                              <IconCheck className="h-4 w-4" />
                              <span>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {!order.deliveryDate && order.status !== "Cancelled" && (
                            <div className="flex items-center gap-2">
                              <IconClock className="h-4 w-4" />
                              <span>Estimated delivery: 3-5 business days</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <IconEye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => reorderOrder(order.id)}>
                        <IconRepeat className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadReceipt(order.id)}>
                        <IconDownload className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                      {!order.reviewSubmitted && order.status === "Delivered" && (
                        <Button size="sm" onClick={() => submitReview(order.id)}>
                          <IconStar className="h-4 w-4 mr-2" />
                          Write Review
                        </Button>
                      )}
                      {order.rating && order.reviewSubmitted && (
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-md">
                          <IconStar className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-yellow-700">Your review: {order.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

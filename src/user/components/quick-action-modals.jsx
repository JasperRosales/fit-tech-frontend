
import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { 
  Users, 
  Package, 
  Gift, 
  Bell, 
  Search,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  Calendar,
  Plus,
  Minus
} from "lucide-react"
import { 
  IconTrendingUp 
} from "@tabler/icons-react"
import { userService } from "@/services/userService"
import { productService } from "@/services/productService"
import { notificationService } from "@/services/notificationService"
import { promotionService } from "@/services/promotionService"



export function UserQuickActionModals() {
  // Modal states
  const [showUserModal, setShowUserModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showPromotionModal, setShowPromotionModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  // Data states
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [categories, setCategories] = useState([])
  
  // Loading states
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  
  // Filter states
  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [notificationFilter, setNotificationFilter] = useState("all")

  // Load data functions
  const loadUsers = async () => {
    setLoadingUsers(true)
    try {
      const response = await userService.getAll()
      setUsers(response.data || [])
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const loadProducts = async () => {
    setLoadingProducts(true)
    try {
      const response = await productService.getAll()
      setProducts(response.data || [])
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data?.map(p => p.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const loadNotifications = async () => {
    setLoadingNotifications(true)
    try {
      const response = await notificationService.getAll()
      setNotifications(response.data || [])
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoadingNotifications(false)
    }
  }



  // Handle modal opening
  const handleOpenUserModal = () => {
    setShowUserModal(true)
    loadUsers()
  }

  const handleOpenProductModal = () => {
    setShowProductModal(true)
    loadProducts()
  }

  const handleOpenPromotionModal = () => {
    setShowPromotionModal(true)
  }

  const handleOpenNotificationModal = () => {
    setShowNotificationModal(true)
    loadNotifications()
  }


  // Expose handlers to parent via window for global access
  React.useEffect(() => {
    window.openUserModal = handleOpenUserModal;
    window.openProductModal = handleOpenProductModal;
    window.openPromotionModal = handleOpenPromotionModal;
    window.openNotificationModal = handleOpenNotificationModal;
    
    return () => {
      delete window.openUserModal;
      delete window.openProductModal;
      delete window.openPromotionModal;
      delete window.openNotificationModal;
    };
  }, []);

  // Filter functions
  const filteredUsers = users.filter(user => 
    userSearchTerm === "" || 
    user.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchTerm.toLowerCase())
  )

  const filteredProducts = products.filter(product => 
    productSearchTerm === "" || 
    product.name?.toLowerCase().includes(productSearchTerm.toLowerCase())
  )

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title?.toLowerCase().includes(notificationSearchTerm?.toLowerCase() || "") ||
                         notification.message?.toLowerCase().includes(notificationSearchTerm?.toLowerCase() || "")
    const matchesFilter = notificationFilter === "all" || notification.type === notificationFilter
    return matchesSearch && matchesFilter
  })

  const [notificationSearchTerm, setNotificationSearchTerm] = useState("")

  // Get low stock products
  const lowStockProducts = products.filter(product => product.stock_quantity <= 10)

  // Get notification icon
  const getNotificationIcon = (type) => {
    const iconMap = {
      order: ShoppingCart,
      reservation: Calendar,
      promotion: Gift,
      system: Bell,
      alert: AlertTriangle,
      default: Bell
    }
    const Icon = iconMap[type] || iconMap.default
    return <Icon className="h-4 w-4" />
  }

  return (
    <>
      {/* User Management Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Manage Users & Personnel
            </DialogTitle>
            <DialogDescription>
              View and manage users in the system. You can view user details and account status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Users List */}
            <div className="space-y-2">
              {loadingUsers ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {userSearchTerm ? "No users found matching search" : "No users found"}
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 rounded-full p-2">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name || user.first_name + ' ' + user.last_name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role || 'user'}
                              </Badge>
                              <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                {user.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.is_active ? (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <UserX className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowUserModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stock Management Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Manage Stock
            </DialogTitle>
            <DialogDescription>
              View product inventory and stock levels. Monitor low stock items and product availability.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inventory">Product Inventory</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingProducts ? (
                  <div className="col-span-full flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    {productSearchTerm ? "No products found matching search" : "No products found"}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Badge variant={product.stock_quantity <= 10 ? "destructive" : "default"}>
                              {product.stock_quantity} in stock
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">${product.price}</span>
                            <div className="flex items-center gap-1">
                              {product.stock_quantity <= 10 ? (
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="low-stock" className="space-y-4">
              {lowStockProducts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Products Well Stocked!</h3>
                    <p className="text-muted-foreground">No products are running low on inventory.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {lowStockProducts.map((product) => (
                    <Card key={product.id} className="border-orange-200 bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 rounded-full p-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive">{product.stock_quantity} remaining</Badge>
                            <p className="text-xs text-muted-foreground mt-1">Low stock alert</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowProductModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Promotion Modal */}
      <Dialog open={showPromotionModal} onOpenChange={setShowPromotionModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Create New Promotion
            </DialogTitle>
            <DialogDescription>
              Create and manage promotional campaigns for your products and services.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promotion Details</CardTitle>
                <CardDescription>
                  Fill in the details for your new promotional campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Promotion Name</label>
                    <Input placeholder="e.g., Summer Sale 2024" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Discount Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Discount Value</label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Brief description of the promotion" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPromotionModal(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Promotion
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Modal */}
      <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              System Notifications
            </DialogTitle>
            <DialogDescription>
              View and manage system notifications and alerts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search notifications..."
                  value={notificationSearchTerm}
                  onChange={(e) => setNotificationSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={notificationFilter} onValueChange={setNotificationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="order">Orders</SelectItem>
                  <SelectItem value="reservation">Reservations</SelectItem>
                  <SelectItem value="promotion">Promotions</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="alert">Alerts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
              {loadingNotifications ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {notificationSearchTerm || notificationFilter !== "all" 
                    ? "No notifications match your filters" 
                    : "No notifications found"
                  }
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card key={notification.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline">{notification.type}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(notification.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            {!notification.is_read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowNotificationModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>


    </>
  )
}

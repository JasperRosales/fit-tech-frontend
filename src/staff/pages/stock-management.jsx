import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { 
  IconPackage, 
  IconAlertTriangle,
  IconTrendingUp,
  IconTrendingDown,
  IconSearch,
  IconPlus,
  IconMinus,
  IconTrendingDown as IconLowStock,
  IconEye,
  IconCheck,
  IconX
} from "@tabler/icons-react"

export default function StockManagement() {
  const stockMetrics = [
    { 
      title: "Total Products", 
      value: "342", 
      change: "+8", 
      icon: IconPackage, 
      trend: "up",
      description: "Active products in catalog"
    },
    { 
      title: "Low Stock Items", 
      value: "12", 
      change: "-3", 
      icon: IconLowStock, 
      trend: "down",
      description: "Items need restocking"
    },
    { 
      title: "Out of Stock", 
      value: "3", 
      change: "+1", 
      icon: IconAlertTriangle, 
      trend: "up",
      description: "Items unavailable"
    },
    { 
      title: "Stock Value", 
      value: "$45,670", 
      change: "+$2,340", 
      icon: IconTrendingUp, 
      trend: "up",
      description: "Total inventory value"
    },
  ]

  const lowStockItems = [
    { name: "Running Shoes - Size 8", current: 2, minimum: 10, category: "Footwear", status: "critical" },
    { name: "Yoga Mat - Purple", current: 5, minimum: 15, category: "Accessories", status: "warning" },
    { name: "Sports Socks - White", current: 8, minimum: 20, category: "Accessories", status: "warning" },
    { name: "Water Bottle - Blue", current: 1, minimum: 12, category: "Accessories", status: "critical" },
  ]

  const topSellingProducts = [
    { name: "Running Shoes - Black", sold: 45, stock: 23, trend: "up", revenue: "$4,500" },
    { name: "Yoga Mat - Blue", sold: 38, stock: 12, trend: "up", revenue: "$1,900" },
    { name: "Sports Bra - Pink", sold: 32, stock: 18, trend: "down", revenue: "$1,600" },
    { name: "Gym Shorts - Gray", sold: 29, stock: 15, trend: "up", revenue: "$1,450" },
    { name: "Hoodie - Navy", sold: 27, stock: 8, trend: "up", revenue: "$2,160" },
  ]

  const recentMovements = [
    { type: "restock", item: "Running Shoes - Size 9", quantity: 50, date: "2 hours ago", status: "completed" },
    { type: "sale", item: "Yoga Mat - Blue", quantity: -3, date: "4 hours ago", status: "completed" },
    { type: "restock", item: "Sports Socks - Black", quantity: 100, date: "6 hours ago", status: "completed" },
    { type: "damage", item: "Water Bottle - Red", quantity: -2, date: "1 day ago", status: "completed" },
    { type: "restock", item: "Gym Shorts - Blue", quantity: 25, date: "1 day ago", status: "completed" },
  ]

  const categories = [
    { name: "Footwear", products: 45, lowStock: 3, value: "$12,450" },
    { name: "Clothing", products: 78, lowStock: 5, value: "$18,900" },
    { name: "Accessories", products: 34, lowStock: 4, value: "$8,320" },
    { name: "Equipment", products: 23, lowStock: 0, value: "$6,000" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 pt-8">
        <div className="px-4 lg:px-6">

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 md:p-8 text-white shadow-lg shadow-green-500/25">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 rounded-full p-3 shadow-lg shadow-white/20">
                <IconPackage className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-1xl md:text-3xl font-bold drop-shadow-lg">Stock Management</h1>
                <p className="text-green-100 text-sm md:text-base drop-shadow">
                  Monitor and manage your inventory levels
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconSearch className="h-4 w-4 mr-2" />
                Search Products
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <IconPlus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>

        {/* Stock Metrics */}
        <div className="px-4 lg:px-6">
          <h2 className="text-xl font-semibold mb-4">Stock Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stockMetrics.map((metric, index) => (
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
                    <span>from last week</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Low Stock Alert */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01] border-orange-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconAlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle>Low Stock Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.name}</p>
                      <Badge variant={item.status === "critical" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>Current: {item.current}</span>
                      <span>Minimum: {item.minimum}</span>
                      <span className="text-orange-600">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <IconPlus className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <IconEye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Categories Overview */}
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconPackage className="h-5 w-5" />
                <CardTitle>Categories Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{category.name}</p>
                    <p className="text-sm font-bold">{category.value}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{category.products} products</span>
                    {category.lowStock > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {category.lowStock} low stock
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Selling Products */}
        <div className="px-4 lg:px-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTrendingUp className="h-5 w-5" />
                <CardTitle>Top Selling Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Sold (7 days)</th>
                      <th className="text-left p-2">Current Stock</th>
                      <th className="text-left p-2">Trend</th>
                      <th className="text-left p-2">Revenue</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSellingProducts.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{product.name}</td>
                        <td className="p-2">{product.sold}</td>
                        <td className="p-2">
                          <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-2">
                          {product.trend === 'up' ? (
                            <IconTrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <IconTrendingDown className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                        <td className="p-2">{product.revenue}</td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <IconPlus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <IconMinus className="h-3 w-3" />
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

        {/* Recent Stock Movements */}
        <div className="px-4 lg:px-6">
          <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconCheck className="h-5 w-5" />
                <CardTitle>Recent Stock Movements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMovements.map((movement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    movement.type === 'restock' ? 'bg-green-100' :
                    movement.type === 'sale' ? 'bg-blue-100' :
                    movement.type === 'damage' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {movement.type === 'restock' ? (
                      <IconPlus className="h-4 w-4 text-green-600" />
                    ) : movement.type === 'sale' ? (
                      <IconMinus className="h-4 w-4 text-blue-600" />
                    ) : movement.type === 'damage' ? (
                      <IconX className="h-4 w-4 text-red-600" />
                    ) : (
                      <IconCheck className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{movement.item}</p>
                    <p className="text-xs text-muted-foreground">
                      {movement.type === 'restock' ? 'Added' : 
                       movement.type === 'sale' ? 'Sold' :
                       movement.type === 'damage' ? 'Damaged' : 'Updated'}: {Math.abs(movement.quantity)} units
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{movement.date}</p>
                    <Badge variant="outline" className="text-xs">{movement.status}</Badge>
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

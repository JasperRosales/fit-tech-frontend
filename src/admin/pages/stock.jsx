

import { SectionCards } from "@/admin/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Stock() {
  const stockData = [
    { id: "1", item: "Laptop", category: "Electronics", stock: 45, status: "In Stock", lastUpdated: "2024-01-15" },
    { id: "2", item: "Office Chair", category: "Furniture", stock: 12, status: "Low Stock", lastUpdated: "2024-01-14" },
    { id: "3", item: "Monitor", category: "Electronics", stock: 0, status: "Out of Stock", lastUpdated: "2024-01-13" },
    { id: "4", item: "Desk", category: "Furniture", stock: 28, status: "In Stock", lastUpdated: "2024-01-15" },
    { id: "5", item: "Keyboard", category: "Electronics", stock: 89, status: "In Stock", lastUpdated: "2024-01-15" },
  ]

  const categoryData = [
    { category: "Electronics", totalItems: 3, totalStock: 134, value: "$26,800" },
    { category: "Furniture", totalItems: 2, totalStock: 40, value: "$8,500" },
    { category: "Stationery", totalItems: 5, totalStock: 200, value: "$2,100" },
    { category: "Software", totalItems: 8, totalStock: 100, value: "$15,000" },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 lg:px-6">

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Total Items</CardTitle>
                <CardDescription>Items in inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18</div>
                <p className="text-sm text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Total Stock</CardTitle>
                <CardDescription>Total units in stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">474</div>
                <p className="text-sm text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>Items needing restock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>


            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader>
                <CardTitle>Inventory Value</CardTitle>
                <CardDescription>Total value of stock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$52,400</div>
                <p className="text-sm text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 lg:px-6">
            <Tabs defaultValue="inventory" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Stock Inventory</CardTitle>
                        <CardDescription>Manage your inventory items and stock levels</CardDescription>
                      </div>
                      <Button>Add Item</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stockData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.item}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  item.status === "In Stock" ? "default" : 
                                  item.status === "Low Stock" ? "secondary" : 
                                  "destructive"
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.lastUpdated}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Stock by Category</CardTitle>
                        <CardDescription>Inventory breakdown by category</CardDescription>
                      </div>
                      <Button>Manage Categories</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total Stock</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryData.map((category) => (
                          <TableRow key={category.category}>
                            <TableCell className="font-medium">{category.category}</TableCell>
                            <TableCell>{category.totalItems}</TableCell>
                            <TableCell>{category.totalStock}</TableCell>
                            <TableCell>{category.value}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}


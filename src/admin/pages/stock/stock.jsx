
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";


import { StockTable } from "./stock-table";
import { ProductEditModal } from "./product-edit-modal";

import { DeleteConfirmationModal } from "@/components/shared/delete-confirmation-modal";



import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { toast } from "sonner";


import {
  Plus,
  Edit,
  RefreshCw,
  Search,
  Package,
  AlertTriangle,
  Trash2,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { 
  IconTrendingUp 
} from "@tabler/icons-react";



export default function AdminStock() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    topSellingCount: 0,
    lowStockCount: 0,
    totalProducts: 0,
    totalStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });




  // Load products, categories, and analytics data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add timeout handling
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      // Fetch products and categories in parallel
      const [
        productsResponse, 
        categoriesResponse
      ] = await Promise.race([
        Promise.all([
          productService.getAll({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
            search: searchTerm,
          }),
          categoryService.getAll()
        ]),
        timeoutPromise
      ]);

      // Handle products response
      const productsData = productsResponse[0] || [];
      const categoriesData = categoriesResponse[1] || [];

      // Process products for DataTable
      const processedProducts = (Array.isArray(productsData) ? productsData : []).map((product) => {
        // Calculate stock from variants
        const stockFromVariants = product.variants?.reduce((sum, v) => {
          const variantStock = parseInt(v.stock) || 0;
          return sum + variantStock;
        }, 0) || 0;
        
        return {
          id: product.id,
          name: product.name || "Unknown Product",
          slug: product.slug || "",
          description: product.description || "",
          price: parseFloat(product.price) || 0,
          discount: parseFloat(product.discount) || 0,
          category_id: product.category_id,
          category: product.category?.name || "Uncategorized",
          is_active: product.is_active ?? true,
          stock: stockFromVariants,
          variants: product.variants || [],
          images: product.images || [],
          createdAt: product.created_at,
          updatedAt: product.updated_at,
        };
      });

      setProducts(processedProducts);
      
      // Process categories - handle different response formats
      const processedCategories = Array.isArray(categoriesData) 
        ? categoriesData.map(cat => ({
            id: cat.id,
            value: cat.value || cat.id.toString(),
            label: cat.label || cat.name || 'Unknown Category'
          }))
        : [];
      
      setCategories(processedCategories);

      // Calculate analytics data from products
      setAnalyticsData({
        totalProducts: processedProducts.length,
        totalStock: processedProducts.reduce((sum, item) => sum + (item.stock || 0), 0),
        lowStockCount: processedProducts.filter(item => (item.stock || 0) <= 5).length,
        topSellingCount: processedProducts.filter(item => (item.stock || 0) > 5).length,
      });

      setTotalPages(Math.max(1, Math.ceil(processedProducts.length / pagination.pageSize)));
    } catch (err) {
      console.warn("Failed to load data, using fallback:", err.message);
      
      // Set fallback data
      setProducts([]);
      setCategories([
        { id: 1, value: "1", label: "Fitness Equipment" },
        { id: 2, value: "2", label: "Supplements" },
        { id: 3, value: "3", label: "Apparel" }
      ]);
      
      setAnalyticsData({
        totalProducts: 0,
        totalStock: 0,
        lowStockCount: 0,
        topSellingCount: 0,
      });
      
      setError(err.message);
      
      // Show user-friendly toast only for critical errors
      if (err.message !== 'Request timeout') {
        toast.error("Using fallback data - some features may be limited");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get stock status and badge variant
  const getStockStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
      default:
        return "outline";
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination.pageIndex, pagination.pageSize, searchTerm]);




  // Calculate summary statistics from analytics data
  const totalItems = analyticsData.totalProducts;
  const totalStock = analyticsData.totalStock || 0;
  const lowStockItems = analyticsData.lowStockCount || 0;

  // Handle save product
  const handleSaveProduct = async (productData) => {
    try {

      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
        toast.success("Product updated successfully");
      } else {
        await productService.create(productData);
        toast.success("Product created successfully");
      }
      setIsEditModalOpen(false);
      setEditingProduct(null);
      loadData();
    } catch (err) {
      console.error("Failed to save product:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to save product";
      toast.error(errorMessage);
      throw err;
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Handle delete
  const handleDelete = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {

      await productService.delete(deletingProduct.id);
      toast.success("Product deleted successfully");
      setIsDeleteModalOpen(false);
      setDeletingProduct(null);
      loadData();
    } catch (err) {
      console.error("Failed to delete product:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to delete product";
      toast.error(errorMessage);
    }
  };

  // Open dialog for new product
  const handleNewProduct = () => {
    setEditingProduct(null);
    setIsEditModalOpen(true);
  };

  // Handle refresh
  const handleRefresh = async () => {
    await loadData();
    toast.success("Data refreshed");
  };


  // Filter products for category selection
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || 
      selectedCategory === "all" || 
      product.category_id?.toString() === selectedCategory ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });



  // Define StockTable columns
  const columns = [
    {
      key: "id",
      header: "ID",
      className: "text-center text-muted-foreground",
      cell: ({ row }) => (
        <div className="text-sm font-mono">
          #{row.original.id}
        </div>
      ),
    },



    {
      key: "images",
      header: "Image",
      cell: ({ row }) => {
        const product = row.original;
        
        // Find primary image or use first image
        let primaryImage = null;
        
        if (product.images && Array.isArray(product.images)) {
          // Try to find primary image first
          primaryImage = product.images.find(img => img.is_primary === true) || product.images[0];
        }
        
        // If no valid image data, show placeholder
        if (!primaryImage || !primaryImage.url) {
          return (
            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
          );
        }
        
        // Validate and format image URL
        const imageUrl = typeof primaryImage.url === 'string' && primaryImage.url.trim() ? primaryImage.url.trim() : null;
        const imageAlt = typeof primaryImage.alt === 'string' && primaryImage.alt.trim() 
          ? primaryImage.alt.trim() 
          : `${product.name} product image`;
        
        if (!imageUrl) {
          return (
            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
          );
        }
        
        return (
          <div className="relative group">
            <img 
              src={imageUrl} 
              alt={imageAlt}
              className="w-12 h-12 object-cover rounded cursor-pointer border border-gray-200"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              onLoad={() => {
                console.log(`Product ${product.id} image loaded: ${imageUrl}`);
              }}
            />
            <div 
              className="w-12 h-12 bg-muted rounded flex items-center justify-center border border-gray-200"
              style={{ display: 'none' }}
            >
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            {/* Enhanced tooltip showing alt text */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap max-w-48">
              <div className="font-medium">{imageAlt}</div>
              {imageUrl && <div className="text-gray-300 text-xs truncate max-w-40">{imageUrl}</div>}
            </div>
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex flex-col">
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-muted-foreground">
              {product.description}
            </div>
          </div>
        );
      },

    },
    {
      key: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      key: "price",
      header: "Price",

      cell: ({ row }) => {
        const finalPrice = row.original.price - row.original.discount;
        return (
          <div className="text-right">
            <div className="font-medium">₱{finalPrice.toFixed(2)}</div>
            {row.original.discount > 0 && (
              <div className="text-xs text-muted-foreground line-through">
                ₱{row.original.price.toFixed(2)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        const status = getStockStatus(stock);
        return (
          <div className="text-center">
            <div className="font-medium">{stock}</div>
            <Badge variant={getStatusBadgeVariant(status)} className="text-xs">
              {status}
            </Badge>
          </div>
        );
      },
    },


    {
      key: "variants",
      header: "Variants",
      cell: ({ row }) => {
        const variants = row.original.variants || [];
        const totalStock = row.original.stock; // Use the same stock calculation as main column
        
        return (
          <div className="text-center">
            <div className="text-sm font-medium">{variants.length}</div>
            <div className="text-xs text-muted-foreground">
              {totalStock} total units
            </div>
          </div>
        );
      },
    },
    {
      key: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.updatedAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];


  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Header with refresh button */}
          <div className="px-4 lg:px-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Inventory Management
                </h1>
                <p className="text-muted-foreground">
                  Manage your product inventory and stock levels
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>




          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-6">
            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Items
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : totalItems}
                </div>
                <p className="text-xs text-muted-foreground">
                  Items in inventory
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stock
                </CardTitle>

                <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : totalStock.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total units in stock
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 ease-linear hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Items
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : lowStockItems}
                </div>
                <p className="text-xs text-muted-foreground">
                  Items needing restock
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedCategory || "all"}
                onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>

                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Table */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Inventory</CardTitle>
                    <CardDescription>
                      Manage your product inventory with full CRUD operations
                    </CardDescription>
                  </div>
                  <Button
                    onClick={handleNewProduct}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {error ? (
                  <div className="text-center py-8 text-red-600">Error: {error}</div>
                ) : (
                  <StockTable 
                    data={filteredProducts} 
                    columns={columns}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={categories}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Modals */}
          <ProductEditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingProduct(null);
            }}
            product={editingProduct}
            onSave={handleSaveProduct}
            loading={loading}
            categories={categories}
          />

          <DeleteConfirmationModal
            open={isDeleteModalOpen}
            onOpenChange={(open) => {
              setIsDeleteModalOpen(open);
              if (!open) setDeletingProduct(null);
            }}
            onConfirm={confirmDelete}
            title="Delete Product"
            description={`Are you sure you want to delete "${deletingProduct?.name}"? This action cannot be undone.`}
            isLoading={loading}
            itemName={deletingProduct?.name}
          />
        </div>
      </div>
    </div>
  );
}

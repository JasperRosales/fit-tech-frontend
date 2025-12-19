
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Plus, Trash2, Edit, Package, Image, Palette, Save } from "lucide-react"

import { categoryService } from "@/services/categoryService"


export function ProductEditModal({ 
  isOpen, 
  onClose, 
  product, 
  onSave, 
  loading = false,
  categories: propCategories = [] 
}) {
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discount: "0.00",
    category_id: "",
    is_active: true,
  })

  const [variants, setVariants] = useState([])
  const [images, setImages] = useState([])
  const [newVariant, setNewVariant] = useState({
    size: "",
    color: "",
    sku: "",
    stock: ""
  })
  const [newImage, setNewImage] = useState({
    url: "",
    alt: "",
    is_primary: false
  })



  // Load categories function
  const loadCategories = async () => {
    if (propCategories.length > 0) {
      // Use provided categories
      setCategories(propCategories)
    } else {
      // Load categories from service
      setCategoriesLoading(true)
      try {

        const loadedCategories = await categoryService.getAll()
        setCategories(loadedCategories)
        console.log('Loaded categories:', loadedCategories) // Debug log
      } catch (error) {
        console.error('Failed to load categories:', error)
        toast.error('Failed to load categories')
      } finally {
        setCategoriesLoading(false)
      }
    }
  }

  useEffect(() => {
    loadCategories()
  }, [propCategories])



  useEffect(() => {
    if (product) {
      console.log('Setting form data for product:', product) // Debug log
      console.log('Product images data:', product.images) // Debug log for images
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        discount: product.discount?.toString() || "0.00",
        category_id: product.category_id?.toString() || "",
        is_active: product.is_active ?? true,
      })
      

      // Ensure variants are properly set - use real IDs from backend
      const productVariants = product.variants || []
      console.log('Setting variants:', productVariants) // Debug log
      setVariants(productVariants.map(v => ({
        id: v.id, // Use the real ID from database
        size: v.size,
        color: v.color,
        sku: v.sku,
        stock: v.stock
      })))
      
      // Ensure images are properly set - use real IDs from backend
      const productImages = product.images || []
      console.log('Setting images:', productImages) // Debug log
      setImages(productImages.map(img => ({
        id: img.id, // Use the real ID from database
        url: img.url,
        alt: img.alt,
        is_primary: img.is_primary
      })))
    } else {
      console.log('Resetting form for new product') // Debug log
      // Reset for new product
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: "",
        discount: "0.00",
        category_id: "",
        is_active: true,
      })
      setVariants([])
      setImages([])
    }
    setNewVariant({ size: "", color: "", sku: "", stock: "" })
    setNewImage({ url: "", alt: "", is_primary: false })
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    try {
      if (parseFloat(formData.price) < 0) {
        toast.error("Price cannot be negative")
        return
      }
      if (parseFloat(formData.discount) < 0) {
        toast.error("Discount cannot be negative")
        return
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        category_id: parseInt(formData.category_id),
        variants,
        images
      }
      
      await onSave(productData)
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const addVariant = () => {
    if (!newVariant.size || !newVariant.color || !newVariant.sku || !newVariant.stock) {
      toast.error("Please fill in all variant fields")
      return
    }
    
    setVariants([...variants, { ...newVariant, id: Date.now() }])
    setNewVariant({ size: "", color: "", sku: "", stock: "" })
    toast.success("Variant added")
  }

  const removeVariant = (id) => {
    setVariants(variants.filter(v => v.id !== id))
    toast.success("Variant removed")
  }

  const addImage = () => {
    if (!newImage.url) {
      toast.error("Please enter image URL")
      return
    }
    
    const updatedImages = [...images, { ...newImage, id: Date.now() }]
    setImages(updatedImages)
    setNewImage({ url: "", alt: "", is_primary: false })
    toast.success("Image added")
  }

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id))
    toast.success("Image removed")
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (name) => {
    setFormData({ ...formData, name, slug: generateSlug(name) })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product ? 'Update product information, variants, and images' : 'Create a new product with variants and images'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Information
                  </CardTitle>
                  <CardDescription>Basic product details and categorization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>

                      <Input
                        id="name"

                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="e.g., Cotton Nike Shirt"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>

                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        placeholder="cotton-nike-shirt"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>

                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="e.g., Premium 100% cotton t-shirt, breathable and comfortable for daily wear"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={formData.category_id} 
                        onValueChange={(value) => {
                          console.log('Category selected:', value) // Debug log
                          setFormData({...formData, category_id: value})
                        }}
                        disabled={categoriesLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={
                            categoriesLoading ? "Loading categories..." : 
                            categories.length === 0 ? "No categories available" : 
                            "Select category"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesLoading ? (
                            <SelectItem value="" disabled>Loading...</SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="" disabled>No categories available</SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.value || category.id?.toString()}>
                                {category.label || category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {categories.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Available categories: {categories.length}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          id="status"
                          checked={formData.is_active}
                          onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                        />
                        <Label htmlFor="status" className="text-sm">
                          {formData.is_active ? 'Active' : 'Inactive'}
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Product Variants
                  </CardTitle>
                  <CardDescription>Manage product variants (size, color, SKU, stock)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add new variant form */}

                  {/* Add new variant form */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                      <Input
                        placeholder="Size (e.g., M)"
                        value={newVariant.size}
                        onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                      />
                      <Input
                        placeholder="Color (e.g., Black)"
                        value={newVariant.color}
                        onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                      />
                      <Input
                        placeholder="SKU (e.g., NS-BLK-M)"
                        value={newVariant.sku}
                        onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
                      />
                      <Input
                        placeholder="Stock (e.g., 25)"
                        type="number"
                        min="0"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                      />
                      <Button type="button" onClick={addVariant} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add product variants with size, color, SKU, and stock quantity
                    </p>
                  </div>

                  <Separator />

                  {/* Variants list */}
                  <div className="space-y-2">
                    {variants.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No variants added yet
                      </p>
                    ) : (
                      <div className="grid gap-2">
                        {variants.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <Badge variant="outline">{variant.size}</Badge>
                              <span className="text-sm">{variant.color}</span>
                              <span className="text-sm text-muted-foreground">{variant.sku}</span>
                              <span className="text-sm font-medium">Stock: {variant.stock}</span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeVariant(variant.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Product Images
                  </CardTitle>
                  <CardDescription>Manage product images and gallery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add new image form */}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

                    <Input
                      placeholder="e.g., https://example.com/shirt-image.jpg"
                      value={newImage.url}
                      onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                    />
                    <Input
                      placeholder="e.g., Front view of black shirt"
                      value={newImage.alt}
                      onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="primary"
                        checked={newImage.is_primary}
                        onCheckedChange={(checked) => setNewImage({...newImage, is_primary: checked})}
                      />
                      <Label htmlFor="primary" className="text-sm">Primary</Label>
                    </div>
                    <Button type="button" onClick={addImage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {images.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No images added yet
                      </p>
                    ) : (
                      <div className="grid gap-2">

                        {images.map((image) => (
                          <div key={image.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              {image.url && (
                                <img 
                                  src={image.url} 
                                  alt={image.alt} 
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                  }}
                                />
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{image.alt || 'No alt text'}</span>
                                {image.url && (
                                  <span className="text-xs text-muted-foreground truncate max-w-[200px]" title={image.url}>
                                    {image.url}
                                  </span>
                                )}
                              </div>
                              {image.is_primary && (
                                <Badge variant="default" className="text-xs">Primary</Badge>
                              )}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeImage(image.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Pricing Information
                  </CardTitle>
                  <CardDescription>Set product pricing and discounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">


                      <Label htmlFor="price">Price (₱) *</Label>


                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || parseFloat(val) >= 0) {
                            setFormData({...formData, price: val})
                          }
                        }}
                        placeholder="e.g., 499.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">

                      <Label htmlFor="discount">Discount (₱)</Label>

                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || parseFloat(val) >= 0) {
                            setFormData({...formData, discount: val})
                          }
                        }}
                        placeholder="e.g., 50.00"
                      />
                    </div>
                  </div>
                  
                  {formData.price && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Price Summary</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">

                          <span>Original Price:</span>
                          <span>₱{parseFloat(formData.price || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">

                          <span>Discount:</span>
                          <span>-₱{parseFloat(formData.discount || 0).toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Final Price:</span>
                          <span>₱{(parseFloat(formData.price || 0) - parseFloat(formData.discount || 0)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ShoppingCart, 
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useModal } from "../../lib/modal-context";


const ProductOverview = ({ product, onBack, onAddToCart, onToggleFavorite, isFavorite = false, isLoading = false }) => {
  const { showSuccess, showError } = useModal();
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  // Real product data from the clicked product
  const productData = {
    id: product?.id,
    name: product?.name || "Product Name",
    price: product?.price || 0,
    originalPrice: product?.original_price,
    images: product?.images || [{ image_url: '/api/placeholder/400/500' }],
    description: product?.description || "No description available.",
    rating: product?.rating || 4.0,
    reviewCount: product?.review_count || 0,
    discountPercentage: product?.discount_percentage || 0,
    stockQuantity: product?.stock_quantity || 0,
    categoryId: product?.category_id,
    variants: product?.variants || []
  };

  // Convert images to array of URLs
  const imageUrls = productData.images.map(img => img.image_url || img.url || '/api/placeholder/400/500');

  const colors = [
    { name: "white", label: "White", value: "white" },
    { name: "gray", label: "Gray", value: "gray" },
    { name: "black", label: "Black", value: "black" }
  ];

  const sizes = [
    { name: "XXS", available: false },
    { name: "XS", available: true },
    { name: "S", available: true, selected: true },
    { name: "M", available: true },
    { name: "L", available: true },
    { name: "XL", available: true },
    { name: "2XL", available: true },
    { name: "3XL", available: true }
  ];


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };



  const handleAddToBag = async () => {
    if (!onAddToCart || productData.stockQuantity === 0) return;

    setAddingToCart(true);
    try {
      await onAddToCart({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        originalPrice: productData.originalPrice,
        images: productData.images,
        selectedColor,
        selectedSize,
        quantity: 1,
        stockQuantity: productData.stockQuantity,
        variants: productData.variants
      });
      
      showSuccess('Added to Cart', `${productData.name} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Error', 'Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="pt-6">

        {/* Breadcrumb and Back Button */}
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Button>
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <span className="text-sm text-gray-500">Products</span>
              </li>
              <li>
                <svg viewBox="0 0 16 20" width="16" height="20" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </li>
              <li className="text-sm">
                <span aria-current="page" className="font-medium text-gray-900 truncate max-w-32">{productData.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">

          {/* Secondary images (hidden on mobile) */}
          <div className="hidden lg:grid lg:grid-rows-2 lg:gap-8">
            {imageUrls.slice(1, 3).map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${productData.name} view ${index + 2}`} 
                className="w-full rounded-lg object-cover aspect-[3/4]" 
              />
            ))}
          </div>
          
          {/* Main image */}
          <div className="relative lg:row-span-2">
            <img 
              src={imageUrls[currentImageIndex] || '/api/placeholder/400/500'} 
              alt={productData.name} 
              className="w-full rounded-lg object-cover aspect-[4/5] sm:rounded-lg lg:aspect-[3/4]" 
            />
            

            {/* Navigation arrows */}
            {imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
            
            {/* Image indicators */}
            {imageUrls.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productData.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl tracking-tight text-gray-900">₱{productData.price.toLocaleString()}</p>
              {productData.originalPrice && productData.originalPrice > productData.price && (
                <p className="text-lg text-gray-500 line-through">₱{productData.originalPrice.toLocaleString()}</p>
              )}
              {productData.discountPercentage > 0 && (
                <span className="bg-destructive text-destructive-foreground text-sm font-medium px-2 py-1 rounded">
                  {productData.discountPercentage}% OFF
                </span>
              )}
            </div>
            {productData.stockQuantity <= 10 && productData.stockQuantity > 0 && (
              <p className="text-sm text-orange-600 mt-1">Only {productData.stockQuantity} left in stock!</p>
            )}
            {productData.stockQuantity === 0 && (
              <p className="text-sm text-destructive mt-1">Out of stock</p>
            )}

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`size-5 shrink-0 ${
                        i < Math.floor(productData.rating) 
                          ? 'text-gray-900' 
                          : 'text-gray-200'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="sr-only">{productData.rating} out of 5 stars</p>
                <a href="#reviews" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {productData.reviewCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {colors.map((color) => (
                      <div key={color.value} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                        <input
                          type="radio"
                          name="color"
                          value={color.value}
                          checked={selectedColor === color.value}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          aria-label={color.label}
                          className="size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 checked:outline-gray-400 focus-visible:outline-3 focus-visible:outline-offset-3"
                          style={{
                            backgroundColor: color.name === 'white' ? '#ffffff' : 
                                           color.name === 'gray' ? '#9ca3af' : '#111827'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#size-guide" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map((size) => (
                      <label 
                        key={size.name}
                        aria-label={size.name}
                        className={`group relative flex items-center justify-center rounded-md border p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 ${
                          size.available 
                            ? 'border-gray-300 bg-white cursor-pointer' 
                            : 'border-gray-400 bg-gray-200 opacity-25 cursor-not-allowed'
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size.name}
                          disabled={!size.available}
                          checked={size.selected}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className={`text-sm font-medium uppercase ${
                          size.selected ? 'text-white' : 'text-gray-900'
                        }`}>
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>


              <div className="mt-10 flex items-center gap-4">

                <Button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={productData.stockQuantity === 0 || addingToCart}
                  className={`flex-1 flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium focus:ring-2 focus:ring-offset-2 ${
                    productData.stockQuantity === 0
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                  }`}
                >
                  {addingToCart ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 mr-2" />
                  )}
                  {productData.stockQuantity === 0 ? 'Out of Stock' : addingToCart ? 'Adding...' : 'Add to bag'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onToggleFavorite && onToggleFavorite(product)}
                  className={`p-3 ${
                    isFavorite 
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{productData.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">Hand cut and sewn locally</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">Dyed with our proprietary colors</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">Pre-washed &amp; pre-shrunk</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">Ultra-soft 100% cotton</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  The 6-Pack includes two black, two white, and two heather gray Basic Tees. 
                  Sign up for our subscription service and be the first to get new, exciting colors, 
                  like our upcoming "Charcoal Gray" limited release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;

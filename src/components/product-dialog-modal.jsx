import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cartService } from '@/services/cartService';
import { useModal } from '@/lib/modal-context';

const ProductDialogModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) => {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { showSuccess, showError } = useModal();

  if (!isOpen || !product) return null;

  // Process product data
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

  const handleAddToCart = async () => {
    if (productData.stockQuantity === 0) {
      showError('Out of Stock', 'This item is currently unavailable.');
      return;
    }

    setIsAddingToCart(true);
    
    try {
      // Prepare cart item data
      const cartItemData = {
        productId: productData.id,
        quantity: 1,
        selectedColor,
        selectedSize,
        price: productData.price,
        name: productData.name,
        image: imageUrls[0]
      };

      // Note: In a real implementation, you'd get the cartId from user context/session
      // For now, we'll use a placeholder or get it from a context
      const cartId = 'user-cart-id'; // This should come from user context

      // Call the cart service
      await cartService.addItem(cartId, cartItemData);
      
      // Show success message
      showSuccess('Added to Cart', `${productData.name} has been added to your cart!`);
      
      // Close modal
      onClose();
      
      // Trigger callback if provided
      if (onAddToCart) {
        onAddToCart(cartItemData);
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError('Error', 'Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-500 hover:bg-white/90 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="relative bg-gray-50 flex items-center justify-center p-6 lg:p-8">
            <div className="relative w-full max-w-md">
              <img 
                src={imageUrls[currentImageIndex] || '/api/placeholder/400/500'} 
                alt={productData.name} 
                className="w-full rounded-lg object-cover aspect-[4/5]" 
              />

              {/* Image Navigation */}
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
                  
                  {/* Image indicators */}
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
                </>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 flex flex-col">
            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{productData.name}</h2>
              
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <p className="text-2xl font-bold text-gray-900">₱{productData.price.toLocaleString()}</p>
                {productData.originalPrice && productData.originalPrice > productData.price && (
                  <p className="text-lg text-gray-500 line-through">₱{productData.originalPrice.toLocaleString()}</p>
                )}
                {productData.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    {productData.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {productData.stockQuantity <= 10 && productData.stockQuantity > 0 && (
                <p className="text-sm text-orange-600 mb-4">Only {productData.stockQuantity} left in stock!</p>
              )}
              {productData.stockQuantity === 0 && (
                <p className="text-sm text-red-600 mb-4">Out of stock</p>
              )}

              {/* Reviews */}
              <div className="mb-6">
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
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {productData.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
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
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </button>
                  </div>
                  
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
                          checked={selectedSize === size.name}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className={`text-sm font-medium uppercase ${
                          selectedSize === size.name ? 'text-white' : 'text-gray-900'
                        }`}>
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={productData.stockQuantity === 0 || isAddingToCart}
                className={`flex-1 flex items-center justify-center rounded-md px-8 py-3 text-base font-medium focus:ring-2 focus:ring-offset-2 ${
                  productData.stockQuantity === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
              >
                {isAddingToCart ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {isAddingToCart ? 'Adding...' : (productData.stockQuantity === 0 ? 'Out of Stock' : 'Add to bag')}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDialogModal;

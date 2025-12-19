// Product Grid Component - Clean and reusable
// ===========================================

import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Cloth Store Product Card Component
const ClothStoreProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onAddToCart
}) => {
  const primaryImage = product.images?.[0]?.url || '/api/placeholder/300/300';
  const categoryName = product.category_name || 'Clothing';
  const finalPrice = product.price - (product.discount || 0);
  const isOnSale = product.discount > 0;

  return (
    <Card className="group relative overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-muted relative cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          src={primaryImage}
          alt={product.name}
          loading="lazy"
        />
        
        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-sm">
            SALE
          </div>
        )}

        {/* Favorite Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors backdrop-blur-sm ${
                  isFavorite 
                    ? 'bg-white/90 text-red-500 hover:bg-white' 
                    : 'bg-black/20 text-white hover:bg-white/90 hover:text-red-500'
                }`}
                aria-label="Toggle favorite"
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="bg-white/90 text-gray-900 hover:bg-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {categoryName}
        </p>

        {/* Name */}
        <h3 className="text-sm font-semibold text-foreground truncate" title={product.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-bold text-foreground">
            ₱{finalPrice.toLocaleString()}
          </p>
          {isOnSale && (
            <p className="text-xs text-muted-foreground line-through decoration-destructive/50">
              ₱{product.price.toLocaleString()}
            </p>
          )}
        </div>

        {/* Stock Status */}
        {product.total_stock <= 10 && product.total_stock > 0 && (
          <p className="text-xs text-orange-600 font-medium">
            Only {product.total_stock} left in stock
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="px-3"
                  disabled={product.total_stock === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.total_stock === 0 ? 'Out of stock' : 'Add to cart'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

// Product Grid Container Component
const ProductGrid = ({
  products,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onAddToCart,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return <ProductGridEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ClothStoreProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

// Loading Skeleton Component
const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border shadow-sm animate-pulse">
      <div className="aspect-[3/4] w-full bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-muted rounded flex-1"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const ProductGridEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">No products found</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        We couldn't find any products matching your current filters. Try adjusting your search criteria.
      </p>
    </div>
  );
};

export default ProductGrid;

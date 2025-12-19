import React, { Suspense } from 'react';
import ProductCard from '../components/product-card';

const ProductCardSkeleton = ({ listView = false }) => {
  if (listView) {
    return (
      <div className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};


const ProductGrid = ({ 
  products, 
  categories, 
  favorites, 
  onToggleFavorite, 
  onViewDetails, 
  onAddToCart,
  loading,
  error 
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.length === 0 && !loading ? (
        <div className="col-span-full text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {error || "Try adjusting your search or filter criteria"}
            </p>
          </div>
        </div>
      ) : (
        products.map((product) => {
          const category = categories.find(c => c.id == product.category_id);
          const isOnSale = product.discount && product.discount > 0;
          const originalPrice = isOnSale ? product.price + product.discount : null;
          
          return (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={originalPrice}
                image={product.images?.[0]?.url || product.images?.[0]?.image_url || '/api/placeholder/300/300'}
                category={category?.name || 'Uncategorized'}
                isOnSale={isOnSale}
                isFavorite={favorites.has(product.id)}
                product={product}
                onFavoriteToggle={(e) => {
                  if (e && e.stopPropagation) e.stopPropagation();
                  onToggleFavorite && onToggleFavorite(product);
                }}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
              />
            </Suspense>
          );
        })
      )}
    </div>
  );
};

export default ProductGrid;

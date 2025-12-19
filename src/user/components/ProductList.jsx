import React, { Suspense } from 'react';
import ProductCard from '../components/product-card';

const ProductCardSkeleton = ({ listView = true }) => {
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
};

const ProductList = ({ 
  products, 
  categories, 
  favorites, 
  onToggleFavorite, 
  onViewDetails, 
  loading,
  error 
}) => {
  return (
    <div className="space-y-4">
      {products.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
          {error && (
            <p className="text-destructive text-sm mt-2">{error}</p>
          )}
        </div>
      ) : (
        products.map((product) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.original_price}
              image={product.images?.[0]?.image_url || '/api/placeholder/300/300'}
              category={categories.find(c => c.id == product.category_id)?.name || 'Uncategorized'}
              isOnSale={product.discount_percentage > 0}
              isFavorite={favorites.has(product.id)}
              product={product}
              onFavoriteToggle={(e) => {
                if (e && e.stopPropagation) e.stopPropagation();
                onToggleFavorite(product);
              }}
              onViewDetails={onViewDetails}
            />
          </Suspense>
        ))
      )}
    </div>
  );
};

export default ProductList;

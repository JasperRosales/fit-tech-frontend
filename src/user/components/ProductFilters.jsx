import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart } from 'lucide-react';


const ProductFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  totalItems,
  isLoading,
  onRefresh,
  showFavoritesFilter,
  isFavoritesOnly
}) => {

  return (
    <div className="mb-8 space-y-4">
      {/* Favorites Filter Indicator */}
      {isFavoritesOnly && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-600 fill-current" />
            <span className="text-sm text-red-700 font-medium">
              Showing favorite products only
            </span>
          </div>
        </div>
      )}
      
      {/* Results Summary */}
      {totalItems > 0 && !isLoading && (
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            {totalItems} products found
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-xs"
          >
            <Search className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-10 border-input"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <select 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background min-w-[150px]"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        {/* Sort */}
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background min-w-[120px]"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="created_at">Newest</option>
          <option value="favorites">Favorites Only</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;

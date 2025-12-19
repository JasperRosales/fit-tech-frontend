// Products Page - Using Enhanced Cloth Store Services
// ===========================================================


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import clean components
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import ProductPagination from '../components/ProductPagination';

// Import enhanced cloth store services
import { 
  setCurrentUser,
  initializeMockData,
  getAllProducts,
  getProductsByCategory,
  getDiscountedProducts,
  searchProducts,
  setUserForCart,
  setUserForFavorites,
  addItemToCart,
  addItemToFavorites,
  removeItemFromFavorites,
  getUserFavoritesWithDetails,
  getUserCartWithDetails,
  getAllCategoriesWithCounts,
} from '../../services/mock/index';

const Products = () => {
  // Initialize user context - In real app, this would come from auth
  const [currentUser, setCurrentUserState] = useState(null);
  
  // Core data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);
  

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const productsPerPage = 12;


  // Initialize user context and services
  useEffect(() => {
    const initializeUserContext = async () => {
      try {
        // Initialize mock data
        initializeMockData();
        
        // Use userEmail from localStorage if available, otherwise use demo
        const storedEmail = localStorage.getItem('userEmail');
        const email = storedEmail || 'demo@clothstore.com';
        
        setCurrentUser(email);
        setCurrentUserState(email);
        
        // Set user context for all services
        setUserForCart(email);
        setUserForFavorites(email);
        
        console.log('Cloth Store initialized for user:', email);
      } catch (error) {
        console.error('Failed to initialize user context:', error);
        setError('Failed to initialize application');
      }
    };

    initializeUserContext();
  }, []);

  // Fetch products based on current filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let productsData = [];
      const filters = {
        search: searchQuery.trim() || undefined,
        category_id: selectedCategory !== "all" ? parseInt(selectedCategory) : undefined,
        sort: sortBy,
        is_active: true
      };


      // Get products based on filters
      if (filters.search) {
        productsData = searchProducts(filters.search);
      } else if (filters.category_id) {
        productsData = getProductsByCategory(filters.category_id);
      } else if (sortBy === 'discount') {
        productsData = getDiscountedProducts();
      } else {
        const allProductsResult = getAllProducts(filters);
        productsData = allProductsResult.data || [];
      }

      // Ensure productsData is an array before sorting
      if (!Array.isArray(productsData)) {
        productsData = [];
      }

      // Apply additional sorting
      if (filters.sort === 'price') {
        productsData.sort((a, b) => a.price - b.price);
      } else if (filters.sort === 'created_at') {
        productsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else {
        productsData.sort((a, b) => a.name.localeCompare(b.name));
      }


      setProducts(productsData);
      setTotalProducts(productsData.length);
      
      // Calculate pagination
      const totalPagesCount = Math.ceil(productsData.length / productsPerPage);
      setTotalPages(totalPagesCount);
      
      // Reset to first page when filters change
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sortBy, productsPerPage]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = getAllCategoriesWithCounts();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    }
  }, []);

  // Fetch user favorites
  const fetchFavorites = useCallback(async () => {
    try {
      if (!currentUser) return;
      
      const userFavorites = getUserFavoritesWithDetails();
      const favoriteIds = new Set(userFavorites.map(f => f.product_id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [currentUser]);


  // Fetch user cart
  const fetchCart = useCallback(async () => {
    try {
      if (!currentUser) return;
      
      const userCart = getUserCartWithDetails();
      
      // Ensure userCart has items property and it's an array
      const cartItems = Array.isArray(userCart.items) ? userCart.items : [];
      setCart(cartItems);
      
      // Calculate total items count
      const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartItemsCount(totalCount);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Set empty cart on error
      setCart([]);
      setCartItemsCount(0);
    }
  }, [currentUser]);

  // Load data when filters change
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);


  // Load user data when user is set
  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
      fetchCart();
    }
  }, [currentUser, fetchFavorites, fetchCart]);

  // Calculate paginated products when products or currentPage changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedData = products.slice(startIndex, endIndex);
    setPaginatedProducts(paginatedData);
  }, [products, currentPage, productsPerPage]);

  // Debounced search
  const debouncedSearch = useMemo(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  // Handle search changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch();
  }, [debouncedSearch]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    if (filterType === 'category') {
      setSelectedCategory(value);
    } else if (filterType === 'sort') {
      setSortBy(value);
    }
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    fetchProducts();
    fetchFavorites();
    fetchCart();
  }, [fetchProducts, fetchFavorites, fetchCart]);

  // Handle add to cart
  const handleAddToCart = useCallback(async (product) => {
    try {
      if (!currentUser) {
        setError('Please login to add items to cart');
        return;
      }

      // Add to cart using enhanced service
      const updatedCart = addItemToCart(product.id, null, 1); // productId, variantId, quantity
      
      if (updatedCart) {
        // Refresh cart data
        await fetchCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    }
  }, [currentUser, fetchCart]);

  // Handle toggle favorite
  const handleToggleFavorite = useCallback(async (product) => {
    try {
      if (!currentUser) {
        // For non-logged users, just update local state
        const newFavorites = new Set(favorites);
        if (favorites.has(product.id)) {
          newFavorites.delete(product.id);
        } else {
          newFavorites.add(product.id);
        }
        setFavorites(newFavorites);
        return;
      }

      const isFavorited = favorites.has(product.id);
      
      if (isFavorited) {
        // Remove from favorites
        removeItemFromFavorites(product.id, null);
        const newFavorites = new Set(favorites);
        newFavorites.delete(product.id);
        setFavorites(newFavorites);
      } else {
        // Add to favorites
        addItemToFavorites(product.id, null, 'Loved this item');
        const newFavorites = new Set(favorites);
        newFavorites.add(product.id);
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError('Failed to update favorites');
    }
  }, [currentUser, favorites]);


  // Handle view details (placeholder)
  const handleViewDetails = useCallback((product) => {
    console.log('View details for product:', product);
    // TODO: Implement product detail view/modal
  }, []);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-lg font-medium text-foreground">Something went wrong</h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button 
              onClick={() => {
                setError(null);
                handleRefresh();
              }}
              className="mt-4"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Fashion Collection
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {loading ? 'Loading products...' : `${products.length} products available`}
            </p>
          </div>
          
          {/* Cart indicator */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Cart: {cartItemsCount} items
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>


        {/* Filters */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => handleFilterChange('category', value)}
          sortBy={sortBy}
          onSortChange={(value) => handleFilterChange('sort', value)}
          categories={categories}
          totalItems={totalProducts}
          isLoading={loading}
          onRefresh={handleRefresh}
        />


        {/* Product Grid */}
        <ProductGrid
          products={paginatedProducts}
          categories={categories}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
          onAddToCart={handleAddToCart}
          loading={loading}
          error={error}
        />

        {/* Pagination */}
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-12"
        />

        {/* Results Summary */}
        {!loading && totalProducts > 0 && (
          <div className="text-center mt-8 text-sm text-muted-foreground">
            Showing {(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
            {selectedCategory !== "all" && (
              <span className="ml-2">
                • Filtered by: {categories.find(c => c.id == selectedCategory)?.name || 'Unknown'}
              </span>
            )}
            {searchQuery && (
              <span className="ml-2">
                • Search: "{searchQuery}"
              </span>
            )}
          </div>
        )}

        {/* Error banner for non-critical errors */}
        {error && products.length > 0 && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-destructive">{error}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;


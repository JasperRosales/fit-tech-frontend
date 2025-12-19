
export * from './mock/index.js';

export * from './localStorage/index.js';

export const initializeDataLayer = () => {
  console.log('Initializing Fashion Store Data Layer...');
  
  const mockStats = initializeMockData();
  
  initializeAllLocalStorageServices();
  
  return {
    status: 'success',
    timestamp: new Date().toISOString(),
    data: {
      mock: mockStats,
      localStorage: 'initialized'
    }
  };
};

export const getFashionData = () => ({
  categories: mockCategories,
  products: mockProducts,
  getCategoryName,
  getCategoryId
});

export const getLocalStorageServices = () => ({
  storage: {
    initializeStorage,
    setCurrentUser,
    getCurrentUser,
    clearCurrentUser
  },
  cart: {
    addItemToCart,
    getUserCartWithDetails,
    updateCartItemQuantity,
    removeItemFromCart,
    clearUserCart
  },
  favorites: {
    addItemToFavorites,
    getUserFavoritesWithDetails,
    removeItemFromFavorites,
    toggleFavorite
  },
  products: {
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    getProductBySlug,
    searchProducts
  },
  categories: {
    getAllCategories,
    getAllCategoriesWithCounts,
    getCategoriesForNavigation
  },
  orders: {
    createOrderFromCart,
    getUserOrdersWithDetails,
    getOrderById,
    cancelOrder
  }
});

export default {
  mockCategories,
  mockProducts,
  getCategoryName,
  getCategoryId,
  initializeMockData,
  
  initializeStorage,
  setCurrentUser,
  getCurrentUser,
  addItemToCart,
  getUserCartWithDetails,
  addItemToFavorites,
  getUserFavoritesWithDetails,
  getAllProducts,
  getFeaturedProducts,
  createOrderFromCart,
  getUserOrdersWithDetails,
  
  // Main initialization
  initializeDataLayer,
  getFashionData,
  getLocalStorageServices
};

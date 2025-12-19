// LocalStorage Services Index - Reorganized from services/mock
// ===========================================================

// Enhanced Storage Service
export {
  initializeStorage,
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  getUserFavorites,
  saveUserFavorites,
  getUserCart,
  saveUserCart,
  getUserOrders,
  saveUserOrders,
  getUserNotifications,
  saveUserNotifications,
  getUserReservations,
  saveUserReservations,
  getUserRecommendations,
  saveUserRecommendations,
  generateId,
  clearUserData,
  clearAllData,
  isLocalStorageAvailable,
  getStorageStats,
  STORAGE_KEYS
} from './enhancedLocalStorageService.js';

// Basic Storage Service
export {
  getItem,
  setItem,
  removeItem,
  clear,
  getAllItems,
  updateItem,
  generateUniqueId
} from './localStorageService.js';

// Product Operations
export {
  initializeMockData,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  getProductsByIds,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
  deleteProductImage,
  addProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getAllCategories,
  getProductsByCategory,
  getDiscountedProducts,
  searchProducts,
  getProductPrice
} from './operations/enhancedProductOperations.js';

// Cart Operations
export {
  initializeMockCart,
  setUserForCart,
  getUserCartWithDetails,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearUserCart,
  getCartItemCount,
  isProductInCart,
  getCartItem,
  validateCartItems,
  getCartForCheckout
} from './operations/enhancedCartOperations.js';

// Favorite Operations
export {
  initializeMockFavorites,
  setUserForFavorites,
  getUserFavoritesWithDetails,
  addItemToFavorites,
  removeItemFromFavorites,
  updateFavoriteNotes,
  clearUserFavorites,
  isProductInFavorites,
  getFavorite,
  getFavoritesCount,
  toggleFavorite,
  getFavoritesByCategory,
  searchFavorites,
  getRecentlyAddedFavorites,
  validateFavoriteItems
} from './operations/enhancedFavoriteOperations.js';

// Category Operations
export {
  initializeMockCategories,
  getAllCategoriesWithCounts,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesWithProducts,
  getPopularCategories,
  getCategoriesForNavigation,
  validateCategoryForDeletion,
  getCategoryStats,
  searchCategories
} from './operations/enhancedCategoryOperations.js';

// Order Operations
export {
  initializeMockOrders,
  setUserForOrders,
  getUserOrdersWithDetails,
  getOrderById,
  createOrderFromCart,
  updateOrderStatus,
  getOrdersByStatus,
  getRecentOrders,
  getOrderStats,
  searchOrders,
  cancelOrder,
  canCancelOrder,
  getOrdersByDateRange
} from './operations/enhancedOrderOperations.js';

// Initialize all localStorage services
export const initializeAllLocalStorageServices = () => {
  initializeStorage();
  console.log('All localStorage services initialized successfully');
};

// Usage examples for fashion store:
/*
Usage Examples:

1. Initialize services:
   import { initializeAllLocalStorageServices } from '../localStorage/index.js';
   initializeAllLocalStorageServices();

2. Set user context:
   import { setCurrentUser, setUserForCart, setUserForFavorites, setUserForOrders } from '../localStorage/index.js';
   setCurrentUser('user@example.com');
   setUserForCart('user@example.com');
   setUserForFavorites('user@example.com');
   setUserForOrders('user@example.com');

3. Cart operations:
   import { addItemToCart, getUserCartWithDetails } from '../localStorage/index.js';
   const cart = addItemToCart(1, null, 2);
   const cartDetails = getUserCartWithDetails();

4. Favorites operations:
   import { addItemToFavorites, getUserFavoritesWithDetails } from '../localStorage/index.js';
   const favorites = addItemToFavorites(1, null, 'Love this outfit');
   const userFavorites = getUserFavoritesWithDetails();

5. Order operations:
   import { createOrderFromCart, getUserOrdersWithDetails } from '../localStorage/index.js';
   const order = createOrderFromCart({ billing_address: {}, shipping_method: 'pickup' });
   const orders = getUserOrdersWithDetails();
*/

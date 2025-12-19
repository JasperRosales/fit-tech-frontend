
// Enhanced Mock Services Index - Clothing Focus
// =============================================

// Data
export { 
  mockCategories, 
  mockProducts, 
  getCategoryName, 
  getCategoryId,
  clothStoreData 
} from './clothStoreData';

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
} from './enhancedLocalStorageService';

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
} from './operations/enhancedProductOperations';

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
} from './operations/enhancedCartOperations';

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
} from './operations/enhancedFavoriteOperations';

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
} from './operations/enhancedCategoryOperations';

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
} from './operations/enhancedOrderOperations';


// Utility Functions
export const initializeAllMockServices = () => {
  initializeStorage();
  // Initialize all clothing-focused services
  console.log('All enhanced mock services initialized for clothing store');
};


// Usage Examples - Clothing Store
/*
Usage Examples for Clothing Store:

1. Set up user context:
   import { setCurrentUser, setUserForCart, setUserForFavorites, setUserForOrders } from './index.js';
   setCurrentUser('user@example.com');
   setUserForCart('user@example.com');
   setUserForFavorites('user@example.com');
   setUserForOrders('user@example.com');

2. Get clothing products:
   import { getAllProducts, getFeaturedProducts } from './index.js';
   const products = getAllProducts({ category_id: 1, limit: 12 }); // Tops
   const featured = getFeaturedProducts(8);

3. Cart operations for clothing:
   import { addItemToCart, getUserCartWithDetails, updateCartItemQuantity } from './index.js';
   const cart = addItemToCart(1, null, 2); // Add clothing item
   const cartDetails = getUserCartWithDetails();
   const updatedCart = updateCartItemQuantity(1, 3);

4. Favorites operations for clothing:
   import { addItemToFavorites, getUserFavoritesWithDetails, toggleFavorite } from './index.js';
   const favorites = addItemToFavorites(1, null, 'Love this outfit');
   const toggled = toggleFavorite(1, null);

5. Order operations:
   import { createOrderFromCart, getUserOrdersWithDetails, cancelOrder } from './index.js';
   const order = createOrderFromCart({ billing_address: {}, shipping_method: 'pickup' });
   const orders = getUserOrdersWithDetails();
   const cancelledOrder = cancelOrder(1, 'Changed my mind');

6. Clothing categories:
   import { getAllCategoriesWithCounts, getCategoriesForNavigation } from './index.js';
   const categories = getAllCategoriesWithCounts(); // Tops, Bottoms, Dresses, etc.
   const navCategories = getCategoriesForNavigation();
*/

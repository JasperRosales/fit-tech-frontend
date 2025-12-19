// Enhanced localStorage utility with email-based user separation
// =============================================================

const STORAGE_KEYS = {
  // Global data (shared across users)
  PRODUCTS: 'clothstore_products',
  CATEGORIES: 'clothstore_categories',
  COUNTERS: 'clothstore_counters',
  
  // User-specific data (separated by email)
  USER_DATA_PREFIX: 'clothstore_user_',
};

// Current user context (set by authentication)
let currentUserEmail = null;

// Initialize data in localStorage if not exists
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.COUNTERS)) {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify({
      productId: 0,
      variantId: 0,
      imageId: 0,
      favoriteId: 0,
      cartId: 0,
      cartItemId: 0,
      orderId: 0,
      orderItemId: 0,
      notificationId: 0,
      reservationId: 0,
      reservationItemId: 0
    }));
  }
};

// Set current user email
export const setCurrentUser = (email) => {
  currentUserEmail = email;
};

// Get current user email
export const getCurrentUser = () => {
  return currentUserEmail;
};

// Clear current user (on logout)
export const clearCurrentUser = () => {
  currentUserEmail = null;
};

// Generate user-specific storage key
const getUserStorageKey = (baseKey) => {
  if (!currentUserEmail) {
    throw new Error('No current user set. Call setCurrentUser(email) first.');
  }
  return `${STORAGE_KEYS.USER_DATA_PREFIX}${currentUserEmail}_${baseKey}`;
};

// Get data from localStorage
export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Global data operations (shared across users)

// Get products from localStorage
export const getProducts = () => {
  return getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
};

// Save products to localStorage
export const saveProducts = (products) => {
  return saveToStorage(STORAGE_KEYS.PRODUCTS, products);
};

// Get categories from localStorage
export const getCategories = () => {
  return getFromStorage(STORAGE_KEYS.CATEGORIES) || [];
};

// Save categories to localStorage
export const saveCategories = (categories) => {
  return saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
};

// User-specific data operations

// Get user favorites
export const getUserFavorites = () => {
  if (!currentUserEmail) return [];
  return getFromStorage(getUserStorageKey('favorites')) || [];
};

// Save user favorites
export const saveUserFavorites = (favorites) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('favorites'), favorites);
};

// Get user cart
export const getUserCart = () => {
  if (!currentUserEmail) return { items: [], id: null };
  return getFromStorage(getUserStorageKey('cart')) || { items: [], id: null, updated_at: new Date().toISOString() };
};

// Save user cart
export const saveUserCart = (cart) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('cart'), cart);
};

// Get user orders
export const getUserOrders = () => {
  if (!currentUserEmail) return [];
  return getFromStorage(getUserStorageKey('orders')) || [];
};

// Save user orders
export const saveUserOrders = (orders) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('orders'), orders);
};

// Get user notifications
export const getUserNotifications = () => {
  if (!currentUserEmail) return [];
  return getFromStorage(getUserStorageKey('notifications')) || [];
};

// Save user notifications
export const saveUserNotifications = (notifications) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('notifications'), notifications);
};

// Get user reservations
export const getUserReservations = () => {
  if (!currentUserEmail) return [];
  return getFromStorage(getUserStorageKey('reservations')) || [];
};

// Save user reservations
export const saveUserReservations = (reservations) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('reservations'), reservations);
};

// Get user recommendations
export const getUserRecommendations = () => {
  if (!currentUserEmail) return [];
  return getFromStorage(getUserStorageKey('recommendations')) || [];
};

// Save user recommendations
export const saveUserRecommendations = (recommendations) => {
  if (!currentUserEmail) throw new Error('No current user set');
  return saveToStorage(getUserStorageKey('recommendations'), recommendations);
};

// Counter operations (global)
export const getCounters = () => {
  const counters = getFromStorage(STORAGE_KEYS.COUNTERS) || {};
  const defaults = {
    productId: 0,
    variantId: 0,
    imageId: 0,
    favoriteId: 0,
    cartId: 0,
    cartItemId: 0,
    orderId: 0,
    orderItemId: 0,
    notificationId: 0,
    reservationId: 0,
    reservationItemId: 0
  };
  return { ...defaults, ...counters };
};

// Save counters to localStorage
export const saveCounters = (counters) => {
  return saveToStorage(STORAGE_KEYS.COUNTERS, counters);
};

// Generate next ID for a specific entity type
export const generateId = (entityType) => {
  const counters = getCounters();
  if (counters[entityType] === undefined) {
    counters[entityType] = 0;
  }
  counters[entityType] += 1;
  saveCounters(counters);
  return counters[entityType];
};

// Clear user data (for logout or account deletion)
export const clearUserData = () => {
  if (!currentUserEmail) return;
  
  // Remove all user-specific keys
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${STORAGE_KEYS.USER_DATA_PREFIX}${currentUserEmail}_`)) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Clear all data (useful for testing)
export const clearAllData = () => {
  // Clear global data
  Object.values(STORAGE_KEYS).forEach(key => {
    if (!key.startsWith(STORAGE_KEYS.USER_DATA_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
  
  // Clear all user data
  const userKeysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_KEYS.USER_DATA_PREFIX)) {
      userKeysToRemove.push(key);
    }
  }
  
  userKeysToRemove.forEach(key => localStorage.removeItem(key));
};

// Check if localStorage is available
export const isLocalStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

// Get storage statistics
export const getStorageStats = () => {
  const stats = {
    global: {},
    user: currentUserEmail ? {} : null
  };
  
  // Global data sizes
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    if (!key.startsWith(STORAGE_KEYS.USER_DATA_PREFIX)) {
      const data = getFromStorage(key);
      stats.global[name] = {
        exists: !!data,
        size: data ? JSON.stringify(data).length : 0,
        itemCount: Array.isArray(data) ? data.length : (data ? 1 : 0)
      };
    }
  });
  
  // User data sizes
  if (currentUserEmail) {
    const userKeys = [
      'favorites', 'cart', 'orders', 'notifications', 
      'reservations', 'recommendations'
    ];
    
    userKeys.forEach(key => {
      const storageKey = getUserStorageKey(key);
      const data = getFromStorage(storageKey);
      stats.user[key] = {
        exists: !!data,
        size: data ? JSON.stringify(data).length : 0,
        itemCount: Array.isArray(data) ? data.length : (data ? 1 : 0)
      };
    });
  }
  
  return stats;
};

// Export storage keys and current user for use in other files
export { STORAGE_KEYS };

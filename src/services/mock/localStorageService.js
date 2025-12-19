// localStorage utility functions for data persistence
const STORAGE_KEYS = {
  PRODUCTS: 'fittech_products',
  CATEGORIES: 'fittech_categories',
  FAVORITES: 'fittech_favorites',
  CARTS: 'fittech_carts',
  COUNTERS: 'fittech_counters'
};

// Initialize data in localStorage if not exists
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CARTS)) {
    localStorage.setItem(STORAGE_KEYS.CARTS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.COUNTERS)) {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify({
      productId: 0,
      variantId: 0,
      imageId: 0,
      favoriteId: 0,
      cartId: 0,
      cartItemId: 0
    }));
  }
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

// Get favorites from localStorage
export const getFavorites = () => {
  return getFromStorage(STORAGE_KEYS.FAVORITES) || [];
};

// Save favorites to localStorage
export const saveFavorites = (favorites) => {
  return saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
};

// Get carts from localStorage
export const getCarts = () => {
  return getFromStorage(STORAGE_KEYS.CARTS) || [];
};

// Save carts to localStorage
export const saveCarts = (carts) => {
  return saveToStorage(STORAGE_KEYS.CARTS, carts);
};

// Get counters for ID generation
export const getCounters = () => {
  const counters = getFromStorage(STORAGE_KEYS.COUNTERS) || {};
  const defaults = {
    productId: 0,
    variantId: 0,
    imageId: 0,
    favoriteId: 0,
    cartId: 0,
    cartItemId: 0
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

// Clear all data (useful for testing)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
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

// Export storage keys for use in other files
export { STORAGE_KEYS };


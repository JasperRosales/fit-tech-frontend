// Enhanced Favorite Operations with Email-based User Separation
// ============================================================

import { 
  initializeStorage,
  setCurrentUser,
  getCurrentUser,
  getUserFavorites,
  saveUserFavorites,
  generateId,
  getProducts 
} from '../enhancedLocalStorageService';

// Initialize mock data in localStorage
export const initializeMockFavorites = () => {
  initializeStorage();
};

// Set current user for favorite operations
export const setUserForFavorites = (email) => {
  setCurrentUser(email);
};

// Get user's favorites with product details
export const getUserFavoritesWithDetails = () => {
  const userEmail = getCurrentUser();
  if (!userEmail) return [];
  
  const favorites = getUserFavorites();
  const products = getProducts();
  
  // Enrich favorites with product details
  const enrichedFavorites = favorites.map(favorite => {
    const product = products.find(p => p.id === favorite.product_id);
    let variant = null;
    
    if (product && favorite.variant_id) {
      variant = product.variants.find(v => v.id === favorite.variant_id);
    }
    
    return {
      ...favorite,
      product: product || null,
      variant: variant || null
    };
  });
  
  // Filter out favorites where product is no longer available
  return enrichedFavorites.filter(favorite => favorite.product && favorite.product.is_active);
};

// Add item to user's favorites
export const addItemToFavorites = (productId, variantId = null, notes = '') => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const favorites = getUserFavorites();
  const products = getProducts();
  
  // Validate product exists
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Validate variant if specified
  let variant = null;
  if (variantId) {
    variant = product.variants.find(v => v.id === parseInt(variantId));
    if (!variant) {
      throw new Error('Product variant not found');
    }
  }
  
  // Check if item already exists in favorites
  const existingFavoriteIndex = favorites.findIndex(fav => 
    fav.product_id === parseInt(productId) && 
    fav.variant_id === (variantId ? parseInt(variantId) : null)
  );
  
  if (existingFavoriteIndex !== -1) {
    // Update notes if provided
    if (notes) {
      favorites[existingFavoriteIndex].notes = notes;
      favorites[existingFavoriteIndex].updated_at = new Date().toISOString();
    }
  } else {
    // Add new favorite
    const newFavoriteId = generateId('favoriteId');
    
    const newFavorite = {
      id: newFavoriteId,
      product_id: parseInt(productId),
      variant_id: variantId ? parseInt(variantId) : null,
      notes: notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    favorites.push(newFavorite);
  }
  
  saveUserFavorites(favorites);
  
  return getUserFavoritesWithDetails();
};

// Remove item from user's favorites
export const removeItemFromFavorites = (productId, variantId = null) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const favorites = getUserFavorites();
  
  const favoriteIndex = favorites.findIndex(fav => 
    fav.product_id === parseInt(productId) && 
    fav.variant_id === (variantId ? parseInt(variantId) : null)
  );
  
  if (favoriteIndex === -1) {
    throw new Error('Favorite item not found');
  }
  
  favorites.splice(favoriteIndex, 1);
  saveUserFavorites(favorites);
  
  return getUserFavoritesWithDetails();
};

// Update favorite notes
export const updateFavoriteNotes = (favoriteId, notes) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const favorites = getUserFavorites();
  const favoriteIndex = favorites.findIndex(fav => fav.id === parseInt(favoriteId));
  
  if (favoriteIndex === -1) {
    throw new Error('Favorite item not found');
  }
  
  favorites[favoriteIndex].notes = notes;
  favorites[favoriteIndex].updated_at = new Date().toISOString();
  
  saveUserFavorites(favorites);
  
  return getUserFavoritesWithDetails();
};

// Clear entire favorites list
export const clearUserFavorites = () => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  saveUserFavorites([]);
  return [];
};

// Check if product is in favorites
export const isProductInFavorites = (productId, variantId = null) => {
  const favorites = getUserFavorites();
  return favorites.some(fav => 
    fav.product_id === parseInt(productId) && 
    fav.variant_id === (variantId ? parseInt(variantId) : null)
  );
};

// Get favorite by product and variant
export const getFavorite = (productId, variantId = null) => {
  const favorites = getUserFavorites();
  return favorites.find(fav => 
    fav.product_id === parseInt(productId) && 
    fav.variant_id === (variantId ? parseInt(variantId) : null)
  );
};

// Get favorites count
export const getFavoritesCount = () => {
  return getUserFavorites().length;
};

// Toggle favorite (add if not exists, remove if exists)
export const toggleFavorite = (productId, variantId = null, notes = '') => {
  if (isProductInFavorites(productId, variantId)) {
    return removeItemFromFavorites(productId, variantId);
  } else {
    return addItemToFavorites(productId, variantId, notes);
  }
};

// Get favorites by category
export const getFavoritesByCategory = (categoryId) => {
  const favoritesWithDetails = getUserFavoritesWithDetails();
  return favoritesWithDetails.filter(favorite => 
    favorite.product && favorite.product.category_id === parseInt(categoryId)
  );
};

// Search favorites
export const searchFavorites = (query) => {
  const favoritesWithDetails = getUserFavoritesWithDetails();
  const searchTerm = query.toLowerCase();
  
  return favoritesWithDetails.filter(favorite => 
    favorite.product && (
      favorite.product.name.toLowerCase().includes(searchTerm) ||
      favorite.product.description.toLowerCase().includes(searchTerm) ||
      (favorite.notes && favorite.notes.toLowerCase().includes(searchTerm))
    )
  );
};

// Get recently added favorites
export const getRecentlyAddedFavorites = (limit = 5) => {
  const favoritesWithDetails = getUserFavoritesWithDetails();
  
  return favoritesWithDetails
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
};

// Validate favorite items (check product availability)
export const validateFavoriteItems = () => {
  const favorites = getUserFavorites();
  const products = getProducts();
  const validationResults = {
    is_valid: true,
    removed_items: [],
    warnings: []
  };
  
  const validFavorites = favorites.filter(favorite => {
    const product = products.find(p => p.id === favorite.product_id);
    
    if (!product) {
      validationResults.removed_items.push(favorite);
      return false;
    }
    
    if (!product.is_active) {
      validationResults.removed_items.push(favorite);
      return false;
    }
    
    if (favorite.variant_id) {
      const variant = product.variants.find(v => v.id === favorite.variant_id);
      if (!variant) {
        validationResults.warnings.push(`Variant not found for ${product.name}`);
        return false;
      }
    }
    
    return true;
  });
  
  if (validationResults.removed_items.length > 0) {
    validationResults.is_valid = false;
    saveUserFavorites(validFavorites);
  }
  
  return validationResults;
};

// Initialize on load
initializeMockFavorites();

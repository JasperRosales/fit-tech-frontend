

import { 
  getAllFavorites,
  getFavoriteById,
  getFavoritesByUser,
  createFavorite,
  deleteFavorite,
  deleteFavoriteByUserProduct,
  checkFavorite
} from '../data/localStorage/operations/enhancedFavoriteOperations';

// Favorite Service - User favorites management
export const favoriteService = {

  // Get all favorites (filtered)
  getAll: async (params) => {
    return { data: getAllFavorites(params) };
  },
  
  // Get favorite by ID
  getById: async (id) => {
    return { data: getFavoriteById(id) };
  },
  
  // Get favorites by user
  getByUser: async (userId) => {
    return { data: getFavoritesByUser(userId) };
  },
  
  // Create new favorite
  create: async (favoriteData) => {
    return { data: createFavorite(favoriteData) };
  },
  
  // Delete favorite
  delete: async (id) => {
    return deleteFavorite(id);
  },
  
  // Remove favorite (by product/user for toggle functionality)
  remove: async (userId, productId, variantId = null) => {
    return deleteFavoriteByUserProduct(userId, productId, variantId);
  },

  // Remove favorite (alias for compatibility)
  removeByUserProduct: async (userId, productId, variantId = null) => {
    return deleteFavoriteByUserProduct(userId, productId, variantId);
  },
  
  // Check if product is favorited
  check: async (userId, productId) => {
    return { data: checkFavorite(userId, productId) };
  }
};


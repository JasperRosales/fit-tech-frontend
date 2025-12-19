import { 
  initializeStorage, 
  getFavorites, 
  saveFavorites, 
  generateId,
  getProducts
} from '../localStorageService';

// Initialize mock data in localStorage
export const initializeMockFavorites = () => {
  initializeStorage();
};

// Get all favorites (with optional filters)
export const getAllFavorites = (params = {}) => {
  let favorites = getFavorites();
  const products = getProducts();

  // Filter by user_id if provided
  if (params.user_id) {
    favorites = favorites.filter(f => f.user_id === params.user_id);
  }

  // Enrich with product data
  return favorites.map(favorite => {
    const product = products.find(p => p.id === favorite.product_id);
    return {
      ...favorite,
      product: product || null
    };
  });
};

// Get favorite by ID
export const getFavoriteById = (id) => {
  const favorites = getFavorites();
  const favorite = favorites.find(f => f.id === parseInt(id));
  
  if (!favorite) return null;

  const products = getProducts();
  const product = products.find(p => p.id === favorite.product_id);
  
  return {
    ...favorite,
    product: product || null
  };
};

// Get favorites by user
export const getFavoritesByUser = (userId) => {
  return getAllFavorites({ user_id: userId });
};

// Create new favorite
export const createFavorite = (favoriteData) => {
  const favorites = getFavorites();
  
  // Check if already exists
  const exists = favorites.find(f => 
    f.user_id === favoriteData.user_id && 
    f.product_id === favoriteData.product_id
  );
  
  if (exists) {
    return exists;
  }
  
  const newId = generateId('favoriteId');
  
  const newFavorite = {
    id: newId,
    user_id: favoriteData.user_id,
    product_id: favoriteData.product_id,
    variant_id: favoriteData.variant_id || null,
    created_at: new Date().toISOString()
  };
  
  favorites.push(newFavorite);
  saveFavorites(favorites);
  
  return newFavorite;
};

// Delete favorite
export const deleteFavorite = (id) => {
  const favorites = getFavorites();
  const index = favorites.findIndex(f => f.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Favorite not found');
  }
  
  favorites.splice(index, 1);
  saveFavorites(favorites);
  
  return { success: true };
};

// Delete favorite by user and product
export const deleteFavoriteByUserProduct = (userId, productId, variantId = null) => {
  const favorites = getFavorites();
  let index = -1;
  
  if (variantId) {
    index = favorites.findIndex(f => 
      f.user_id === userId && 
      f.product_id === parseInt(productId) &&
      f.variant_id === parseInt(variantId)
    );
  } else {
    index = favorites.findIndex(f => 
      f.user_id === userId && 
      f.product_id === parseInt(productId)
    );
  }
  
  if (index === -1) {
    throw new Error('Favorite not found');
  }
  
  favorites.splice(index, 1);
  saveFavorites(favorites);
  
  return { success: true };
};

// Check if favorite exists
export const checkFavorite = (userId, productId) => {
  const favorites = getFavorites();
  const exists = favorites.some(f => 
    f.user_id === userId && 
    f.product_id === parseInt(productId)
  );
  
  return { is_favorite: exists };
};

// Initialize on load
initializeMockFavorites();


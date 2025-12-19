

import { 
  getUserCartWithDetails,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearUserCart,
  getCartItemCount,
  isProductInCart,
  getCartItem,
  validateCartItems,
  getCartForCheckout,
  setUserForCart
} from '../data/localStorage/operations/enhancedCartOperations';

// Cart Service - Shopping cart management
export const cartService = {
  // Set user for cart operations
  setUser: async (email) => {
    setUserForCart(email);
    return { success: true };
  },
  
  // Get user's cart with details
  getCurrent: async () => {
    return { data: getUserCartWithDetails() };
  },
  
  // Add item to cart
  addItem: async (productId, variantId = null, quantity = 1) => {
    try {
      const result = addItemToCart(productId, variantId, quantity);
      return { data: result };
    } catch (error) {
      console.error('Failed to add item to cart:', error.message);
      throw error;
    }
  },
  
  // Update cart item quantity
  updateItem: async (itemId, quantity) => {
    try {
      const result = updateCartItemQuantity(itemId, quantity);
      return { data: result };
    } catch (error) {
      console.error('Failed to update cart item:', error.message);
      throw error;
    }
  },
  
  // Remove cart item
  removeItem: async (itemId) => {
    try {
      const result = removeItemFromCart(itemId);
      return { data: result };
    } catch (error) {
      console.error('Failed to remove cart item:', error.message);
      throw error;
    }
  },
  
  // Clear entire cart
  clear: async () => {
    try {
      const result = clearUserCart();
      return { data: result };
    } catch (error) {
      console.error('Failed to clear cart:', error.message);
      throw error;
    }
  },
  
  // Get cart item count
  getItemCount: async () => {
    return { data: getCartItemCount() };
  },
  
  // Check if product is in cart
  hasItem: async (productId, variantId = null) => {
    return { data: isProductInCart(productId, variantId) };
  },
  
  // Get cart item
  getItem: async (productId, variantId = null) => {
    return { data: getCartItem(productId, variantId) };
  },
  
  // Validate cart items
  validate: async () => {
    return { data: validateCartItems() };
  },
  
  // Get cart for checkout
  getForCheckout: async () => {
    return { data: getCartForCheckout() };
  }
};


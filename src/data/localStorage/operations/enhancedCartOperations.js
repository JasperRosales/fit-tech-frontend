// Enhanced Cart Operations with Email-based User Separation
// =========================================================

import { 
  initializeStorage,
  setCurrentUser,
  getCurrentUser,
  getUserCart,
  saveUserCart,
  generateId,
  getProducts 
} from '../enhancedLocalStorageService';

// Initialize mock data in localStorage
export const initializeMockCart = () => {
  initializeStorage();
};

// Set current user for cart operations
export const setUserForCart = (email) => {
  setCurrentUser(email);
};

// Get user's cart with enriched product details
export const getUserCartWithDetails = () => {
  const userEmail = getCurrentUser();
  if (!userEmail) return { items: [], id: null, user_id: null };
  
  const cart = getUserCart();
  const products = getProducts();
  
  if (!cart.items || cart.items.length === 0) {
    return { ...cart, items: [], user_id: userEmail };
  }
  
  // Enrich items with product and variant details
  const enrichedItems = cart.items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    let variant = null;
    if (product && item.variant_id) {
      variant = product.variants.find(v => v.id === item.variant_id);
    }
    
    // Calculate item total
    const itemPrice = product ? (product.price - (product.discount || 0)) : 0;
    const itemTotal = itemPrice * item.quantity;
    
    return {
      ...item,
      product: product || null,
      variant: variant || null,
      item_price: itemPrice,
      item_total: itemTotal
    };
  });
  
  // Calculate cart totals
  const subtotal = enrichedItems.reduce((sum, item) => sum + item.item_total, 0);
  const tax = subtotal * 0.12; // 12% VAT
  const shipping = subtotal > 1500 ? 0 : 100; // Free shipping over ₱1500
  const total = subtotal + tax + shipping;
  
  return {
    ...cart,
    user_id: userEmail,
    items: enrichedItems,
    subtotal,
    tax,
    shipping,
    total,
    item_count: enrichedItems.reduce((sum, item) => sum + item.quantity, 0)
  };
};

// Add item to user's cart
export const addItemToCart = (productId, variantId = null, quantity = 1) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const cart = getUserCart();
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
  
  // Check if item already exists (same product and variant)
  const existingItemIndex = cart.items.findIndex(item => 
    item.product_id === parseInt(productId) && 
    item.variant_id === (variantId ? parseInt(variantId) : null)
  );
  
  if (existingItemIndex !== -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += parseInt(quantity);
    cart.items[existingItemIndex].updated_at = new Date().toISOString();
  } else {
    // Add new item
    const newItemId = generateId('cartItemId');
    const itemPrice = product.price - (product.discount || 0);
    
    const newItem = {
      id: newItemId,
      product_id: parseInt(productId),
      variant_id: variantId ? parseInt(variantId) : null,
      quantity: parseInt(quantity),
      price_at_added: itemPrice,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Initialize cart if it doesn't exist
    if (!cart.id) {
      cart.id = generateId('cartId');
      cart.created_at = new Date().toISOString();
    }
    
    cart.items.push(newItem);
  }
  
  cart.updated_at = new Date().toISOString();
  saveUserCart(cart);
  
  return getUserCartWithDetails();
};

// Update cart item quantity
export const updateCartItemQuantity = (itemId, quantity) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const cart = getUserCart();
  const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
  
  if (itemIndex === -1) {
    throw new Error('Cart item not found');
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.items.splice(itemIndex, 1);
  } else {
    // Update quantity
    cart.items[itemIndex].quantity = parseInt(quantity);
    cart.items[itemIndex].updated_at = new Date().toISOString();
  }
  
  cart.updated_at = new Date().toISOString();
  saveUserCart(cart);
  
  return getUserCartWithDetails();
};

// Remove item from cart
export const removeItemFromCart = (itemId) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const cart = getUserCart();
  const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
  
  if (itemIndex === -1) {
    throw new Error('Cart item not found');
  }
  
  cart.items.splice(itemIndex, 1);
  cart.updated_at = new Date().toISOString();
  saveUserCart(cart);
  
  return getUserCartWithDetails();
};

// Clear entire cart
export const clearUserCart = () => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const cart = {
    id: null,
    items: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  saveUserCart(cart);
  return cart;
};

// Get cart item count
export const getCartItemCount = () => {
  const cart = getUserCart();
  return cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
};

// Check if product is in cart
export const isProductInCart = (productId, variantId = null) => {
  const cart = getUserCart();
  return cart.items.some(item => 
    item.product_id === parseInt(productId) && 
    item.variant_id === (variantId ? parseInt(variantId) : null)
  );
};

// Get cart item by product and variant
export const getCartItem = (productId, variantId = null) => {
  const cart = getUserCart();
  return cart.items.find(item => 
    item.product_id === parseInt(productId) && 
    item.variant_id === (variantId ? parseInt(variantId) : null)
  );
};

// Validate cart items (check stock, product availability)
export const validateCartItems = () => {
  const cartWithDetails = getUserCartWithDetails();
  const validationResults = {
    is_valid: true,
    errors: [],
    warnings: []
  };
  
  cartWithDetails.items.forEach(item => {
    if (!item.product) {
      validationResults.is_valid = false;
      validationResults.errors.push(`Product ${item.product_id} no longer available`);
      return;
    }
    
    if (!item.product.is_active) {
      validationResults.is_valid = false;
      validationResults.errors.push(`${item.product.name} is no longer available`);
    }
    
    if (item.variant) {
      if (item.variant.stock < item.quantity) {
        validationResults.warnings.push(
          `${item.product.name} (${item.variant.size}, ${item.variant.color}) has only ${item.variant.stock} items left`
        );
      }
    }
  });
  
  return validationResults;
};

// Get cart for checkout (simplified for order creation)
export const getCartForCheckout = () => {
  const cartWithDetails = getUserCartWithDetails();
  
  return {
    items: cartWithDetails.items.map(item => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      price_at_added: item.item_price,
      product_name: item.product?.name || 'Unknown Product',
      variant_details: item.variant ? {
        size: item.variant.size,
        color: item.variant.color
      } : null
    })),
    totals: {
      subtotal: cartWithDetails.subtotal,
      tax: cartWithDetails.tax,
      shipping: cartWithDetails.shipping,
      total: cartWithDetails.total
    },
    item_count: cartWithDetails.item_count
  };
};

// Initialize on load
initializeMockCart();

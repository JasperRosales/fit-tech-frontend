import { 
  initializeStorage, 
  getCarts, 
  saveCarts, 
  generateId,
  getProducts 
} from '../localStorageService';

// Initialize mock data in localStorage
export const initializeMockCarts = () => {
  initializeStorage();
};

// Get all carts (with optional filters)
export const getAllCarts = (params = {}) => {
  let carts = getCarts();
  
  // Filter by user_id if provided (though backend usually handles session/user context)
  // For mock, we can assume filtering or just returning all for now if no user context passed,
  // but typically we'd want user specific carts.
  // The service call `getAll` might pass user_id in params or derived from token.
  
  return carts;
};

// Get cart by ID
export const getCartById = (id) => {
  const carts = getCarts();
  const cart = carts.find(c => c.id === parseInt(id));
  
  if (!cart) return null;
  
  // Enrich items with product details
  const products = getProducts();
  
  const enrichedItems = cart.items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    let variant = null;
    if (product && item.variant_id) {
      variant = product.variants.find(v => v.id === item.variant_id);
    }
    
    return {
      ...item,
      product: product || null,
      variant: variant || null
    };
  });
  
  return {
    ...cart,
    items: enrichedItems
  };
};

// Create new cart
export const createCart = (cartData = {}) => {
  const carts = getCarts();
  
  const newId = generateId('cartId');
  
  const newCart = {
    id: newId,
    user_id: cartData.user_id || null, // Can be null for guest carts
    is_active: true,
    items: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  carts.push(newCart);
  saveCarts(carts);
  
  return newCart;
};

// Deactivate cart (e.g., after checkout)
export const deactivateCart = (id) => {
  const carts = getCarts();
  const index = carts.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Cart not found');
  }
  
  carts[index].is_active = false;
  carts[index].updated_at = new Date().toISOString();
  saveCarts(carts);
  
  return carts[index];
};

// Add item to cart
export const addItemToCart = (cartId, itemData) => {
  const carts = getCarts();
  const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
  
  if (cartIndex === -1) {
    throw new Error('Cart not found');
  }
  
  const cart = carts[cartIndex];
  
  // Check if item already exists (same product and variant)
  const existingItemIndex = cart.items.findIndex(item => 
    item.product_id === parseInt(itemData.product_id) && 
    item.variant_id === (itemData.variant_id ? parseInt(itemData.variant_id) : null)
  );
  
  if (existingItemIndex !== -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += parseInt(itemData.quantity) || 1;
    cart.items[existingItemIndex].updated_at = new Date().toISOString();
  } else {
    // Add new item
    const newItemId = generateId('cartItemId');
    const newItem = {
      id: newItemId,
      cart_id: parseInt(cartId),
      product_id: parseInt(itemData.product_id),
      variant_id: itemData.variant_id ? parseInt(itemData.variant_id) : null,
      quantity: parseInt(itemData.quantity) || 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    cart.items.push(newItem);
  }
  
  cart.updated_at = new Date().toISOString();
  saveCarts(carts);
  
  // Return updated cart (or just success/item)
  return getCartById(cartId); // Return full enriched cart for UI convenience
};

// Update cart item (quantity)
export const updateCartItem = (itemId, itemData) => {
  const carts = getCarts();
  let found = false;
  let updatedCartId = null;
  
  for (let cart of carts) {
    const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex !== -1) {
      if (itemData.quantity !== undefined) {
        cart.items[itemIndex].quantity = parseInt(itemData.quantity);
      }
      cart.items[itemIndex].updated_at = new Date().toISOString();
      cart.updated_at = new Date().toISOString();
      updatedCartId = cart.id;
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Cart item not found');
  }
  
  saveCarts(carts);
  
  return getCartById(updatedCartId);
};

// Remove cart item
export const removeCartItem = (itemId) => {
  const carts = getCarts();
  let found = false;
  let updatedCartId = null;
  
  for (let cart of carts) {
    const itemIndex = cart.items.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      cart.updated_at = new Date().toISOString();
      updatedCartId = cart.id;
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Cart item not found');
  }
  
  saveCarts(carts);
  
  return getCartById(updatedCartId);
};

// Delete cart
export const deleteCart = (id) => {
  const carts = getCarts();
  const index = carts.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Cart not found');
  }
  
  carts.splice(index, 1);
  saveCarts(carts);
  
  return { success: true };
};

// Initialize on load
initializeMockCarts();


// Enhanced Order Operations with Email-based User Separation
// ===========================================================

import { 
  initializeStorage,
  setCurrentUser,
  getCurrentUser,
  getUserOrders,
  saveUserOrders,
  generateId,
  getProducts,

getUserCart
} from '../enhancedLocalStorageService';
import { getCartForCheckout, clearUserCart } from './enhancedCartOperations';

// Initialize mock data in localStorage
export const initializeMockOrders = () => {
  initializeStorage();
};

// Set current user for order operations
export const setUserForOrders = (email) => {
  setCurrentUser(email);
};

// Get user's orders with enriched details
export const getUserOrdersWithDetails = () => {
  const userEmail = getCurrentUser();
  if (!userEmail) return [];
  
  const orders = getUserOrders();
  const products = getProducts();
  
  // Enrich orders with product details
  const enrichedOrders = orders.map(order => {
    const enrichedItems = order.items.map(item => {
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
      ...order,
      items: enrichedItems
    };
  });
  
  // Sort by creation date (newest first)
  return enrichedOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

// Get order by ID
export const getOrderById = (orderId) => {
  const userEmail = getCurrentUser();
  if (!userEmail) return null;
  
  const orders = getUserOrders();
  const order = orders.find(o => o.id === parseInt(orderId));
  
  if (!order) return null;
  
  // Enrich with product details
  const products = getProducts();
  const enrichedItems = order.items.map(item => {
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
    ...order,
    items: enrichedItems
  };
};

// Create new order from cart
export const createOrderFromCart = (orderData = {}) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const cart = getCartForCheckout();
  
  if (cart.items.length === 0) {
    throw new Error('Cannot create order from empty cart');
  }
  
  // Generate order number
  const orderNumber = generateOrderNumber();
  const newOrderId = generateId('orderId');
  
  // Create order items
  const orderItems = cart.items.map(item => ({
    id: generateId('orderItemId'),
    product_id: item.product_id,
    variant_id: item.variant_id,
    product_name: item.product_name,
    variant_details: item.variant_details,
    quantity: item.quantity,
    unit_price: item.price_at_added,
    total_price: item.price_at_added * item.quantity,
    status: 'pending',
    fulfillment_status: 'pending'
  }));
  
  const newOrder = {
    id: newOrderId,
    order_number: orderNumber,
    reference_number: `REF${String(newOrderId).padStart(6, '0')}`,
    status: 'pending',
    payment_status: 'pending',
    items: orderItems,
    totals: {
      ...cart.totals,
      currency: 'PHP'
    },
    addresses: {
      billing: orderData.billing_address || null,
      shipping: orderData.shipping_address || orderData.billing_address || null
    },
    payment_method: orderData.payment_method || 'on-site',
    shipping_method: orderData.shipping_method || 'pickup',
    notes: orderData.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Save order
  const orders = getUserOrders();
  orders.push(newOrder);
  saveUserOrders(orders);
  
  // Clear cart after successful order
  clearUserCart();
  
  return getOrderById(newOrderId);
};

// Update order status
export const updateOrderStatus = (orderId, newStatus, additionalNotes = null) => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const orders = getUserOrders();
  const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
  
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }
  
  const oldStatus = orders[orderIndex].status;
  
  // Update status
  orders[orderIndex].status = newStatus;
  orders[orderIndex].updated_at = new Date().toISOString();
  
  // Set status-specific timestamps
  switch (newStatus) {
    case 'confirmed':
      orders[orderIndex].confirmed_at = new Date().toISOString();
      break;
    case 'shipped':
      orders[orderIndex].shipped_at = new Date().toISOString();
      orders[orderIndex].payment_status = 'paid';
      break;
    case 'delivered':
      orders[orderIndex].delivered_at = new Date().toISOString();
      orders[orderIndex].payment_status = 'paid';
      break;
    case 'cancelled':
      orders[orderIndex].cancelled_at = new Date().toISOString();
      break;
  }
  
  // Add status history
  if (!orders[orderIndex].status_history) {
    orders[orderIndex].status_history = [];
  }
  
  orders[orderIndex].status_history.push({
    old_status: oldStatus,
    new_status: newStatus,
    changed_at: new Date().toISOString(),
    notes: additionalNotes
  });
  
  // Add admin notes if provided
  if (additionalNotes && !orders[orderIndex].admin_notes) {
    orders[orderIndex].admin_notes = additionalNotes;
  }
  
  saveUserOrders(orders);
  
  return getOrderById(orderId);
};

// Get orders by status
export const getOrdersByStatus = (status) => {
  const orders = getUserOrdersWithDetails();
  return orders.filter(order => order.status === status);
};

// Get recent orders
export const getRecentOrders = (limit = 5) => {
  const orders = getUserOrdersWithDetails();
  return orders
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
};

// Get order statistics
export const getOrderStats = () => {
  const orders = getUserOrders();
  
  const stats = {
    total_orders: orders.length,
    pending_orders: orders.filter(o => o.status === 'pending').length,
    confirmed_orders: orders.filter(o => o.status === 'confirmed').length,
    shipped_orders: orders.filter(o => o.status === 'shipped').length,
    delivered_orders: orders.filter(o => o.status === 'delivered').length,
    cancelled_orders: orders.filter(o => o.status === 'cancelled').length,
    total_spent: 0,
    average_order_value: 0
  };
  
  // Calculate total spent and average order value
  const completedOrders = orders.filter(o => 
    ['confirmed', 'shipped', 'delivered'].includes(o.status)
  );
  
  stats.total_spent = completedOrders.reduce((sum, order) => 
    sum + (order.totals?.total || 0), 0
  );
  
  stats.average_order_value = completedOrders.length > 0 
    ? stats.total_spent / completedOrders.length 
    : 0;
  
  return stats;
};

// Search orders
export const searchOrders = (query) => {
  const orders = getUserOrdersWithDetails();
  const searchTerm = query.toLowerCase();
  
  return orders.filter(order => 
    order.order_number.toLowerCase().includes(searchTerm) ||
    order.reference_number.toLowerCase().includes(searchTerm) ||
    (order.notes && order.notes.toLowerCase().includes(searchTerm))
  );
};

// Cancel order
export const cancelOrder = (orderId, reason = '') => {
  const userEmail = getCurrentUser();
  if (!userEmail) {
    throw new Error('User not authenticated');
  }
  
  const orders = getUserOrders();
  const order = orders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  // Check if order can be cancelled
  if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
    throw new Error('Order cannot be cancelled at this stage');
  }
  
  order.status = 'cancelled';
  order.cancelled_at = new Date().toISOString();
  order.cancellation_reason = reason;
  order.updated_at = new Date().toISOString();
  
  // Add status history
  if (!order.status_history) {
    order.status_history = [];
  }
  
  order.status_history.push({
    old_status: order.status,
    new_status: 'cancelled',
    changed_at: new Date().toISOString(),
    notes: reason
  });
  
  saveUserOrders(orders);
  
  return getOrderById(orderId);
};

// Generate unique order number
const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `CS${year}${timestamp}`;
};

// Validate order for cancellation
export const canCancelOrder = (orderId) => {
  const order = getOrderById(orderId);
  
  if (!order) {
    return { can_cancel: false, reason: 'Order not found' };
  }
  
  if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
    return { 
      can_cancel: false, 
      reason: `Order cannot be cancelled when status is '${order.status}'` 
    };
  }
  
  return { can_cancel: true, reason: null };
};

// Get orders for a date range
export const getOrdersByDateRange = (startDate, endDate) => {
  const orders = getUserOrdersWithDetails();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return orders.filter(order => {
    const orderDate = new Date(order.created_at);
    return orderDate >= start && orderDate <= end;
  });
};

// Initialize on load
initializeMockOrders();

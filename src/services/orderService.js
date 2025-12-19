import { authAPI } from '../lib/api-config';

// Order Service - Order management endpoints
export const orderService = {
  // Create new order
  create: (orderData) => 
    authAPI.post('/order/create', orderData),
  
  // Get all orders
  getAll: (params) => 
    authAPI.get('/order/all', { params }),
  
  // Get order by ID
  getById: (id) => 
    authAPI.get(`/order/${id}`),
  
  // Update order
  update: (id, orderData) => 
    authAPI.put(`/order/${id}`, orderData),
  
  // Delete order
  delete: (id) => 
    authAPI.delete(`/order/${id}`),
  
  // Update order status
  updateStatus: (id, status) => 
    authAPI.put(`/order/${id}/status`, { status }),
  
  // Add item to order
  addItem: (orderId, itemData) => 
    authAPI.post(`/order/${orderId}/items`, itemData),
  
  // Update order item
  updateItem: (itemId, itemData) => 
    authAPI.put(`/order/items/${itemId}`, itemData),
  
  // Remove order item
  removeItem: (itemId) => 
    authAPI.delete(`/order/items/${itemId}`),
};

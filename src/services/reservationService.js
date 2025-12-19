import { authAPI } from '../lib/api-config';

// Reservation Service - Reservation management endpoints
export const reservationService = {
  // Create new reservation
  create: (reservationData) => 
    authAPI.post('/reservation/create', reservationData),
  
  // Get all reservations
  getAll: (params) => 
    authAPI.get('/reservation/all', { params }),
  
  // Get reservation by ID
  getById: (id) => 
    authAPI.get(`/reservation/${id}`),
  
  // Update reservation
  update: (id, reservationData) => 
    authAPI.put(`/reservation/${id}`, reservationData),
  
  // Delete reservation
  delete: (id) => 
    authAPI.delete(`/reservation/${id}`),
  
  // Add item to reservation
  addItem: (reservationId, itemData) => 
    authAPI.post(`/reservation/${reservationId}/items`, itemData),
  
  // Update reservation item
  updateItem: (itemId, itemData) => 
    authAPI.put(`/reservation/items/${itemId}`, itemData),
  
  // Remove reservation item
  removeItem: (itemId) => 
    authAPI.delete(`/reservation/items/${itemId}`),
};

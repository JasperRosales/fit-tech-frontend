import { adminAPI } from '../lib/api-config';

// Notification Service - Notification management endpoints
export const notificationService = {
  // Create new notification
  create: (notificationData) => 
    adminAPI.post('/notification/create', notificationData),
  
  // Get all notifications
  getAll: (params) => 
    adminAPI.get('/notification/all', { params }),
  
  // Get notification by ID
  getById: (id) => 
    adminAPI.get(`/notification/${id}`),
  
  // Update notification
  update: (id, notificationData) => 
    adminAPI.put(`/notification/${id}`, notificationData),
  
  // Delete notification
  delete: (id) => 
    adminAPI.delete(`/notification/${id}`),
};

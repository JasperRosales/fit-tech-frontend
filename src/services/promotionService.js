

import { adminAPI } from '../lib/api-config';

// Promotion Service - Promotion management endpoints with fallback data
export const promotionService = {

  // Get recommended promotions
  getRecommended: async () => {
    try {
      const response = await adminAPI.get('/promotion/recommended');
      return response;
    } catch (error) {
      console.error('Failed to fetch recommended promotions:', error.message);
      throw error;
    }
  },
  

  // Get top discount promotions
  getTopDiscounts: async () => {
    try {
      const response = await adminAPI.get('/promotion/top-discounts');
      return response;
    } catch (error) {
      console.error('Failed to fetch top discount promotions:', error.message);
      throw error;
    }
  },
  

  // Get latest promotions
  getLatest: async () => {
    try {
      const response = await adminAPI.get('/promotion/latest');
      return response;
    } catch (error) {
      console.error('Failed to fetch latest promotions:', error.message);
      throw error;
    }
  },
  

  // Create new promotion
  create: async (promotionData) => {
    try {
      const response = await adminAPI.post('/promotion/create', promotionData);
      return response;
    } catch (error) {
      console.error('Failed to create promotion:', error.message);
      throw error;
    }
  },
  

  // Get all promotions
  getAll: async (params = {}) => {
    try {
      const response = await adminAPI.get('/promotion/all', { params });
      return response;
    } catch (error) {
      console.error('Failed to fetch all promotions:', error.message);
      throw error;
    }
  },
  

  // Get promotion by ID
  getById: async (id) => {
    try {
      const response = await adminAPI.get(`/promotion/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch promotion with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Update promotion
  update: async (id, promotionData) => {
    try {
      const response = await adminAPI.patch(`/promotion/${id}`, promotionData);
      return response;
    } catch (error) {
      console.error(`Failed to update promotion with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Delete promotion
  delete: async (id) => {
    try {
      const response = await adminAPI.delete(`/promotion/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to delete promotion with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Publish promotion
  publish: async (id) => {
    try {
      const response = await adminAPI.post(`/promotion/${id}/publish`);
      return response;
    } catch (error) {
      console.error(`Failed to publish promotion with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Send promotion notifications
  sendNotifications: async (id, notificationData) => {
    try {
      const response = await adminAPI.post(`/promotion/${id}/notify`, notificationData);
      return response;
    } catch (error) {
      console.error(`Failed to send promotion notifications for ID ${id}:`, error.message);
      throw error;
    }
  },
};

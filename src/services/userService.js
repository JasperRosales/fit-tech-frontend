

import { authAPI } from '../lib/api-config';

// User Service - User management endpoints with fallback data
export const userService = {

  // Create new user (admin only)
  create: async (userData) => {
    try {
      const response = await authAPI.post('/user/create', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error.message);
      throw error;
    }
  },
  

  // Get all users (admin/staff only)
  getAll: async (params = {}) => {
    try {
      const response = await authAPI.get('/user/all', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      throw error;
    }
  },
  

  // Get user by ID
  getById: async (id) => {
    try {
      const response = await authAPI.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Update user
  update: async (id, userData) => {
    try {
      const response = await authAPI.patch(`/user/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Delete user (admin only)
  delete: async (id) => {
    try {
      const response = await authAPI.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error.message);
      throw error;
    }
  },
};

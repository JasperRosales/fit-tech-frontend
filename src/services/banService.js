

import { adminAPI } from '../lib/api-config';

// Ban Service - User banning and unban management
export const banService = {
  // Ban user (accepts both object and individual parameters)
  banUser: async (userId, reason, isPermanent, expiresAt) => {
    try {
      const banData = typeof userId === 'object' ? userId : {
        user_id: userId,
        reason: reason,
        is_permanent: isPermanent,
        expires_at: expiresAt
      };
      
      const response = await adminAPI.post('/admin/ban/create', banData);
      return response.data;
    } catch (error) {
      console.error('Failed to ban user:', error.message);
      throw error;
    }
  },
  

  // Get all banned users (alias for getAllBannedUsers)
  getBannedUsers: async (params = {}) => {
    try {
      const response = await adminAPI.get('/admin/ban/all', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch banned users:', error.message);
      throw error;
    }
  },
  
  // Get all banned users (original method)
  getAllBannedUsers: async (params = {}) => {
    return await banService.getBannedUsers(params);
  },
  

  // Get banned user by ID
  getBannedUserById: async (id) => {
    try {
      const response = await adminAPI.get(`/admin/ban/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch banned user with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Update banned user
  updateBannedUser: async (id, banData) => {
    try {
      const response = await adminAPI.patch(`/admin/ban/${id}`, banData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update banned user with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Unban user
  unbanUser: async (id) => {
    try {
      const response = await adminAPI.delete(`/admin/ban/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to unban user with ID ${id}:`, error.message);
      throw error;
    }
  },
};

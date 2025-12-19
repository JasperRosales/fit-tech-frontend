

import { adminAPI } from '@/lib/api-config';

// Staff Management Service
class StaffService {
  // Create a new staff member
  async create(staffData) {
    try {
      const response = await adminAPI.post('/staff/create', staffData);
      return response.data;
    } catch (error) {
      console.error('Failed to create staff member:', error.message);
      throw error;
    }
  }


  // Get all staff members with pagination
  async list({ page = 1, limit = 10 } = {}) {
    try {
      const response = await adminAPI.get('/staff/all', {
        params: { page, limit }
      });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch staff members:', error.message);
      throw error;
    }
  }


  // Get a specific staff member by ID
  async getById(id) {
    try {
      const response = await adminAPI.get(`/staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch staff member with ID ${id}:`, error.message);
      throw error;
    }
  }


  // Update a staff member
  async update(id, staffData) {
    try {
      const response = await adminAPI.patch(`/staff/${id}`, staffData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update staff member with ID ${id}:`, error.message);
      throw error;
    }
  }


  // Delete a staff member
  async remove(id) {
    try {
      const response = await adminAPI.delete(`/staff/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete staff member with ID ${id}:`, error.message);
      throw error;
    }
  }
}

export const staffService = new StaffService();
export default staffService;

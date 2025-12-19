

import { adminAPI } from '../lib/api-config';

// Analytics Service - Analytics and reporting endpoints with fallback data
export const analyticsService = {

  // Get total revenue
  getTotalRevenue: async (params = {}) => {
    try {
      const response = await adminAPI.get('/analytics/revenue/total', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch total revenue:', error.message);
      throw error;
    }
  },
  

  // Get top selling products
  getTopSellingProducts: async (params = {}) => {
    try {
      const response = await adminAPI.get('/analytics/products/top-selling', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch top selling products:', error.message);
      throw error;
    }
  },
  

  // Get top revenue products
  getTopRevenueProducts: async (params = {}) => {
    try {
      const response = await adminAPI.get('/analytics/products/top-revenue', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch top revenue products:', error.message);
      throw error;
    }
  },
  

  // Get low stock products
  getLowStockProducts: async (params = {}) => {
    try {
      const response = await adminAPI.get('/analytics/products/low-stock', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch low stock products:', error.message);
      throw error;
    }
  },
  

  // Get sales over time
  getSalesOverTime: async (params = {}) => {
    try {
      const response = await adminAPI.get('/analytics/sales/over-time', { params });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch sales over time data:', error.message);
      throw error;
    }
  },
};

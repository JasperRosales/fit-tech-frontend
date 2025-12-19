


import { authAPI } from '../lib/api-config';

// Auth Service - Authentication and authorization endpoints
export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await authAPI.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
  

  // Validate token
  validate: async (refreshToken) => {
    try {
      const response = await authAPI.post('/auth/validate', { refreshToken });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token validation failed');
    }
  },
  
  // Refresh token
  refresh: async (refreshToken) => {
    try {
      const response = await authAPI.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      await authAPI.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Don't throw on logout errors
    }
  },
};

// Convenience functions for direct use
export const register = authService.register;
export const login = authService.login;
export const validateToken = authService.validate;
export const refreshAccessToken = authService.refresh;
export const logout = authService.logout;

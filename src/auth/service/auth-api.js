


import axios from 'axios';

// Use VITE_API_URL for the API base URL (points to the API root, e.g., http://localhost:3001/api)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const authAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add common headers or logging
authAPI.interceptors.request.use(
  (config) => {
    config.headers['X-Request-ID'] = Date.now().toString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      throw new Error('Network error. Please check your connection.');
    }
    
    switch (error.response.status) {
      case 500:
        throw new Error('Server error. Please try again later.');
      case 404:
        throw new Error('Resource not found.');
      case 403:
        throw new Error('Access forbidden.');
      case 401:
        // This will be handled by the useAuth hook's response interceptor
        throw error;
      default:
        throw error;
    }
  }
);


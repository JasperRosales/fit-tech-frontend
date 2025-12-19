import axios from 'axios';


// Unified API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create base axios instance with shared configuration
export const createApiInstance = (config = {}) => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
    withCredentials: true, // Required for HTTP-only cookies
    ...config,
  });
};

// Shared request interceptor
const requestInterceptor = (config) => {
  config.headers['X-Request-ID'] = Date.now().toString();
  return config;
};

// Shared response interceptor for error handling
const responseInterceptor = (error) => {
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
      throw error; // Let individual interceptors handle 401s
    default:
      throw error;
  }
};



export const authAPI = createApiInstance();
export const adminAPI = createApiInstance();
export const publicAPI = createApiInstance({
  withCredentials: false, // No cookies for public endpoints
});

authAPI.interceptors.request.use(requestInterceptor);
adminAPI.interceptors.request.use(requestInterceptor);
// publicAPI has no auth interceptors

authAPI.interceptors.response.use(response => response, responseInterceptor);
adminAPI.interceptors.response.use(response => response, responseInterceptor);
publicAPI.interceptors.response.use(response => response, responseInterceptor);


export { requestInterceptor, responseInterceptor };

import { adminAPI } from '../lib/api-config';

// Recommended Service - Product recommendations management
export const recommendedService = {
  // Create new recommendation
  create: (recommendationData) => 
    adminAPI.post('/recommended/create', recommendationData),
  
  // Get all recommendations
  getAll: (params) => 
    adminAPI.get('/recommended/all', { params }),
  
  // Get recommendation by ID
  getById: (id) => 
    adminAPI.get(`/recommended/${id}`),
  
  // Get recommendations by user
  getByUser: (userId) => 
    adminAPI.get(`/recommended/user/${userId}`),
  
  // Update recommendation
  update: (id, recommendationData) => 
    adminAPI.put(`/recommended/${id}`, recommendationData),
  
  // Remove recommendation
  remove: (id) => 
    adminAPI.delete(`/recommended/${id}`),
  
  // Deactivate recommendation
  deactivate: (id) => 
    adminAPI.put(`/recommended/${id}/deactivate`),
  
  // Update display count
  updateDisplayCount: (id, displayCount) => 
    adminAPI.put(`/recommended/${id}/display`, { displayCount }),
  
  // Track interaction
  trackInteraction: (interactionData) => 
    adminAPI.post('/recommended/interactions', interactionData),
  
  // Get interactions
  getInteractions: (params) => 
    adminAPI.get('/recommended/interactions', { params }),
};

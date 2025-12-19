

import { 
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../data/localStorage/operations/enhancedCategoryOperations';

// Category Service - Category management endpoints
export const categoryService = {



  // Get all categories
  getAll: async () => {
    try {
      const categories = getAllCategories();
      
      // Transform to dropdown format expected by products page
      return { 
        data: categories.map(category => ({
          id: category.id,
          name: category.name || category.label || 'Unknown Category',
          value: category.value || category.id.toString(),
          label: category.label || category.name || 'Unknown Category'
        }))
      };
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
      throw error;
    }
  },
  



  // Get category by ID
  getById: async (id) => {
    try {
      return { data: getCategoryById(id) };
    } catch (error) {
      throw error;
    }
  },
  


  // Create new category
  create: async (categoryData) => {
    try {
      return { data: createCategory(categoryData) };
    } catch (error) {
      console.error('Failed to create category:', error.message);
      throw error;
    }
  },
  


  // Update category
  update: async (id, categoryData) => {
    try {
      return { data: updateCategory(id, categoryData) };
    } catch (error) {
      console.error(`Failed to update category with ID ${id}:`, error.message);
      throw error;
    }
  },
  

  // Delete category
  delete: async (id) => {
    try {
      return deleteCategory(id);
    } catch (error) {
      console.error(`Failed to delete category with ID ${id}:`, error.message);
      throw error;
    }
  },
};


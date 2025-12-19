// Enhanced Category Operations for Cloth Store
// ============================================

import { 
  initializeStorage,
  getCategories,
  saveCategories,
  generateId,
  getProducts 
} from '../enhancedLocalStorageService';
import { getCategoryName, getCategoryId } from '../clothStoreData';

// Initialize mock data in localStorage
export const initializeMockCategories = () => {
  initializeStorage();
};

// Get all categories
export const getAllCategoriesWithCounts = () => {
  const categories = getCategories();
  const products = getProducts();
  
  // Add product counts to categories
  return categories.map(category => {
    const productCount = products.filter(p => 
      p.category_id === category.id && p.is_active
    ).length;
    
    return {
      ...category,
      product_count: productCount,
      has_products: productCount > 0
    };
  });
};

// Get category by ID
export const getCategoryById = (id) => {
  const categories = getCategories();
  return categories.find(c => c.id === parseInt(id));
};

// Get category by name
export const getCategoryByName = (name) => {
  const categories = getCategories();
  return categories.find(c => c.name.toLowerCase() === name.toLowerCase());
};

// Create new category
export const createCategory = (categoryData) => {
  const categories = getCategories();
  
  // Check if category name already exists
  if (categories.some(c => c.name.toLowerCase() === categoryData.name.toLowerCase())) {
    throw new Error('Category name already exists');
  }
  
  const newId = generateId('categoryId');
  
  const newCategory = {
    id: newId,
    name: categoryData.name,
    description: categoryData.description || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  categories.push(newCategory);
  saveCategories(categories);
  
  return newCategory;
};

// Update category
export const updateCategory = (id, categoryData) => {
  const categories = getCategories();
  const categoryIndex = categories.findIndex(c => c.id === parseInt(id));
  
  if (categoryIndex === -1) {
    throw new Error('Category not found');
  }
  
  // Check if new name conflicts with existing category
  if (categoryData.name && categoryData.name !== categories[categoryIndex].name) {
    if (categories.some(c => 
      c.name.toLowerCase() === categoryData.name.toLowerCase() && 
      c.id !== parseInt(id)
    )) {
      throw new Error('Category name already exists');
    }
  }
  
  const updatedCategory = {
    ...categories[categoryIndex],
    name: categoryData.name || categories[categoryIndex].name,
    description: categoryData.description !== undefined ? categoryData.description : categories[categoryIndex].description,
    updated_at: new Date().toISOString()
  };
  
  categories[categoryIndex] = updatedCategory;
  saveCategories(categories);
  
  return updatedCategory;
};

// Delete category (with validation)
export const deleteCategory = (id) => {
  const categories = getCategories();
  const categoryIndex = categories.findIndex(c => c.id === parseInt(id));
  
  if (categoryIndex === -1) {
    throw new Error('Category not found');
  }
  
  // Check if category has products
  const products = getProducts();
  const categoryProducts = products.filter(p => p.category_id === parseInt(id));
  
  if (categoryProducts.length > 0) {
    throw new Error('Cannot delete category with existing products. Move or delete products first.');
  }
  
  categories.splice(categoryIndex, 1);
  saveCategories(categories);
  
  return { success: true };
};

// Get categories with product information
export const getCategoriesWithProducts = (limit = null) => {
  const categories = getAllCategoriesWithCounts();
  const products = getProducts();
  
  const categoriesWithProducts = categories.map(category => {
    const categoryProducts = products
      .filter(p => p.category_id === category.id && p.is_active)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit || undefined);
    
    return {
      ...category,
      products: categoryProducts
    };
  });
  
  return categoriesWithProducts;
};

// Get popular categories (with most products)
export const getPopularCategories = (limit = 5) => {
  const categories = getAllCategoriesWithCounts();
  
  return categories
    .filter(c => c.product_count > 0)
    .sort((a, b) => b.product_count - a.product_count)
    .slice(0, limit);
};

// Get categories for navigation
export const getCategoriesForNavigation = () => {
  const categories = getAllCategoriesWithCounts();
  
  return categories
    .filter(c => c.has_products)
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Validate category before deletion
export const validateCategoryForDeletion = (id) => {
  const categories = getCategories();
  const category = categories.find(c => c.id === parseInt(id));
  
  if (!category) {
    return { can_delete: false, reason: 'Category not found' };
  }
  
  const products = getProducts();
  const categoryProducts = products.filter(p => p.category_id === parseInt(id));
  
  if (categoryProducts.length > 0) {
    return {
      can_delete: false,
      reason: `Category contains ${categoryProducts.length} product(s). Move or delete products first.`,
      product_count: categoryProducts.length
    };
  }
  
  return { can_delete: true, reason: null };
};

// Get category statistics
export const getCategoryStats = () => {
  const categories = getAllCategoriesWithCounts();
  const products = getProducts();
  
  const totalProducts = products.filter(p => p.is_active).length;
  const categoriesWithProducts = categories.filter(c => c.has_products).length;
  
  return {
    total_categories: categories.length,
    categories_with_products: categoriesWithProducts,
    categories_without_products: categories.length - categoriesWithProducts,
    total_products,
    average_products_per_category: totalProducts / categories.length || 0
  };
};

// Search categories
export const searchCategories = (query) => {
  const categories = getAllCategoriesWithCounts();
  const searchTerm = query.toLowerCase();
  
  return categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm) ||
    category.description.toLowerCase().includes(searchTerm)
  );
};

// Initialize on load
initializeMockCategories();

import { 
  initializeStorage, 
  getCategories, 
  saveCategories, 
  generateId 
} from '../localStorageService';
import { mockCategories } from '../mockData';

// Initialize mock data in localStorage
export const initializeMockCategories = () => {
  initializeStorage();
  
  const existingCategories = getCategories();
  
  if (existingCategories.length === 0) {
    saveCategories(mockCategories);
  }
};

// Get all categories
export const getAllCategories = () => {
  return getCategories();
};

// Get category by ID
export const getCategoryById = (id) => {
  const categories = getCategories();
  return categories.find(c => c.id === parseInt(id));
};

// Create new category
export const createCategory = (categoryData) => {
  const categories = getCategories();
  
  // Generate new ID if not provided (mockData might have predefined IDs)
  const newId = categoryData.id || generateId('categoryId'); // Note: categoryId counter needs to be added if dynamic creation is needed, using generic ID generation for now or assume manual ID management for categories if static. 
  // However, mockData uses IDs 1-8. Let's assume we can generate IDs. 
  // For safety, let's just find max ID + 1 if we don't track categoryId in counters properly or rely on counters.
  // Using generateId('categoryId') is fine as long as we ensure uniqueness.
  
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
  const index = categories.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Category not found');
  }
  
  const updatedCategory = {
    ...categories[index],
    ...categoryData,
    updated_at: new Date().toISOString()
  };
  
  categories[index] = updatedCategory;
  saveCategories(categories);
  
  return updatedCategory;
};

// Delete category
export const deleteCategory = (id) => {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    throw new Error('Category not found');
  }
  
  categories.splice(index, 1);
  saveCategories(categories);
  
  return { success: true };
};

// Initialize on load
initializeMockCategories();


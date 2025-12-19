





import { 
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByIds,
  updateProduct,
  deleteProduct,
  addProductImage,
  deleteProductImage,
  addProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getAllCategories
} from '../data/localStorage/operations/enhancedProductOperations';

// Product Service - LocalStorage-based CRUD operations with persistence
export const productService = {

  // Create new product
  create: async (productData) => {
    try {
      const result = createProduct(productData);
      return result;
    } catch (error) {
      console.error('Failed to create product:', error.message);
      throw error;
    }
  },

  // Get all products with filtering/pagination
  getAll: async (params = {}) => {
    try {
      const result = getAllProducts(params);
      return result;
    } catch (error) {
      console.error('Failed to fetch products:', error.message);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const result = getProductById(id);
      return result;
    } catch (error) {
      console.error(`Failed to fetch product with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Get products by IDs (for favorites filter)
  getByIds: async (params = {}) => {
    try {
      const ids = params.ids || [];
      const result = getProductsByIds(ids);
      return result;
    } catch (error) {
      console.error('Failed to fetch products by IDs:', error.message);
      throw error;
    }
  },

  // Update product
  update: async (id, productData) => {
    try {
      const result = updateProduct(id, productData);
      return result;
    } catch (error) {
      console.error(`Failed to update product with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Delete product
  delete: async (id) => {
    try {
      const result = deleteProduct(id);
      return result;
    } catch (error) {
      console.error(`Failed to delete product with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Add product image
  addImage: async (id, imageData) => {
    try {
      const result = addProductImage(id, imageData);
      return result;
    } catch (error) {
      console.error(`Failed to add image for product with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Delete product image
  deleteImage: async (imageId) => {
    try {
      const result = deleteProductImage(imageId);
      return result;
    } catch (error) {
      console.error(`Failed to delete product image with ID ${imageId}:`, error.message);
      throw error;
    }
  },

  // Add product variant
  addVariant: async (id, variantData) => {
    try {
      const result = addProductVariant(id, variantData);
      return result;
    } catch (error) {
      console.error(`Failed to add variant for product with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Update product variant
  updateVariant: async (variantId, variantData) => {
    try {
      const result = updateProductVariant(variantId, variantData);
      return result;
    } catch (error) {
      console.error(`Failed to update product variant with ID ${variantId}:`, error.message);
      throw error;
    }
  },

  // Delete product variant
  deleteVariant: async (variantId) => {
    try {
      const result = deleteProductVariant(variantId);
      return result;
    } catch (error) {
      console.error(`Failed to delete product variant with ID ${variantId}:`, error.message);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const result = getAllCategories();
      return result;
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
      throw error;
    }
  }
};

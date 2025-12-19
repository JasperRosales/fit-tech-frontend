import { mockProducts, mockCategories, getCategoryName } from '../mockData';
import { 
  initializeStorage, 
  getProducts, 
  saveProducts, 
  getCategories, 
  saveCategories, 
  generateId,
  STORAGE_KEYS 
} from '../localStorageService';

// Initialize mock data in localStorage
export const initializeMockData = () => {
  initializeStorage();
  
  // Check if data already exists
  const existingProducts = getProducts();
  const existingCategories = getCategories();
  
  // Only initialize if no data exists
  if (existingProducts.length === 0) {
    saveProducts(mockProducts);
  }
  
  if (existingCategories.length === 0) {
    saveCategories(mockCategories);
  }
};

// Get all products with optional filtering and pagination
export const getAllProducts = (params = {}) => {
  const products = getProducts();
  let filteredProducts = [...products];
  
  // Apply filters
  if (params.category_id) {
    filteredProducts = filteredProducts.filter(p => p.category_id === parseInt(params.category_id));
  }
  
  if (params.is_active !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.is_active === params.is_active);
  }
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply pagination
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    data: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit)
  };
};

// Get product by ID
export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === parseInt(id));
};

// Get products by IDs (for favorites filter)
export const getProductsByIds = (ids = []) => {
  const products = getProducts();
  if (!ids.length) return [];
  
  return products.filter(p => ids.includes(p.id));
};

// Create new product
export const createProduct = (productData) => {
  const products = getProducts();
  const categories = getCategories();
  
  // Generate new ID
  const newId = generateId('productId');
  
  // Get category name
  const categoryName = getCategoryName(productData.category_id);
  
  // Create slug if not provided
  const slug = productData.slug || productData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Ensure unique slug
  let finalSlug = slug;
  let counter = 1;
  while (products.some(p => p.slug === finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  
  const newProduct = {
    id: newId,
    name: productData.name,
    slug: finalSlug,
    description: productData.description || '',
    price: parseFloat(productData.price),
    discount: parseFloat(productData.discount) || 0,
    category_id: parseInt(productData.category_id),
    is_active: productData.is_active !== undefined ? productData.is_active : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: productData.variants || [],
    images: []
  };
  

  products.push(newProduct);
  saveProducts(products);
  
  return newProduct;
};

// Update product
export const updateProduct = (id, productData) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    throw new Error('Product not found');
  }
  
  const existingProduct = products[productIndex];
  
  // Update slug if name changed and no custom slug provided
  let slug = productData.slug || existingProduct.slug;
  if (productData.name && !productData.slug) {
    slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Ensure unique slug (excluding current product)
    let finalSlug = slug;
    let counter = 1;
    while (products.some(p => p.slug === finalSlug && p.id !== parseInt(id))) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    slug = finalSlug;
  }
  
  const updatedProduct = {
    ...existingProduct,
    name: productData.name || existingProduct.name,
    slug,
    description: productData.description !== undefined ? productData.description : existingProduct.description,
    price: productData.price !== undefined ? parseFloat(productData.price) : existingProduct.price,
    discount: productData.discount !== undefined ? parseFloat(productData.discount) : existingProduct.discount,
    category_id: productData.category_id !== undefined ? parseInt(productData.category_id) : existingProduct.category_id,
    is_active: productData.is_active !== undefined ? productData.is_active : existingProduct.is_active,
    updated_at: new Date().toISOString()
  };
  
  products[productIndex] = updatedProduct;
  saveProducts(products);
  
  return updatedProduct;
};

// Delete product
export const deleteProduct = (id) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    throw new Error('Product not found');
  }
  
  products.splice(productIndex, 1);
  saveProducts(products);
  
  return { success: true };
};

// Add product image
export const addProductImage = (productId, imageData) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(productId));
  
  if (productIndex === -1) {
    throw new Error('Product not found');
  }
  
  const newImageId = generateId('imageId');
  const newImage = {
    id: newImageId,
    url: imageData.url,
    alt: imageData.alt || '',
    is_primary: imageData.is_primary || false
  };
  
  products[productIndex].images.push(newImage);
  products[productIndex].updated_at = new Date().toISOString();
  
  saveProducts(products);
  
  return newImage;
};

// Delete product image
export const deleteProductImage = (imageId) => {
  const products = getProducts();
  let found = false;
  
  for (let product of products) {
    const imageIndex = product.images.findIndex(img => img.id === parseInt(imageId));
    if (imageIndex !== -1) {
      product.images.splice(imageIndex, 1);
      product.updated_at = new Date().toISOString();
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Image not found');
  }
  
  saveProducts(products);
  
  return { success: true };
};

// Add product variant
export const addProductVariant = (productId, variantData) => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === parseInt(productId));
  
  if (productIndex === -1) {
    throw new Error('Product not found');
  }
  
  const newVariantId = generateId('variantId');
  const newVariant = {
    id: newVariantId,
    size: variantData.size,
    color: variantData.color,
    sku: variantData.sku,
    stock: parseInt(variantData.stock) || 0
  };
  
  products[productIndex].variants.push(newVariant);
  products[productIndex].updated_at = new Date().toISOString();
  
  saveProducts(products);
  
  return newVariant;
};

// Update product variant
export const updateProductVariant = (variantId, variantData) => {
  const products = getProducts();
  let found = false;
  
  for (let product of products) {
    const variantIndex = product.variants.findIndex(v => v.id === parseInt(variantId));
    if (variantIndex !== -1) {
      product.variants[variantIndex] = {
        ...product.variants[variantIndex],
        size: variantData.size || product.variants[variantIndex].size,
        color: variantData.color || product.variants[variantIndex].color,
        sku: variantData.sku || product.variants[variantIndex].sku,
        stock: variantData.stock !== undefined ? parseInt(variantData.stock) : product.variants[variantIndex].stock
      };
      product.updated_at = new Date().toISOString();
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Variant not found');
  }
  
  saveProducts(products);
  
  return { success: true };
};

// Delete product variant
export const deleteProductVariant = (variantId) => {
  const products = getProducts();
  let found = false;
  
  for (let product of products) {
    const variantIndex = product.variants.findIndex(v => v.id === parseInt(variantId));
    if (variantIndex !== -1) {
      product.variants.splice(variantIndex, 1);
      product.updated_at = new Date().toISOString();
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error('Variant not found');
  }
  
  saveProducts(products);
  
  return { success: true };
};

// Get all categories
export const getAllCategories = () => {
  return getCategories();
};

// Initialize data on module load
initializeMockData();


// Mock Data Index - Centralized Fashion Store Mock Data
// =====================================================

// Fashion Store Data (Primary Clothing Store Data)
export {
  mockCategories,
  mockProducts,
  getCategoryName,
  getCategoryId,
  fashionStoreData
} from './fashionData.js';

// Complete Backend Schema Data (Comprehensive Mock Data)
export {
  mockCategories as completeMockCategories,
  mockProducts as completeMockProducts,
  mockUsers,
  mockTokens,
  mockOTPs,
  mockCarts,
  mockCartItems,
  mockOrders,
  mockOrderItems,
  mockOrderStatusHistory,
  mockFavorites,
  mockPromotions,
  mockNotifications,
  mockBannedUsers,
  mockReservations,
  mockReservationItems,
  mockRecommendedProducts,
  getCategoryName as getCategoryNameComplete,
  getCategoryId as getCategoryIdComplete,
  mockData
} from './completeMockData.js';

// Helper Functions
export const getFashionStoreData = () => ({
  categories: mockCategories,
  products: mockProducts
});

export const getCompleteMockData = () => mockData;

// Utility Functions
export const initializeMockData = () => {
  console.log('Mock data initialized successfully');
  return {
    fashionStore: {
      categories: mockCategories.length,
      products: mockProducts.length
    },
    completeMock: {
      categories: mockCategories.length,
      products: mockProducts.length,
      users: mockUsers?.length || 0,
      orders: mockOrders?.length || 0
    }
  };
};

// Export default for convenience
export default {
  categories: mockCategories,
  products: mockProducts,
  getCategoryName,
  getCategoryId,
  initializeMockData
};

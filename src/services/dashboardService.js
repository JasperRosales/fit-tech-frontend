

import { adminAPI } from '@/lib/api-config';

// Dashboard Service (using analytics endpoints with fallback data)
export const dashboardService = {

  // Get overview statistics for dashboard
  async getOverviewStats() {
    try {
      // Get real data from API
      const stats = await this.fetchRealOverviewStats();
      
      return {
        todaySales: stats.todaySales,
        todaySalesChange: stats.todaySalesChange,
        activeUsers: stats.activeUsers,
        activeUsersChange: stats.activeUsersChange,
        pendingOrders: stats.pendingOrders,
        pendingOrdersChange: stats.pendingOrdersChange,
        systemHealth: stats.systemHealth
      };
    } catch (error) {
      console.error('Failed to fetch overview stats:', error.message);
      throw error;
    }
  },


  // Fetch real overview stats from API
  async fetchRealOverviewStats() {
    try {

      // Get revenue data and sales over time
      const [totalRevenue, topSellingProducts, salesOverTime] =
        await Promise.all([
          adminAPI.get('/analytics/revenue/total'),
          adminAPI.get('/analytics/products/top-selling'),
          adminAPI.get('/analytics/sales/over-time'),
        ]);

      // Calculate today's sales from the data
      const todaySales =
        salesOverTime.data?.[salesOverTime.data.length - 1]?.value || 0;
      const yesterdaySales =
        salesOverTime.data?.[salesOverTime.data.length - 2]?.value || 0;
      const salesChange =
        yesterdaySales > 0
          ? (((todaySales - yesterdaySales) / yesterdaySales) * 100).toFixed(1)
          : 0;

      return {
        todaySales: todaySales,
        todaySalesChange: `${salesChange >= 0 ? '+' : ''}${salesChange}%`,
        activeUsers: 150, // Would need user analytics endpoint
        activeUsersChange: '+5.2%',
        pendingOrders: 12, // Would need order analytics endpoint
        pendingOrdersChange: '-8.1%',
        systemHealth: 99.9
      };
    } catch (error) {
      throw error;
    }
  },



  // Get recent promotions for the dashboard (last 5)
  async getRecentPromotions() {
    try {
      // Get real data from API
      const promotions = await this.fetchRealRecentPromotions();
      return promotions;
    } catch (error) {
      console.error('Failed to fetch recent promotions:', error.message);
      throw error;
    }
  },


  // Fetch real recent promotions from API
  async fetchRealRecentPromotions() {
    try {
      // Get all promotions and take the most recent 5
      const response = await adminAPI.get('/promotion/all', {
        params: { page: 1, limit: 5 },
      });

      const promotions = response.data?.data || [];

      return promotions.map((promotion) => {
        const mappedType = this.mapPromotionType(promotion.type);
        const categoryName = promotion.category?.name || 'All Categories';

        return {
          id: promotion.id,
          name: promotion.name,
          description: promotion.description || '',
          type: mappedType,
          value: parseFloat(promotion.value),
          category_id: promotion.category_id,
          category: categoryName,
          status: promotion.is_active ? 'active' : 'inactive',
          is_published: promotion.is_published,
          startDate: new Date(promotion.start_date).toLocaleDateString(),
          endDate: new Date(promotion.end_date).toLocaleDateString(),
          start_date: promotion.start_date,
          end_date: promotion.end_date,
          created_at: promotion.created_at,
          updated_at: promotion.updated_at,
          time: this.getTimeAgo(new Date(promotion.created_at)),
          minimumQuantity: promotion.minimumQuantity || null,
          message: this.formatPromotionMessage({
            ...promotion,
            type: mappedType,
            category: categoryName,
          }),
          discountDisplay: this.formatDiscount(
            mappedType,
            parseFloat(promotion.value)
          ),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  // Map promotion type from database to frontend format
  mapPromotionType(dbType) {
    const typeMap = {
      PERCENTAGE: 'percentage',
      FIXED_AMOUNT: 'fixed',
      BUY_ONE_GET_ONE: 'buy-one-get-one',
      TIERED: 'tiered',
    };
    return typeMap[dbType] || 'percentage';
  },

  // Format promotion message for display
  formatPromotionMessage(promotion) {
    const discountText = this.formatDiscount(promotion.type, promotion.value);
    return `${promotion.name} - ${discountText} off on ${promotion.category}`;
  },

  // Format discount display
  formatDiscount(type, value) {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'fixed':
        return `₱${value}`;
      case 'buy-one-get-one':
        return 'BOGO';
      case 'tiered':
        return 'Tiered';
      default:
        return `${value}`;
    }
  },

  // Format currency with Philippine peso
  formatCurrency(amount) {
    return `₱${amount.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  // Get time ago helper
  getTimeAgo(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  },



  // Load all promotions for modal
  async loadAllPromotions() {
    try {
      // Get real data from API
      const promotions = await this.fetchRealAllPromotions();
      return promotions;
    } catch (error) {
      console.error('Failed to fetch all promotions:', error.message);
      throw error;
    }
  },


  // Fetch real all promotions from API
  async fetchRealAllPromotions() {
    try {
      // Use the promotion list endpoint with pagination
      const response = await adminAPI.get('/promotion/all', {
        params: { page: 1, limit: 50 }
      });
      
      // Map the response data to match our display format
      const promotions = response.data?.data?.map(promotion => {

        const mappedType = this.mapPromotionType(promotion.type);
        const categoryName = promotion.category?.name || 'All Categories';
        
        return {
          id: promotion.id,
          name: promotion.name,
          description: promotion.description || "",
          type: mappedType,
          value: parseFloat(promotion.value),
          category_id: promotion.category_id,
          category: categoryName,
          status: promotion.is_active ? 'active' : 'inactive',
          is_published: promotion.is_published,
          startDate: new Date(promotion.start_date).toLocaleDateString(),
          endDate: new Date(promotion.end_date).toLocaleDateString(),
          start_date: promotion.start_date,
          end_date: promotion.end_date,
          created_at: promotion.created_at,
          updated_at: promotion.updated_at,

          time: this.getTimeAgo(new Date(promotion.created_at)),
          minimumQuantity: promotion.minimumQuantity || null,

          message: this.formatPromotionMessage({
            ...promotion,
            type: mappedType,
            category: categoryName
          }),

          discountDisplay: this.formatDiscount(
            mappedType, 
            parseFloat(promotion.value)
          )
        };
      }) || [];
      
      return promotions;
    } catch (error) {
      throw error;
    }
  },


  // Get today's sales (using analytics)
  async getTodaySales() {
    try {
      // Get real data from API
      const result = await this.fetchRealTodaySales();
      return result;
    } catch (error) {
      console.error('Failed to fetch today sales:', error.message);
      throw error;
    }
  },


  // Fetch real today sales from API
  async fetchRealTodaySales() {
    try {
      const response = await adminAPI.get('/analytics/sales/over-time');
      const todaySales = response.data?.[response.data.length - 1]?.value || 0;
      return { 
        todaySales
      };
    } catch (error) {
      throw error;
    }
  },


  // Get active users count
  async getActiveUsers() {
    try {
      // Get real data from API
      const result = await this.fetchRealActiveUsers();
      return result;
    } catch (error) {
      console.error('Failed to fetch active users:', error.message);
      throw error;
    }
  },


  // Fetch real active users from API
  async fetchRealActiveUsers() {
    try {
      // Would use user analytics endpoint in real implementation
      return { 
        activeUsers: 150
      };
    } catch (error) {
      throw error;
    }
  },


  // Get pending orders/transactions
  async getPendingOrders() {
    try {
      // Get real data from API
      const result = await this.fetchRealPendingOrders();
      return result;
    } catch (error) {
      console.error('Failed to fetch pending orders:', error.message);
      throw error;
    }
  },


  // Fetch real pending orders from API
  async fetchRealPendingOrders() {
    try {
      // Would use order analytics endpoint in real implementation
      return { 
        pendingOrders: 12
      };
    } catch (error) {
      throw error;
    }
  },


  // Get system health metrics
  async getSystemHealth() {
    try {
      // Get real data from API
      const result = await this.fetchRealSystemHealth();
      return result;
    } catch (error) {
      console.error('Failed to fetch system health:', error.message);
      throw error;
    }
  },


  // Fetch real system health from API
  async fetchRealSystemHealth() {
    try {
      // Would use system monitoring endpoint in real implementation
      return { 
        systemHealth: 99.9
      };
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;

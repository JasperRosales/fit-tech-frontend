// Complete Mock Data for All Backend Schemas
// ======================================

// 1. CATEGORIES
export const mockCategories = [
  { id: 1, name: "Athletic Wear", description: "High-performance fitness clothing" },
  { id: 2, name: "Casual Wear", description: "Comfortable everyday clothing" },
  { id: 3, name: "Workout Gear", description: "Gym and exercise equipment" },
  { id: 4, name: "Accessories", description: "Fitness and lifestyle accessories" },
  { id: 5, name: "Footwear", description: "Athletic and casual shoes" },
  { id: 6, name: "Outerwear", description: "Jackets and weather protection" },
  { id: 7, name: "Underwear", description: "Comfortable base layer wear" },
  { id: 8, name: "Activewear", description: "Sports and active lifestyle clothing" }
];

// 2. PRODUCTS (Updated with more comprehensive data)
export const mockProducts = [
  {
    id: 1,
    name: "Premium Moisture-Wicking Athletic Shirt",
    slug: "premium-moisture-wicking-athletic-shirt",
    description: "High-performance athletic shirt designed for Philippine climate. Features advanced moisture-wicking technology, UV protection, and anti-odor properties.",
    price: 1299.00,
    discount: 0.00,
    category_id: 1,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    variants: [
      {
        id: 1,
        product_id: 1,
        size: "S",
        color: "Charcoal Black",
        sku: "PWA-SHIRT-S-BLK-001",
        stock: 25
      },
      {
        id: 2,
        product_id: 1,
        size: "M",
        color: "Charcoal Black",
        sku: "PWA-SHIRT-M-BLK-001",
        stock: 45
      },
      {
        id: 3,
        product_id: 1,
        size: "L",
        color: "Charcoal Black",
        sku: "PWA-SHIRT-L-BLK-001",
        stock: 40
      },
      {
        id: 4,
        product_id: 1,
        size: "XL",
        color: "Charcoal Black",
        sku: "PWA-SHIRT-XL-BLK-001",
        stock: 30
      }
    ],
    images: [
      {
        id: 1,
        product_id: 1,
        url: "https://images.unsplash.com/photo-1506629905607-6e5320b933b6?w=800&h=800&fit=crop&crop=center",
        alt: "Premium athletic shirt front view",
        is_primary: true
      },
      {
        id: 2,
        product_id: 1,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Premium athletic shirt back view",
        is_primary: false
      }
    ]
  },
  {
    id: 2,
    name: "Tropical Comfort Yoga Pants",
    slug: "tropical-comfort-yoga-pants",
    description: "Ultra-comfortable yoga pants designed for hot and humid Philippine weather. Made from breathable, quick-dry fabric with 4-way stretch.",
    price: 1599.00,
    discount: 159.00,
    category_id: 1,
    is_active: true,
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
    variants: [
      {
        id: 5,
        product_id: 2,
        size: "XS",
        color: "Midnight Navy",
        sku: "TCY-PANTS-XS-NVY-001",
        stock: 18
      },
      {
        id: 6,
        product_id: 2,
        size: "S",
        color: "Midnight Navy",
        sku: "TCY-PANTS-S-NVY-001",
        stock: 32
      },
      {
        id: 7,
        product_id: 2,
        size: "M",
        color: "Midnight Navy",
        sku: "TCY-PANTS-M-NVY-001",
        stock: 42
      }
    ],
    images: [
      {
        id: 3,
        product_id: 2,
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop&crop=center",
        alt: "Tropical yoga pants in midnight navy",
        is_primary: true
      }
    ]
  }
];

// 3. USERS
export const mockUsers = [
  {
    id: 1,
    email: "admin@fittech.com",
    password: "hashed_password_admin",
    role: "admin",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    email: "staff@fittech.com",
    password: "hashed_password_staff",
    role: "staff",
    is_active: true,
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z"
  },
  {
    id: 3,
    email: "john.doe@email.com",
    password: "hashed_password_user1",
    role: "user",
    is_active: true,
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z"
  },
  {
    id: 4,
    email: "jane.smith@email.com",
    password: "hashed_password_user2",
    role: "user",
    is_active: true,
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z"
  },
  {
    id: 5,
    email: "mike.wilson@email.com",
    password: "hashed_password_user3",
    role: "user",
    is_active: false,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z"
  }
];

// 4. TOKENS
export const mockTokens = [
  {
    id: 1,
    user_id: 3,
    refresh_token: "refresh_token_john_doe_123",
    expires_at: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
    created_at: "2024-01-03T12:00:00Z"
  },
  {
    id: 2,
    user_id: 4,
    refresh_token: "refresh_token_jane_smith_456",
    expires_at: Date.now() + (30 * 24 * 60 * 60 * 1000),
    created_at: "2024-01-04T12:00:00Z"
  }
];

// 5. OTPS
export const mockOTPs = [
  {
    id: 1,
    user_id: 3,
    otp_code: "123456",
    type: "email_verification",
    expires_at: "2024-01-03T13:00:00Z",
    verified_at: "2024-01-03T12:30:00Z",
    attempts: 1,
    created_at: "2024-01-03T12:30:00Z"
  },
  {
    id: 2,
    user_id: 4,
    otp_code: "789012",
    type: "password_reset",
    expires_at: "2024-01-04T14:00:00Z",
    verified_at: null,
    attempts: 0,
    created_at: "2024-01-04T13:30:00Z"
  }
];

// 6. CARTS
export const mockCarts = [
  {
    id: 1,
    user_id: 3,
    is_active: true,
    created_at: "2024-01-03T15:00:00Z",
    updated_at: "2024-01-03T15:00:00Z"
  },
  {
    id: 2,
    user_id: 4,
    is_active: true,
    created_at: "2024-01-04T16:00:00Z",
    updated_at: "2024-01-04T16:00:00Z"
  }
];

// 7. CART ITEMS
export const mockCartItems = [
  {
    id: 1,
    cart_id: 1,
    product_id: 1,
    variant_id: 2,
    quantity: 2,
    price_at_added: 1299.00,
    created_at: "2024-01-03T15:30:00Z",
    updated_at: "2024-01-03T15:30:00Z"
  },
  {
    id: 2,
    cart_id: 1,
    product_id: 2,
    variant_id: 7,
    quantity: 1,
    price_at_added: 1440.00, // Price with discount
    created_at: "2024-01-03T16:00:00Z",
    updated_at: "2024-01-03T16:00:00Z"
  },
  {
    id: 3,
    cart_id: 2,
    product_id: 1,
    variant_id: 1,
    quantity: 1,
    price_at_added: 1299.00,
    created_at: "2024-01-04T16:30:00Z",
    updated_at: "2024-01-04T16:30:00Z"
  }
];

// 8. ORDERS
export const mockOrders = [
  {
    id: 1,
    user_id: 3,
    order_number: "FT2024001",
    reference_number: "REF001",
    status: "confirmed",
    payment_status: "paid",
    subtotal: 1299.00,
    tax_amount: 155.88,
    shipping_amount: 50.00,
    discount_amount: 0.00,
    total_amount: 1504.88,
    payment_method: "on-site",
    payment_reference: "PAY001",
    currency: "PHP",
    shipping_method: "pickup",
    tracking_number: null,
    estimated_delivery: "2024-01-10T10:00:00Z",
    actual_delivery: null,
    billing_address: {
      name: "John Doe",
      address: "123 Main Street, Manila",
      city: "Manila",
      postal_code: "1000",
      country: "Philippines"
    },
    shipping_address: {
      name: "John Doe",
      address: "123 Main Street, Manila",
      city: "Manila",
      postal_code: "1000",
      country: "Philippines"
    },
    notes: "Please handle with care",
    admin_notes: null,
    gift_message: null,
    promotional_code: null,
    confirmed_at: "2024-01-03T17:00:00Z",
    shipped_at: null,
    delivered_at: null,
    cancelled_at: null,
    created_at: "2024-01-03T16:30:00Z",
    updated_at: "2024-01-03T17:00:00Z"
  },
  {
    id: 2,
    user_id: 4,
    order_number: "FT2024002",
    reference_number: "REF002",
    status: "ready",
    payment_status: "paid",
    subtotal: 2298.00,
    tax_amount: 275.76,
    shipping_amount: 0.00,
    discount_amount: 159.00,
    total_amount: 2414.76,
    payment_method: "on-site",
    payment_reference: "PAY002",
    currency: "PHP",
    shipping_method: "pickup",
    tracking_number: null,
    estimated_delivery: "2024-01-11T14:00:00Z",
    actual_delivery: null,
    billing_address: {
      name: "Jane Smith",
      address: "456 Oak Avenue, Quezon City",
      city: "Quezon City",
      postal_code: "1100",
      country: "Philippines"
    },
    shipping_address: {
      name: "Jane Smith",
      address: "456 Oak Avenue, Quezon City",
      city: "Quezon City",
      postal_code: "1100",
      country: "Philippines"
    },
    notes: null,
    admin_notes: "Item ready for pickup",
    gift_message: null,
    promotional_code: "WELCOME10",
    confirmed_at: "2024-01-04T18:00:00Z",
    shipped_at: null,
    delivered_at: null,
    cancelled_at: null,
    created_at: "2024-01-04T17:30:00Z",
    updated_at: "2024-01-04T18:30:00Z"
  }
];

// 9. ORDER ITEMS
export const mockOrderItems = [
  {
    id: 1,
    order_id: 1,
    product_id: 1,
    variant_id: 2,
    product_name: "Premium Moisture-Wicking Athletic Shirt",
    product_sku: "PWA-SHIRT-M-BLK-001",
    variant_details: { size: "M", color: "Charcoal Black" },
    quantity: 1,
    unit_price: 1299.00,
    total_price: 1299.00,
    discount_percentage: 0.00,
    discount_amount: 0.00,
    status: "confirmed",
    fulfillment_status: "confirmed",
    return_reason: null,
    return_status: null,
    refunded_amount: 0.00,
    created_at: "2024-01-03T16:30:00Z",
    updated_at: "2024-01-03T16:30:00Z"
  },
  {
    id: 2,
    order_id: 2,
    product_id: 2,
    variant_id: 7,
    product_name: "Tropical Comfort Yoga Pants",
    product_sku: "TCY-PANTS-M-NVY-001",
    variant_details: { size: "M", color: "Midnight Navy" },
    quantity: 1,
    unit_price: 1440.00,
    total_price: 1440.00,
    discount_percentage: 9.94,
    discount_amount: 159.00,
    status: "ready",
    fulfillment_status: "ready",
    return_reason: null,
    return_status: null,
    refunded_amount: 0.00,
    created_at: "2024-01-04T17:30:00Z",
    updated_at: "2024-01-04T17:30:00Z"
  }
];

// 10. ORDER STATUS HISTORY
export const mockOrderStatusHistory = [
  {
    id: 1,
    order_id: 1,
    old_status: null,
    new_status: "pending",
    changed_by: 3,
    change_reason: "Order created by customer",
    additional_notes: null,
    created_at: "2024-01-03T16:30:00Z"
  },
  {
    id: 2,
    order_id: 1,
    old_status: "pending",
    new_status: "confirmed",
    changed_by: 2,
    change_reason: "Payment confirmed",
    additional_notes: "Payment received via on-site",
    created_at: "2024-01-03T17:00:00Z"
  },
  {
    id: 3,
    order_id: 2,
    old_status: null,
    new_status: "pending",
    changed_by: 4,
    change_reason: "Order created by customer",
    additional_notes: null,
    created_at: "2024-01-04T17:30:00Z"
  },
  {
    id: 4,
    order_id: 2,
    old_status: "pending",
    new_status: "confirmed",
    changed_by: 2,
    change_reason: "Payment confirmed",
    additional_notes: "Payment received via on-site",
    created_at: "2024-01-04T18:00:00Z"
  },
  {
    id: 5,
    order_id: 2,
    old_status: "confirmed",
    new_status: "ready",
    changed_by: 2,
    change_reason: "Order fulfillment",
    additional_notes: "Item prepared for pickup",
    created_at: "2024-01-04T18:30:00Z"
  }
];

// 11. FAVORITES
export const mockFavorites = [
  {
    id: 1,
    user_id: 3,
    product_id: 1,
    variant_id: 1,
    notes: "Love this shirt for morning runs",
    created_at: "2024-01-03T14:00:00Z",
    updated_at: "2024-01-03T14:00:00Z"
  },
  {
    id: 2,
    user_id: 3,
    product_id: 2,
    variant_id: 5,
    notes: "Perfect for yoga sessions",
    created_at: "2024-01-03T14:30:00Z",
    updated_at: "2024-01-03T14:30:00Z"
  },
  {
    id: 3,
    user_id: 4,
    product_id: 1,
    variant_id: 3,
    notes: null,
    created_at: "2024-01-04T15:00:00Z",
    updated_at: "2024-01-04T15:00:00Z"
  }
];

// 12. PROMOTIONS
export const mockPromotions = [
  {
    id: 1,
    name: "New Year Fitness Sale",
    description: "20% off all fitness apparel",
    type: "PERCENTAGE",
    value: 20.00,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2024-01-31T23:59:59Z",
    category: "Athletic Wear",
    minimum_quantity: 1,
    is_active: true,
    is_published: true,
    data: {
      conditions: {
        min_order_amount: 500.00,
        applies_to_categories: [1, 3, 8]
      }
    },
    created_at: "2023-12-20T10:00:00Z",
    updated_at: "2023-12-20T10:00:00Z"
  },
  {
    id: 2,
    name: "Welcome Discount",
    description: "₱200 off for new customers",
    type: "FIXED_AMOUNT",
    value: 200.00,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2024-06-30T23:59:59Z",
    category: null,
    minimum_quantity: 1,
    is_active: true,
    is_published: true,
    data: {
      conditions: {
        new_customers_only: true,
        min_order_amount: 1000.00
      }
    },
    created_at: "2023-12-20T11:00:00Z",
    updated_at: "2023-12-20T11:00:00Z"
  },
  {
    id: 3,
    name: "Buy 2 Get 1 Free - Accessories",
    description: "Buy any 2 accessories, get 1 free",
    type: "BUY_ONE_GET_ONE",
    value: 0.00,
    start_date: "2024-01-15T00:00:00Z",
    end_date: "2024-02-14T23:59:59Z",
    category: "Accessories",
    minimum_quantity: 2,
    is_active: true,
    is_published: true,
    data: {
      conditions: {
        buy_quantity: 2,
        get_quantity: 1,
        applies_to_category: 4
      }
    },
    created_at: "2024-01-01T12:00:00Z",
    updated_at: "2024-01-01T12:00:00Z"
  }
];

// 13. NOTIFICATIONS
export const mockNotifications = [
  {
    id: 1,
    user_id: 3,
    title: "Order Confirmed",
    message: "Your order FT2024001 has been confirmed and is being prepared.",
    type: "ORDER",
    is_read: false,
    reference_id: 1,
    reference_type: "order",
    data: {
      order_number: "FT2024001",
      status: "confirmed"
    },
    created_at: "2024-01-03T17:00:00Z",
    updated_at: "2024-01-03T17:00:00Z"
  },
  {
    id: 2,
    user_id: 4,
    title: "Order Ready for Pickup",
    message: "Your order FT2024002 is ready for pickup at our store.",
    type: "ORDER",
    is_read: true,
    reference_id: 2,
    reference_type: "order",
    data: {
      order_number: "FT2024002",
      status: "ready",
      pickup_location: "Main Store, Manila"
    },
    created_at: "2024-01-04T18:30:00Z",
    updated_at: "2024-01-04T19:00:00Z"
  },
  {
    id: 3,
    user_id: 3,
    title: "New Promotion Available",
    message: "Get 20% off all fitness apparel with code FITNESS20",
    type: "PROMOTION",
    is_read: false,
    reference_id: 1,
    reference_type: "promotion",
    data: {
      promotion_code: "FITNESS20",
      discount: "20%",
      expiry_date: "2024-01-31"
    },
    created_at: "2024-01-03T10:00:00Z",
    updated_at: "2024-01-03T10:00:00Z"
  },
  {
    id: 4,
    user_id: 4,
    title: "Welcome to FitTech",
    message: "Thank you for joining FitTech! Enjoy exclusive member benefits.",
    type: "SYSTEM",
    is_read: true,
    reference_id: null,
    reference_type: null,
    data: {
      member_benefits: ["Exclusive discounts", "Early access to sales", "Free shipping on orders over ₱1000"]
    },
    created_at: "2024-01-04T12:00:00Z",
    updated_at: "2024-01-04T12:00:00Z"
  }
];

// 14. BANNED USERS
export const mockBannedUsers = [
  {
    id: 1,
    user_id: 5,
    reason: "Repeated fraudulent payment attempts",
    is_permanent: false,
    expires_at: "2024-06-01T00:00:00Z",
    created_at: "2024-01-05T10:00:00Z",
    updated_at: "2024-01-05T10:00:00Z"
  }
];

// 15. RESERVATIONS
export const mockReservations = [
  {
    id: 1,
    user_id: 3,
    status: "CONFIRMED",
    expires_at: "2024-01-10T23:59:59Z",
    notes: "Reserved for pickup on weekend",
    created_at: "2024-01-08T14:00:00Z",
    updated_at: "2024-01-08T14:00:00Z"
  },
  {
    id: 2,
    user_id: 4,
    status: "PENDING",
    expires_at: "2024-01-09T23:59:59Z",
    notes: null,
    created_at: "2024-01-08T15:30:00Z",
    updated_at: "2024-01-08T15:30:00Z"
  }
];

// 16. RESERVATION ITEMS
export const mockReservationItems = [
  {
    id: 1,
    reservation_id: 1,
    product_id: 1,
    variant_id: 3,
    quantity: 1,
    price_at_reserved: 1299.00,
    created_at: "2024-01-08T14:00:00Z",
    updated_at: "2024-01-08T14:00:00Z"
  },
  {
    id: 2,
    reservation_id: 2,
    product_id: 2,
    variant_id: 6,
    quantity: 2,
    price_at_reserved: 1440.00,
    created_at: "2024-01-08T15:30:00Z",
    updated_at: "2024-01-08T15:30:00Z"
  }
];

// 17. RECOMMENDED PRODUCTS
export const mockRecommendedProducts = [
  {
    id: 1,
    user_id: 3,
    product_id: 2,
    score: 0.95,
    reason: "Based on your purchase history and fitness goals",
    created_at: "2024-01-03T20:00:00Z",
    updated_at: "2024-01-03T20:00:00Z"
  },
  {
    id: 2,
    user_id: 3,
    product_id: 3,
    score: 0.88,
    reason: "Customers who bought similar items also liked this",
    created_at: "2024-01-03T20:00:00Z",
    updated_at: "2024-01-03T20:00:00Z"
  },
  {
    id: 3,
    user_id: 4,
    product_id: 1,
    score: 0.92,
    reason: "Trending in your size and style preference",
    created_at: "2024-01-04T20:00:00Z",
    updated_at: "2024-01-04T20:00:00Z"
  }
];

// Helper functions
export const getCategoryName = (categoryId) => {
  const category = mockCategories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};

export const getCategoryId = (categoryName) => {
  const category = mockCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  return category ? category.id : 1;
};

// Export all mock data for easy access
export const mockData = {
  categories: mockCategories,
  products: mockProducts,
  users: mockUsers,
  tokens: mockTokens,
  otps: mockOTPs,
  carts: mockCarts,
  cartItems: mockCartItems,
  orders: mockOrders,
  orderItems: mockOrderItems,
  orderStatusHistory: mockOrderStatusHistory,
  favorites: mockFavorites,
  promotions: mockPromotions,
  notifications: mockNotifications,
  bannedUsers: mockBannedUsers,
  reservations: mockReservations,
  reservationItems: mockReservationItems,
  recommendedProducts: mockRecommendedProducts
};



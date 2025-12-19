// Cloth Store Ecommerce Mock Data
// ======================================


// 1. CATEGORIES - Clothing-focused only
export const mockCategories = [
  { id: 1, name: "Tops", description: "Trendy blouses, shirts, and tops" },
  { id: 2, name: "Bottoms", description: "Stylish pants, skirts, and shorts" },
  { id: 3, name: "Dresses", description: "Elegant dresses for all occasions" },
  { id: 4, name: "Outerwear", description: "Jackets, cardigans, and coats" },
  { id: 5, name: "Streetwear", description: "Urban and contemporary fashion" },
  { id: 6, name: "Formal Wear", description: "Professional and elegant attire" },
  { id: 7, name: "Casual", description: "Everyday comfortable clothing" }
];

// 2. PRODUCTS - Cloth Store Items
export const mockProducts = [
  {
    id: 1,
    name: "Trendy Oversized Blazer",
    slug: "trendy-oversized-blazer",
    description: "Fashion-forward oversized blazer perfect for street style and professional looks. Features structured shoulders, unique buttons, and premium fabric blend. Ideal for the modern Filipino woman's wardrobe - from office to weekend.",
    price: 2499.00,
    discount: 0.00,
    category_id: 4, // Outerwear
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    variants: [
      {
        id: 1,
        product_id: 1,
        size: "S",
        color: "Classic Black",
        sku: "TOB-BLAZER-S-BLK-001",
        stock: 25
      },
      {
        id: 2,
        product_id: 1,
        size: "M",
        color: "Classic Black",
        sku: "TOB-BLAZER-M-BLK-001",
        stock: 45
      },
      {
        id: 3,
        product_id: 1,
        size: "L",
        color: "Classic Black",
        sku: "TOB-BLAZER-L-BLK-001",
        stock: 40
      },
      {
        id: 4,
        product_id: 1,
        size: "XL",
        color: "Classic Black",
        sku: "TOB-BLAZER-XL-BLK-001",
        stock: 30
      },
      {
        id: 5,
        product_id: 1,
        size: "S",
        color: "Beige Cream",
        sku: "TOB-BLAZER-S-BEI-001",
        stock: 20
      }
    ],
    images: [
      {
        id: 1,
        product_id: 1,
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
        alt: "Trendy oversized blazer black",
        is_primary: true
      },
      {
        id: 2,
        product_id: 1,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Trendy oversized blazer beige",
        is_primary: false
      }
    ]
  },
  {
    id: 2,
    name: "High-Waisted Mom Jeans",
    slug: "high-waisted-mom-jeans",
    description: "Stylish high-waisted mom jeans with a relaxed fit and cropped ankle. Perfect for creating effortlessly chic looks. Features comfortable stretch fabric and vintage-inspired wash. Essential for trendy Filipino fashion enthusiasts.",
    price: 1899.00,
    discount: 189.00,
    category_id: 2, // Bottoms
    is_active: true,
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
    variants: [
      {
        id: 6,
        product_id: 2,
        size: "XS",
        color: "Light Wash",
        sku: "HWM-JEANS-XS-WSH-001",
        stock: 18
      },
      {
        id: 7,
        product_id: 2,
        size: "S",
        color: "Light Wash",
        sku: "HWM-JEANS-S-WSH-001",
        stock: 32
      },
      {
        id: 8,
        product_id: 2,
        size: "M",
        color: "Light Wash",
        sku: "HWM-JEANS-M-WSH-001",
        stock: 42
      },
      {
        id: 9,
        product_id: 2,
        size: "S",
        color: "Dark Denim",
        sku: "HWM-JEANS-S-DNM-001",
        stock: 28
      }
    ],
    images: [
      {
        id: 3,
        product_id: 2,
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop&crop=center",
        alt: "High-waisted mom jeans light wash",
        is_primary: true
      },
      {
        id: 4,
        product_id: 2,
        url: "https://images.unsplash.com/photo-1582418702042-3d6c0d9e8bf7?w=800&h=800&fit=crop&crop=center",
        alt: "High-waisted mom jeans dark denim",
        is_primary: false
      }
    ]
  },
  {
    id: 3,
    name: "Silk Slip Dress",
    slug: "silk-slip-dress",
    description: "Elegant silk slip dress perfect for date nights and special occasions. Features a flattering silhouette, adjustable straps, and luxurious satin finish. Ideal for the sophisticated Filipino woman who loves timeless elegance.",
    price: 3299.00,
    discount: 0.00,
    category_id: 3, // Dresses
    is_active: true,
    created_at: "2024-01-17T12:00:00Z",
    updated_at: "2024-01-17T12:00:00Z",
    variants: [
      {
        id: 10,
        product_id: 3,
        size: "XS",
        color: "Champagne",
        sku: "SSD-DRESS-XS-CHP-001",
        stock: 15
      },
      {
        id: 11,
        product_id: 3,
        size: "S",
        color: "Champagne",
        sku: "SSD-DRESS-S-CHP-001",
        stock: 28
      },
      {
        id: 12,
        product_id: 3,
        size: "M",
        color: "Champagne",
        sku: "SSD-DRESS-M-CHP-001",
        stock: 32
      },
      {
        id: 13,
        product_id: 3,
        size: "XS",
        color: "Emerald Green",
        sku: "SSD-DRESS-XS-GRN-001",
        stock: 12
      }
    ],
    images: [
      {
        id: 5,
        product_id: 3,
        url: "https://images.unsplash.com/photo-1566479179817-2a6ed0a8de9a?w=800&h=800&fit=crop&crop=center",
        alt: "Silk slip dress champagne",
        is_primary: true
      },
      {
        id: 6,
        product_id: 3,
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop&crop=center",
        alt: "Silk slip dress emerald green",
        is_primary: false
      }
    ]
  },
  {
    id: 4,
    name: "Cropped Denim Jacket",
    slug: "cropped-denim-jacket",
    description: "Trendy cropped denim jacket with a modern twist. Features distressed details, vintage buttons, and perfect cropped length. Essential for creating layered looks and achieving that effortlessly cool Filipino street style.",
    price: 2199.00,
    discount: 219.00,
    category_id: 4, // Outerwear
    is_active: true,
    created_at: "2024-01-18T13:00:00Z",
    updated_at: "2024-01-18T13:00:00Z",
    variants: [
      {
        id: 14,
        product_id: 4,
        size: "S",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-S-BLU-001",
        stock: 22
      },
      {
        id: 15,
        product_id: 4,
        size: "M",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-M-BLU-001",
        stock: 35
      },
      {
        id: 16,
        product_id: 4,
        size: "L",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-L-BLU-001",
        stock: 40
      },
      {
        id: 17,
        product_id: 4,
        size: "S",
        color: "Black Wash",
        sku: "CDJ-JACKET-S-BLK-001",
        stock: 18
      }
    ],
    images: [
      {
        id: 7,
        product_id: 4,
        url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=800&fit=crop&crop=center",
        alt: "Cropped denim jacket vintage blue",
        is_primary: true
      },
      {
        id: 8,
        product_id: 4,
        url: "https://images.unsplash.com/photo-1578932750294-f5075e85d7f2?w=800&h=800&fit=crop&crop=center",
        alt: "Cropped denim jacket black wash",
        is_primary: false
      }
    ]
  },
  {
    id: 5,
    name: "Statement Puff Sleeve Top",
    slug: "statement-puff-sleeve-top",
    description: "Eye-catching puff sleeve top perfect for making a fashion statement. Features dramatic sleeves, romantic fabric, and flattering neckline. Ideal for the confident Filipino woman who loves trendy, feminine pieces.",
    price: 1699.00,
    discount: 0.00,
    category_id: 1, // Tops
    is_active: true,
    created_at: "2024-01-19T14:00:00Z",
    updated_at: "2024-01-19T14:00:00Z",
    variants: [
      {
        id: 18,
        product_id: 5,
        size: "XS",
        color: "Dusty Pink",
        sku: "SPT-TOP-XS-PNK-001",
        stock: 20
      },
      {
        id: 19,
        product_id: 5,
        size: "S",
        color: "Dusty Pink",
        sku: "SPT-TOP-S-PNK-001",
        stock: 30
      },
      {
        id: 20,
        product_id: 5,
        size: "M",
        color: "Dusty Pink",
        sku: "SPT-TOP-M-PNK-001",
        stock: 38
      },
      {
        id: 21,
        product_id: 5,
        size: "S",
        color: "Classic White",
        sku: "SPT-TOP-S-WHT-001",
        stock: 22
      }
    ],
    images: [
      {
        id: 9,
        product_id: 5,
        url: "https://images.unsplash.com/photo-1578587018452-8927c328be98?w=800&h=800&fit=crop&crop=center",
        alt: "Statement puff sleeve top dusty pink",
        is_primary: true
      },
      {
        id: 10,
        product_id: 5,
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
        alt: "Statement puff sleeve top classic white",
        is_primary: false
      }
    ]
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    slug: "pleated-midi-skirt",
    description: "Elegant pleated midi skirt with flowing fabric and perfect length. Features high-waist design and beautiful pleats that move gracefully. Perfect for creating sophisticated looks from office to evening in Philippine climate.",
    price: 1799.00,
    discount: 179.00,
    category_id: 2, // Bottoms
    is_active: true,
    created_at: "2024-01-20T15:00:00Z",
    updated_at: "2024-01-20T15:00:00Z",
    variants: [
      {
        id: 22,
        product_id: 6,
        size: "XS",
        color: "Burgundy",
        sku: "PMS-SKIRT-XS-BUR-001",
        stock: 35
      },
      {
        id: 23,
        product_id: 6,
        size: "S",
        color: "Burgundy",
        sku: "PMS-SKIRT-S-BUR-001",
        stock: 45
      },
      {
        id: 24,
        product_id: 6,
        size: "M",
        color: "Burgundy",
        sku: "PMS-SKIRT-M-BUR-001",
        stock: 42
      },
      {
        id: 25,
        product_id: 6,
        size: "XS",
        color: "Navy",
        sku: "PMS-SKIRT-XS-NVY-001",
        stock: 28
      }
    ],
    images: [
      {
        id: 11,
        product_id: 6,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Pleated midi skirt burgundy",
        is_primary: true
      },
      {
        id: 12,
        product_id: 6,
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&crop=center",
        alt: "Pleated midi skirt navy",
        is_primary: false
      }
    ]
  },
  {
    id: 7,
    name: "Boxy Crop Top",
    slug: "boxy-crop-top",
    description: "Trendy boxy crop top with modern silhouette and comfortable fit. Perfect for pairing with high-waisted bottoms and creating that effortlessly cool streetwear look. Essential for the contemporary Filipino fashion enthusiast.",
    price: 1299.00,
    discount: 0.00,
    category_id: 1, // Tops
    is_active: true,
    created_at: "2024-01-21T16:00:00Z",
    updated_at: "2024-01-21T16:00:00Z",
    variants: [
      {
        id: 26,
        product_id: 7,
        size: "XS",
        color: "Sage Green",
        sku: "BCT-TOP-XS-GRN-001",
        stock: 25
      },
      {
        id: 27,
        product_id: 7,
        size: "S",
        color: "Sage Green",
        sku: "BCT-TOP-S-GRN-001",
        stock: 35
      },
      {
        id: 28,
        product_id: 7,
        size: "M",
        color: "Sage Green",
        sku: "BCT-TOP-M-GRN-001",
        stock: 40
      },
      {
        id: 29,
        product_id: 7,
        size: "XS",
        color: "Terracotta",
        sku: "BCT-TOP-XS-TER-001",
        stock: 20
      }
    ],
    images: [
      {
        id: 13,
        product_id: 7,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Boxy crop top sage green",
        is_primary: true
      },
      {
        id: 14,
        product_id: 7,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center",
        alt: "Boxy crop top terracotta",
        is_primary: false
      }
    ]
  },
  {
    id: 8,
    name: "Utility Cargo Pants",
    slug: "utility-cargo-pants",
    description: "Stylish utility cargo pants with multiple pockets and relaxed fit. Features modern cargo details, comfortable fabric, and versatile styling options. Perfect for the fashion-forward Filipino who loves functional streetwear.",
    price: 2199.00,
    discount: 219.00,
    category_id: 2, // Bottoms
    is_active: true,
    created_at: "2024-01-22T17:00:00Z",
    updated_at: "2024-01-22T17:00:00Z",
    variants: [
      {
        id: 30,
        product_id: 8,
        size: "S",
        color: "Olive Green",
        sku: "UCP-PANTS-S-GRN-001",
        stock: 45
      },
      {
        id: 31,
        product_id: 8,
        size: "M",
        color: "Olive Green",
        sku: "UCP-PANTS-M-GRN-001",
        stock: 55
      },
      {
        id: 32,
        product_id: 8,
        size: "L",
        color: "Olive Green",
        sku: "UCP-PANTS-L-GRN-001",
        stock: 60
      },
      {
        id: 33,
        product_id: 8,
        size: "S",
        color: "Khaki",
        sku: "UCP-PANTS-S-KHK-001",
        stock: 40
      }
    ],
    images: [
      {
        id: 15,
        product_id: 8,
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
        alt: "Utility cargo pants olive green",
        is_primary: true
      },
      {
        id: 16,
        product_id: 8,
        url: "https://images.unsplash.com/photo-1582418702042-3d6c0d9e8bf7?w=800&h=800&fit=crop&crop=center",
        alt: "Utility cargo pants khaki",
        is_primary: false
      }
    ]
  },
  {
    id: 9,
    name: "Vintage Band Tee",
    slug: "vintage-band-tee",
    description: "Retro-inspired vintage band t-shirt with soft fabric and perfect fit. Features classic band logo print and distressed details for that authentic vintage feel. Essential for music lovers and vintage fashion enthusiasts.",
    price: 999.00,
    discount: 99.00,
    category_id: 7, // Casual
    is_active: true,
    created_at: "2024-01-23T18:00:00Z",
    updated_at: "2024-01-23T18:00:00Z",
    variants: [
      {
        id: 34,
        product_id: 9,
        size: "S",
        color: "Black",
        sku: "VBT-TEE-S-BLK-001",
        stock: 45
      },
      {
        id: 35,
        product_id: 9,
        size: "M",
        color: "Black",
        sku: "VBT-TEE-M-BLK-001",
        stock: 40
      },
      {
        id: 36,
        product_id: 9,
        size: "L",
        color: "Black",
        sku: "VBT-TEE-L-BLK-001",
        stock: 38
      },
      {
        id: 37,
        product_id: 9,
        size: "S",
        color: "White",
        sku: "VBT-TEE-S-WHT-001",
        stock: 35
      }
    ],
    images: [
      {
        id: 17,
        product_id: 9,
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
        alt: "Vintage band tee black",
        is_primary: true
      },
      {
        id: 18,
        product_id: 9,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Vintage band tee white",
        is_primary: false
      }
    ]

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

// Export all data for easy access
export const clothStoreData = {
  categories: mockCategories,
  products: mockProducts
};

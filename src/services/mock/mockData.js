// Mock product data for Fit-Tech Fashion Store - Trendy Outfits
export const mockProducts = [
  {
    id: 1,
    name: "Trendy Oversized Blazer",
    slug: "trendy-oversized-blazer",
    description: "Fashion-forward oversized blazer perfect for street style and professional looks. Features structured shoulders, unique buttons, and premium fabric blend. Ideal for the modern Filipino woman's wardrobe - from office to weekend.",
    price: 2499.00,
    discount: 0.00,
    category_id: 1, // Tops
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    variants: [
      {
        id: 1,
        size: "S",
        color: "Classic Black",
        sku: "TOB-BLAZER-S-BLK-001",
        stock: 25
      },
      {
        id: 2,
        size: "M",
        color: "Classic Black",
        sku: "TOB-BLAZER-M-BLK-001",
        stock: 45
      },
      {
        id: 3,
        size: "L",
        color: "Classic Black",
        sku: "TOB-BLAZER-L-BLK-001",
        stock: 40
      },
      {
        id: 4,
        size: "XL",
        color: "Classic Black",
        sku: "TOB-BLAZER-XL-BLK-001",
        stock: 30
      },
      {
        id: 5,
        size: "S",
        color: "Beige Cream",
        sku: "TOB-BLAZER-S-BEI-001",
        stock: 20
      },
      {
        id: 6,
        size: "M",
        color: "Beige Cream",
        sku: "TOB-BLAZER-M-BEI-001",
        stock: 35
      },
      {
        id: 7,
        size: "L",
        color: "Beige Cream",
        sku: "TOB-BLAZER-L-BEI-001",
        stock: 38
      },
      {
        id: 8,
        size: "XL",
        color: "Beige Cream",
        sku: "TOB-BLAZER-XL-BEI-001",
        stock: 28
      }
    ],
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
        alt: "Trendy oversized blazer black",
        is_primary: true
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Trendy oversized blazer beige",
        is_primary: false
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Trendy oversized blazer detail",
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
        id: 9,
        size: "XS",
        color: "Light Wash",
        sku: "HWM-JEANS-XS-WSH-001",
        stock: 18
      },
      {
        id: 10,
        size: "S",
        color: "Light Wash",
        sku: "HWM-JEANS-S-WSH-001",
        stock: 32
      },
      {
        id: 11,
        size: "M",
        color: "Light Wash",
        sku: "HWM-JEANS-M-WSH-001",
        stock: 42
      },
      {
        id: 12,
        size: "L",
        color: "Light Wash",
        sku: "HWM-JEANS-L-WSH-001",
        stock: 38
      },
      {
        id: 13,
        size: "XL",
        color: "Light Wash",
        sku: "HWM-JEANS-XL-WSH-001",
        stock: 25
      },
      {
        id: 14,
        size: "S",
        color: "Dark Denim",
        sku: "HWM-JEANS-S-DNM-001",
        stock: 28
      },
      {
        id: 15,
        size: "M",
        color: "Dark Denim",
        sku: "HWM-JEANS-M-DNM-001",
        stock: 35
      },
      {
        id: 16,
        size: "L",
        color: "Dark Denim",
        sku: "HWM-JEANS-L-DNM-001",
        stock: 33
      }
    ],
    images: [
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop&crop=center",
        alt: "High-waisted mom jeans light wash",
        is_primary: true
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1582418702042-3d6c0d9e8bf7?w=800&h=800&fit=crop&crop=center",
        alt: "High-waisted mom jeans dark denim",
        is_primary: false
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop&crop=center",
        alt: "High-waisted mom jeans detail",
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
        id: 17,
        size: "XS",
        color: "Champagne",
        sku: "SSD-DRESS-XS-CHP-001",
        stock: 15
      },
      {
        id: 18,
        size: "S",
        color: "Champagne",
        sku: "SSD-DRESS-S-CHP-001",
        stock: 28
      },
      {
        id: 19,
        size: "M",
        color: "Champagne",
        sku: "SSD-DRESS-M-CHP-001",
        stock: 32
      },
      {
        id: 20,
        size: "L",
        color: "Champagne",
        sku: "SSD-DRESS-L-CHP-001",
        stock: 22
      },
      {
        id: 21,
        size: "XS",
        color: "Emerald Green",
        sku: "SSD-DRESS-XS-GRN-001",
        stock: 12
      },
      {
        id: 22,
        size: "S",
        color: "Emerald Green",
        sku: "SSD-DRESS-S-GRN-001",
        stock: 25
      },
      {
        id: 23,
        size: "M",
        color: "Emerald Green",
        sku: "SSD-DRESS-M-GRN-001",
        stock: 30
      },
      {
        id: 24,
        size: "L",
        color: "Emerald Green",
        sku: "SSD-DRESS-L-GRN-001",
        stock: 20
      }
    ],
    images: [
      {
        id: 7,
        url: "https://images.unsplash.com/photo-1566479179817-2a6ed0a8de9a?w=800&h=800&fit=crop&crop=center",
        alt: "Silk slip dress champagne",
        is_primary: true
      },
      {
        id: 8,
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop&crop=center",
        alt: "Silk slip dress emerald green",
        is_primary: false
      },
      {
        id: 9,
        url: "https://images.unsplash.com/photo-1566479179817-2a6ed0a8de9a?w=800&h=800&fit=crop&crop=center",
        alt: "Silk slip dress detail",
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
        id: 25,
        size: "S",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-S-BLU-001",
        stock: 22
      },
      {
        id: 26,
        size: "M",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-M-BLU-001",
        stock: 35
      },
      {
        id: 27,
        size: "L",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-L-BLU-001",
        stock: 40
      },
      {
        id: 28,
        size: "XL",
        color: "Vintage Blue",
        sku: "CDJ-JACKET-XL-BLU-001",
        stock: 30
      },
      {
        id: 29,
        size: "S",
        color: "Black Wash",
        sku: "CDJ-JACKET-S-BLK-001",
        stock: 18
      },
      {
        id: 30,
        size: "M",
        color: "Black Wash",
        sku: "CDJ-JACKET-M-BLK-001",
        stock: 28
      },
      {
        id: 31,
        size: "L",
        color: "Black Wash",
        sku: "CDJ-JACKET-L-BLK-001",
        stock: 32
      },
      {
        id: 32,
        size: "XL",
        color: "Black Wash",
        sku: "CDJ-JACKET-XL-BLK-001",
        stock: 25
      }
    ],
    images: [
      {
        id: 10,
        url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=800&fit=crop&crop=center",
        alt: "Cropped denim jacket vintage blue",
        is_primary: true
      },
      {
        id: 11,
        url: "https://images.unsplash.com/photo-1578932750294-f5075e85d7f2?w=800&h=800&fit=crop&crop=center",
        alt: "Cropped denim jacket black wash",
        is_primary: false
      },
      {
        id: 12,
        url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=800&fit=crop&crop=center",
        alt: "Cropped denim jacket detail",
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
        id: 33,
        size: "XS",
        color: "Dusty Pink",
        sku: "SPT-TOP-XS-PNK-001",
        stock: 20
      },
      {
        id: 34,
        size: "S",
        color: "Dusty Pink",
        sku: "SPT-TOP-S-PNK-001",
        stock: 30
      },
      {
        id: 35,
        size: "M",
        color: "Dusty Pink",
        sku: "SPT-TOP-M-PNK-001",
        stock: 38
      },
      {
        id: 36,
        size: "L",
        color: "Dusty Pink",
        sku: "SPT-TOP-L-PNK-001",
        stock: 35
      },
      {
        id: 37,
        size: "XL",
        color: "Dusty Pink",
        sku: "SPT-TOP-XL-PNK-001",
        stock: 25
      },
      {
        id: 38,
        size: "S",
        color: "Classic White",
        sku: "SPT-TOP-S-WHT-001",
        stock: 22
      },
      {
        id: 39,
        size: "M",
        color: "Classic White",
        sku: "SPT-TOP-M-WHT-001",
        stock: 32
      },
      {
        id: 40,
        size: "L",
        color: "Classic White",
        sku: "SPT-TOP-L-WHT-001",
        stock: 28
      }
    ],
    images: [
      {
        id: 13,
        url: "https://images.unsplash.com/photo-1578587018452-8927c328be98?w=800&h=800&fit=crop&crop=center",
        alt: "Statement puff sleeve top dusty pink",
        is_primary: true
      },
      {
        id: 14,
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
        alt: "Statement puff sleeve top classic white",
        is_primary: false
      },
      {
        id: 15,
        url: "https://images.unsplash.com/photo-1578587018452-8927c328be98?w=800&h=800&fit=crop&crop=center",
        alt: "Statement puff sleeve top detail",
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
        id: 41,
        size: "XS",
        color: "Burgundy",
        sku: "PMS-SKIRT-XS-BUR-001",
        stock: 35
      },
      {
        id: 42,
        size: "S",
        color: "Burgundy",
        sku: "PMS-SKIRT-S-BUR-001",
        stock: 45
      },
      {
        id: 43,
        size: "M",
        color: "Burgundy",
        sku: "PMS-SKIRT-M-BUR-001",
        stock: 42
      },
      {
        id: 44,
        size: "L",
        color: "Burgundy",
        sku: "PMS-SKIRT-L-BUR-001",
        stock: 32
      },
      {
        id: 45,
        size: "XS",
        color: "Navy",
        sku: "PMS-SKIRT-XS-NVY-001",
        stock: 28
      },
      {
        id: 46,
        size: "S",
        color: "Navy",
        sku: "PMS-SKIRT-S-NVY-001",
        stock: 38
      },
      {
        id: 47,
        size: "M",
        color: "Navy",
        sku: "PMS-SKIRT-M-NVY-001",
        stock: 35
      },
      {
        id: 48,
        size: "L",
        color: "Navy",
        sku: "PMS-SKIRT-L-NVY-001",
        stock: 25
      }
    ],
    images: [
      {
        id: 16,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Pleated midi skirt burgundy",
        is_primary: true
      },
      {
        id: 17,
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&crop=center",
        alt: "Pleated midi skirt navy",
        is_primary: false
      },
      {
        id: 18,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
        alt: "Pleated midi skirt detail",
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
        id: 49,
        size: "XS",
        color: "Sage Green",
        sku: "BCT-TOP-XS-GRN-001",
        stock: 25
      },
      {
        id: 50,
        size: "S",
        color: "Sage Green",
        sku: "BCT-TOP-S-GRN-001",
        stock: 35
      },
      {
        id: 51,
        size: "M",
        color: "Sage Green",
        sku: "BCT-TOP-M-GRN-001",
        stock: 40
      },
      {
        id: 52,
        size: "L",
        color: "Sage Green",
        sku: "BCT-TOP-L-GRN-001",
        stock: 28
      },
      {
        id: 53,
        size: "XS",
        color: "Terracotta",
        sku: "BCT-TOP-XS-TER-001",
        stock: 20
      },
      {
        id: 54,
        size: "S",
        color: "Terracotta",
        sku: "BCT-TOP-S-TER-001",
        stock: 30
      },
      {
        id: 55,
        size: "M",
        color: "Terracotta",
        sku: "BCT-TOP-M-TER-001",
        stock: 32
      },
      {
        id: 56,
        size: "L",
        color: "Terracotta",
        sku: "BCT-TOP-L-TER-001",
        stock: 22
      }
    ],
    images: [
      {
        id: 19,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Boxy crop top sage green",
        is_primary: true
      },
      {
        id: 20,
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center",
        alt: "Boxy crop top terracotta",
        is_primary: false
      },
      {
        id: 21,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Boxy crop top detail",
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
        id: 57,
        size: "S",
        color: "Olive Green",
        sku: "UCP-PANTS-S-GRN-001",
        stock: 45
      },
      {
        id: 58,
        size: "M",
        color: "Olive Green",
        sku: "UCP-PANTS-M-GRN-001",
        stock: 55
      },
      {
        id: 59,
        size: "L",
        color: "Olive Green",
        sku: "UCP-PANTS-L-GRN-001",
        stock: 60
      },
      {
        id: 60,
        size: "XL",
        color: "Olive Green",
        sku: "UCP-PANTS-XL-GRN-001",
        stock: 48
      },
      {
        id: 61,
        size: "S",
        color: "Khaki",
        sku: "UCP-PANTS-S-KHK-001",
        stock: 40
      },
      {
        id: 62,
        size: "M",
        color: "Khaki",
        sku: "UCP-PANTS-M-KHK-001",
        stock: 50
      },
      {
        id: 63,
        size: "L",
        color: "Khaki",
        sku: "UCP-PANTS-L-KHK-001",
        stock: 55
      },
      {
        id: 64,
        size: "XL",
        color: "Khaki",
        sku: "UCP-PANTS-XL-KHK-001",
        stock: 42
      }
    ],
    images: [
      {
        id: 22,
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
        alt: "Utility cargo pants olive green",
        is_primary: true
      },
      {
        id: 23,
        url: "https://images.unsplash.com/photo-1582418702042-3d6c0d9e8bf7?w=800&h=800&fit=crop&crop=center",
        alt: "Utility cargo pants khaki",
        is_primary: false
      },
      {
        id: 24,
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
        alt: "Utility cargo pants detail",
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
        id: 65,
        size: "S",
        color: "Black",
        sku: "VBT-TEE-S-BLK-001",
        stock: 45
      },
      {
        id: 66,
        size: "M",
        color: "Black",
        sku: "VBT-TEE-M-BLK-001",
        stock: 40
      },
      {
        id: 67,
        size: "L",
        color: "Black",
        sku: "VBT-TEE-L-BLK-001",
        stock: 38
      },
      {
        id: 68,
        size: "XL",
        color: "Black",
        sku: "VBT-TEE-XL-BLK-001",
        stock: 30
      },
      {
        id: 69,
        size: "S",
        color: "White",
        sku: "VBT-TEE-S-WHT-001",
        stock: 35
      },
      {
        id: 70,
        size: "M",
        color: "White",
        sku: "VBT-TEE-M-WHT-001",
        stock: 42
      },
      {
        id: 71,
        size: "L",
        color: "White",
        sku: "VBT-TEE-L-WHT-001",
        stock: 40
      },
      {
        id: 72,
        size: "XL",
        color: "White",
        sku: "VBT-TEE-XL-WHT-001",
        stock: 32
      }
    ],
    images: [
      {
        id: 25,
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
        alt: "Vintage band tee black",
        is_primary: true
      },
      {
        id: 26,
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
        alt: "Vintage band tee white",
        is_primary: false
      },
      {
        id: 27,
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
        alt: "Vintage band tee detail",
        is_primary: false
      }
    ]
  },
  {
    id: 10,
    name: "Minimalist Gold Necklace",
    slug: "minimalist-gold-necklace",
    description: "Elegant minimalist gold-plated necklace perfect for layering or wearing alone. Features delicate chain and timeless design that complements any outfit. Essential accessory for the sophisticated Filipino woman.",
    price: 899.00,
    discount: 0.00,
    category_id: 8, // Accessories
    is_active: true,
    created_at: "2024-01-24T19:00:00Z",
    updated_at: "2024-01-24T19:00:00Z",
    variants: [
      {
        id: 73,
        size: "16 inch",
        color: "Gold",
        sku: "MGN-NECK-GLD-16-001",
        stock: 18
      },
      {
        id: 74,
        size: "18 inch",
        color: "Gold",
        sku: "MGN-NECK-GLD-18-001",
        stock: 28
      },
      {
        id: 75,
        size: "20 inch",
        color: "Gold",
        sku: "MGN-NECK-GLD-20-001",
        stock: 32
      },
      {
        id: 76,
        size: "24 inch",
        color: "Gold",
        sku: "MGN-NECK-GLD-24-001",
        stock: 24
      }
    ],
    images: [
      {
        id: 28,
        url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center",
        alt: "Minimalist gold necklace 18 inch",
        is_primary: true
      },
      {
        id: 29,
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=center",
        alt: "Minimalist gold necklace styles",
        is_primary: false
      },
      {
        id: 30,
        url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop&crop=center",
        alt: "Minimalist gold necklace detail",
        is_primary: false
      }
    ]
  }
];

// Fashion categories for Fit-Tech
export const mockCategories = [
  { id: 1, name: "Tops", description: "Trendy tops, blouses, and shirts" },
  { id: 2, name: "Bottoms", description: "Stylish pants, skirts, and shorts" },
  { id: 3, name: "Dresses", description: "Fashion-forward dresses for all occasions" },
  { id: 4, name: "Outerwear", description: "Trendy jackets and cardigans" },
  { id: 5, name: "Streetwear", description: "Urban and contemporary fashion" },
  { id: 6, name: "Formal Wear", description: "Professional and elegant attire" },
  { id: 7, name: "Casual", description: "Everyday comfortable clothing" },
  { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
];

// Helper function to get category name by ID
export const getCategoryName = (categoryId) => {
  const category = mockCategories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};

// Helper function to get category ID by name
export const getCategoryId = (categoryName) => {
  const category = mockCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  return category ? category.id : 1;
};

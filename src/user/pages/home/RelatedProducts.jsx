

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { ShoppingCart, Heart, Star, Loader2 } from 'lucide-react';


const STORAGE_KEYS = {
  COUNTERS: 'fittech_counters'
};

// Get user-specific storage key
const getUserStorageKey = (baseKey, userEmail) => {
  return userEmail ? `${baseKey}_${userEmail}` : baseKey;
};


const initializeStorage = () => {
  
  if (!localStorage.getItem(STORAGE_KEYS.COUNTERS)) {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify({
      productId: 0,
      variantId: 0,
      imageId: 0,
      recommendationId: 0,
      cartId: 0,
      cartItemId: 0
    }));
  }
};

// Get data from localStorage
const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Generate next ID for a specific entity type
const generateId = (entityType) => {
  const counters = getFromStorage(STORAGE_KEYS.COUNTERS) || {};
  const defaults = {
    productId: 0,
    variantId: 0,
    imageId: 0,
    recommendationId: 0,
    cartId: 0,
    cartItemId: 0
  };
  const finalCounters = { ...defaults, ...counters };
  
  if (finalCounters[entityType] === undefined) {
    finalCounters[entityType] = 0;
  }
  finalCounters[entityType] += 1;
  saveToStorage(STORAGE_KEYS.COUNTERS, finalCounters);
  return finalCounters[entityType];
};


// Initialize mock recommendation data
const initializeMockData = (userEmail) => {
  initializeStorage();
  
  if (!userEmail) return;
  
  const recommendationsKey = getUserStorageKey('fittech_recommended', userEmail);
  const existingRecommendations = getFromStorage(recommendationsKey);
  
  if (!existingRecommendations || existingRecommendations.length === 0) {
    const sampleRecommendations = [
      {
        id: 1,
        product_id: 1,
        product_name: "Premium Yoga Mat",
        product_price: 49.99,
        variant_id: 1,
        variant_color: "Purple",
        variant_size: "Large",
        reason: "Based on your fitness goals"
      },
      {
        id: 2,
        product_id: 2,
        product_name: "Smart Fitness Tracker",
        product_price: 199.99,
        variant_id: 2,
        variant_color: "Black",
        variant_size: "Medium",
        reason: "Popular among users like you"
      },
      {
        id: 3,
        product_id: 3,
        product_name: "Resistance Bands Set",
        product_price: 29.99,
        variant_id: 3,
        variant_color: "Multicolor",
        variant_size: "Standard",
        reason: "Complements your current equipment"
      },
      {
        id: 4,
        product_id: 4,
        product_name: "Protein Powder",
        product_price: 39.99,
        variant_id: 4,
        variant_color: "Vanilla",
        variant_size: "2lbs",
        reason: "Recommended by trainers"
      }
    ];
    saveToStorage(recommendationsKey, sampleRecommendations);
  }
};


// LocalStorage-based cart functions
const getOrCreateCart = (userEmail) => {
  if (!userEmail) return null;
  
  const cartsKey = getUserStorageKey('fittech_carts', userEmail);
  const carts = getFromStorage(cartsKey) || [];
  let activeCart = carts.find(c => c.is_active);
  
  if (!activeCart) {
    const newCart = {
      id: generateId('cartId'),
      is_active: true,
      items: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    carts.push(newCart);
    saveToStorage(cartsKey, carts);
    return newCart;
  }
  
  return activeCart;
};

const addItemToCart = (cartId, itemData, userEmail) => {
  if (!userEmail) return false;
  
  const cartsKey = getUserStorageKey('fittech_carts', userEmail);
  const carts = getFromStorage(cartsKey) || [];
  const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));
  
  if (cartIndex === -1) return false;
  
  const cart = carts[cartIndex];
  
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(item => 
    item.product_id === itemData.product_id && 
    item.variant_id === itemData.variant_id
  );
  
  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += itemData.quantity;
  } else {
    // Add new item
    const newItem = {
      id: generateId('cartItemId'),
      ...itemData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    cart.items.push(newItem);
  }
  
  cart.updated_at = new Date().toISOString();
  saveToStorage(cartsKey, carts);
  return true;
};



const RelatedProducts = () => {
  const { userEmail, isLoggedIn } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [displayCount, setDisplayCount] = useState(4);
  const [hasMore, setHasMore] = useState(false);


  useEffect(() => {
    if (userEmail) {
      // Initialize data on component mount
      initializeMockData(userEmail);
      fetchRecommendations();
    } else {
      setLoading(false);
    }
  }, [userEmail, isLoggedIn]);




  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userEmail) {
        setRecommendations([]);
        setHasMore(false);
        return;
      }
      
      // Get recommendations from localStorage
      const recommendationsKey = getUserStorageKey('fittech_recommended', userEmail);
      const allRecommendations = getFromStorage(recommendationsKey) || [];
      
      // Ensure data is always an array
      const recommendationsArray = Array.isArray(allRecommendations) ? allRecommendations : [];
      
      setRecommendations(recommendationsArray);
      setHasMore(recommendationsArray.length > displayCount);
    } catch (err) {
      setError(err.message || 'Failed to load recommendations');
      setRecommendations([]); // Set empty array on error
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };



  const handleAddToCart = async (recommendation) => {
    try {
      setAddingToCart(prev => ({ ...prev, [recommendation.id]: true }));
      
      if (!userEmail) {
        throw new Error('User not authenticated');
      }
      
      // Get or create cart using localStorage
      const cart = getOrCreateCart(userEmail);
      
      // Add item to cart using localStorage
      const itemData = {
        product_id: recommendation.product_id,
        variant_id: recommendation.variant_id,
        quantity: 1
      };

      const success = addItemToCart(cart.id, itemData, userEmail);
      
      if (success) {
        // Show success feedback (you might want to add a toast notification here)
        console.log('Product added to cart successfully');
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (err) {
      setError(err.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [recommendation.id]: false }));
    }
  };

  const handleSeeMore = () => {
    const newDisplayCount = displayCount + 4;
    setDisplayCount(newDisplayCount);
    setHasMore(recommendations.length > newDisplayCount);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getVariantDisplay = (recommendation) => {
    const parts = [];
    if (recommendation.variant_color) parts.push(recommendation.variant_color);
    if (recommendation.variant_size) parts.push(recommendation.variant_size);
    return parts.join(' / ') || 'Standard';
  };

  const getProductImage = (recommendation) => {
    // For now using placeholder images, you might want to add image URLs to your database
    const imageUrls = [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1562158070-57b2d2533a79?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&h=400&fit=crop'
    ];
    
    // Use product_id to consistently get the same image for the same product
    return imageUrls[recommendation.product_id % imageUrls.length];
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommended for you</h2>
          <div className="mt-6 flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommended for you</h2>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={fetchRecommendations}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt for non-authenticated users
  if (!isLoggedIn) {
    return (
      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommended for you</h2>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">Sign in to see personalized recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (recommendations.length === 0) {
    return (
      <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommended for you</h2>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">No recommendations available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  const displayedRecommendations = recommendations.slice(0, displayCount);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Recommended for you</h2>
        
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {displayedRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-muted group-hover:opacity-75 lg:h-80">
                <img
                  src={getProductImage(recommendation)}
                  alt={recommendation.product_name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-background rounded-full shadow-md hover:bg-muted transition-colors">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex-1">
                  <h3 className="text-sm text-foreground font-medium line-clamp-2">
                    {recommendation.product_name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getVariantDisplay(recommendation)}
                  </p>
                  
                  {/* Rating stars */}
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">(4.0)</span>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <p className="text-sm font-medium text-foreground">
                    {formatPrice(recommendation.product_price)}
                  </p>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(recommendation)}
                    disabled={addingToCart[recommendation.id]}
                    className="mt-2 flex items-center justify-center w-full px-3 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {addingToCart[recommendation.id] ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Recommendation reason */}
              {recommendation.reason && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Why this:</span> {recommendation.reason}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* See More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSeeMore}
              className="px-6 py-3 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
            >
              See More Recommendations
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default RelatedProducts;


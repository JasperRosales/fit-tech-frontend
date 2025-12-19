// Cart Page - Using Enhanced Cloth Store Services
// ===============================================

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  Truck,
  Shield,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Gift
} from "lucide-react";

// Import enhanced cloth store services
import { 
  setCurrentUser,
  getUserCartWithDetails,
  updateCartItemQuantity,
  removeItemFromCart,
  createOrderFromCart,
  initializeMockData,
  setUserForCart,
  setUserForOrders,
  getAllProducts // Used for enriching if needed, but service handles it
} from '../../services/mock/index';

const Cart = () => {
  // Initialize user context - In real app, this would come from auth
  const [currentUser, setCurrentUserState] = useState(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  
  // Checkout/Promo states
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  // Initialize user context and data
  useEffect(() => {
    const initializeUserContext = async () => {
      try {
        setLoading(true);
        // Initialize mock data
        initializeMockData();
        
        // Use userEmail from localStorage if available, otherwise use demo
        const storedEmail = localStorage.getItem('userEmail');
        const email = storedEmail || 'demo@clothstore.com';
        
        setCurrentUser(email);
        setCurrentUserState(email);
        
        // Set user context for services
        setUserForCart(email);
        setUserForOrders(email);
        
        // Initial fetch
        await fetchCart();
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    initializeUserContext();
  }, []);


  // Fetch cart data
  const fetchCart = useCallback(async () => {
    try {
      // Get cart with full product details
      const cartData = getUserCartWithDetails();
      
      // Ensure we get the items array from the cart object
      const items = Array.isArray(cartData.items) ? cartData.items : [];
      setCartItems(items);
      
      // We need the cart ID for some operations - in the mock service, 
      // we can get it from the first item if available, or fetch the cart object directly
      // For simplicity here, we'll assume there's an active cart if there are items
      if (items.length > 0) {
        setCartId(items[0].cart_id);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart items');
      // Set empty cart on error
      setCartItems([]);
    }
  }, []);

  // Calculate totals whenever cart items or promo changes
  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = cartItems.reduce((sum, item) => {
        // Handle cases where product details might be missing
        const price = item.product?.price || 0;
        const discount = item.product?.discount || 0;
        const finalPrice = price - discount;
        return sum + (finalPrice * item.quantity);
      }, 0);
      
      setTotalAmount(subtotal);
      
      // Calculate additional promo discount
      let promoDiscount = 0;
      if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
          promoDiscount = subtotal * (appliedPromo.value / 100);
        } else {
          promoDiscount = appliedPromo.value;
        }
      }
      
      setDiscountAmount(promoDiscount);
    };

    calculateTotals();
  }, [cartItems, appliedPromo]);

  // Handle quantity update
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(true);
      // Use the enhanced service to update quantity
      // Note: The service expects productId, but here we might have cartItemId
      // Depending on the service implementation, we might need to adjust
      // Assuming updateCartItemQuantity takes product ID for the user's active cart
      
      // Find the item to get product ID
      const item = cartItems.find(i => i.id === itemId);
      if (!item) return;

      const updated = updateCartItemQuantity(item.product_id, newQuantity);
      
      if (updated) {
        await fetchCart();
      } else {
        setError('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      
      // Find the item to get product ID
      const item = cartItems.find(i => i.id === itemId);
      if (!item) return;

      const removed = removeItemFromCart(item.product_id, item.variant_id);
      
      if (removed) {
        await fetchCart();
      } else {
        setError('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    
    // Simple mock promo logic
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', type: 'percentage', value: 10 });
      setError(null);
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setAppliedPromo({ code: 'SAVE20', type: 'fixed', value: 20 });
      setError(null);
    } else {
      setAppliedPromo(null);
      setError('Invalid promo code');
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!cartItems.length || !currentUser) return;
    
    try {
      setUpdating(true);
      
      const orderData = {
        total_amount: totalAmount - discountAmount,
        discount_amount: discountAmount,
        promo_code: appliedPromo?.code,
        shipping_method: 'standard',
        payment_method: 'credit_card'
      };
      
      const order = createOrderFromCart(orderData);
      
      if (order) {
        alert(`Order placed successfully! Order ID: ${order.id}`);
        // Reset state
        setCartItems([]);
        setAppliedPromo(null);
        setPromoCode("");
        // Redirect or show success (in real app)
        // For now, just refresh to show empty cart
        await fetchCart();
      } else {
        setError('Failed to process checkout');
      }
      
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to process checkout');
    } finally {
      setUpdating(false);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderCartItem = (item) => {
    const product = item.product || {};
    const finalPrice = (product.price || 0) - (product.discount || 0);

    return (
      <Card key={item.id} className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
              <img 
                src={product.images?.[0]?.url || '/api/placeholder/80/80'} 
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/api/placeholder/80/80'; }} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1 truncate">{product.name || "Product Name"}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">₱{finalPrice.toLocaleString()}</span>
                {item.variant_id && (
                  <Badge variant="outline" className="text-xs">
                    Variant: {item.variant_id}
                  </Badge>
                )}
                {product.discount > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₱{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={updating || item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={updating}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-semibold">
                    ₱{(finalPrice * item.quantity).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={updating}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shopping Cart</h2>
          <p className="text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => fetchCart()}
            disabled={updating}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
            Refresh Cart
          </Button>
          
          {cartItems.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/user/products'}>
              Continue Shopping
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add some products to get started
            </p>
            <Button onClick={() => window.location.href = '/user/products'}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {currentItems.map(renderCartItem)}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Gift className="h-4 w-4" />
                      <span>Promo applied: {appliedPromo.code}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₱{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₱{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₱{(totalAmount - discountAmount).toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={updating}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {updating ? 'Processing...' : 'Checkout'}
                </Button>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


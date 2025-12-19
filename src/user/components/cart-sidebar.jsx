import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2,
  Loader2 
} from 'lucide-react';
import { cartService } from '../../../services/cartService';
import { useAuth } from '../../../hooks/use-auth';
import { useModal } from '../../../lib/modal-context';

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  onCartUpdate 
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  
  const { userId, isLoggedIn } = useAuth();
  const { showSuccess, showError } = useModal();

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!isLoggedIn) return;
    
    setLoading(true);
    try {
      const response = await cartService.getAll();
      let cart = response.data?.[0];
      
      if (!cart) {
        // Create new cart if none exists
        const newCartResponse = await cartService.create({ user_id: userId });
        cart = newCartResponse.data;
      }
      
      if (cart) {
        const cartDetailsResponse = await cartService.getById(cart.id);
        const items = cartDetailsResponse.data?.items || [];
        setCartItems(items);
        
        // Calculate total
        const total = items.reduce((sum, item) => {
          const price = item.product?.price || 0;
          return sum + (price * item.quantity);
        }, 0);
        setCartTotal(total);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      showError('Error', 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      await cartService.updateItem(itemId, { quantity: newQuantity });
      await fetchCartItems();
      onCartUpdate?.();
      showSuccess('Updated', 'Cart item quantity updated');
    } catch (error) {
      console.error('Error updating item:', error);
      showError('Error', 'Failed to update item quantity');
    } finally {
      setUpdating(false);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    setUpdating(true);
    try {
      await cartService.removeItem(itemId);
      await fetchCartItems();
      onCartUpdate?.();
      showSuccess('Removed', 'Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      showError('Error', 'Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showError('Empty Cart', 'Your cart is empty');
      return;
    }
    
    showInfo('Checkout', 'Checkout functionality will be implemented');
  };

  // Load cart when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen, isLoggedIn]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-card-foreground">
                Shopping Cart
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 border border-border rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product?.images?.[0]?.image_url || '/api/placeholder/80/80'}
                        alt={item.product?.name || 'Product'}
                        className="w-16 h-16 rounded-lg object-cover bg-muted"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-card-foreground truncate">
                        {item.product?.name || 'Product Name'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₱{(item.product?.price || 0).toLocaleString()}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                      disabled={updating}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-card-foreground">
                  Total
                </span>
                <span className="text-lg font-bold text-card-foreground">
                  ₱{cartTotal.toLocaleString()}
                </span>
              </div>


              {/* Checkout Button */}
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={updating}
              >
                {updating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;

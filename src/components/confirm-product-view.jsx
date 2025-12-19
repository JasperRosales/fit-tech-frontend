import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";

const ConfirmProductView = ({ 
  product, 
  onConfirm, 
  onCancel, 
  isOpen 
}) => {
  if (!isOpen || !product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg max-w-md w-full shadow-lg transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">
              View Product Details
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex gap-4 mb-6">
            {/* Product Image Preview */}
            <div className="flex-shrink-0">
              <img
                src={product.images?.[0]?.image_url || '/api/placeholder/80/80'}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover bg-muted"
              />
            </div>
            

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-card-foreground truncate" title={product.name}>
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  ₱{product.price.toLocaleString()}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-xs text-muted-foreground line-through">
                    ₱{product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
          </div>

          {/* Confirmation Message */}
          <p className="text-sm text-muted-foreground mb-6">
            Do you want to view detailed information about this product?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onConfirm(product)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmProductView;







import PropTypes from 'prop-types';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductCard({ 
    id, 
    name, 
    price, 
    originalPrice, 
    image, 
    category = "General",
    isOnSale = false,
    onFavoriteToggle,
    isFavorite = false,
    onViewDetails,
    onAddToCart,
    product = null // Full product data for modal
}) {
    // Calculate discount percentage if originalPrice is provided
    const discountPercentage = isOnSale && originalPrice 
        ? Math.round(((originalPrice - price) / originalPrice) * 100) 
        : 0;

    return (
        <div className="bg-card rounded-lg border border-border shadow-sm">
            {/* Image Container */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-muted relative">
                <img 
                    className="h-full w-full object-cover object-center"
                    src={image}
                    alt={name} 
                    loading="lazy"
                />
                
                {/* Discount Badge */}
                {isOnSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Favorite Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle && onFavoriteToggle(e);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                        isFavorite 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500'
                    }`}
                    aria-label="Toggle favorite"
                >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Category */}
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {category}
                </span>

                {/* Product Name */}
                <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight" title={name}>
                    {name}
                </h3>

                {/* Price */}
                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold text-foreground">
                            ₱{price.toLocaleString()}
                        </p>
                        {isOnSale && originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                                ₱{originalPrice.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    {onViewDetails && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails && onViewDetails(product);
                            }}
                            className="flex-1 text-xs"
                        >
                            View
                        </Button>
                    )}
                    {onAddToCart && (
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart && onAddToCart(product);
                            }}
                            className="flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                        >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    isOnSale: PropTypes.bool,
    onFavoriteToggle: PropTypes.func,
    isFavorite: PropTypes.bool,
    onViewDetails: PropTypes.func,
    product: PropTypes.object
};


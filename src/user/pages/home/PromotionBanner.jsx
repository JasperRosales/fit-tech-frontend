import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { promotionService } from '@/services/promotionService';

const PromotionBanner = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionService.getRecommended();
        if (response.data && response.data.length > 0) {
          // Filter for active promotions (not expired)
          const now = new Date();
          const activePromotions = response.data.filter(promo => {
            const endDate = new Date(promo.end_date);
            return endDate > now;
          });
          
          if (activePromotions.length > 0) {
            setPromotions(activePromotions);
            setCurrentPromotionIndex(0);
            setIsBannerVisible(true);
            
            // Auto-cycle through promotions every 6 seconds
            if (activePromotions.length > 1) {
              const timer = setInterval(() => {
                setCurrentPromotionIndex(prevIndex => {
                  const nextIndex = (prevIndex + 1) % activePromotions.length;
                  return nextIndex;
                });
              }, 6000);
              setAutoCloseTimer(timer);
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch promotions:', error);
      }
    };

    fetchPromotions();
    
    // Cleanup timer on unmount
    return () => {
      if (autoCloseTimer) {
        clearInterval(autoCloseTimer);
      }
    };
  }, []);

  const dismissBanner = () => {
    setIsBannerVisible(false);
    if (autoCloseTimer) {
      clearInterval(autoCloseTimer);
      setAutoCloseTimer(null);
    }
  };

  // Auto-close banner after 6 seconds of showing the last promotion
  useEffect(() => {
    if (isBannerVisible && promotions.length > 0) {
      const timer = setTimeout(() => {
        dismissBanner();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isBannerVisible, currentPromotionIndex]);

  const formatPromotionText = (promo) => {
    if (promo.discount_percentage) {
      return `${promo.discount_percentage}% OFF on all items!`;
    } else if (promo.discount_amount) {
      return `Save $${promo.discount_amount} on your purchase!`;
    }
    return promo.title || 'Special Offer Available!';
  };

  // Get current promotion
  const currentPromotion = promotions[currentPromotionIndex];

  if (!isBannerVisible || !currentPromotion) {
    return null;
  }

  return (
    <motion.div 
      className="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
      style={{ 
        backgroundColor: 'var(--card)',
        borderBottom: '1px solid var(--border)'
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div aria-hidden="true" className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl">
        <div 
          style={{
            clipPath: "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            background: 'linear-gradient(to right, var(--primary), var(--primary))'
          }} 
          className="aspect-577/310 w-144.25 opacity-20"
        ></div>
      </div>
      <div aria-hidden="true" className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl">
        <div 
          style={{
            clipPath: "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            background: 'linear-gradient(to right, var(--primary), var(--primary))'
          }} 
          className="aspect-577/310 w-144.25 opacity-20"
        ></div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6" style={{ color: 'var(--card-foreground)' }}>

          <strong className="font-semibold" style={{ color: 'var(--primary)' }}>
            {formatPromotionText(currentPromotion)}
          </strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current" style={{ color: 'var(--muted-foreground)' }}>
            <circle r="1" cx="1" cy="1" />
          </svg>
          {currentPromotion.description && (
            <span style={{ color: 'var(--muted-foreground)' }}>
              {currentPromotion.description}
            </span>
          )}
        </p>
        {currentPromotion.code && (
          <motion.button
            className="flex-none rounded-full px-3.5 py-1 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: '1px solid var(--primary)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

          >
            Use Code: {currentPromotion.code} <span aria-hidden="true">&rarr;</span>
          </motion.button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Promotion indicator dots */}
        {promotions.length > 1 && (
          <div className="flex gap-1">
            {promotions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPromotionIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* More visible close button */}
        <button 
          type="button" 
          className="flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ 
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)'
          }}
          onClick={dismissBanner}
        >
          <span>Close</span>
          <svg 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            data-slot="icon" 
            aria-hidden="true" 
            className="size-4" 
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default PromotionBanner;


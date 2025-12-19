import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div 
        className="mx-auto max-w-2xl lg:text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-base/7 font-semibold" style={{ color: 'var(--primary)' }}>Shop Smart</h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance" style={{ color: 'var(--foreground)' }}>
          Everything you need for your perfect wardrobe
        </p>
        <p className="mt-6 text-lg/8" style={{ color: 'var(--muted-foreground)' }}>
          Discover premium fashion with advanced fit technology, personalized recommendations, 
          and seamless shopping experience. From trending styles to timeless classics, 
          find the perfect pieces that match your style and budget.
        </p>
      </motion.div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <motion.div 
            className="relative pl-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <dt className="text-base/7 font-semibold" style={{ color: 'var(--foreground)' }}>
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6" style={{ color: 'var(--primary-foreground)' }}>
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              Smart Reservations
            </dt>
            <dd className="mt-2 text-base/7" style={{ color: 'var(--muted-foreground)' }}>
              Reserve your favorite items before they sell out. Get notified when reserved items are ready for pickup, ensuring you never miss out on your perfect pieces.
            </dd>
          </motion.div>

          <motion.div 
            className="relative pl-16"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <dt className="text-base/7 font-semibold" style={{ color: 'var(--foreground)' }}>
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6" style={{ color: 'var(--primary-foreground)' }}>
                  <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              Real-time Notifications
            </dt>
            <dd className="mt-2 text-base/7" style={{ color: 'var(--muted-foreground)' }}>
              Stay updated with instant notifications about order status, price drops, new arrivals, and exclusive offers. Never miss a deal or update on your fashion journey.
            </dd>
          </motion.div>

          <motion.div 
            className="relative pl-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <dt className="text-base/7 font-semibold" style={{ color: 'var(--foreground)' }}>
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6" style={{ color: 'var(--primary-foreground)' }}>
                  <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              Smart Product Discovery
            </dt>
            <dd className="mt-2 text-base/7" style={{ color: 'var(--muted-foreground)' }}>
              Explore our vast catalog with system recommendations, advanced filtering, and personalized suggestions.
            </dd>
          </motion.div>

          <motion.div 
            className="relative pl-16"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <dt className="text-base/7 font-semibold" style={{ color: 'var(--foreground)' }}>
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--primary)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6" style={{ color: 'var(--primary-foreground)' }}>
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h3.75a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 5.25v6.75M7.5 14.25 5.106 5.272A6.106 6.106 0 0 1 6.75 3h2.25M15.75 14.25h3.75a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H15a2.25 2.25 0 0 0-2.25 2.25v6.75m0 0L3.375 7.5m0 0h3.75M3.375 7.5l-1.5 1.5L3.375 7.5m0-1.5h3.75M9 10.5h.008v.008H9V10.5Zm0 2.25h.008v.008H9V12.75Zm2.25-2.25h.008v.008H11.25V12.75Zm0 2.25h.008v.008H11.25V15Zm2.25-2.25h.008v.008H13.5V12.75Zm0 2.25h.008v.008H13.5V15Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              Intelligent Cart Management
            </dt>
            <dd className="mt-2 text-base/7" style={{ color: 'var(--muted-foreground)' }}>
              Effortlessly manage your shopping cart with saved items, quantity updates, and smart suggestions. Get price alerts and stock updates for items in your cart.
            </dd>
          </motion.div>
        </dl>
      </div>
    </div>
  );
};

export default FeaturesSection;


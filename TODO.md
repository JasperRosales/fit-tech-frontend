# Data Reorganization TODO

## Progress: ✅ STEP 1 COMPLETED - Data Structure Created

### ✅ Completed Tasks

1. **Created new folder structure**
   - ✅ `/src/data/` directory created
   - ✅ `/src/data/mock/` subdirectory created  
   - ✅ `/src/data/localStorage/` subdirectory created
   - ✅ `/src/data/localStorage/operations/` subdirectory created

2. **Moved and reorganized mock data**
   - ✅ Moved `clothStoreData.js` → `/src/data/mock/fashionData.js` (updated with 10 products)
   - ✅ Moved `completeMockData.js` → `/src/data/mock/completeMockData.js`
   - ✅ Created `/src/data/mock/index.js` to export all mock data

3. **Moved localStorage services**
   - ✅ Moved `enhancedLocalStorageService.js` → `/src/data/localStorage/`
   - ✅ Moved `localStorageService.js` → `/src/data/localStorage/`
   - ✅ Moved operations folder → `/src/data/localStorage/operations/`
   - ✅ Created `/src/data/localStorage/index.js` to export all localStorage services

4. **Created main data index**
   - ✅ Created `/src/data/index.js` to export everything
   - ✅ Maintains backward compatibility structure

### 🔄 Next Steps - Update Imports

5. **Update service imports**
   - [ ] Update `src/services/productService.js` imports
   - [ ] Update `src/services/cartService.js` imports  
   - [ ] Update `src/services/favoriteService.js` imports
   - [ ] Update `src/services/categoryService.js` imports
   - [ ] Update `src/services/orderService.js` imports

6. **Update component imports**
   - [ ] Update user components in `/src/user/components/`
   - [ ] Update admin components that use mock data
   - [ ] Update staff components if needed

7. **Update other service files**
   - [ ] Check all files in `/src/services/` for mock data imports
   - [ ] Update any hardcoded paths

### 🧪 Testing & Cleanup

8. **Test functionality**
   - [ ] Test product display
   - [ ] Test cart functionality  
   - [ ] Test favorites functionality
   - [ ] Test category navigation
   - [ ] Test order flow

9. **Cleanup old files**
   - [ ] Remove `/src/services/mock/` directory (after testing)
   - [ ] Verify no broken imports remain

### 📊 Current Data Summary

**Fashion Store Data (`/src/data/mock/fashionData.js`):**
- Categories: 7 (Tops, Bottoms, Dresses, Outerwear, Streetwear, Formal Wear, Casual)
- Products: 10 clothing items with variants, images, and stock

**Complete Mock Data (`/src/data/mock/completeMockData.js`):**
- 2 comprehensive products with full backend schema
- Users, orders, carts, favorites, promotions data
- All related entities for full e-commerce simulation

**localStorage Services (`/src/data/localStorage/`):**
- Enhanced storage service with user management
- Operations for products, cart, favorites, categories, orders
- All CRUD operations for fashion store functionality

### 🎯 Expected Outcome

Clean, organized data layer with:
- Centralized mock data in `/src/data/mock/`
- Dedicated localStorage services in `/src/data/localStorage/`
- Simple import structure via `/src/data/index.js`
- Better separation of concerns
- Easier maintenance and scalability

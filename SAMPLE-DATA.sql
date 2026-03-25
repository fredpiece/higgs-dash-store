-- ===============================================
-- ClawBuddy Sample Products for Testing
-- Copy and paste into Supabase SQL Editor
-- ===============================================

-- Clear existing data (optional, be careful!)
-- DELETE FROM products;

-- ===============================================
-- SNEAKERS
-- ===============================================

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Air Jordan 1 Retro High Chicago',
  'Authentic Nike Air Jordan 1 Retro High Chicago. One of the most iconic sneakers ever made. This is a new pair in original box with all tags attached. Perfect for collectors or sneaker enthusiasts.',
  'sneakers',
  180.00,
  180.00,
  'new',
  5,
  4.9,
  42,
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
  'AJ1-CHICAGO-001',
  jsonb_build_object(
    'Brand', 'Nike',
    'Model', 'Air Jordan 1 Retro High OG',
    'Colorway', 'Chicago Black/Red/White',
    'Size', 'US 10.5',
    'Year', '2015 Release',
    'Condition', 'New (BNIB)',
    'Style Code', '555088-023'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Nike Dunk Low SB Supreme',
  'Deadstock Nike SB Dunk Low in Supreme collaboration colorway. Excellent investment piece for serious collectors.',
  'sneakers',
  95.00,
  120.00,
  'good',
  3,
  4.4,
  18,
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
  'DUNK-SB-SUPREME-001',
  jsonb_build_object(
    'Brand', 'Nike',
    'Model', 'SB Dunk Low',
    'Colorway', 'Supreme Black/White',
    'Size', 'US 9',
    'Condition', 'Good (Light Wear)'
  ),
  false
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Nike Air Max 90 Black White',
  'Clean Air Max 90 in classic colorway. Great condition, lightly worn, all original. Perfect for casual wear or collection.',
  'sneakers',
  120.00,
  140.00,
  'like_new',
  7,
  4.7,
  35,
  ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
  'AIRMAX90-BW-001',
  jsonb_build_object(
    'Brand', 'Nike',
    'Model', 'Air Max 90',
    'Size', 'US 11',
    'Condition', 'Like New (Minimal Wear)'
  ),
  true
);

-- ===============================================
-- POKEMON CARDS
-- ===============================================

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Charizard 1st Edition Holographic PSA 9',
  'Iconic 1st Edition Charizard from Base Set. PSA graded 9 (Mint). This is one of the most sought-after cards in the Pokémon TCG. Perfect for serious collectors.',
  'cards',
  450.00,
  500.00,
  'new',
  1,
  4.8,
  28,
  ARRAY['https://images.unsplash.com/photo-1609708536965-52e2d1841abd?w=500'],
  'POKEMON-CHARIZARD-001',
  jsonb_build_object(
    'Card', 'Charizard Base Set #4',
    'Edition', '1st Edition',
    'Grading', 'PSA 9 (Mint)',
    'Year', '1999',
    'Rarity', 'Holographic'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Blastoise Base Set Holographic',
  'Base Set Blastoise holographic card in mint condition. One of the Big Three from Base Set. Excellent investment.',
  'cards',
  380.00,
  420.00,
  'like_new',
  2,
  4.7,
  22,
  ARRAY['https://images.unsplash.com/photo-1609708536965-52e2d1841abd?w=500'],
  'POKEMON-BLASTOISE-001',
  jsonb_build_object(
    'Card', 'Blastoise Base Set #2',
    'Edition', '1st Edition',
    'Condition', 'Mint',
    'Year', '1999'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Venusaur Base Set Holographic',
  'Base Set Venusaur holographic. Part of the classic Big Three set. Good investment potential.',
  'cards',
  320.00,
  350.00,
  'good',
  1,
  4.5,
  15,
  ARRAY['https://images.unsplash.com/photo-1609708536965-52e2d1841abd?w=500'],
  'POKEMON-VENUSAUR-001',
  jsonb_build_object(
    'Card', 'Venusaur Base Set #3',
    'Edition', '1st Edition',
    'Condition', 'Good'
  ),
  false
);

-- ===============================================
-- VINTAGE TECH
-- ===============================================

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Nintendo Game Boy Original Gray',
  'Fully functional Nintendo Game Boy in good working condition. Comes with protective carrying case and 2 classic games. Minor cosmetic wear, all electronics work perfectly.',
  'tech',
  95.00,
  110.00,
  'good',
  2,
  4.4,
  15,
  ARRAY['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'],
  'GAMEBOY-GRAY-001',
  jsonb_build_object(
    'Device', 'Nintendo Game Boy',
    'Generation', 'Original (DMG-01)',
    'Color', 'Gray',
    'Year', '1989',
    'Condition', 'Good (Working, Light Wear)',
    'Includes', 'Game Boy, Case, 2x Games'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Apple iPod Classic 160GB',
  'Iconic iPod Classic 160GB. Still works great. Holds entire music library. Comes with original cables. For nostalgic music lovers and vintage tech collectors.',
  'tech',
  120.00,
  150.00,
  'like_new',
  1,
  4.6,
  12,
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
  'IPOD-CLASSIC-160GB-001',
  jsonb_build_object(
    'Device', 'Apple iPod Classic',
    'Storage', '160GB',
    'Color', 'Black',
    'Year', '2007',
    'Condition', 'Like New',
    'Includes', 'iPod, Charger, USB Cable'
  ),
  false
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Sega Genesis Model 1',
  'Classic Sega Genesis in working condition. Includes 2 controllers and AV cables. Perfect for retro gaming enthusiasts.',
  'tech',
  85.00,
  100.00,
  'fair',
  1,
  4.2,
  8,
  ARRAY['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500'],
  'SEGA-GENESIS-001',
  jsonb_build_object(
    'Device', 'Sega Genesis',
    'Model', 'Model 1',
    'Color', 'Black',
    'Year', '1989',
    'Condition', 'Fair (Working, Cosmetic Wear)',
    'Includes', 'Console, 2x Controllers, Cables'
  ),
  false
);

-- ===============================================
-- APPAREL
-- ===============================================

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Vintage Champion Reverse Weave Hoodie Navy',
  'Classic vintage Champion Reverse Weave hoodie. Authentic 1990s piece. Comfortable, durable construction. Some light fading consistent with age.',
  'apparel',
  35.00,
  50.00,
  'good',
  4,
  4.9,
  8,
  ARRAY['https://images.unsplash.com/photo-1556821552-107b0c5e0c4e?w=500'],
  'CHAMPION-HOODIE-NAVY-001',
  jsonb_build_object(
    'Brand', 'Champion',
    'Type', 'Reverse Weave Hoodie',
    'Color', 'Navy Blue',
    'Size', 'Large',
    'Year', '1990s',
    'Condition', 'Good (Light Wear)'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Vintage Nike Windbreaker 90s',
  'Classic 90s Nike windbreaker. Perfect retro piece. Great condition for age. Authentic vintage.',
  'apparel',
  42.00,
  65.00,
  'good',
  2,
  4.6,
  10,
  ARRAY['https://images.unsplash.com/photo-1556821552-107b0c5e0c4e?w=500'],
  'NIKE-WINDBREAKER-90S-001',
  jsonb_build_object(
    'Brand', 'Nike',
    'Type', 'Windbreaker',
    'Color', 'Black/Blue',
    'Size', 'Medium',
    'Year', '1990s',
    'Condition', 'Good'
  ),
  false
);

-- ===============================================
-- HATS
-- ===============================================

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Vintage MLB New York Yankees Cap',
  'Authentic vintage Yankees cap from the 90s. Classic embroidered logo. Great for collectors or Yankees fans.',
  'hats',
  28.00,
  40.00,
  'good',
  3,
  4.7,
  6,
  ARRAY['https://images.unsplash.com/photo-1588195538326-c5b1e6f3b2a2?w=500'],
  'YANKEES-CAP-VINTAGE-001',
  jsonb_build_object(
    'Brand', 'MLB',
    'Team', 'New York Yankees',
    'Year', '1990s',
    'Condition', 'Good',
    'Style', 'Baseball Cap'
  ),
  true
);

INSERT INTO products (name, description, category, price, original_price, condition, stock, rating, reviews_count, images, sku, specifications, featured)
VALUES (
  'Stüssy Snapback Hat Black',
  'Classic Stüssy snapback. Iconic streetwear brand. Great condition. Perfect for collectors.',
  'hats',
  22.00,
  35.00,
  'like_new',
  5,
  4.8,
  7,
  ARRAY['https://images.unsplash.com/photo-1588195538326-c5b1e6f3b2a2?w=500'],
  'STUSSY-SNAPBACK-BLACK-001',
  jsonb_build_object(
    'Brand', 'Stüssy',
    'Type', 'Snapback',
    'Color', 'Black',
    'Condition', 'Like New',
    'Style', 'Vintage Streetwear'
  ),
  false
);

-- ===============================================
-- Add More Products As Needed
-- ===============================================

-- To add more products, copy the INSERT statement and modify:
-- 1. name - Product name
-- 2. description - Product description
-- 3. category - sneakers | cards | tech | apparel | hats
-- 4. price - Current selling price
-- 5. original_price - Original retail price
-- 6. condition - new | like_new | good | fair
-- 7. stock - Available quantity
-- 8. rating - 0-5 stars
-- 9. reviews_count - Number of reviews
-- 10. images - Array of image URLs
-- 11. sku - Unique product ID
-- 12. specifications - JSON object with specs
-- 13. featured - true | false (shows on homepage)

-- ===============================================
-- Verify Data Was Inserted
-- ===============================================

-- Run this to see all products:
-- SELECT id, name, category, price, condition, stock, featured
-- FROM products
-- ORDER BY created_at DESC;

-- ===============================================
-- Update Product Ratings (Optional)
-- ===============================================

-- To update a product rating:
-- UPDATE products
-- SET rating = 4.5, reviews_count = 50
-- WHERE name = 'Air Jordan 1 Retro High Chicago';

-- ===============================================
-- Delete Products (Optional)
-- ===============================================

-- To delete a product:
-- DELETE FROM products WHERE id = 'uuid-here';

-- ===============================================
-- Notes
-- ===============================================

-- 1. Update image URLs with real product images
--    - Host on Supabase Storage
--    - Or use your own image CDN
--    - Or use Unsplash/Pexels for testing

-- 2. Update prices based on your inventory

-- 3. Stock values:
--    - Set to 0 for sold out items
--    - Update after each sale

-- 4. Rating system:
--    - 0-5 decimal (e.g., 4.7)
--    - Update as customers leave reviews

-- 5. Condition values:
--    - "new" - Never used, original packaging
--    - "like_new" - Used briefly, minimal wear
--    - "good" - Normal wear, fully functional
--    - "fair" - Obvious wear, fully functional

-- 6. Featured products:
--    - Show on homepage
--    - Limit to 4-6 products
--    - Update seasonally

-- ===============================================
-- Export/Backup Data
-- ===============================================

-- To backup: SELECT * FROM products;
-- To restore: Use the INSERT statements above
-- To migrate: Download CSV from Supabase, upload elsewhere

-- ===============================================
-- Performance Tips
-- ===============================================

-- 1. Images should be optimized (<500KB)
-- 2. Use JPG for photos, PNG for graphics
-- 3. Consider thumbnail generation
-- 4. Cache images in CDN
-- 5. Use lazy loading in components

-- Happy selling! 🦑💰

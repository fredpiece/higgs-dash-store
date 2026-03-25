# ClawBuddy Store - Setup & Installation Guide

## Project Overview

ClawBuddy is a production-ready ecommerce platform built with Next.js 13+, Tailwind CSS, Supabase, and Stripe. It includes:

- **Homepage** - Hero banner with featured products
- **Shop** - Product grid with advanced filtering (category, condition, price, sort)
- **Product Detail** - Gallery, specs, reviews, ratings
- **Cart** - Item management with quantity controls
- **Checkout** - Address entry, shipping, Stripe payment
- **Admin Dashboard** - Product & order management

## Prerequisites

- Node.js 16+ (recommended 18 LTS)
- npm or yarn
- Supabase account (free tier available)
- Stripe account (free tier available)
- Vercel account (for hosting)

## Installation Steps

### 1. Clone/Download Project

```bash
# Navigate to project directory
cd clawbuddy-store
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Setup Supabase

#### 4.1 Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings > API

#### 4.2 Create Database Tables

Go to SQL Editor in Supabase and run:

```sql
-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  condition TEXT DEFAULT 'good',
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  sku TEXT UNIQUE,
  specifications JSONB,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  customer_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  title TEXT,
  content TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

### 5. Setup Stripe

1. Go to https://stripe.com
2. Create account and navigate to API keys
3. Copy `Publishable Key` (pk_...) and `Secret Key` (sk_...)
4. Add to `.env.local`

For webhook setup:
1. Go to Webhooks in Stripe dashboard
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret (whsec_...) to `.env.local`

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
clawbuddy-store/
├── app/                          # Next.js app router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── shop/
│   │   ├── page.tsx            # Shop/browse page
│   │   └── [id]/page.tsx       # Product detail page
│   ├── cart/
│   │   └── page.tsx            # Shopping cart
│   ├── checkout/
│   │   └── page.tsx            # Checkout process
│   ├── admin/
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── products/page.tsx   # Product management
│   │   ├── orders/page.tsx     # Order management
│   │   └── settings/page.tsx   # Settings
│   └── api/                    # API routes
│       ├── payment/            # Payment endpoints
│       └── webhooks/           # Webhook handlers
├── components/                 # Reusable components
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer
│   ├── ProductCard.tsx        # Product card component
│   ├── FilterPanel.tsx        # Filter sidebar
│   └── Cart/                  # Cart components
├── lib/                       # Utility functions
│   ├── supabase.ts           # Supabase client & queries
│   ├── stripe.ts             # Stripe utilities
│   ├── store.ts              # Zustand cart state
│   └── types.ts              # TypeScript types
├── styles/
│   └── globals.css           # Global styles & Tailwind
├── public/                   # Static assets
├── .env.local.example        # Environment variables template
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
├── postcss.config.js         # PostCSS config
└── tsconfig.json             # TypeScript config
```

## Key Features

### 1. Homepage
- Hero banner with CTA
- Featured products showcase
- Category navigation
- Why Choose Us section
- Newsletter signup

### 2. Shop Page
- Product grid (responsive: 1-4 columns)
- Advanced filtering:
  - Category filter
  - Condition filter (New/Like New/Good/Fair)
  - Price range filter
  - Search functionality
- Sorting options:
  - Newest
  - Price: Low to High
  - Price: High to Low
  - Top Rated
- Pagination (12 items per page)

### 3. Product Detail Page
- Large product image with gallery
- Product specifications
- Customer reviews section
- Related products
- Add to cart with quantity selector
- Shipping & returns info
- Condition badge
- Rating & reviews count

### 4. Shopping Cart
- List of cart items
- Quantity adjustment
- Item removal
- Order summary with:
  - Subtotal
  - Shipping (free over $50)
  - Tax (estimated)
  - Total
- Continue shopping / Clear cart buttons

### 5. Admin Dashboard
- Product management (add/edit/delete)
- Order management (view/update status)
- Sales metrics
- Inventory tracking

## Database Schema

### Products Table
- `id` - UUID primary key
- `name` - Product name
- `description` - Full description
- `category` - sneakers | cards | tech | apparel | hats
- `price` - Current price
- `original_price` - Original/list price
- `condition` - new | like_new | good | fair
- `stock` - Available quantity
- `rating` - Average rating (0-5)
- `reviews_count` - Number of reviews
- `images` - Array of image URLs
- `sku` - Stock keeping unit
- `specifications` - JSON object with specs
- `featured` - Boolean for homepage
- `created_at` / `updated_at` - Timestamps

### Orders Table
- `id` - UUID primary key
- `order_number` - Human-readable order ID
- `customer_name` - Customer name
- `customer_email` - Customer email
- `shipping_address` - JSON address object
- `billing_address` - JSON address object
- `subtotal` - Subtotal before tax/shipping
- `tax` - Calculated tax
- `shipping_cost` - Shipping cost
- `total` - Final total
- `status` - pending | processing | shipped | delivered | cancelled
- `payment_status` - pending | completed | failed
- `tracking_number` - Shipping tracking number
- `created_at` / `shipped_at` / `delivered_at` - Timestamps

## API Endpoints (To Be Implemented)

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status (admin)

### Payments
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project from GitHub
4. Add environment variables
5. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The project is compatible with:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

## Development Tips

### Adding New Products

```typescript
import { supabase } from '@/lib/supabase';

const newProduct = await supabase
  .from('products')
  .insert({
    name: 'Air Jordan 1',
    price: 150,
    category: 'sneakers',
    condition: 'new',
    stock: 5,
    images: ['url1', 'url2'],
  });
```

### Fetching Products with Filters

```typescript
const { products } = await getProducts({
  category: 'sneakers',
  condition: 'new',
  min_price: 100,
  max_price: 200,
  sort: 'price_low',
  page: 1,
  limit: 20,
});
```

### Managing Cart State

```typescript
import { useCart } from '@/lib/store';

const addToCart = useCart((state) => state.addToCart);
const removeFromCart = useCart((state) => state.removeFromCart);
const cart = useCart((state) => state.getCart());

// Add item
addToCart(product, quantity);

// Remove item
removeFromCart(productId);

// Get cart
const { items, total, subtotal } = cart;
```

## Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a1a2e',     // Dark color
      secondary: '#16213e',   // Medium color
      accent: '#e94560',      // Brand red
    },
  },
},
```

### Change Product Categories

Update category options in:
- `components/FilterPanel.tsx`
- `components/Header.tsx`
- `lib/types.ts`

### Add More Product Fields

1. Update `Product` type in `lib/types.ts`
2. Add column to Supabase products table
3. Update product forms in admin panel
4. Update display in product cards/detail

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Supabase connection issues
- Verify URL and keys in `.env.local`
- Check Supabase project is running
- Ensure public anon key is used (not service role)

### Stripe payment fails
- Verify keys are correct (test vs live mode)
- Check webhook endpoint is registered
- Use test card: 4242 4242 4242 4242

### Images not loading
- Verify image URLs are accessible
- Check Supabase storage permissions
- Ensure URLs use HTTPS

## Next Steps

1. ✅ Setup project locally
2. ✅ Configure Supabase database
3. ✅ Add test products
4. ✅ Configure Stripe account
5. ✅ Test checkout flow
6. ✅ Deploy to Vercel
7. ✅ Setup custom domain
8. ✅ Enable production mode

## Support & Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs

---

**Ready to launch? Start with:**
```bash
npm install && npm run dev
```

Visit `http://localhost:3000` to see your store!

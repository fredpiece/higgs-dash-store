# 🦑 ClawBuddy Store - Ecommerce Platform

A production-ready ecommerce website for selling Air Jordans, Pokémon cards, vintage technology, and quality apparel.

**Live Dashboard**: https://agent-control-deck-ten.vercel.app/
**Tech Stack**: Next.js 13+ | TypeScript | Tailwind CSS | Supabase | Stripe | Vercel

---

## 🎯 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.local.example` to `.env.local` and fill in your API keys:
```bash
cp .env.local.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📋 Features

### Customer Facing
✅ **Homepage** - Hero banner, featured products, categories, CTA  
✅ **Shop** - Product grid with filtering (category, condition, price, sort)  
✅ **Product Detail** - Gallery, specs, reviews, ratings, add to cart  
✅ **Cart** - Item management, quantity control, subtotal/tax/shipping  
✅ **Checkout** - Address entry, payment with Stripe, order confirmation  
✅ **Responsive** - Mobile, tablet, desktop optimized  

### Admin Features
✅ **Dashboard** - Sales metrics, order count, revenue  
✅ **Product Management** - Add/edit/delete products, manage inventory  
✅ **Order Management** - View orders, update status, shipping tracking  
✅ **Settings** - Configure store settings and integrations  

---

## 🏗️ Project Structure

```
clawbuddy-store/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── shop/
│   │   ├── page.tsx      # Shop with filters
│   │   └── [id]/page.tsx # Product detail
│   ├── cart/page.tsx      # Shopping cart
│   ├── checkout/page.tsx  # Checkout (address + payment)
│   └── admin/             # Admin dashboard
│       ├── page.tsx       # Dashboard overview
│       ├── products/page.tsx
│       ├── orders/page.tsx
│       └── settings/page.tsx
│
├── components/            # React components
│   ├── Header.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   ├── ProductCard.tsx   # Product listing card
│   ├── FilterPanel.tsx   # Shop filters
│   └── Cart/             # Cart components
│
├── lib/                  # Utilities
│   ├── supabase.ts      # Supabase client & queries
│   ├── stripe.ts        # Stripe utilities
│   ├── store.ts         # Zustand cart state
│   └── types.ts         # TypeScript types
│
├── styles/globals.css    # Tailwind + global styles
├── public/              # Static assets
└── SETUP.md            # Detailed setup guide
```

---

## 🔧 Setup Instructions

### Step 1: Supabase Database

1. Create account at https://supabase.com
2. Create new project
3. Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings > API
4. Go to SQL Editor and run the schema from `SETUP.md`

**Tables Created:**
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Product reviews
- `customers` - Customer info

### Step 2: Stripe Integration

1. Create account at https://stripe.com
2. Go to API Keys section
3. Copy `Publishable Key` (pk_...) and `Secret Key` (sk_...)
4. Add to `.env.local`

**For Webhooks:**
1. Go to Webhooks in Stripe dashboard
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Subscribe to: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret to `.env.local`

### Step 3: Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 4: Add Sample Products

Via Supabase SQL Editor:
```sql
INSERT INTO products (name, price, category, condition, stock, description, images, sku, featured)
VALUES (
  'Air Jordan 1 Chicago',
  180.00,
  'sneakers',
  'new',
  5,
  'Authentic Nike Air Jordan 1 Retro High Chicago. Brand new in box.',
  ARRAY['https://example.com/image1.jpg'],
  'AJ1-CHICAGO-001',
  true
);
```

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a2e',    // Dark
  secondary: '#16213e',  // Medium
  accent: '#e94560',     // Red
}
```

### Update Categories
Edit in multiple files:
- `components/Header.tsx` - Navigation categories
- `components/FilterPanel.tsx` - Filter options
- `lib/types.ts` - Product type

### Add Product Fields
1. Update `Product` type in `lib/types.ts`
2. Add column to Supabase `products` table
3. Update product forms in admin panel

---

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage
- `/shop` - Product listing with filters
- `/shop/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout process

### Admin Pages (Protected)
- `/admin` - Dashboard overview
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/settings` - Store settings

---

## 💳 Testing Stripe

Use these test card numbers:

| Card | Number | CVC | Exp |
|------|--------|-----|-----|
| Visa | 4242 4242 4242 4242 | Any 3 digits | Any future date |
| Mastercard | 5555 5555 5555 4444 | Any 3 digits | Any future date |
| AMEX | 3782 822463 10005 | 4 digits | Any future date |

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project" → Select repository
4. Add environment variables
5. Click "Deploy"

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Environment Variables on Vercel
1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

### Custom Domain
1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## 📊 Database Queries

### Get Featured Products
```typescript
const featured = await getFeaturedProducts(4);
```

### Get Filtered Products
```typescript
const { products, count } = await getProducts({
  category: 'sneakers',
  condition: 'new',
  min_price: 100,
  max_price: 200,
  sort: 'price_low',
  page: 1,
  limit: 20,
});
```

### Create Order
```typescript
const order = await createOrder({
  order_number: 'ORD-123456',
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  shipping_address: { ... },
  subtotal: 150,
  tax: 12,
  shipping_cost: 10,
  total: 172,
  status: 'pending',
  payment_status: 'pending',
});
```

### Get Product Reviews
```typescript
const reviews = await getProductReviews(productId);
```

---

## 🛒 Cart State Management (Zustand)

```typescript
import { useCart } from '@/lib/store';

// Get entire cart
const cart = useCart((state) => state.getCart());

// Add to cart
const addToCart = useCart((state) => state.addToCart);
addToCart(product, quantity);

// Remove from cart
const removeFromCart = useCart((state) => state.removeFromCart);
removeFromCart(productId);

// Update quantity
const updateQuantity = useCart((state) => state.updateQuantity);
updateQuantity(productId, newQuantity);

// Clear cart
const clearCart = useCart((state) => state.clearCart);
clearCart();

// Calculate totals
const calculateTotals = useCart((state) => state.calculateTotals);
calculateTotals('NY'); // Pass state for tax calculation
```

---

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local`
   - Keep secret keys private
   - Use different keys for dev/prod

2. **Database Security**
   - Enable Row Level Security (RLS) on Supabase tables
   - Create policies for user access
   - Validate all inputs server-side

3. **Payment Security**
   - Always process payments server-side
   - Never expose Stripe secret key to frontend
   - Use webhook verification tokens

4. **Admin Access**
   - Implement authentication for admin routes
   - Add role-based access control
   - Log all admin actions

---

## 📈 Performance

- ✅ Optimized images with Next.js `Image` component
- ✅ Code splitting and lazy loading
- ✅ Server-side rendering for SEO
- ✅ Database indexes for fast queries
- ✅ CDN delivery via Vercel

---

## 🐛 Troubleshooting

### Products Not Showing
1. Check Supabase connection in `.env.local`
2. Verify products exist in database
3. Check browser console for errors
4. Restart dev server: `npm run dev`

### Cart Not Persisting
- Cart state is in-memory (lost on page refresh)
- Implement localStorage for persistence:
```typescript
// Add to lib/store.ts
localStorage.setItem('cart', JSON.stringify(state));
```

### Stripe Payment Fails
1. Verify API keys are correct
2. Check webhook endpoint is configured
3. Use test cards from Stripe docs
4. Check browser console for error details

### Images Not Loading
1. Verify image URLs are public/accessible
2. Check Supabase storage permissions
3. Ensure URLs use HTTPS
4. Check `next.config.js` image domains

---

## 📚 Resources

- **Next.js**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs
- **Zustand**: https://zustand-demo.vercel.app/

---

## 📝 License

MIT - Feel free to use for commercial projects

---

## 🤝 Support

For issues or questions:
1. Check `SETUP.md` for detailed setup guide
2. Review `TROUBLESHOOTING` section above
3. Check browser console for error messages
4. Visit official documentation links above

---

## 🎉 Next Steps

1. ✅ Clone/download project
2. ✅ Run `npm install`
3. ✅ Setup Supabase & Stripe accounts
4. ✅ Add environment variables
5. ✅ Run `npm run dev`
6. ✅ Add test products
7. ✅ Test checkout flow
8. ✅ Deploy to Vercel
9. ✅ Setup custom domain
10. ✅ Launch! 🚀

---

**Happy selling! 🦑💰**

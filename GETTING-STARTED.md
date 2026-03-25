# 🚀 Getting Started with ClawBuddy Store

## 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
cd clawbuddy-store
npm install
```

### Step 2: Setup Environment
```bash
cp .env.local.example .env.local
```

Add your API keys to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser! ✨

---

## Full Setup (30 Minutes)

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create new project:
   - Name: `clawbuddy-ecommerce`
   - Password: Generate strong password
   - Region: Choose closest to you
5. Wait for initialization (2-3 minutes)

### 2. Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Create Database Tables

1. Go to **SQL Editor** in Supabase
2. Copy the full SQL schema from `SETUP.md`
3. Paste into SQL editor
4. Click **Run**
5. Wait for tables to be created ✓

### 4. Add Sample Products

1. In Supabase **SQL Editor**
2. Copy content from `SAMPLE-DATA.sql`
3. Paste and run
4. Refresh to see products in database

### 5. Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now"
3. Sign up with email
4. Go to **Developers** → **API Keys**
5. Copy:
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → `STRIPE_SECRET_KEY`

### 6. Setup Environment Variables

Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 7. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

**Test the site:**
- Browse products (/)
- View shop (/shop)
- Click product detail
- Add to cart
- View cart (/cart)
- Checkout (/checkout)
- Check admin (/admin)

---

## Deployment (15 Minutes)

### Option 1: Deploy to Vercel (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial ClawBuddy store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/clawbuddy-store.git
git push -u origin main
```

2. Go to https://vercel.com
3. Click "New Project"
4. Select repository from GitHub
5. In **Environment Variables**, add all from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

6. Click **Deploy**
7. Wait 2-3 minutes
8. Visit your live URL! 🎉

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and select:
- Your GitHub project
- Vercel team
- Project name

---

## First Steps After Deployment

### 1. Update Products
- Go to `/admin/products`
- Add your actual products
- Update images
- Set correct prices

### 2. Configure Store
- Go to `/admin/settings`
- Update store name, email, phone
- Set shipping cost
- Configure tax rates

### 3. Setup Custom Domain
- In Vercel dashboard
- Go to Settings → Domains
- Add your custom domain
- Follow DNS instructions

### 4. Test Payment
- Use Stripe test cards
- Check that orders are created
- Verify emails send

### 5. Monitor Performance
- Check Vercel Analytics
- Monitor Supabase usage
- Check Stripe dashboard

---

## Project Structure Overview

```
clawbuddy-store/
│
├── app/                      # Pages & Routes
│   ├── page.tsx             # Homepage
│   ├── shop/page.tsx        # Shop listing
│   ├── shop/[id]/page.tsx   # Product detail
│   ├── cart/page.tsx        # Shopping cart
│   ├── checkout/page.tsx    # Checkout
│   └── admin/               # Admin dashboard
│
├── components/              # Reusable Components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── FilterPanel.tsx
│
├── lib/                     # Utilities
│   ├── supabase.ts         # Database client
│   ├── stripe.ts           # Payment utils
│   ├── store.ts            # Cart state
│   └── types.ts            # TypeScript types
│
├── styles/
│   └── globals.css         # Tailwind styles
│
├── README.md               # Overview
├── SETUP.md                # Detailed setup
└── SAMPLE-DATA.sql         # Test data
```

---

## Key Files to Know

### Pages You'll Modify
- `app/page.tsx` - Homepage content
- `components/Header.tsx` - Navigation & logo
- `components/Footer.tsx` - Footer links
- `lib/types.ts` - Add custom fields

### Configuration
- `.env.local` - Environment variables (keep secret!)
- `tailwind.config.js` - Colors & theme
- `next.config.js` - Image optimization

### Database
- Run SQL from `SETUP.md` to create tables
- Add products via `SAMPLE-DATA.sql`
- Manage via Supabase dashboard

---

## Common Tasks

### Add a New Product

Via Supabase dashboard:
1. Go to `products` table
2. Click "Insert row"
3. Fill in fields:
   - name
   - price
   - category (sneakers | cards | tech | apparel | hats)
   - condition (new | like_new | good | fair)
   - stock (quantity available)
   - images (array of URLs)
4. Click Save

Or via SQL:
```sql
INSERT INTO products (name, price, category, condition, stock)
VALUES ('Air Jordan 1', 180, 'sneakers', 'new', 5);
```

### Update Product Price
```sql
UPDATE products
SET price = 150
WHERE name = 'Air Jordan 1';
```

### View All Orders
```sql
SELECT * FROM orders
ORDER BY created_at DESC;
```

### Check Product Reviews
```sql
SELECT * FROM reviews
WHERE product_id = 'product-uuid'
ORDER BY created_at DESC;
```

---

## Testing Checklist

- [ ] Homepage loads
- [ ] Shop page shows products
- [ ] Filters work (category, price, condition)
- [ ] Search works
- [ ] Click product opens detail page
- [ ] Add to cart button works
- [ ] Cart shows correct total
- [ ] Can proceed to checkout
- [ ] Enter shipping address
- [ ] Stripe payment loads
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Order confirmation shows
- [ ] Admin dashboard loads
- [ ] Can view products in admin
- [ ] Can view orders in admin

---

## Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a2e',    // Change this
  accent: '#e94560',     // Change this
}
```

### Change Store Name
Edit `app/layout.tsx`:
```typescript
title: 'My Store Name - Description'
```

### Update Logo
Edit `components/Header.tsx`:
```typescript
<span className="text-2xl font-bold">My Logo</span>
```

### Add Categories
Edit `components/FilterPanel.tsx`:
```typescript
const categories = [
  { value: 'new_category', label: 'New Category' },
  // ...
]
```

---

## Troubleshooting

### "Cannot find module" error
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Products not showing
1. Check Supabase connection
2. Verify products exist in database
3. Check browser console for errors

### Images not loading
1. Verify image URLs are accessible
2. Check they use HTTPS
3. Test URL in browser

### Stripe errors
1. Check keys in `.env.local`
2. Verify webhook endpoint
3. Use test cards from Stripe docs

### Cart not working
1. Check browser console
2. Try clearing cache: Ctrl+Shift+Delete
3. Restart dev server

---

## Next Steps

1. **Now**: Get local version running
2. **Today**: Deploy to Vercel
3. **This week**: Add your products
4. **This month**: Launch to public
5. **Later**: Add users & accounts

---

## Resources

- **Docs**: `README.md` & `SETUP.md`
- **Code**: Well-commented components
- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs
- **Tailwind**: https://tailwindcss.com/docs

---

## Need Help?

1. Check the `SETUP.md` file
2. Review code comments
3. Check Supabase error logs
4. Check Stripe dashboard
5. Look at browser console for errors

---

## You're All Set! 🎉

You now have a professional ecommerce store. Time to:

1. ✅ Install dependencies
2. ✅ Setup databases
3. ✅ Add products
4. ✅ Deploy
5. ✅ Launch
6. ✅ Start selling!

**Good luck! Your ClawBuddy store is ready.** 🦑💰

---

**Questions?** Check the detailed guides in `README.md` and `SETUP.md`

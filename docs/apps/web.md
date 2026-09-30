# 🌐 Web Application Documentation (`@quickbasket/web`)

The QuickBasket web client is a modern, high-performance web storefront built on **Next.js 14** using the App Router, styled with **Tailwind CSS**, and architected for edge distribution via **Static Site Generation (SSG)**.

---

## 📂 Directory Structure

```
apps/web/
├── app/
│   ├── (auth)/                         # Authentication route group
│   │   └── login/page.tsx              # Phone OTP login screen
│   ├── (storefront)/                   # Customer shopping route group
│   │   ├── about/                      # About QuickBasket story & SLA
│   │   ├── account/                    # Saved addresses & user profile
│   │   ├── cart/                       # Full page cart & basket breakdown
│   │   ├── category/[slug]/            # Category-filtered catalog view
│   │   ├── checkout/                   # Slot selection & payment checkout
│   │   ├── orders/                     # Order history & live tracking
│   │   │   └── [orderId]/page.tsx      # Real-time order progress timeline
│   │   ├── product/[slug]/             # Product detail with variant picker
│   │   ├── search/                     # Live keyword search & filter
│   │   ├── layout.tsx                  # Shared header, navigation & footer
│   │   └── page.tsx                    # Landing page hero & curated sections
│   ├── admin/                          # Dark store & partner admin portal
│   │   └── page.tsx                    # Vendor metrics & stock management
│   ├── globals.css                     # Tailwind utilities, fonts & animations
│   ├── layout.tsx                      # Root HTML shell & query provider
│   └── not-found.tsx                   # Branded 404 page
├── src/
│   ├── components/                     # Modular React UI components
│   │   ├── account/                    # Delivery address modal & selector
│   │   ├── cart/                       # Slide-over cart drawer & price card
│   │   ├── common/                     # Badges, loaders, buttons & modals
│   │   ├── home/                       # Hero carousel, delivery banners
│   │   ├── layout/                     # Header, location picker, bottom nav
│   │   ├── product/                    # Product card, variant chip, stock pill
│   │   └── providers/                  # QueryClient & store hydration wrapper
│   ├── lib/                            # Web-specific helper functions
│   └── store/                          # Zustand stores (cart, location, UI)
├── next.config.mjs                     # Static export & remote image patterns
├── tailwind.config.ts                  # Web Tailwind configuration
└── wrangler.toml                       # Cloudflare Pages deployment definition
```

---

## 🗺️ Route Matrix

| Route | Route Group | Description |
| :--- | :--- | :--- |
| `/` | `(storefront)` | Homepage featuring 10-min banners, category shortcuts, express flash deals, and partner stores. |
| `/category/[slug]` | `(storefront)` | Filtered catalog by grocery vertical (e.g. `dairy-eggs`, `fresh-produce`, `beverages`). |
| `/product/[slug]` | `(storefront)` | Detailed SKU view with variant selection (pack sizes, units), stock counter, and nutritional tags. |
| `/search` | `(storefront)` | Instant multi-parameter product search across names, brands, categories, and tags. |
| `/cart` | `(storefront)` | Cart review with itemized pricing, delivery threshold indicators, and coupon application. |
| `/checkout` | `(storefront)` | Delivery address selection, delivery slot picker (Instant vs Scheduled), and payment modes (UPI, Cards, COD). |
| `/orders` | `(storefront)` | User order history with past receipts. |
| `/orders/[orderId]` | `(storefront)` | Live tracking screen showing real-time rider assignment, status milestones, and ETA countdown. |
| `/account` | `(storefront)` | Address book management with geolocation support and user preferences. |
| `/login` | `(auth)` | Phone number authentication with simulated 4-digit OTP verification. |
| `/admin` | Root route | Vendor & Dark store administration portal displaying active SKUs, daily order volumes, and SLA metrics. |

---

## ⚡ Static Export Architecture (`output: 'export'`)

The web app is configured for pure static export in [`next.config.mjs`](file:///d:/Project/QuickBasket/apps/web/next.config.mjs):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: [
    '@quickbasket/types',
    '@quickbasket/utils',
    '@quickbasket/validation',
    '@quickbasket/config',
    '@quickbasket/mocks',
    '@quickbasket/api-client',
  ],
};

export default nextConfig;
```

### Benefits of Static Export:
1. **Ultra-Low Cost & Zero Cold Starts**: Generates static HTML/JS/CSS assets inside `apps/web/out/`.
2. **Edge CDN Distribution**: Can be served from any object store or CDN (Cloudflare Pages, AWS S3 + CloudFront, GitHub Pages, or Vercel).
3. **High Security**: Zero server-side code execution vulnerabilities.

---

## 🎨 Design System & Styling

Web styles are driven by the shared Tailwind preset in [`@quickbasket/config`](file:///d:/Project/QuickBasket/packages/config/tailwind/preset.js):
- **Colors**:
  - `basil` (`#1a6b42`): Primary quick-commerce brand green.
  - `leaf` (`#22a855`): Vibrant accent green for express delivery tags & badges.
  - `mango` (`#f0a020`): High-energy accent for sales, offers, and ratings.
  - `ink` (`#0f1a14`): Deep dark green-black for high contrast typography.
  - `surface` (`#ffffff`) & `cream` (`#f5f3ee`): Clean, organic background tones.
- **Typography**: Display typography using Clash Display and Satoshi, paired with Space Grotesk for monetary figures.
- **Micro-Animations**: Shimmer skeletons, sticky bar reveal, bouncy badge pulse, and smooth transitions.

---

## 💻 Running the Web App

From the monorepo root:

```bash
# Start Next.js development server on port 3000
pnpm --filter @quickbasket/web dev

# Build production static export bundle to apps/web/out/
pnpm --filter @quickbasket/web build

# Run TypeScript typechecker
pnpm --filter @quickbasket/web typecheck

# Run ESLint linter
pnpm --filter @quickbasket/web lint
```

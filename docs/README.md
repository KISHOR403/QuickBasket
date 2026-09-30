# 📚 QuickBasket Documentation

Welcome to the **QuickBasket** documentation hub. This directory contains detailed guides, architecture blueprints, API specifications, and operational manuals for developing, testing, and deploying the QuickBasket hyperlocal quick-commerce platform.

---

## 🗂️ Documentation Structure

```
docs/
├── README.md                          # Documentation index (this file)
├── architecture/                      # System design & core infrastructure
│   ├── overview.md                    # High-level architecture & system design
│   ├── monorepo-structure.md          # Turborepo pipeline, pnpm workspace & caching
│   └── state-management.md            # Client state (Zustand) & server cache (React Query)
├── apps/                              # Application-specific documentation
│   ├── web.md                         # Next.js 14 web storefront & static export
│   ├── mobile.md                      # Expo & React Native mobile application
│   └── admin.md                       # Dark store & partner vendor admin portal
├── packages/                          # Shared library packages
│   ├── api-client.md                  # React Query hooks & API abstractions
│   ├── types.md                       # Core TypeScript domain models & schemas
│   ├── mocks.md                       # Synthetic catalog, dark stores & seed data
│   ├── validation.md                  # Zod validation schemas (OTP, addresses, checkout)
│   ├── utils.md                       # Shared currency, ETA & string helper utilities
│   └── config.md                      # Shared Tailwind CSS design tokens & animations
└── development/                       # Developer guides & workflows
    ├── getting-started.md             # Local setup, prerequisites & developer onboarding
    ├── contributing.md                # Git workflow, PR conventions & coding guidelines
    └── deployment.md                  # Cloudflare Pages, Edge deployment & Expo EAS
```

---

## 🧭 Quick Navigation by Role

### 💻 Frontend & Web Engineers
- [Web Storefront Architecture](apps/web.md): Next.js 14 App Router, SSG output, and UI components.
- [Design System & Config](packages/config.md): Custom Tailwind preset, color palette, and micro-animations.
- [Client State Management](architecture/state-management.md): Zustand store patterns for cart and location.

### 📱 Mobile Engineers
- [Mobile App Guide](apps/mobile.md): Expo SDK 51 setup, NativeWind styling, and Expo Router tabs.
- [Shared API Client](packages/api-client.md): Query hooks and data mutations shared with web.

### 🏗️ Platform & DevOps Engineers
- [Monorepo & Turborepo](architecture/monorepo-structure.md): Task dependency graph, cache rules, and pnpm workspaces.
- [CI/CD & Deployment](development/deployment.md): GitHub Actions, Cloudflare Pages static export, and EAS build configs.

### 🧪 Fullstack & Product Engineers
- [System Architecture](architecture/overview.md): End-to-end data flow from dark store to customer doorstep.
- [TypeScript Types](packages/types.md): Universal domain models for products, orders, vendors, and users.
- [Validation Schemas](packages/validation.md): Zod schemas for pincodes, addresses, and checkout.

---

## 🚀 Key Platform Specifications

| Dimension | Specification |
| :--- | :--- |
| **Monorepo Engine** | [Turborepo](https://turbo.build/) v1.13+ with remote/local cache |
| **Package Manager** | [pnpm](https://pnpm.io/) v11.22+ workspace protocol (`workspace:*`) |
| **Node.js Runtime** | Node.js v18.0.0+ (Tested on v20 LTS) |
| **Web Framework** | [Next.js 14](https://nextjs.org/) (App Router, Static Export `output: 'export'`) |
| **Mobile Framework** | [React Native 0.74](https://reactnative.dev/) via [Expo SDK 51](https://expo.dev/) & [Expo Router 3.5](https://docs.expo.dev/router/introduction/) |
| **State Layer** | [Zustand](https://zustand-demo.pmnd.rs/) (Client state) & [TanStack Query v5](https://tanstack.com/query) (Server state) |
| **Validation** | [Zod](https://zod.dev/) v3.23+ with React Hook Form integration |
| **Styling** | [Tailwind CSS v3.4](https://tailwindcss.com/) (Web) + [NativeWind v4](https://www.nativewind.dev/) (Mobile) |
| **Web Hosting** | [Cloudflare Pages](https://pages.cloudflare.com/) / Static Storage via Wrangler |

---

## 💡 Need Help?
- Refer to [Getting Started](development/getting-started.md) to set up your local development environment.
- Review [Contributing Guidelines](development/contributing.md) before opening pull requests.

# 🚀 Getting Started

This guide provides a comprehensive walkthrough for setting up, running, and developing within the QuickBasket monorepo on your local machine.

---

## 📋 System Prerequisites

Before starting, ensure your local development environment meets the following specifications:

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x` LTS). Check with `node -v`.
- **pnpm**: `v8.0.0` or higher (Workspace pinned to `v11.22.0`). Check with `pnpm -v`.
- **Git**: Latest version.
- **Mobile Development (Optional)**:
  - [Expo Go](https://expo.dev/go) on iOS / Android device, OR
  - Android Studio with an Android Emulator, OR
  - Xcode with iOS Simulator (macOS only).

---

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/KISHOR403/QuickBasket.git
cd QuickBasket
```

### 2. Install Workspace Dependencies
QuickBasket uses `pnpm workspaces`. Run the install command at the root:

```bash
pnpm install
```

> [!NOTE]
> Do not use `npm install` or `yarn install`. The repository includes a `pnpm-lock.yaml` file and utilizes `workspace:*` dependency protocols.

### 3. Build Shared Packages
Build internal packages (`@quickbasket/types`, `@quickbasket/utils`, `@quickbasket/validation`, `@quickbasket/mocks`, `@quickbasket/api-client`):

```bash
pnpm build
```

---

## 🏃 Running Applications Locally

### Option A: Run All Apps Concurrently
To launch both the web application and mobile bundler concurrently using Turborepo:

```bash
pnpm dev
```

### Option B: Run Web Storefront Only
To focus solely on the Next.js web application:

```bash
pnpm --filter @quickbasket/web dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.  
To view the admin portal, open [http://localhost:3000/admin](http://localhost:3000/admin).

### Option C: Run Mobile App (Expo)
To launch the Expo development bundler:

```bash
pnpm --filter @quickbasket/mobile start
```
- Press `a` in the terminal to launch the active Android emulator.
- Press `i` to launch the iOS simulator.
- Press `w` to open the mobile interface in your web browser.
- Scan the printed QR code with the Expo Go app on your physical smartphone.

---

## 🧪 Validation & Quality Checks

Run these commands prior to committing your code:

```bash
# Typecheck all packages and apps without emitting JS
pnpm typecheck

# Lint all code with ESLint
pnpm lint

# Clean all build outputs and turbo cache
pnpm clean
```

---

## ❓ Troubleshooting & FAQs

### Issue: "Cannot find module '@quickbasket/types'"
**Solution**: Run `pnpm build` at the root to compile TypeScript definitions in the shared packages before launching your dev server.

### Issue: Port 3000 is already in use
**Solution**: Specify an alternative port:
```bash
pnpm --filter @quickbasket/web dev -- -p 3001
```

### Issue: Turbo cache collision or stale styles
**Solution**: Clear Turbo and Next.js cache directories:
```bash
pnpm clean
pnpm install
pnpm dev
```

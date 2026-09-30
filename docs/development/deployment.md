# 🚢 Deployment Guide

This guide details how to build, package, and deploy QuickBasket's web and mobile applications to production environments.

---

## 🌐 Web Deployment: Cloudflare Pages

The web storefront is configured for static export (`output: 'export'`), producing self-contained HTML/JS/CSS assets inside `apps/web/out/`.

### Configuration ([`apps/web/wrangler.toml`](file:///d:/Project/QuickBasket/apps/web/wrangler.toml))
```toml
name = "quickbasket-web"
compatibility_date = "2024-09-01"

[assets]
directory = "out"
not_found_handling = "single-page-application"
html_handling = "auto-trailing-slash"
```

### Deployment Steps (Wrangler CLI)

1. **Install Wrangler** (if not already installed):
   ```bash
   pnpm add -g wrangler
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Build the Static Assets**:
   ```bash
   pnpm --filter @quickbasket/web build
   ```

4. **Deploy to Cloudflare Pages**:
   ```bash
   cd apps/web
   wrangler pages deploy out --project-name=quickbasket-web
   ```

---

## ⚡ Web Deployment: Vercel (Alternative)

To deploy directly to Vercel:

1. Connect the GitHub repository in the Vercel Dashboard.
2. Select **Next.js** as the Framework Preset.
3. Configure the **Root Directory** as `apps/web`.
4. Configure Build Commands:
   - **Build Command**: `cd ../.. && pnpm build`
   - **Output Directory**: `apps/web/out` (or default `.next` if dynamic server features are activated)
   - **Install Command**: `pnpm install`

---

## 📱 Mobile Deployment: Expo EAS (iOS & Android)

QuickBasket Mobile utilizes **Expo Application Services (EAS)** for building and signing native application binaries.

### 1. Install & Login to EAS CLI
```bash
npm install -g eas-cli
eas login
```

### 2. Configure EAS Project
```bash
cd apps/mobile
eas build:configure
```

### 3. Build Android Binary
```bash
# Build standalone Android APK for testing on physical devices
eas build -p android --profile preview

# Build production Android App Bundle (AAB) for Google Play Store
eas build -p android --profile production
```

### 4. Build iOS Binary
```bash
# Build internal testing iOS IPA
eas build -p ios --profile preview

# Build production App Store IPA
eas build -p ios --profile production
```

---

## 🤖 Continuous Integration (GitHub Actions)

QuickBasket runs automated type-checks and builds on every push to `main` and all pull requests via [`.github/workflows/ci.yml`](file:///d:/Project/QuickBasket/.github/workflows/ci.yml):

- **Node Version**: Node.js 20 LTS
- **Package Manager**: pnpm 11.22.0
- **Turbo Remote Caching**: Enabled via `actions/cache@v4` on `.turbo`
- **Validation**: Executes `pnpm typecheck` and `pnpm build` sequentially

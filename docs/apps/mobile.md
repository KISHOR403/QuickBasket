# 📱 Mobile Application Documentation (`@quickbasket/mobile`)

The QuickBasket mobile client is a native cross-platform application built using **React Native 0.74**, **Expo SDK 51**, and **Expo Router 3.5**. It utilizes **NativeWind v4** for Tailwind CSS utility-first styling on native platforms.

---

## 📂 Directory Structure

```
apps/mobile/
├── app/
│   ├── (tabs)/                         # Bottom tab navigator
│   │   ├── _layout.tsx                 # Tab navigation icons & options
│   │   ├── index.tsx                   # Mobile home screen (categories, products)
│   │   ├── search.tsx                  # Search screen with live filtering
│   │   ├── cart.tsx                    # Cart overview & checkout triggers
│   │   └── account.tsx                 # User profile & delivery address book
│   └── _layout.tsx                     # Root mobile layout & QueryClient provider
├── app.json                            # Expo application configuration
├── babel.config.js                     # Babel configuration with NativeWind preset
├── tailwind.config.js                  # Mobile Tailwind preset configuration
├── tsconfig.json                       # Mobile TypeScript configuration
└── package.json                        # Mobile dependencies & launch scripts
```

---

## 🧭 Navigation & Expo Router Layout

The application utilizes **Expo Router** for file-system-based routing:

### Tab Navigation Structure
The root tab bar is declared in [`apps/mobile/app/(tabs)/_layout.tsx`](file:///d:/Project/QuickBasket/apps/mobile/app/(tabs)/_layout.tsx):

- **Home (`index.tsx`)**:
  - Express 10-minute banner with brand gradient.
  - Horizontal scrollable Category selector with accent badges.
  - Local partner kirana and dark store spotlight cards.
  - Responsive two-column product bestseller grid with quick `ADD` buttons.
- **Search (`search.tsx`)**: Instant SKU search across categories and vendors.
- **Cart (`cart.tsx`)**: Shopping basket review with live total calculation.
- **Account (`account.tsx`)**: User credentials, saved addresses, and active order shortcuts.

---

## 🎨 NativeWind v4 Styling

NativeWind brings Tailwind CSS directly to React Native by compiling utility classes into native styles:

```tsx
<View style={{ backgroundColor: '#0E7C4A', padding: 20, borderRadius: 16 }}>
  <Text style={{ color: '#FF9E2C', fontWeight: '900', fontSize: 12 }}>
    ⚡ 10 MIN EXPRESS DELIVERY
  </Text>
  <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: 22, marginTop: 4 }}>
    Groceries & Local Kirana Favorites
  </Text>
</View>
```

NativeWind inherits theme tokens directly from `@quickbasket/config`, maintaining design consistency across both Web and Mobile form factors.

---

## 🚀 Running the Mobile App Locally

### Prerequisites
1. Install the **Expo Go** application on your physical iOS or Android device, OR
2. Install Android Studio (with an active Android Emulator) or Xcode (with an active iOS Simulator on macOS).

### Start Commands
From the monorepo root:

```bash
# Start the Expo interactive development server with QR code
pnpm --filter @quickbasket/mobile start

# Launch directly on an active Android Emulator
pnpm --filter @quickbasket/mobile android

# Launch directly on an active iOS Simulator (macOS only)
pnpm --filter @quickbasket/mobile ios

# Run the Expo mobile app in web preview mode
pnpm --filter @quickbasket/mobile web

# Check TypeScript correctness
pnpm --filter @quickbasket/mobile typecheck
```

---

## 📦 Production Builds (Expo EAS)

For production distribution to the Google Play Store and Apple App Store, QuickBasket uses **Expo Application Services (EAS)**:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Configure EAS project credentials
cd apps/mobile
eas build:configure

# Build standalone Android APK / AAB
eas build --platform android --profile production

# Build standalone iOS IPA
eas build --platform ios --profile production
```

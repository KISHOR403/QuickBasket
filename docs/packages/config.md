# 🎨 Design System & Configuration (`@quickbasket/config`)

The `@quickbasket/config` package centralizes the **Tailwind CSS design preset**, typography scales, color palettes, custom shadows, and micro-animations shared by the web storefront and native mobile clients.

---

## 🎨 Color Palette & Design Tokens

### Primary Brand & Express Palette

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **`basil`** | `#1a6b42` | Primary brand green used for primary CTAs, main logos, and active badges. |
| **`basil-hover`** | `#145a37` | Hover and active tap state for primary buttons. |
| **`basil-light`** | `#edf7f1` | Subtle tinted background for tags, badges, and selected cards. |
| **`leaf`** | `#22a855` | Vibrant delivery green for "10-15 Min Express" badges and live delivery pings. |
| **`mango`** | `#f0a020` | Warm accent gold for star ratings, flash sale banners, and discounts. |
| **`beet`** | `#7a2650` | Rich berry accent for organic farm categories and specialty stores. |
| **`ink`** | `#0f1a14` | Primary high-contrast text color; ensures extreme readability. |
| **`paper` / `cream`** | `#faf9f6` / `#f5f3ee` | Warm organic background shades replacing clinical white. |
| **`mist`** | `#eae8e3` | Subtle border and divider color. |

---

## 📐 Border Radius Standards

```javascript
borderRadius: {
  card: '20px',    // Standard product cards, vendor tiles & modal containers
  input: '14px',   // Form text inputs, search bars & dropdowns
  pill: '9999px',  // Filter chips, quantity adjusters & action buttons
  badge: '8px',    // Express delivery chips & discount tags
}
```

---

## 🔠 Typography Tokens

- **Headings & Display**: Clash Display (`font-display`) for high-impact titles and banners.
- **Body & UI**: Satoshi (`font-sans`) for crystal-clear readability across product descriptions.
- **Financial & Numerics**: Space Grotesk (`font-mono`) for prices, delivery ETAs, and order IDs.

```javascript
fontSize: {
  'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '0.95', fontWeight: '700' }],
  'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1', fontWeight: '700' }],
  'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
  'display-sm': ['clamp(1.125rem, 2vw, 1.75rem)', { lineHeight: '1.2', fontWeight: '600' }],
}
```

---

## ✨ Micro-Animations & Keyframes

Included custom animations enhance the quick-commerce feel:

```css
/* Live pulsing dot on 10-minute express delivery tags */
@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.7); }
}

/* Skeletons and loading cards */
@keyframes shimmer {
  0% { background-position: 150% 0; }
  100% { background-position: -150% 0; }
}

/* Modal and drawer slide transitions */
@keyframes slideUp {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
```

---

## 🔌 Integrating the Preset

To use the preset in any workspace app, reference it in `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import preset from '@quickbasket/config/tailwind';

const config: Config = {
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
};

export default config;
```

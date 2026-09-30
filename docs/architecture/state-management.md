# 🔄 State Management Architecture

QuickBasket adopts a modern, clean architecture separating **Client State** from **Server State**. This pattern prevents state duplication, eliminates hydration bugs, and delivers instant UI updates.

---

## 🏛️ State Separation Paradigm

```
┌────────────────────────────────────────────────────────┐
│                      QUICKBASKET                       │
└────────────────────────────────────────────────────────┘
            │                                 │
            ▼                                 ▼
┌────────────────────────┐       ┌────────────────────────┐
│      CLIENT STATE      │       │      SERVER CACHE      │
│   (Zustand Stores)     │       │ (TanStack Query v5)    │
├────────────────────────┤       ├────────────────────────┤
│ • Shopping Cart Items  │       │ • Catalog & Categories │
│ • Variant Selection    │       │ • Product Details      │
│ • Active Address & Pin │       │ • Dark Store Directory │
│ • UI Modals & Drawers  │       │ • Live Order Status    │
│ • Local Storage Sync   │       │ • Async Query Cache    │
└────────────────────────┘       └────────────────────────┘
```

---

## 🗄️ Client State (Zustand Stores)

Client state lives in [`apps/web/src/store/`](file:///d:/Project/QuickBasket/apps/web/src/store/):

### 1. Cart Store (`cart.ts`)
Manages shopping cart line items with variant isolation and automatic fee math:
- **Variant Discrimination**: Items are uniquely identified by a composite key of `productId + variantId`.
- **Dynamic Fee Math**:
  - `itemTotal`: Sum of `variant.price * quantity`.
  - `deliveryFee`: Free (₹0) when `itemTotal > 299`, else flat ₹15.
  - `handlingFee`: Fixed platform fee of ₹4.
  - `grandTotal`: `itemTotal + deliveryFee + handlingFee + tip`.
- **Persistence**: Synced with browser `localStorage` using Zustand's `persist` middleware, ensuring carts survive tab reloads and browser restarts.

### 2. Location Store (`location.ts`)
Manages geolocation, selected delivery address, and pincode verification:
- **Active Pincode**: Default set to `110001` (Central Delhi / Connaught Place).
- **Serviceability Status**: Cross-references entered pincode against available dark stores.
- **Address Book**: Stores user home, work, and other addresses with custom labels.

### 3. UI Store (`ui.ts`)
Controls interface-level modal dialogues and drawer states:
- `isCartOpen`: Controls sticky right-side slide-over cart drawer.
- `isLocationModalOpen`: Controls delivery address picker popup.
- `isSearchOpen`: Controls global quick-search overlay (`Cmd/Ctrl + K`).

---

## 🌐 Server State (TanStack Query v5)

Server state is encapsulated within [`@quickbasket/api-client`](file:///d:/Project/QuickBasket/packages/api-client/src/index.ts):

### Query Client Defaults
```typescript
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes fresh window
        refetchOnWindowFocus: false, // Prevents sudden UI layout shifts
      },
    },
  });
```

### Query Hooks Catalog
- `useCategoriesQuery()`: Retrieves active quick-commerce categories with badge colors and SVG icons.
- `useProductsQuery({ categorySlug, vendorId, search, isExpress })`: Fetches products with multi-parameter filtering.
- `useProductBySlugQuery(slug)`: Fetches individual SKU details with variant availability.
- `useVendorsQuery()`: Fetches partner dark stores, ratings, SLAs, and service zones.
- `useOrdersQuery()`: Fetches user order history with live status updates.

### Mutation & Invalidation Pattern
```typescript
export function usePlaceOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      // Validates order, assigns delivery rider & generates QB-XXXXX tracking ID
      return api.placeOrder(payload);
    },
    onSuccess: () => {
      // Automatically refreshes orders list without manual refetch logic
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
```

---

## 🔒 Hydration & SSR Safety

Because Next.js 14 App Router executes components on the server by default:
1. All client state hooks and interactive triggers specify the `'use client'` directive.
2. Local storage hydrated state (like Cart items and Location) is guarded with a `hasHydrated` boolean flag or mounted check to avoid React SSR markup mismatch errors.

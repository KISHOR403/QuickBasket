# 🔌 API Client (`@quickbasket/api-client`)

The `@quickbasket/api-client` package provides a unified, type-safe data access layer for all QuickBasket applications. Built on top of **TanStack React Query v5**, it encapsulates asynchronous fetching, client-side caching, and state mutation with zero boilerplate.

---

## 📦 Installation & Setup

In your application's root layout or component tree, wrap your components with `ApiQueryProvider`:

```tsx
import { ApiQueryProvider } from '@quickbasket/api-client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ApiQueryProvider>{children}</ApiQueryProvider>;
}
```

---

## 🪝 Available Query Hooks

### 1. `useCategoriesQuery()`
Fetches all active grocery categories.
- **Return Type**: `UseQueryResult<Category[]>`
- **Cache Key**: `['categories']`

```tsx
import { useCategoriesQuery } from '@quickbasket/api-client';

function CategoryList() {
  const { data: categories, isLoading, error } = useCategoriesQuery();

  if (isLoading) return <Spinner />;
  return (
    <div>
      {categories?.map((cat) => (
        <span key={cat.id}>{cat.name}</span>
      ))}
    </div>
  );
}
```

### 2. `useProductsQuery(params?: FilterParams)`
Fetches products filtered by category, vendor, search keywords, or express status.
- **Parameters**:
  - `categorySlug?: string`
  - `vendorId?: string`
  - `search?: string`
  - `isExpress?: boolean`
- **Return Type**: `UseQueryResult<Product[]>`
- **Cache Key**: `['products', params]`

### 3. `useProductBySlugQuery(slug: string)`
Fetches a single SKU by its unique slug.
- **Parameters**: `slug: string`
- **Return Type**: `UseQueryResult<Product | undefined>`
- **Cache Key**: `['product', slug]`

### 4. `useVendorsQuery()`
Fetches all fulfillment dark stores, kirana stores, and specialty farms.
- **Return Type**: `UseQueryResult<Vendor[]>`
- **Cache Key**: `['vendors']`

### 5. `useOrdersQuery()`
Fetches all past and active orders for the current user.
- **Return Type**: `UseQueryResult<Order[]>`
- **Cache Key**: `['orders']`

---

## ⚡ Mutation Hooks

### `usePlaceOrderMutation()`
Dispatches a new order, calculates totals, generates a unique tracking number (`QB-XXXXX`), assigns a delivery rider, and automatically invalidates the `['orders']` cache.

```tsx
import { usePlaceOrderMutation } from '@quickbasket/api-client';

function CheckoutButton({ cartItems, address, paymentMethod }) {
  const placeOrder = usePlaceOrderMutation();

  const handleCheckout = async () => {
    try {
      const order = await placeOrder.mutateAsync({
        items: cartItems,
        deliveryAddress: address,
        paymentMethod: 'upi',
        deliverySlotId: 'slot-instant',
        tipAmount: 20,
      });
      console.log('Order placed successfully:', order.orderNumber);
    } catch (err) {
      console.error('Order placement failed:', err);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={placeOrder.isPending}>
      {placeOrder.isPending ? 'Placing Order...' : 'Pay & Order'}
    </button>
  );
}
```

---

## ⏱️ Realistic Latency Simulation

The client simulates realistic network latency (100ms - 500ms) to ensure application loaders, skeletons, and optimistic transitions function accurately during development without requiring an active external backend.

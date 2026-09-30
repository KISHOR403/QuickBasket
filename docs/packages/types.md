# 🏷️ Domain Types (`@quickbasket/types`)

The `@quickbasket/types` package contains the single source of truth for all domain entities, database schemas, enums, and data transfer objects across QuickBasket.

---

## 📋 Entity Specifications

### 1. Vendor & Dark Store
Represents fulfillment centers, local partner kiranas, and specialty shops.

```typescript
export type VendorType = 'dark_store' | 'local_kirana' | 'organic_farm' | 'specialty';

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  type: VendorType;
  rating: number;
  reviewsCount: number;
  deliveryTimeMin: number;
  deliveryFee: number;
  image: string;
  address: string;
  pincodes: string[];
  isOpen: boolean;
  featuredBadge?: string;
}
```

### 2. Product & ProductVariant
Supports multi-variant items (e.g. Milk 500ml vs 1L, Onion 1kg vs 5kg) with individual pricing and stock tracking.

```typescript
export interface ProductVariant {
  id: string;
  name: string;           // e.g. "500 ml", "1 Litre", "Pack of 2"
  price: number;          // Price in INR
  mrp: number;            // Original Maximum Retail Price
  inStock: boolean;
  stockCount: number;
  unit: string;           // "ml", "g", "kg", "pcs"
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  categorySlug: string;
  vendorId: string;
  vendorName: string;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  defaultVariantId: string;
  isExpress: boolean;     // Delivery SLA <= 15 minutes
  isOrganic?: boolean;
  tags: string[];
}
```

### 3. Shopping Cart Line Items

```typescript
export interface CartItem {
  productId: string;
  variantId: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  vendorId: string;
}
```

### 4. User & Delivery Addresses

```typescript
export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label?: string;
  flatNo: string;
  building: string;
  area: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}
```

### 5. Orders & Live Tracking

```typescript
export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  vendorId: string;
  vendorName: string;
  status: OrderStatus;
  deliveryAddress: Address;
  itemTotal: number;
  deliveryFee: number;
  handlingFee: number;
  discount: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  estimatedDeliveryMinutes: number;
  createdAt: string;
  deliveredAt?: string;
  rider?: {
    name: string;
    phone: string;
    vehicleNumber: string;
    photo: string;
  };
}
```

# 📦 Mock Data & Fixtures (`@quickbasket/mocks`)

The `@quickbasket/mocks` package provides an in-memory, realistic dataset simulating a production quick-commerce environment with Indian market grocery brands, multiple dark stores, and multi-variant SKUs.

---

## 🗄️ Included Datasets

### 1. Categories (8 Core Verticals)
Each category includes high-res imagery, distinct accent color tokens, and unique slugs:
1. `dairy-breakfast`: Milk, curd, paneer, butter, cheese, eggs.
2. `fresh-produce`: Farm-fresh vegetables, leafy greens, exotic fruits.
3. `cold-drinks-juices`: Fresh juices, tender coconut, cold brews, sodas.
4. `snacks-munchies`: Chips, namkeen, roasted nuts, popcorn.
5. `instant-frozen`: Noodles, ready-to-eat meals, frozen parathas.
6. `tea-coffee-health`: Specialty whole bean coffee, green tea, health drinks.
7. `bakery-biscuits`: Sourdough bread, artisanal cookies, toast, buns.
8. `atta-rice-dal`: Organic flours, basmati rice, lentils, spices.

### 2. Multi-Vendor Network
Includes realistic fulfillment nodes across Indian metro pincodes:
- **QuickBasket Dark Store #04 (Connaught Place)**: 10-12 min express delivery.
- **QuickBasket Dark Store #12 (South Extension)**: 12-15 min express delivery.
- **Sharma & Sons Kirana Store**: Trusted local grocery partner.
- **GreenValley Organic Farms**: Direct-from-farm organic specialty produce.

### 3. Realistic SKU Catalog
Products include multiple pack sizes, high-definition Unsplash photography, MRP discount calculations, and dietary tags (`isOrganic`, `isExpress`). Featured brands include **Amul**, **Mother Dairy**, **Epigamia**, **Tata Sampann**, **Britannia**, and **Country Delight**.

---

## 🔍 Exported Functions

```typescript
// Fetch all categories
export function getMockCategories(): Category[];

// Fetch products with multi-parameter filtering
export function getMockProducts(params?: {
  categorySlug?: string;
  vendorId?: string;
  search?: string;
  isExpress?: boolean;
}): Product[];

// Lookup single product by slug
export function getMockProductBySlug(slug: string): Product | undefined;

// Fetch partner dark stores & vendors
export function getMockVendors(): Vendor[];

// Fetch orders with mutable in-memory array for newly placed orders
export function getMockOrders(): Order[];
```

---

## 🛠️ Usage in Tests and Storybooks

```typescript
import { getMockProducts, getMockCategories } from '@quickbasket/mocks';

const dairyProducts = getMockProducts({ categorySlug: 'dairy-breakfast' });
const expressOnly = getMockProducts({ isExpress: true });
```

# 🧰 Utility Functions (`@quickbasket/utils`)

The `@quickbasket/utils` package provides zero-dependency helper functions for formatting currencies, rendering delivery times, computing discounts, and slugifying text.

---

## 🛠️ Functions Reference

### 1. `formatCurrency(amount: number): string`
Formats any numeric value into Indian Rupee (`INR`) string notation with proper comma separation (`en-IN` standard) and no fractional paise:

```typescript
import { formatCurrency } from '@quickbasket/utils';

formatCurrency(49);     // Output: "₹49"
formatCurrency(1250);   // Output: "₹1,250"
formatCurrency(145000); // Output: "₹1,45,000"
```

### 2. `formatEta(minutes: number): string`
Converts estimated minutes into concise human-readable delivery SLA strings:

```typescript
import { formatEta } from '@quickbasket/utils';

formatEta(12);  // Output: "12 mins"
formatEta(45);  // Output: "45 mins"
formatEta(60);  // Output: "1 hr"
formatEta(75);  // Output: "1 hr 15 mins"
```

### 3. `calculateDiscount(price: number, mrp: number): number`
Calculates percentage savings against the Maximum Retail Price (MRP):

```typescript
import { calculateDiscount } from '@quickbasket/utils';

calculateDiscount(80, 100); // Output: 20 (20% OFF)
calculateDiscount(45, 50);  // Output: 10 (10% OFF)
calculateDiscount(100, 100); // Output: 0
```

### 4. `slugify(text: string): string`
Transforms product, vendor, or category titles into URL-safe kebab-cased strings:

```typescript
import { slugify } from '@quickbasket/utils';

slugify('Dairy & Breakfast Foods!'); // Output: "dairy-breakfast-foods"
slugify('Fresh Organic Apples 1kg'); // Output: "fresh-organic-apples-1kg"
```

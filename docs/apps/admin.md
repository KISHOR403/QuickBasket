# 🛡️ Admin & Vendor Portal Documentation

The QuickBasket **Vendor & Inventory Admin Portal** provides dark store managers, store operators, and platform administrators with real-time operational visibility into fulfillment performance, partner networks, and inventory distribution.

---

## 📍 Accessing the Portal

The admin interface is integrated into the web client and is accessible at:
- **Local URL**: `http://localhost:3000/admin`
- **Component File**: [`apps/web/app/admin/page.tsx`](file:///d:/Project/QuickBasket/apps/web/app/admin/page.tsx)

---

## 📊 Core Capabilities & Dashboards

### 1. Real-time KPI & SLA Tracking
The admin dashboard surfaces critical quick-commerce metrics:
- **Total Vendors**: Live tally of active dark stores and partner kirana stores with a 100% serviceability indicator.
- **Active SKUs**: Count of unique products actively indexed across all 8 grocery verticals.
- **Daily Express Orders**: Real-time express delivery volume with day-over-day growth tracking (`↑ 18% vs Yesterday`).
- **Average Delivery Speed**: Tracks sub-15-minute fulfillment SLA (e.g. `11.4 min` average speed against the `15 min` target SLA).

### 2. Partner Store Directory
Displays all registered fulfillment nodes:
- **Node Classification**: Categorized by `DARK_STORE`, `LOCAL_KIRANA`, `ORGANIC_FARM`, or `SPECIALTY`.
- **Fulfillment Radius & Address**: Physical warehouse/store location and serving pincodes.
- **Performance Rating**: Customer satisfaction score (e.g. `★ 4.8`) and individual vendor delivery time estimates.

---

## 🔄 Data Architecture

The Admin dashboard consumes the shared query layer directly from [`@quickbasket/api-client`](file:///d:/Project/QuickBasket/packages/api-client/src/index.ts):

```tsx
import { useVendorsQuery, useProductsQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export default function AdminDashboardPage() {
  const { data: vendors } = useVendorsQuery();
  const { data: products } = useProductsQuery();
  
  // Renders live operational telemetry and vendor tables
}
```

---

## 🚀 Future Roadmap & Planned Extensions

- **Inventory Stock Adjuster**: Live variant stock toggle (`inStock: true/false`) and stock quantity decrements.
- **Rider Dispatch Monitor**: Live map view of active riders with vehicle numbers and GPS coordinates.
- **Surge Fee Controls**: Dynamic delivery fee adjustments during peak monsoon or festival surges.

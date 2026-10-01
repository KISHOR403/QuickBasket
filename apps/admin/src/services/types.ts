import { Product, ProductVariant, Category, Order, OrderStatus, PaymentMethod, Vendor } from '@quickbasket/types';

export interface InventoryItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  categoryName: string;
  image: string;
  unit: string;
  price: number;
  mrp: number;
  stockCount: number;
  lowStockThreshold: number;
  reservedCount: number;
  incomingCount: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestockedAt: string;
}

export interface StockAdjustment {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  type: 'add' | 'subtract';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: 'supplier_delivery' | 'inventory_audit' | 'damaged_stock' | 'customer_return';
  notes?: string;
  adjustedBy: string;
  adjustedAt: string;
}

export interface CustomerSummary {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'vip' | 'inactive';
  city: string;
  registeredAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'scheduled' | 'expired' | 'disabled';
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
  status: 'approved' | 'pending' | 'flagged';
}

export interface DispatchDeliveryItem {
  orderId: string;
  orderNumber: string;
  customerName: string;
  addressArea: string;
  itemsCount: number;
  grandTotal: number;
  stage: 'preparing' | 'packed' | 'out_for_delivery' | 'delivered';
  riderName?: string;
  riderPhone?: string;
  vehicleNumber?: string;
  timeElapsedMinutes: number;
  targetSlaMinutes: number;
  isDelayed: boolean;
}

export interface SalesAnalyticsRangeData {
  timeframe: 'today' | '7d' | '30d' | '3m';
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  chartPoints: {
    label: string;
    revenue: number;
    orders: number;
  }[];
}

export interface StoreSettings {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  operatingHours: string;
  instantDeliveryFee: number;
  freeDeliveryThreshold: number;
  targetSlaMinutes: number;
  lowStockThreshold: number;
  autoAssignRiders: boolean;
  supportPhone: string;
  supportEmail: string;
  dispatchRadiusKm: number;
}

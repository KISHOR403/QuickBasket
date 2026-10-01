import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_VENDORS,
  MOCK_ORDERS,
} from '@quickbasket/mocks';
import { Product, Category, Order, OrderStatus } from '@quickbasket/types';
import {
  InventoryItem,
  StockAdjustment,
  CustomerSummary,
  Coupon,
  ProductReview,
  DispatchDeliveryItem,
  SalesAnalyticsRangeData,
  StoreSettings,
} from './types';
import {
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_DISPATCH_ITEMS,
  INITIAL_ANALYTICS_DATA,
  INITIAL_SETTINGS,
  INITIAL_ADJUSTMENTS,
} from './mockAdminData';

// In-memory state holding arrays for Admin mutation simulation
let productsState: Product[] = [...MOCK_PRODUCTS];
let categoriesState: Category[] = [...MOCK_CATEGORIES];
let ordersState: Order[] = [...MOCK_ORDERS];
let customersState: CustomerSummary[] = [...INITIAL_CUSTOMERS];
let couponsState: Coupon[] = [...INITIAL_COUPONS];
let reviewsState: ProductReview[] = [...INITIAL_REVIEWS];
let dispatchState: DispatchDeliveryItem[] = [...INITIAL_DISPATCH_ITEMS];
let adjustmentsState: StockAdjustment[] = [...INITIAL_ADJUSTMENTS];
let settingsState: StoreSettings = { ...INITIAL_SETTINGS };

export const AdminService = {
  // PRODUCTS (wraps @quickbasket/mocks MOCK_PRODUCTS)
  async getProducts(params?: {
    search?: string;
    categorySlug?: string;
    stockFilter?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
    statusFilter?: string;
  }): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 60));
    let list = [...productsState];

    if (params?.categorySlug && params.categorySlug !== 'all') {
      list = list.filter((p) => p.categorySlug === params.categorySlug);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (params?.stockFilter && params.stockFilter !== 'all') {
      list = list.filter((p) => {
        const totalStock = p.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0);
        if (params.stockFilter === 'out_of_stock') return totalStock === 0;
        if (params.stockFilter === 'low_stock') return totalStock > 0 && totalStock <= 15;
        if (params.stockFilter === 'in_stock') return totalStock > 15;
        return true;
      });
    }

    return list;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    return productsState.find((p) => p.id === id);
  },

  async createProduct(data: Omit<Product, 'id'> & { id?: string }): Promise<Product> {
    await new Promise((res) => setTimeout(res, 120));
    const newProduct: Product = {
      ...data,
      id: data.id || `prod-${Date.now()}`,
    };
    productsState.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await new Promise((res) => setTimeout(res, 80));
    const index = productsState.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    productsState[index] = { ...productsState[index], ...updates };
    return productsState[index];
  },

  async deleteProduct(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 80));
    productsState = productsState.filter((p) => p.id !== id);
    return true;
  },

  // CATEGORIES (wraps @quickbasket/mocks MOCK_CATEGORIES)
  async getCategories(): Promise<Category[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...categoriesState];
  },

  async createCategory(cat: Partial<Category>): Promise<Category> {
    await new Promise((res) => setTimeout(res, 80));
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: cat.name || 'New Category',
      slug: cat.slug || (cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : 'new-category'),
      iconName: cat.iconName || 'Package',
      imageUrl: cat.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      itemCount: 0,
      accentColor: cat.accentColor || '#EBF8F0',
    };
    categoriesState.push(newCategory);
    return newCategory;
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    await new Promise((res) => setTimeout(res, 80));
    const index = categoriesState.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Category not found');
    categoriesState[index] = { ...categoriesState[index], ...updates };
    return categoriesState[index];
  },

  async deleteCategory(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 80));
    categoriesState = categoriesState.filter((c) => c.id !== id);
    return true;
  },

  // INVENTORY
  async getInventoryItems(params?: {
    search?: string;
    statusFilter?: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  }): Promise<InventoryItem[]> {
    await new Promise((res) => setTimeout(res, 80));
    const items: InventoryItem[] = [];

    for (const prod of productsState) {
      for (const variant of prod.variants) {
        const stock = variant.stockCount ?? 15;
        let status: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
        if (stock === 0) status = 'out_of_stock';
        else if (stock <= 10) status = 'low_stock';

        items.push({
          productId: prod.id,
          variantId: variant.id,
          productName: prod.name,
          variantName: variant.name,
          sku: `SKU-${prod.slug.substring(0, 4).toUpperCase()}-${variant.id.slice(-3)}`,
          categoryName: prod.categorySlug.replace(/-/g, ' ').toUpperCase(),
          image: prod.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
          unit: variant.unit || 'unit',
          price: variant.price,
          mrp: variant.mrp,
          stockCount: stock,
          lowStockThreshold: 10,
          reservedCount: Math.floor(stock * 0.1),
          incomingCount: status === 'low_stock' ? 24 : 0,
          status,
          lastRestockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        });
      }
    }

    let filtered = items;
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (it) =>
          it.productName.toLowerCase().includes(q) ||
          it.variantName.toLowerCase().includes(q) ||
          it.sku.toLowerCase().includes(q)
      );
    }
    if (params?.statusFilter && params.statusFilter !== 'all') {
      filtered = filtered.filter((it) => it.status === params.statusFilter);
    }

    return filtered;
  },

  async adjustStock(payload: {
    variantId: string;
    productId: string;
    type: 'add' | 'subtract';
    quantity: number;
    reason: StockAdjustment['reason'];
    notes?: string;
    adjustedBy?: string;
  }): Promise<StockAdjustment> {
    await new Promise((res) => setTimeout(res, 100));

    const product = productsState.find((p) => p.id === payload.productId);
    if (!product) throw new Error('Product not found');
    const variant = product.variants.find((v) => v.id === payload.variantId);
    if (!variant) throw new Error('Variant not found');

    const previousStock = variant.stockCount || 0;
    const change = payload.type === 'add' ? payload.quantity : -payload.quantity;
    const newStock = Math.max(0, previousStock + change);
    variant.stockCount = newStock;
    variant.inStock = newStock > 0;

    const adjustment: StockAdjustment = {
      id: `adj-${Date.now()}`,
      variantId: payload.variantId,
      productId: payload.productId,
      productName: `${product.name} (${variant.name})`,
      type: payload.type,
      quantity: payload.quantity,
      previousStock,
      newStock,
      reason: payload.reason,
      notes: payload.notes,
      adjustedBy: payload.adjustedBy || 'kishorgogoi (Admin)',
      adjustedAt: new Date().toISOString(),
    };

    adjustmentsState.unshift(adjustment);
    return adjustment;
  },

  async getStockAdjustments(): Promise<StockAdjustment[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...adjustmentsState];
  },

  // ORDERS (wraps @quickbasket/mocks MOCK_ORDERS)
  async getOrders(params?: {
    search?: string;
    status?: string;
    paymentStatus?: string;
  }): Promise<Order[]> {
    await new Promise((res) => setTimeout(res, 60));
    let list = [...ordersState];

    if (params?.status && params.status !== 'all') {
      list = list.filter((o) => o.status === params.status);
    }

    if (params?.paymentStatus && params.paymentStatus !== 'all') {
      list = list.filter((o) => o.paymentStatus === params.paymentStatus);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.deliveryAddress?.area?.toLowerCase().includes(q) ||
          o.items?.some((i) => i.productName.toLowerCase().includes(q))
      );
    }

    return list;
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    return ordersState.find((o) => o.id === id || o.orderNumber === id);
  },

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await new Promise((res) => setTimeout(res, 80));
    const index = ordersState.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (index === -1) throw new Error('Order not found');
    ordersState[index] = { ...ordersState[index], status };
    return ordersState[index];
  },

  // CUSTOMERS
  async getCustomers(params?: { search?: string; status?: string }): Promise<CustomerSummary[]> {
    await new Promise((res) => setTimeout(res, 60));
    let list = [...customersState];
    if (params?.status && params.status !== 'all') {
      list = list.filter((c) => c.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getCustomerById(id: string): Promise<{ customer: CustomerSummary; orders: Order[] } | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    const customer = customersState.find((c) => c.id === id);
    if (!customer) return undefined;
    const orders = ordersState.filter((o) => o.userId === id || o.userId === 'usr-1');
    return { customer, orders };
  },

  // COUPONS
  async getCoupons(): Promise<Coupon[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...couponsState];
  },

  async createCoupon(data: Partial<Coupon>): Promise<Coupon> {
    await new Promise((res) => setTimeout(res, 80));
    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: (data.code || 'COUPON').toUpperCase(),
      description: data.description || 'Promotional coupon code',
      discountType: data.discountType || 'fixed',
      discountValue: data.discountValue || 50,
      minOrderValue: data.minOrderValue || 299,
      maxDiscountAmount: data.maxDiscountAmount,
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      usageLimit: data.usageLimit || 1000,
      usageCount: 0,
      status: 'active',
    };
    couponsState.unshift(newCoupon);
    return newCoupon;
  },

  async updateCouponStatus(id: string, status: Coupon['status']): Promise<Coupon> {
    await new Promise((res) => setTimeout(res, 60));
    const index = couponsState.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Coupon not found');
    couponsState[index] = { ...couponsState[index], status };
    return couponsState[index];
  },

  async deleteCoupon(id: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 60));
    couponsState = couponsState.filter((c) => c.id !== id);
    return true;
  },

  // REVIEWS
  async getReviews(params?: { rating?: number; status?: string; search?: string }): Promise<ProductReview[]> {
    await new Promise((res) => setTimeout(res, 60));
    let list = [...reviewsState];
    if (params?.rating) {
      list = list.filter((r) => r.rating === params.rating);
    }
    if (params?.status && params.status !== 'all') {
      list = list.filter((r) => r.status === params.status);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.productName.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.comment.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async updateReviewStatus(id: string, status: ProductReview['status']): Promise<ProductReview> {
    await new Promise((res) => setTimeout(res, 60));
    const index = reviewsState.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Review not found');
    reviewsState[index] = { ...reviewsState[index], status };
    return reviewsState[index];
  },

  // DELIVERY DISPATCH
  async getDispatchItems(): Promise<DispatchDeliveryItem[]> {
    await new Promise((res) => setTimeout(res, 50));
    return [...dispatchState];
  },

  async updateDispatchStage(orderId: string, stage: DispatchDeliveryItem['stage']): Promise<DispatchDeliveryItem> {
    await new Promise((res) => setTimeout(res, 60));
    const index = dispatchState.findIndex((d) => d.orderId === orderId);
    if (index === -1) throw new Error('Dispatch item not found');
    dispatchState[index] = { ...dispatchState[index], stage };
    return dispatchState[index];
  },

  // ANALYTICS
  async getAnalytics(timeframe: 'today' | '7d' | '30d' | '3m'): Promise<SalesAnalyticsRangeData> {
    await new Promise((res) => setTimeout(res, 60));
    return INITIAL_ANALYTICS_DATA[timeframe] || INITIAL_ANALYTICS_DATA.today;
  },

  async getTopProducts(): Promise<{
    id: string;
    name: string;
    image: string;
    unitsSold: number;
    revenue: number;
    stock: number;
    trend: string;
  }[]> {
    await new Promise((res) => setTimeout(res, 60));
    return [
      {
        id: 'prod-1',
        name: 'Amul Taaza Milk 500ml',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80',
        unitsSold: 342,
        revenue: 9234,
        stock: 45,
        trend: '+18%',
      },
      {
        id: 'prod-4',
        name: 'Organic Alphonso Mango (1kg)',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=120&q=80',
        unitsSold: 128,
        revenue: 44672,
        stock: 8,
        trend: '+34%',
      },
      {
        id: 'prod-2',
        name: 'Farm Fresh Brown Eggs (Pack 6)',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=120&q=80',
        unitsSold: 210,
        revenue: 15750,
        stock: 12,
        trend: '+8%',
      },
      {
        id: 'prod-6',
        name: 'Aashirvaad Shudh Chakki Atta (5kg)',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80',
        unitsSold: 94,
        revenue: 25850,
        stock: 22,
        trend: '+12%',
      },
      {
        id: 'prod-3',
        name: 'Fresh Hybrid Tomato (1kg)',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80',
        unitsSold: 185,
        revenue: 7030,
        stock: 6,
        trend: '+5%',
      },
    ];
  },

  // SETTINGS
  async getSettings(): Promise<StoreSettings> {
    await new Promise((res) => setTimeout(res, 40));
    return { ...settingsState };
  },

  async updateSettings(updates: Partial<StoreSettings>): Promise<StoreSettings> {
    await new Promise((res) => setTimeout(res, 80));
    settingsState = { ...settingsState, ...updates };
    return { ...settingsState };
  },
};

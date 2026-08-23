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

export interface ProductVariant {
  id: string;
  name: string; // e.g. "500 ml", "1 Litre", "Pack of 2"
  price: number; // in INR
  mrp: number; // original price
  inStock: boolean;
  stockCount: number;
  unit: string; // "ml", "g", "kg", "pcs"
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
  isExpress: boolean; // delivery in <= 15 mins
  isOrganic?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  imageUrl: string;
  itemCount: number;
  accentColor?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  vendorId: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label?: string; // e.g. "Mom's Place"
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

export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  image: string;
  vendorName: string;
}

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

export interface DeliverySlot {
  id: string;
  label: string; // e.g. "Instant (12-15 mins)", "Today 4 PM - 6 PM"
  isInstant: boolean;
  fee: number;
}

import { Category, Product, Vendor, Order } from '@quickbasket/types';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'QuickBasket Dark Store #04',
    slug: 'quickbasket-darkstore-04',
    type: 'dark_store',
    rating: 4.9,
    reviewsCount: 1240,
    deliveryTimeMin: 10,
    deliveryFee: 15,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    address: 'Sector 18, Cyber Hub Zone',
    pincodes: ['110001', '110002', '122001', '122002'],
    isOpen: true,
    featuredBadge: '⚡ 10 Min Express',
  },
  {
    id: 'vendor-2',
    name: 'Gupta Kirana & General Store',
    slug: 'gupta-kirana-store',
    type: 'local_kirana',
    rating: 4.8,
    reviewsCount: 450,
    deliveryTimeMin: 18,
    deliveryFee: 10,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80',
    address: 'Main Market, Road No. 4',
    pincodes: ['110001', '110003'],
    isOpen: true,
    featuredBadge: '🏪 Local Favorite',
  },
  {
    id: 'vendor-3',
    name: 'Sharma Organic Farms',
    slug: 'sharma-organic-farms',
    type: 'organic_farm',
    rating: 4.95,
    reviewsCount: 890,
    deliveryTimeMin: 25,
    deliveryFee: 20,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    address: 'Green Belt Farms, Outer Ring',
    pincodes: ['110001', '122001'],
    isOpen: true,
    featuredBadge: '🌱 100% Farm Fresh',
  },
  {
    id: 'vendor-4',
    name: 'Shree Krishna Paan & Sweets',
    slug: 'shree-krishna-sweets',
    type: 'specialty',
    rating: 4.7,
    reviewsCount: 310,
    deliveryTimeMin: 15,
    deliveryFee: 15,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    address: 'Corner Shop, Block B',
    pincodes: ['110001', '110002'],
    isOpen: true,
    featuredBadge: '🍬 Fresh Sweets & Paan',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Dairy, Bread & Eggs',
    slug: 'dairy-bread-eggs',
    iconName: 'Milk',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    itemCount: 42,
    accentColor: '#EBF8F0',
  },
  {
    id: 'cat-2',
    name: 'Fresh Vegetables',
    slug: 'fresh-vegetables',
    iconName: 'Carrot',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    itemCount: 68,
    accentColor: '#E7F5EE',
  },
  {
    id: 'cat-3',
    name: 'Fresh Fruits',
    slug: 'fresh-fruits',
    iconName: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
    itemCount: 35,
    accentColor: '#FFF5E6',
  },
  {
    id: 'cat-4',
    name: 'Snacks & Munchies',
    slug: 'snacks-munchies',
    iconName: 'Cookie',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80',
    itemCount: 110,
    accentColor: '#F8E8F0',
  },
  {
    id: 'cat-5',
    name: 'Cold Drinks & Juices',
    slug: 'cold-drinks-juices',
    iconName: 'CupSoda',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    itemCount: 54,
    accentColor: '#EBF8F0',
  },
  {
    id: 'cat-6',
    name: 'Atta, Rice & Dal',
    slug: 'atta-rice-dal',
    iconName: 'Wheat',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    itemCount: 88,
    accentColor: '#FFF5E6',
  },
  {
    id: 'cat-7',
    name: 'Instant Food & Noodles',
    slug: 'instant-food',
    iconName: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80',
    itemCount: 45,
    accentColor: '#F8E8F0',
  },
  {
    id: 'cat-8',
    name: 'Local Paan & Sweets',
    slug: 'paan-sweets',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    itemCount: 24,
    accentColor: '#E7F5EE',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Amul Taaza T-Special Milk',
    slug: 'amul-taaza-toned-milk',
    brand: 'Amul',
    categoryId: 'cat-1',
    categorySlug: 'dairy-bread-eggs',
    vendorId: 'vendor-1',
    vendorName: 'QuickBasket Dark Store #04',
    description: 'Pasteurised Toned Milk. Rich in proteins and calcium for daily health.',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 3420,
    defaultVariantId: 'var-1a',
    variants: [
      { id: 'var-1a', name: '500 ml Pouch', price: 28, mrp: 28, inStock: true, stockCount: 150, unit: 'pouch' },
      { id: 'var-1b', name: '1 Litre Pouch', price: 54, mrp: 56, inStock: true, stockCount: 80, unit: 'pouch' },
      { id: 'var-1c', name: 'Pack of 4 (500ml)', price: 110, mrp: 112, inStock: true, stockCount: 40, unit: 'pack' },
    ],
    isExpress: true,
    tags: ['Bestseller', 'Daily Essential', 'Fresh'],
  },
  {
    id: 'prod-2',
    name: 'Fresh Farm Produce Tomatoes (Hybrid)',
    slug: 'fresh-hybrid-tomatoes',
    brand: 'Farm Fresh',
    categoryId: 'cat-2',
    categorySlug: 'fresh-vegetables',
    vendorId: 'vendor-3',
    vendorName: 'Sharma Organic Farms',
    description: 'Farm-picked ripe red hybrid tomatoes. Rich in Vitamin C and Antioxidants.',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 940,
    defaultVariantId: 'var-2a',
    variants: [
      { id: 'var-2a', name: '500 g', price: 22, mrp: 30, inStock: true, stockCount: 60, unit: 'g' },
      { id: 'var-2b', name: '1 kg', price: 42, mrp: 60, inStock: true, stockCount: 45, unit: 'kg' },
    ],
    isExpress: true,
    isOrganic: true,
    tags: ['Organic', 'Farm Direct', 'Best Deal'],
  },
  {
    id: 'prod-3',
    name: 'Aashirvaad Shuddh Chakki Atta',
    slug: 'aashirvaad-shuddh-chakki-atta',
    brand: 'Aashirvaad',
    categoryId: 'cat-6',
    categorySlug: 'atta-rice-dal',
    vendorId: 'vendor-2',
    vendorName: 'Gupta Kirana & General Store',
    description: '100% pure whole wheat flour processed in traditional chakkis. Soft and fluffy rotis guarantee.',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 4890,
    defaultVariantId: 'var-3a',
    variants: [
      { id: 'var-3a', name: '5 kg Pack', price: 235, mrp: 275, inStock: true, stockCount: 30, unit: 'kg' },
      { id: 'var-3b', name: '10 kg Pack', price: 449, mrp: 520, inStock: true, stockCount: 15, unit: 'kg' },
    ],
    isExpress: false,
    tags: ['Pantry Essential', 'Top Rated'],
  },
  {
    id: 'prod-4',
    name: 'Lay\'s India\'s Magic Masala Potato Chips',
    slug: 'lays-indias-magic-masala',
    brand: 'Lay\'s',
    categoryId: 'cat-4',
    categorySlug: 'snacks-munchies',
    vendorId: 'vendor-1',
    vendorName: 'QuickBasket Dark Store #04',
    description: 'Crunchy potato chips seasoned with authentic spices. The quintessential Indian snack.',
    images: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 2150,
    defaultVariantId: 'var-4a',
    variants: [
      { id: 'var-4a', name: '50 g Pack', price: 20, mrp: 20, inStock: true, stockCount: 200, unit: 'pack' },
      { id: 'var-4b', name: '115 g Party Pack', price: 50, mrp: 50, inStock: true, stockCount: 90, unit: 'pack' },
    ],
    isExpress: true,
    tags: ['Party Favorite', 'Spicy'],
  },
  {
    id: 'prod-5',
    name: 'Maggi 2-Minute Masala Noodles',
    slug: 'maggi-2-minute-masala-noodles',
    brand: 'Maggi',
    categoryId: 'cat-7',
    categorySlug: 'instant-food',
    vendorId: 'vendor-1',
    vendorName: 'QuickBasket Dark Store #04',
    description: 'India\'s favorite instant noodles infused with roasted spices & aroma.',
    images: [
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.95,
    reviewCount: 6500,
    defaultVariantId: 'var-5a',
    variants: [
      { id: 'var-5a', name: 'Pack of 4 (280g)', price: 56, mrp: 60, inStock: true, stockCount: 120, unit: 'pack' },
      { id: 'var-5b', name: 'Pack of 12 (840g)', price: 162, mrp: 180, inStock: true, stockCount: 50, unit: 'pack' },
    ],
    isExpress: true,
    tags: ['Instant Comfort', 'Bestseller'],
  },
  {
    id: 'prod-6',
    name: 'Fresh Alphonso Mangoes (Ratnagiri)',
    slug: 'fresh-alphonso-mangoes',
    brand: 'Organic Orchards',
    categoryId: 'cat-3',
    categorySlug: 'fresh-fruits',
    vendorId: 'vendor-3',
    vendorName: 'Sharma Organic Farms',
    description: 'Handpicked sweet naturally ripened Alphonso mangoes direct from Ratnagiri farms.',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 512,
    defaultVariantId: 'var-6a',
    variants: [
      { id: 'var-6a', name: '1 kg (approx 4-5 pcs)', price: 399, mrp: 499, inStock: true, stockCount: 25, unit: 'kg' },
      { id: 'var-6b', name: '3 kg Family Crate', price: 1149, mrp: 1450, inStock: true, stockCount: 10, unit: 'crate' },
    ],
    isExpress: true,
    isOrganic: true,
    tags: ['Seasonal Special', 'Premium', 'Super Sweet'],
  },
  {
    id: 'prod-7',
    name: 'Special Meetha Paan (Tobacco Free)',
    slug: 'special-meetha-paan',
    brand: 'Shree Krishna',
    categoryId: 'cat-8',
    categorySlug: 'paan-sweets',
    vendorId: 'vendor-4',
    vendorName: 'Shree Krishna Paan & Sweets',
    description: 'Traditional Betel leaf prepared with gulkand, tutty fruity, silver leaf, and aromatic spices.',
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.85,
    reviewCount: 380,
    defaultVariantId: 'var-7a',
    variants: [
      { id: 'var-7a', name: 'Pack of 2 Pcs', price: 60, mrp: 70, inStock: true, stockCount: 40, unit: 'pack' },
      { id: 'var-7b', name: 'Box of 5 Pcs', price: 140, mrp: 175, inStock: true, stockCount: 18, unit: 'box' },
    ],
    isExpress: true,
    tags: ['Local Vendor', 'Freshly Prepared', 'Digestive'],
  },
  {
    id: 'prod-8',
    name: 'Coca-Cola Soft Drink Original Taste',
    slug: 'coca-cola-original-taste',
    brand: 'Coca-Cola',
    categoryId: 'cat-5',
    categorySlug: 'cold-drinks-juices',
    vendorId: 'vendor-1',
    vendorName: 'QuickBasket Dark Store #04',
    description: 'Crisp refreshing carbonated soft drink. Perfect pairing for snacks and meals.',
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.75,
    reviewCount: 1980,
    defaultVariantId: 'var-8a',
    variants: [
      { id: 'var-8a', name: '750 ml Bottle', price: 40, mrp: 40, inStock: true, stockCount: 80, unit: 'bottle' },
      { id: 'var-8b', name: '1.25 L Bottle', price: 65, mrp: 70, inStock: true, stockCount: 40, unit: 'bottle' },
    ],
    isExpress: true,
    tags: ['Chilled', 'Bestseller'],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'QB-88491',
    userId: 'usr-1',
    items: [
      {
        productId: 'prod-1',
        variantId: 'var-1a',
        productName: 'Amul Taaza T-Special Milk',
        variantName: '500 ml Pouch',
        unitPrice: 28,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
        vendorName: 'QuickBasket Dark Store #04',
      },
      {
        productId: 'prod-4',
        variantId: 'var-4a',
        productName: 'Lay\'s India\'s Magic Masala Potato Chips',
        variantName: '50 g Pack',
        unitPrice: 20,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
        vendorName: 'QuickBasket Dark Store #04',
      },
    ],
    vendorId: 'vendor-1',
    vendorName: 'QuickBasket Dark Store #04',
    status: 'out_for_delivery',
    deliveryAddress: {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      flatNo: 'A-402',
      building: 'Greenwood Heights',
      area: 'Connaught Place',
      city: 'New Delhi',
      pincode: '110001',
      isDefault: true,
    },
    itemTotal: 116,
    deliveryFee: 15,
    handlingFee: 4,
    discount: 10,
    grandTotal: 125,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    estimatedDeliveryMinutes: 9,
    createdAt: new Date().toISOString(),
    rider: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      vehicleNumber: 'DL 01 AB 4321',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  },
];

// Helper query functions
export async function getMockCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

export async function getMockProducts(params?: {
  categorySlug?: string;
  vendorId?: string;
  search?: string;
  isExpress?: boolean;
}): Promise<Product[]> {
  let list = [...MOCK_PRODUCTS];

  if (params?.categorySlug) {
    list = list.filter((p) => p.categorySlug === params.categorySlug);
  }
  if (params?.vendorId) {
    list = list.filter((p) => p.vendorId === params.vendorId);
  }
  if (params?.isExpress) {
    list = list.filter((p) => p.isExpress);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function getMockProductBySlug(slug: string): Promise<Product | undefined> {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export async function getMockVendors(): Promise<Vendor[]> {
  return MOCK_VENDORS;
}

export async function getMockOrders(): Promise<Order[]> {
  return MOCK_ORDERS;
}

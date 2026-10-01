'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown, SlidersHorizontal, Clock, Package, Zap, Check } from 'lucide-react';
import { useCategoriesQuery, useProductsQuery } from '@quickbasket/api-client';
import { Product } from '@quickbasket/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

/* ─── Category-specific hero content ──────────────────────────── */

interface CategoryHeroContent {
  tagline: string;
  subtitle: string;
  secondaryTitle: string;
  secondarySubtitle: string;
  /** Unsplash images that actually match the category */
  heroImage: string;
  secondaryImages: string[];
  /** Sub-category filter labels derived from product tags */
  subFilters: string[];
}

const CATEGORY_HERO_MAP: Record<string, CategoryHeroContent> = {
  'dairy-bread-eggs': {
    tagline: 'Fresh essentials for every morning.',
    subtitle: 'Farm-fresh dairy, soft bread & protein-rich eggs — delivered in minutes.',
    secondaryTitle: 'Fresh Dairy',
    secondarySubtitle: 'Farm-sourced essentials, chilled & delivered.',
    heroImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Milk', 'Bread', 'Eggs', 'Butter', 'Cheese', 'Curd & Yogurt', 'Paneer'],
  },
  'fresh-vegetables': {
    tagline: 'Garden-fresh vegetables, handpicked daily.',
    subtitle: 'Crisp, clean, pesticide-free veggies straight from the farm.',
    secondaryTitle: 'Organic Picks',
    secondarySubtitle: 'Pesticide-free daily essentials.',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1518977676601-b28d45a94a0d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Leafy Greens', 'Root Vegetables', 'Onion & Tomato', 'Herbs', 'Exotic Veggies'],
  },
  'fresh-fruits': {
    tagline: 'Seasonal fruits, naturally sweet.',
    subtitle: 'Juicy, ripe fruits sourced from orchards across India.',
    secondaryTitle: 'Seasonal Specials',
    secondarySubtitle: 'Limited harvest, peak ripeness.',
    heroImage: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1568702846914-96b305d2ead1?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Citrus', 'Berries', 'Tropical', 'Seasonal', 'Exotic'],
  },
  'atta-rice-dal': {
    tagline: 'Pantry staples you can trust.',
    subtitle: 'Premium atta, aged basmati, cold-pressed oils & unpolished dals.',
    secondaryTitle: 'Kitchen Must-Haves',
    secondarySubtitle: 'Stock up on daily cooking essentials.',
    heroImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Atta & Flour', 'Rice', 'Oil & Ghee', 'Dal & Pulses', 'Salt & Sugar'],
  },
  'snacks-munchies': {
    tagline: 'Crunch, munch & everything delicious.',
    subtitle: 'Chips, namkeen, biscuits & more for every craving.',
    secondaryTitle: 'Bestselling Snacks',
    secondarySubtitle: 'Top picks loved by thousands.',
    heroImage: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Chips & Crisps', 'Namkeen', 'Biscuits', 'Health Bars', 'Dry Fruits'],
  },
  'bakery-biscuits': {
    tagline: 'Baked fresh, delivered warm.',
    subtitle: 'Artisan breads, cookies, cakes & bakery treats.',
    secondaryTitle: 'Baked Today',
    secondarySubtitle: 'Fresh bread & bakery delights.',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1486427944544-d2c246c4df6d?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Bread', 'Cookies', 'Cakes', 'Pav & Buns', 'Rusk'],
  },
  'cold-drinks-juices': {
    tagline: 'Stay refreshed, stay cool.',
    subtitle: 'Chilled beverages, fresh juices & sparkling drinks.',
    secondaryTitle: 'Summer Coolers',
    secondarySubtitle: 'Beat the heat with every sip.',
    heroImage: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Soft Drinks', 'Juices', 'Water', 'Energy Drinks', 'Mocktails'],
  },
  'tea-coffee-drinks': {
    tagline: 'Brew your perfect cup.',
    subtitle: 'Premium teas, aromatic coffees & specialty blends.',
    secondaryTitle: 'Morning Ritual',
    secondarySubtitle: 'Start your day right.',
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80',
    ],
    subFilters: ['Tea', 'Coffee', 'Green Tea', 'Herbal', 'Premixes'],
  },
};

/* ─── Sort options ───────────────────────────────────────────── */

type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'newest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest' },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => {
        const aPrice = a.variants.find((v) => v.id === a.defaultVariantId)?.price ?? 0;
        const bPrice = b.variants.find((v) => v.id === b.defaultVariantId)?.price ?? 0;
        return aPrice - bPrice;
      });
    case 'price_desc':
      return sorted.sort((a, b) => {
        const aPrice = a.variants.find((v) => v.id === a.defaultVariantId)?.price ?? 0;
        const bPrice = b.variants.find((v) => v.id === b.defaultVariantId)?.price ?? 0;
        return bPrice - aPrice;
      });
    case 'newest':
      return sorted.reverse();
    case 'popularity':
    default:
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

/* ─── Tag-based sub-filter matching ──────────────────────────── */

function matchesFilter(product: Product, filter: string): boolean {
  const f = filter.toLowerCase();
  // Check product tags, name, and brand
  return (
    product.tags.some((t) => t.toLowerCase().includes(f) || f.includes(t.toLowerCase())) ||
    product.name.toLowerCase().includes(f) ||
    product.brand.toLowerCase().includes(f)
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

export function CategoryClient({ slug }: { slug: string }) {
  const { data: categories } = useCategoriesQuery();
  const currentCat = categories?.find((c) => c.slug === slug);
  const { data: products, isLoading } = useProductsQuery({ categorySlug: slug });

  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get category-specific hero content (fallback for unknown categories)
  const heroContent = CATEGORY_HERO_MAP[slug] ?? {
    tagline: 'Quality products, delivered fast.',
    subtitle: 'Browse our curated selection and add to cart.',
    secondaryTitle: 'Top Picks',
    secondarySubtitle: 'Most popular in this category.',
    heroImage: currentCat?.imageUrl ?? '',
    secondaryImages: [],
    subFilters: [],
  };

  // Build filter list from hero data
  const filterOptions = useMemo(() => ['All', ...heroContent.subFilters], [heroContent.subFilters]);

  // Filter and sort products
  const displayProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;
    if (activeFilter !== 'All') {
      filtered = products.filter((p) => matchesFilter(p, activeFilter));
    }
    return sortProducts(filtered, sortBy);
  }, [products, activeFilter, sortBy]);

  // Related categories (exclude current)
  const relatedCategories = useMemo(
    () => categories?.filter((c) => c.slug !== slug).slice(0, 8) ?? [],
    [categories, slug]
  );

  const productCount = products?.length ?? 0;
  const filteredCount = displayProducts.length;
  const displayCount = activeFilter === 'All' ? productCount : filteredCount;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-16">
      {/* ── Breadcrumb ─────────────────────────────────── */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-ink-300" />
        <span className="text-ink font-bold">{currentCat?.name || slug}</span>
      </nav>

      {/* ── Category Hero ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
        {/* Main Banner */}
        <div className="sm:col-span-3 relative overflow-hidden rounded-card min-h-[200px] sm:min-h-[220px] bg-ink-800">
          {heroContent.heroImage && (
            <Image
              src={heroContent.heroImage}
              alt={currentCat?.name || 'Category'}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full">
            <span className="inline-block bg-basil/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider mb-3 w-fit backdrop-blur-sm">
              {currentCat?.name || 'Category'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {currentCat?.name || 'Category'}
            </h1>
            <p className="text-xs sm:text-sm text-white/75 mt-1.5 max-w-md leading-relaxed">
              {heroContent.tagline}
            </p>
          </div>
        </div>

        {/* Secondary Panel */}
        <div className="sm:col-span-2 bg-sage rounded-card p-5 sm:p-6 border border-sage-dark flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-basil">{heroContent.secondaryTitle}</h3>
            <p className="text-xs text-ink-500 mt-1">{heroContent.secondarySubtitle}</p>
          </div>
          {heroContent.secondaryImages.length > 0 && (
            <div className="flex gap-3 mt-4">
              {heroContent.secondaryImages.map((imgUrl, i) => (
                <div key={i} className="w-20 h-20 rounded-card bg-surface-muted overflow-hidden relative flex-shrink-0">
                  <Image
                    src={imgUrl}
                    alt={`${heroContent.secondaryTitle} item ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Category Info Strip ────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 text-xs text-ink-500 font-medium">
        <span className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5 text-basil" />
          {currentCat?.itemCount ?? productCount} products
        </span>
        <span className="hidden sm:inline text-ink-200">·</span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-mango" />
          {heroContent.subtitle.length > 50 ? 'Fresh essentials' : heroContent.tagline.replace('.', '')}
        </span>
        <span className="hidden sm:inline text-ink-200">·</span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-ink-400" />
          10 min delivery
        </span>
      </div>

      {/* ── Filter / Sort Bar ──────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Left: product count + filter pills */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-bold text-ink shrink-0">
            {displayCount} {displayCount === 1 ? 'product' : 'products'}
          </span>
          <div className="h-4 w-px bg-mist shrink-0 hidden sm:block" />
          {/* Scrollable filter pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-pill border transition-all duration-200 whitespace-nowrap',
                  activeFilter === filter
                    ? 'bg-basil text-white border-basil shadow-pill'
                    : 'bg-white text-ink-500 border-mist hover:border-ink-200 hover:text-ink'
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right: sort dropdown */}
        <div ref={sortRef} className="relative shrink-0">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 bg-white border border-mist px-3.5 py-2 rounded-card text-xs font-bold text-ink hover:border-ink-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-ink-400" />
            <span className="text-ink-400 font-medium">Sort:</span>
            <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</span>
            <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showSortMenu && 'rotate-180')} />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 top-full mt-1.5 z-30 bg-white rounded-card border border-mist shadow-float py-1.5 min-w-[180px] animate-fadeIn">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setShowSortMenu(false);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-xs font-medium transition-colors flex items-center justify-between gap-3',
                    sortBy === opt.value
                      ? 'text-basil font-bold bg-basil-light'
                      : 'text-ink-600 hover:bg-cream'
                  )}
                >
                  {opt.label}
                  {sortBy === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, n) => (
            <div
              key={n}
              className="bg-white rounded-2xl overflow-hidden animate-fadeIn"
              style={{ animationDelay: `${n * 40}ms` }}
            >
              <Skeleton className="w-full aspect-square" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-2.5 w-1/2" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex items-center justify-between gap-2 pt-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-8 w-20 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayProducts.length === 0 ? (
        /* ── Empty State ────────────────────────────────── */
        <div className="text-center py-20 bg-cream rounded-2xl animate-fadeInUp">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mist flex items-center justify-center">
            <Package className="w-7 h-7 text-ink-300" />
          </div>
          <h3 className="text-lg font-bold text-ink mb-2">No products found</h3>
          <p className="text-sm text-ink-400 mb-6 max-w-sm mx-auto">
            {activeFilter !== 'All'
              ? `No products matching "${activeFilter}" in this category. Try another filter or browse all products.`
              : 'This category is currently empty. Check back soon or explore other categories.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            {activeFilter !== 'All' && (
              <button
                onClick={() => setActiveFilter('All')}
                className="px-5 py-2.5 text-xs font-bold border-2 border-basil text-basil hover:bg-basil hover:text-white rounded-pill transition-colors"
              >
                Clear Filters
              </button>
            )}
            <Link
              href="/"
              className="px-5 py-2.5 text-xs font-bold bg-basil text-white hover:bg-basil-hover rounded-pill transition-colors"
            >
              Browse All Groceries
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayProducts.map((product, i) => (
            <div
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* ── Related Categories ─────────────────────────── */}
      {relatedCategories.length > 0 && (
        <section className="mt-14 pt-10 border-t border-mist">
          <h2 className="text-lg font-black text-ink mb-5">Shop More</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {relatedCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex items-center gap-3 shrink-0 bg-white border border-mist rounded-card px-4 py-3 hover:border-basil/30 hover:shadow-card transition-all duration-200 animate-fadeInUp"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden relative flex-shrink-0"
                  style={{ backgroundColor: cat.accentColor || '#F6F8F5' }}
                >
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-ink group-hover:text-basil transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-ink-400 block">{cat.itemCount} items</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

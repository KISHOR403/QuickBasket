'use client';

import React, { useState, useMemo } from 'react';
import { useCartStore } from '@/store/cart';
import { useProductsQuery } from '@quickbasket/api-client';
import { Product, ProductVariant } from '@quickbasket/types';

type ShoppingIntent = 'breakfast' | 'healthy' | 'family' | 'budget';

interface IntentConfig {
  id: ShoppingIntent;
  label: string;
  tagline: string;
  badge: string;
  description: string;
  baseTone: string;
  activeTone: string;
  borderTone: string;
  accentColor: string;
  icon: React.ReactNode;
  categoryFilter: string[];
}

const INTENT_CONFIGS: IntentConfig[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    tagline: 'MORNING BASICS',
    badge: 'FRESH DAWN',
    description: 'Pasture eggs, artisan sourdough, organic milk & fresh citrus.',
    baseTone: 'bg-[#faf6ee] hover:bg-[#f4ebe0]',
    activeTone: 'bg-[#f4e8d3] border-[#c8924b] text-ink ring-1 ring-[#c8924b]/40',
    borderTone: 'border-[#ecdcc2]',
    accentColor: '#b07417',
    categoryFilter: ['dairy-bread-eggs', 'fruits-vegetables', 'beverages'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M4 8h14v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="5" />
        <line x1="10" y1="2" x2="10" y2="5" />
        <line x1="14" y1="2" x2="14" y2="5" />
      </svg>
    ),
  },
  {
    id: 'healthy',
    label: 'Healthy',
    tagline: 'CLEAN BOTANICALS',
    badge: 'MICRO-HARVEST',
    description: 'Organic greens, high-antioxidant berries, sprouted pulses & curd.',
    baseTone: 'bg-[#f1f6f3] hover:bg-[#e4ede6]',
    activeTone: 'bg-[#dfede3] border-basil text-ink ring-1 ring-basil/40',
    borderTone: 'border-[#cde0d3]',
    accentColor: '#1a6b42',
    categoryFilter: ['fruits-vegetables', 'dairy-bread-eggs', 'staples'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-9" />
        <path d="M12 13a6 6 0 0 0 6-6c0-3.3-2.7-5-6-5s-6 1.7-6 5a6 6 0 0 0 6 6z" />
      </svg>
    ),
  },
  {
    id: 'family',
    label: 'Family',
    tagline: 'HEARTH & SUPPER',
    badge: 'FULL PANTRY',
    description: 'Farm vegetables, stone-ground flour, bronze pasta & aromatic spices.',
    baseTone: 'bg-[#f8f3ed] hover:bg-[#f0e4dc]',
    activeTone: 'bg-[#eddcd0] border-[#b84d2a] text-ink ring-1 ring-[#b84d2a]/40',
    borderTone: 'border-[#dfcfbe]',
    accentColor: '#b84d2a',
    categoryFilter: ['fruits-vegetables', 'instant-food', 'staples', 'dairy-bread-eggs'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="8" y1="3" x2="9" y2="5" />
        <line x1="16" y1="3" x2="15" y2="5" />
      </svg>
    ),
  },
  {
    id: 'budget',
    label: 'Budget',
    tagline: 'DAILY VALUE',
    badge: 'UNDER ₹300',
    description: 'Onions, potatoes, essential toor dal, mustard oil & farm greens.',
    baseTone: 'bg-[#f7f5ee] hover:bg-[#eee8db]',
    activeTone: 'bg-[#eae3ce] border-[#455949] text-ink ring-1 ring-[#455949]/40',
    borderTone: 'border-[#dfd8c4]',
    accentColor: '#455949',
    categoryFilter: ['fruits-vegetables', 'staples'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v12" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
      </svg>
    ),
  },
];

interface CuratedItem {
  id: string;
  name: string;
  basePortion: string;
  scaledPortion: (people: number) => string;
  unitPrice: number;
  category: string;
  productSlug?: string;
}

const CURATED_LISTS: Record<ShoppingIntent, CuratedItem[]> = {
  breakfast: [
    {
      id: 'bf-1',
      name: 'Artisan Country Sourdough',
      basePortion: '400g loaf',
      scaledPortion: (p) => `${p > 3 ? '2 × 400g loaves' : '400g loaf'}`,
      unitPrice: 85,
      category: 'Bakery',
    },
    {
      id: 'bf-2',
      name: 'Pasture-Raised Brown Eggs',
      basePortion: '6 eggs pack',
      scaledPortion: (p) => `${p > 2 ? (p > 4 ? '18 eggs pack' : '12 eggs pack') : '6 eggs pack'}`,
      unitPrice: 78,
      category: 'Dairy',
    },
    {
      id: 'bf-3',
      name: 'Single-Origin Cold Brew',
      basePortion: '500 ml glass bottle',
      scaledPortion: (p) => `${p > 3 ? '1 Litre bottle' : '500 ml bottle'}`,
      unitPrice: 95,
      category: 'Beverage',
    },
    {
      id: 'bf-4',
      name: 'A2 Organic Farm Milk',
      basePortion: '500 ml pouch',
      scaledPortion: (p) => `${p > 2 ? '1 Litre pack' : '500 ml pouch'}`,
      unitPrice: 38,
      category: 'Dairy',
    },
    {
      id: 'bf-5',
      name: 'Valencia Table Oranges',
      basePortion: '500g crate',
      scaledPortion: (p) => `${p > 2 ? `${Math.ceil(p * 0.4)} kg crate` : '500g crate'}`,
      unitPrice: 62,
      category: 'Fresh Fruit',
    },
  ],
  healthy: [
    {
      id: 'hl-1',
      name: 'Organic Hass Avocado',
      basePortion: '1 pc (Ripe)',
      scaledPortion: (p) => `${Math.max(1, Math.ceil(p * 0.6))} pcs (Ripe)`,
      unitPrice: 89,
      category: 'Fresh Produce',
    },
    {
      id: 'hl-2',
      name: 'Hydroponic Tuscan Kale',
      basePortion: '200g bunch',
      scaledPortion: (p) => `${p > 3 ? '400g bunch' : '200g bunch'}`,
      unitPrice: 55,
      category: 'Greens',
    },
    {
      id: 'hl-3',
      name: 'Wild Blueberries (Cold-Chain)',
      basePortion: '125g punnet',
      scaledPortion: (p) => `${p > 3 ? '2 × 125g punnets' : '125g punnet'}`,
      unitPrice: 110,
      category: 'Berries',
    },
    {
      id: 'hl-4',
      name: 'Artisanal Greek Curd',
      basePortion: '400g tub',
      scaledPortion: (p) => `${p > 3 ? '2 × 400g tubs' : '400g tub'}`,
      unitPrice: 75,
      category: 'Dairy',
    },
    {
      id: 'hl-5',
      name: 'Sprouted Moong & Clover',
      basePortion: '200g box',
      scaledPortion: (p) => `${p > 3 ? '400g box' : '200g box'}`,
      unitPrice: 42,
      category: 'Sprouts',
    },
  ],
  family: [
    {
      id: 'fm-1',
      name: 'San Marzano Vine Tomatoes',
      basePortion: '500g pack',
      scaledPortion: (p) => `${(p * 0.35).toFixed(1)} kg pack`,
      unitPrice: 48,
      category: 'Vegetables',
    },
    {
      id: 'fm-2',
      name: 'Bronze-Cut Artisanal Rigatoni',
      basePortion: '500g box',
      scaledPortion: (p) => `${p > 3 ? '1 kg pack' : '500g box'}`,
      unitPrice: 120,
      category: 'Pantry',
    },
    {
      id: 'fm-3',
      name: 'Grass-Fed Fresh Malai Paneer',
      basePortion: '200g pack',
      scaledPortion: (p) => `${p > 2 ? (p > 4 ? '500g block' : '400g block') : '200g pack'}`,
      unitPrice: 85,
      category: 'Dairy',
    },
    {
      id: 'fm-4',
      name: 'Farm Green Spinach & Basil',
      basePortion: '250g bunch',
      scaledPortion: (p) => `${p > 2 ? '500g bunch' : '250g bunch'}`,
      unitPrice: 35,
      category: 'Fresh Greens',
    },
    {
      id: 'fm-5',
      name: 'Shimla Royal Delicious Apples',
      basePortion: '4 pcs (~600g)',
      scaledPortion: (p) => `${Math.max(4, p * 2)} pcs (~${(p * 0.3).toFixed(1)} kg)`,
      unitPrice: 98,
      category: 'Fruits',
    },
  ],
  budget: [
    {
      id: 'bg-1',
      name: 'Nasik Red Onions',
      basePortion: '1 kg bag',
      scaledPortion: (p) => `${p > 3 ? '2 kg bag' : '1 kg bag'}`,
      unitPrice: 38,
      category: 'Vegetables',
    },
    {
      id: 'bg-2',
      name: 'Pahadi Yellow Potatoes',
      basePortion: '1 kg bag',
      scaledPortion: (p) => `${p > 3 ? '2 kg bag' : '1 kg bag'}`,
      unitPrice: 32,
      category: 'Vegetables',
    },
    {
      id: 'bg-3',
      name: 'Unpolished Toor Dal',
      basePortion: '500g pack',
      scaledPortion: (p) => `${p > 3 ? '1 kg pack' : '500g pack'}`,
      unitPrice: 78,
      category: 'Staples',
    },
    {
      id: 'bg-4',
      name: 'Dew Fresh Coriander & Green Chillies',
      basePortion: '1 bunch + 100g',
      scaledPortion: () => '1 combo pack',
      unitPrice: 18,
      category: 'Herbs & Chillies',
    },
    {
      id: 'bg-5',
      name: 'Fresh Kagzi Lemons',
      basePortion: '4 pcs',
      scaledPortion: (p) => `${Math.max(4, p * 2)} pcs`,
      unitPrice: 22,
      category: 'Produce',
    },
  ],
};

export function SmartShopping() {
  const [selectedIntent, setSelectedIntent] = useState<ShoppingIntent>('breakfast');
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [isListGenerated, setIsListGenerated] = useState<boolean>(false);
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const { addItem } = useCartStore();
  const { data: realProducts } = useProductsQuery();

  // Curated list for the active intent
  const currentItems = useMemo(() => {
    return CURATED_LISTS[selectedIntent];
  }, [selectedIntent]);

  // Household description helper
  const getHouseholdNote = (count: number) => {
    if (count === 1) return 'Solo pantry';
    if (count === 2) return "Couple's basket";
    if (count === 3) return 'Small household';
    if (count === 4) return 'Family table (4)';
    return `Feast crate (${count} people)`;
  };

  // When intent changes, reset or update checked items
  const handleIntentSelect = (intent: ShoppingIntent) => {
    setSelectedIntent(intent);
    // Auto check all items for the new intent
    setCheckedItemIds(CURATED_LISTS[intent].map((i) => i.id));
  };

  // Adjust count
  const handleDecrement = () => {
    setPeopleCount((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setPeopleCount((prev) => Math.min(8, prev + 1));
  };

  // Build List CTA
  const handleBuildList = () => {
    setCheckedItemIds(currentItems.map((i) => i.id));
    setIsListGenerated(true);
  };

  const toggleItem = (id: string) => {
    setCheckedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total price based on scaled quantities
  const multiplier = peopleCount > 3 ? (peopleCount > 5 ? 1.9 : 1.5) : peopleCount === 1 ? 0.8 : 1.0;
  const activeItems = currentItems.filter((i) => checkedItemIds.includes(i.id));
  const estimatedTotal = Math.round(
    activeItems.reduce((acc, item) => acc + item.unitPrice * multiplier, 0)
  );

  // Add all selected items into actual cart store
  const handleAddAllToCart = () => {
    activeItems.forEach((curated, idx) => {
      // Find matching mock product if available, or generate a realistic CartItem
      const matchingProduct = realProducts?.find((p) =>
        p.name.toLowerCase().includes(curated.name.toLowerCase().split(' ')[0])
      );

      const product: Product = matchingProduct || {
        id: `list-${curated.id}`,
        name: curated.name,
        slug: curated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        brand: 'QuickBasket Curated',
        categoryId: 'cat-1',
        categorySlug: 'groceries',
        vendorId: 'vendor-1',
        vendorName: 'QuickBasket Dark Store #04',
        description: `Freshly provisioned for ${peopleCount} people: ${curated.scaledPortion(peopleCount)}`,
        images: ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'],
        rating: 4.9,
        reviewCount: 120 + idx * 15,
        defaultVariantId: `var-${curated.id}`,
        variants: [
          {
            id: `var-${curated.id}`,
            name: curated.scaledPortion(peopleCount),
            price: Math.round(curated.unitPrice * multiplier),
            mrp: Math.round(curated.unitPrice * multiplier * 1.15),
            inStock: true,
            stockCount: 50,
            unit: 'pack',
          },
        ],
        isExpress: true,
        tags: ['Curated List', selectedIntent],
      };

      const variant: ProductVariant = product.variants[0];
      addItem(product, variant, 1);
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  return (
    <section className="py-20 md:py-28 bg-[#faf8f5] border-b border-ink/[0.08] relative overflow-hidden selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.28em] text-basil uppercase font-bold flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block animate-pulseFast" />
              <span>CUSTOM PROVISIONING · HARVEST ASSISTANT</span>
            </div>
            
            {/* Required exact headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-ink tracking-tight uppercase leading-none">
              BUILD YOUR GROCERY LIST
            </h2>
          </div>

          <p className="text-xs sm:text-[13px] text-ink-500 font-sans max-w-sm leading-relaxed">
            Specify your meal intent and household size. Our algorithm builds an itemized harvest basket packed in 10 minutes.
          </p>
        </div>

        {/* Interactive Builder Container */}
        <div className="bg-white border border-ink/[0.1] rounded-none p-6 sm:p-8 md:p-12 shadow-[0_16px_40px_-20px_rgba(15,26,20,0.06)] relative overflow-hidden">
          
          {/* Subtle architectural grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#0f1a14 1px, transparent 1px), linear-gradient(90deg, #0f1a14 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Controls Column (Form inputs) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              {/* Question 1: What are you shopping for? */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">
                    01 // INTENT
                  </span>
                  <span className="font-mono text-[10px] text-basil tracking-widest uppercase font-semibold">
                    Select 1 of 4
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
                  What are you shopping for?
                </h3>

                {/* 4 Intent Options: [ Breakfast ] [ Healthy ] [ Family ] [ Budget ] */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {INTENT_CONFIGS.map((intent) => {
                    const isSelected = selectedIntent === intent.id;
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => handleIntentSelect(intent.id)}
                        className={`group relative p-4 border text-left transition-all duration-300 flex flex-col justify-between min-h-[110px] ${
                          isSelected
                            ? intent.activeTone
                            : `${intent.baseTone} ${intent.borderTone} text-ink hover:-translate-y-0.5`
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`p-1.5 rounded-full transition-colors ${
                            isSelected ? 'bg-white text-ink shadow-2xs' : 'bg-black/[0.04] text-ink-600'
                          }`}>
                            {intent.icon}
                          </span>
                          <span className="font-mono text-[9px] tracking-wider uppercase opacity-60">
                            {intent.badge}
                          </span>
                        </div>

                        <div>
                          <div className="font-display text-base sm:text-lg font-bold tracking-tight">
                            {intent.label}
                          </div>
                          <div className="font-mono text-[9px] tracking-widest uppercase opacity-70 mt-0.5">
                            {intent.tagline}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-basil" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: How many people? */}
              <div className="pt-6 border-t border-ink/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-ink-400 uppercase">
                    02 // PORTIONS
                  </span>
                  <span className="font-mono text-[10px] text-ink-500 uppercase tracking-wider">
                    {getHouseholdNote(peopleCount)}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
                  How many people?
                </h3>

                {/* Tactile Stepper: −  2  + */}
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center border border-ink/20 bg-[#faf8f5] p-1.5">
                    {/* Decrement Button (−) */}
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={peopleCount <= 1}
                      aria-label="Decrease people count"
                      className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-ink bg-white border border-ink/10 hover:bg-ink hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 active:scale-95 shadow-2xs"
                    >
                      −
                    </button>

                    {/* Numeric Display */}
                    <div className="w-16 sm:w-20 text-center">
                      <span className="font-display text-2xl sm:text-3xl font-black text-ink block leading-none">
                        {peopleCount}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-ink-400 block mt-1">
                        {peopleCount === 1 ? 'PERSON' : 'PEOPLE'}
                      </span>
                    </div>

                    {/* Increment Button (+) */}
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={peopleCount >= 8}
                      aria-label="Increase people count"
                      className="w-12 h-12 flex items-center justify-center font-mono text-xl font-bold text-ink bg-white border border-ink/10 hover:bg-ink hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 active:scale-95 shadow-2xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Dynamic Scaling Info Pill */}
                  <div className="hidden sm:flex flex-col text-xs font-sans text-ink-500 max-w-[220px]">
                    <span className="font-medium text-ink">Auto-calibrated portions:</span>
                    <span className="text-[11px] leading-relaxed text-ink-400">
                      Produce weights and pantry packs automatically adjust to avoid food waste.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: [ BUILD MY LIST → ] */}
              <div className="pt-6 border-t border-ink/[0.06]">
                <button
                  type="button"
                  onClick={handleBuildList}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-white font-mono text-xs sm:text-sm font-bold tracking-[0.16em] uppercase hover:bg-basil transition-all duration-300 hover:shadow-[0_12px_28px_-10px_rgba(26,107,66,0.35)] active:scale-[0.98]"
                >
                  <span>BUILD MY LIST</span>
                  <span className="font-mono text-base transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Result Column (Curated List Preview) */}
            <div className="lg:col-span-5 bg-[#faf8f5] border border-ink/[0.08] p-6 sm:p-7 flex flex-col justify-between relative">
              
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-ink/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-basil animate-pulseFast" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-ink">
                      {selectedIntent.toUpperCase()} CRATE // {peopleCount} {peopleCount === 1 ? 'PORTION' : 'PORTIONS'}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-ink-400">
                    {activeItems.length} of {currentItems.length} items
                  </span>
                </div>

                {/* Items Checklist */}
                <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
                  {currentItems.map((item) => {
                    const isChecked = checkedItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'bg-white border-black/10 shadow-2xs'
                            : 'bg-white/40 border-black/5 opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Minimalist Square Checkbox */}
                          <div className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-basil border-basil text-white' : 'border-ink/30 bg-white'
                          }`}>
                            {isChecked && (
                              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 stroke-white stroke-[2.2]">
                                <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                              </svg>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-xs sm:text-[13px] font-bold text-ink truncate leading-tight">
                              {item.name}
                            </div>
                            <div className="font-mono text-[10px] text-ink-400 mt-0.5">
                              {item.scaledPortion(peopleCount)} · {item.category}
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-xs font-bold text-ink shrink-0">
                          ₹{Math.round(item.unitPrice * multiplier)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basket Summary & Add to Cart Action */}
              <div className="mt-6 pt-5 border-t border-ink/[0.08]">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400 block">
                      Estimated Crate Total
                    </span>
                    <span className="font-mono text-[10px] text-basil font-semibold">
                      ⚡ 10-Min Flash Packed
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-display text-2xl font-bold text-ink">
                      ₹{estimatedTotal}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  disabled={activeItems.length === 0}
                  className={`w-full py-3.5 px-4 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToast
                      ? 'bg-basil text-white'
                      : 'bg-ink hover:bg-basil text-white active:scale-[0.98]'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <span>✓ {activeItems.length} ITEMS ADDED TO CART</span>
                    </>
                  ) : (
                    <>
                      <span>+ ADD ALL {activeItems.length} ITEMS TO BASKET</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

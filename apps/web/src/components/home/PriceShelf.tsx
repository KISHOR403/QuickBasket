'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { Product, ProductVariant } from '@quickbasket/types';
import { formatCurrency } from '@quickbasket/utils';
import { MOCK_PRODUCTS } from '@quickbasket/mocks';
import { useCartStore } from '@/store/cart';
import { Skeleton } from '@/components/ui/Skeleton';

interface PriceShelfProps {
  products?: Product[];
  isLoading?: boolean;
}

export function PriceShelf({ products, isLoading }: PriceShelfProps) {
  const { items, addItem, updateQuantity } = useCartStore();

  // Helper to extract default/cheapest variant
  const getVariant = (product: Product): ProductVariant => {
    return (
      product.variants.find((v) => v.id === product.defaultVariantId) ||
      product.variants[0]
    );
  };

  const getItemQty = (product: Product, variant: ProductVariant): number => {
    const cartItem = items.find(
      (item) => item.productId === product.id && item.variantId === variant.id
    );
    return cartItem?.quantity || 0;
  };

  // Use provided products or fallback to mock products for zero-flicker SSR
  const sourceProducts = products && products.length > 0 ? products : MOCK_PRODUCTS;

  // Filter products under ₹100 and sort ascending by price
  const affordableList = sourceProducts
    .map((p) => ({
      product: p,
      variant: getVariant(p),
    }))
    .filter((item) => item.variant && item.variant.price <= 100)
    .sort((a, b) => a.variant.price - b.variant.price);

  // Pick 6 distinct items spanning different prices for the shelf progression
  const displayItems = affordableList.slice(0, 6);

  return (
    <section className="py-12 md:py-16 bg-[#faf8f5] border-b border-ink/[0.06] selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>RAPID SCAN PANTRY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              Under <span className="font-serif italic font-normal text-ink-600">₹100.</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase hidden md:flex items-center gap-3">
            <span>PRICE SHELF</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-semibold">SORTED ASCENDING</span>
          </div>
        </div>

        {/* Shelf Rail Design */}
        <div className="relative">
          {/* Subtle horizontal shelf guideline running behind the items */}
          <div className="hidden lg:block absolute top-[62px] left-0 right-0 h-px bg-ink/10 pointer-events-none" />

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 bg-white border border-ink/[0.08] rounded-xl flex flex-col items-center">
                  <Skeleton className="h-7 w-16 mb-2" />
                  <Skeleton className="h-4 w-1 mb-2" />
                  <Skeleton className="w-14 h-14 rounded-lg mb-3" />
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-12 mb-3" />
                  <Skeleton className="h-7 w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {displayItems.map(({ product, variant }) => {
                const qty = getItemQty(product, variant);

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col justify-between bg-white rounded-xl p-4 sm:p-5 border border-ink/[0.08] hover:border-ink/25 hover:shadow-md transition-all duration-200"
                  >
                    {/* Top: Big Price */}
                    <div className="text-center">
                      <div className="font-mono text-2xl sm:text-[1.75rem] font-black text-ink tracking-tight group-hover:text-basil transition-colors">
                        {formatCurrency(variant.price)}
                      </div>
                      
                      {/* Shelf Connector Notch (│) */}
                      <div className="flex justify-center my-1.5">
                        <div className="w-px h-3.5 bg-ink/25 group-hover:bg-basil transition-colors" />
                      </div>

                      {/* Small Product Thumbnail */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="block relative w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-lg overflow-hidden bg-[#f4f2ec] border border-ink/[0.06] my-2 transition-transform duration-300 group-hover:scale-105"
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover object-center"
                        />
                      </Link>

                      {/* Product Name & Measurement */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="block font-display text-xs sm:text-sm font-bold text-ink hover:text-basil transition-colors leading-tight line-clamp-1 mt-1"
                      >
                        {product.name}
                      </Link>
                      <div className="font-mono text-[10.5px] text-ink-400 mt-0.5 truncate">
                        {variant.name || variant.unit}
                      </div>
                    </div>

                    {/* Bottom: Very Quick 1-Tap Interaction */}
                    <div className="pt-3 mt-3 border-t border-ink/[0.06]">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between bg-basil text-white px-2 py-1 rounded-md text-xs font-mono">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, variant.id, qty - 1)}
                            className="hover:bg-white/20 p-1 rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, variant.id, qty + 1)}
                            className="hover:bg-white/20 p-1 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addItem(product, variant, 1)}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-ink/[0.04] hover:bg-ink hover:text-white text-ink font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-150 active:scale-95"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

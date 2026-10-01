'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { Product, ProductVariant } from '@quickbasket/types';
import { formatCurrency } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { Skeleton } from '@/components/ui/Skeleton';

export interface FeaturedProductsProps {
  eyebrow?: string;
  title?: string;
  products?: Product[];
  isLoading?: boolean;
}

export function FeaturedProducts({
  eyebrow,
  title,
  products,
  isLoading,
}: FeaturedProductsProps) {
  const { items, addItem, updateQuantity } = useCartStore();

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 md:py-20 bg-[#faf8f5] border-y border-ink/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-5 mb-6 sm:pb-8 sm:mb-10 border-b border-ink/[0.08]">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>{eyebrow || 'PICKED TODAY'}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-ink tracking-tight leading-tight">
              Fresh arrivals <span className="font-serif italic font-normal text-ink-600">from local suppliers.</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-5 lg:pr-10">
              <Skeleton className="w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[150px] sm:max-h-[220px] lg:max-h-[280px] mb-4 sm:mb-6" />
              <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
              <Skeleton className="h-3.5 sm:h-4 w-1/3 mb-4" />
              <Skeleton className="h-7 sm:h-8 w-24 sm:w-28" />
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="space-y-2 sm:space-y-3">
                  <Skeleton className="w-full aspect-[4/3] max-h-[115px] sm:max-h-[170px]" />
                  <Skeleton className="h-3.5 sm:h-4 w-2/3" />
                  <Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  const featured = products[0];
  const secondary = products.slice(1, 5);

  const getVariant = (product: Product): ProductVariant => {
    return product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
  };

  const getItemQty = (product: Product, variant: ProductVariant): number => {
    const cartItem = items.find(
      (item) => item.productId === product.id && item.variantId === variant.id
    );
    return cartItem?.quantity || 0;
  };

  const renderMinimalAction = (product: Product, variant: ProductVariant, isFeatured = false) => {
    const qty = getItemQty(product, variant);

    if (qty > 0) {
      return (
        <div className="inline-flex items-center border border-ink/25 px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono text-[11px] sm:text-xs bg-white select-none">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateQuantity(product.id, variant.id, qty - 1);
            }}
            className="hover:text-basil p-0.5 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
          <span className="font-bold min-w-[18px] sm:min-w-[20px] text-center text-ink">{qty}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateQuantity(product.id, variant.id, qty + 1);
            }}
            className="hover:text-basil p-0.5 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addItem(product, variant, 1);
        }}
        className={`inline-flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink hover:text-white bg-transparent hover:bg-ink border border-ink/30 hover:border-ink transition-all duration-200 active:scale-95 ${
          isFeatured ? 'px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold' : 'px-2 py-0.5 sm:px-2.5 sm:py-1'
        }`}
      >
        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        <span>Add</span>
      </button>
    );
  };

  const featuredVariant = featured ? getVariant(featured) : null;

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-[#faf8f5] border-y border-ink/[0.06] selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Magazine Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-8 mb-6 sm:mb-10 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>{eyebrow || 'PICKED TODAY'}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-ink tracking-tight leading-tight">
              Fresh arrivals <span className="font-serif italic font-normal text-ink-600">from local suppliers.</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase hidden md:flex items-center gap-3">
            <span>CURATED DAILY</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-semibold">FARM DIRECT INTAKE</span>
          </div>
        </div>

        {/* Editorial Collection Layout (Medium Featured Left + Staggered Secondary Right) */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* ── Left Column: Medium Featured Product Card (~1.4x scale on desktop, compact on mobile) ── */}
          {featured && featuredVariant && (
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-ink/[0.08] lg:pr-10 pb-6 sm:pb-8 lg:pb-0 group">
              <div>
                {/* Compact, Contained Image Frame */}
                <Link
                  href={`/product/${featured.slug}`}
                  className="block relative w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[150px] sm:max-h-[220px] lg:max-h-[280px] bg-[#f4f2ec] overflow-hidden mb-3 sm:mb-5 border border-ink/[0.04]"
                >
                  <Image
                    src={featured.images[0]}
                    alt={featured.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  {/* Subtle Freshness Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#faf8f5]/94 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] font-mono tracking-[0.16em] text-basil uppercase font-bold border-l-2 border-basil shadow-xs">
                    01 / FEATURED HARVEST
                  </div>
                </Link>

                {/* Freshness Badge / Origin tag */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] uppercase text-ink-400">
                  <span>{featured.brand || 'Regional Orchard'}</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-basil font-semibold">Dawn Picked</span>
                </div>

                {/* Product Name */}
                <Link
                  href={`/product/${featured.slug}`}
                  className="block font-display text-lg sm:text-xl md:text-2xl font-bold text-ink hover:text-basil transition-colors leading-snug tracking-tight"
                >
                  {featured.name}
                </Link>

                {/* Quantity */}
                <div className="font-mono text-[11px] sm:text-xs text-ink-500 mt-0.5 sm:mt-1">
                  {featuredVariant.name || featuredVariant.unit}
                </div>

                {/* Short Curation Note */}
                <p className="text-[11px] sm:text-xs text-ink-500 font-sans leading-relaxed mt-1.5 sm:mt-2.5 max-w-sm line-clamp-2">
                  {featured.description || 'Grown with organic practices and cold-chain transported to lock in peak flavor.'}
                </p>
              </div>

              {/* Price and Minimal Add Action */}
              <div className="flex items-center justify-between pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-ink/[0.08]">
                <div className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="font-mono text-base sm:text-lg font-bold text-ink">
                    {formatCurrency(featuredVariant.price)}
                  </span>
                  {featuredVariant.mrp > featuredVariant.price && (
                    <span className="font-mono text-[10px] sm:text-xs text-ink-400 line-through">
                      {formatCurrency(featuredVariant.mrp)}
                    </span>
                  )}
                </div>

                {renderMinimalAction(featured, featuredVariant, true)}
              </div>
            </div>
          )}

          {/* ── Right Column: 3–4 Smaller Products Arranged with 2-Column Grid on Mobile ── */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 lg:pl-2">
            {secondary.map((product, idx) => {
              const variant = getVariant(product);
              // Subtle staggered positioning on desktop
              const staggerClass = idx % 2 === 1 ? 'lg:translate-y-5' : 'lg:-translate-y-1';

              return (
                <div
                  key={product.id}
                  className={`flex flex-col justify-between border-b sm:border-b-0 pb-3 sm:pb-0 transition-transform duration-500 ${staggerClass} group`}
                >
                  <div>
                    {/* Compact Image Frame */}
                    <Link
                      href={`/product/${product.slug}`}
                      className="block relative w-full aspect-[4/3] max-h-[110px] sm:max-h-[150px] lg:max-h-[175px] bg-[#f4f2ec] overflow-hidden mb-2 sm:mb-3 border border-ink/[0.04]"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      {/* Freshness Badge */}
                      <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-[#faf8f5]/92 backdrop-blur-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[7.5px] sm:text-[8.5px] font-mono tracking-[0.12em] sm:tracking-[0.16em] text-ink-600 uppercase font-semibold border-l-2 border-ink/40">
                        {product.isOrganic ? 'ORGANIC' : `BATCH 0${idx + 2}`}
                      </div>
                    </Link>

                    {/* Freshness Tag */}
                    <div className="flex items-center gap-1 sm:gap-1.5 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-ink-400 mb-0.5 sm:mb-1 truncate">
                      <span>{product.brand}</span>
                      <span className="text-ink-300">·</span>
                      <span className="text-basil">Cold Chain</span>
                    </div>

                    {/* Product Name */}
                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-display text-xs sm:text-sm lg:text-base font-bold text-ink hover:text-basil transition-colors leading-snug line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    {/* Quantity */}
                    <div className="font-mono text-[10px] sm:text-[11px] text-ink-500 mt-0.5">
                      {variant.name || variant.unit}
                    </div>
                  </div>

                  {/* Price & Minimal Add Button */}
                  <div className="flex items-center justify-between pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-ink/[0.06]">
                    <div className="flex items-baseline gap-1 sm:gap-1.5">
                      <span className="font-mono text-xs sm:text-sm font-bold text-ink">
                        {formatCurrency(variant.price)}
                      </span>
                      {variant.mrp > variant.price && (
                        <span className="font-mono text-[9px] sm:text-[10px] text-ink-400 line-through">
                          {formatCurrency(variant.mrp)}
                        </span>
                      )}
                    </div>

                    {renderMinimalAction(product, variant, false)}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

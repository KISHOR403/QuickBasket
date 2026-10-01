'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, Star } from 'lucide-react';
import { Product } from '@quickbasket/types';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

export interface ProductCardProps {
  product: Product;
  size?: 'default' | 'large' | 'compact';
}

export function ProductCard({ product, size = 'default' }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const [imgLoaded, setImgLoaded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];

  const cartItem = items.find(
    (item: any) => item.productId === product.id && item.variantId === variant.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const discountPercent = calculateDiscount(variant.price, variant.mrp);
  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl transition-all duration-500 ease-smooth flex flex-col overflow-hidden border border-transparent',
        isLarge
          ? 'shadow-card hover:shadow-editorial hover:border-mist'
          : 'hover:shadow-float hover:border-mist',
        isCompact && 'flex-row items-center gap-3 p-3 rounded-xl'
      )}
    >
      {/* Discount tag */}
      {discountPercent > 0 && !isCompact && (
        <div className="absolute top-3 left-3 z-10 bg-basil text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
          {discountPercent}% OFF
        </div>
      )}

      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          'block relative overflow-hidden bg-cream/50',
          isLarge
            ? 'aspect-[4/5] rounded-t-2xl'
            : isCompact
              ? 'w-20 h-20 rounded-xl shrink-0'
              : 'aspect-[5/4] rounded-t-2xl'
        )}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={isLarge ? '(max-width: 768px) 100vw, 400px' : isCompact ? '80px' : '(max-width: 768px) 50vw, 220px'}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            'object-cover transition-all duration-700 ease-smooth',
            !isCompact && 'group-hover:scale-105',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </Link>

      {/* Content */}
      <div className={cn(
        'flex flex-col flex-grow',
        isCompact ? 'min-w-0 flex-1' : 'p-4'
      )}>
        {/* Brand */}
        {!isCompact && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-1">
            {product.brand}
          </span>
        )}

        {/* Name */}
        <Link
          href={`/product/${product.slug}`}
          className={cn(
            'font-bold text-ink hover:text-basil transition-colors leading-tight',
            isLarge ? 'text-base mb-1' : isCompact ? 'text-xs line-clamp-1' : 'text-sm line-clamp-2 mb-1 min-h-[36px]'
          )}
        >
          {product.name}
        </Link>

        {/* Variant */}
        <div className={cn(
          'text-ink-400 font-medium',
          isCompact ? 'text-[10px]' : 'text-[11px] mb-2'
        )}>
          {variant.name}
        </div>

        {/* Rating - only on large */}
        {isLarge && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 text-mango fill-mango" />
            <span className="text-xs font-bold text-ink">{product.rating}</span>
            <span className="text-[10px] text-ink-400">({product.reviewCount})</span>
          </div>
        )}

        {/* Price + Add */}
        <div className={cn(
          'flex items-center justify-between gap-2',
          isCompact ? 'mt-1' : 'mt-auto pt-2'
        )}>
          <div className="flex items-baseline gap-1.5">
            <span className={cn(
              'font-mono font-bold text-ink',
              isLarge ? 'text-lg' : isCompact ? 'text-sm' : 'text-sm'
            )}>
              {formatCurrency(variant.price)}
            </span>
            {variant.mrp > variant.price && (
              <span className="text-[10px] text-ink-300 line-through font-mono">
                {formatCurrency(variant.mrp)}
              </span>
            )}
          </div>

          {/* Add / Stepper */}
          <div className={cn(isCompact ? 'shrink-0' : 'shrink-0')}>
            {quantity === 0 ? (
              <button
                onClick={() => addItem(product, variant, 1)}
                className={cn(
                  'flex items-center justify-center rounded-xl border-2 border-basil text-basil font-bold transition-all active:scale-95',
                  'hover:bg-basil hover:text-white',
                  !isCompact && 'group-hover:bg-basil group-hover:text-white',
                  isCompact
                    ? 'w-8 h-8'
                    : 'gap-1 px-4 py-2 text-xs'
                )}
                aria-label="Add to cart"
              >
                <Plus className={cn(isCompact ? 'w-4 h-4' : 'w-3.5 h-3.5')} />
                {!isCompact && <span>Add</span>}
              </button>
            ) : (
              <div className="inline-flex items-center bg-basil text-white rounded-xl overflow-hidden">
                <button
                  onClick={() => updateQuantity(product.id, variant.id, quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => addItem(product, variant, 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

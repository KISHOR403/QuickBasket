'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import { Product } from '@quickbasket/types';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { QtyStepper } from './QtyStepper';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const [imgLoaded, setImgLoaded] = useState(false);

  // Cards surface a single pack size (the default). Picking between multiple
  // pack sizes happens on the product detail page, not inside the card.
  const variant =
    product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];

  const cartItem = items.find(
    (item: any) => item.productId === product.id && item.variantId === variant.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const discountPercent = calculateDiscount(variant.price, variant.mrp);

  return (
    <div className="group bg-surface border border-mist rounded-card p-3 shadow-card transition-all duration-300 ease-smooth hover:shadow-float hover:-translate-y-1 hover:border-basil/30 flex flex-col justify-between relative overflow-hidden">
      {/* Top badges */}
      <div className="flex justify-between items-start mb-2 z-10">
        {discountPercent > 0 ? (
          <Badge variant="beet" className="text-[10px] font-extrabold uppercase px-2">
            {discountPercent}% OFF
          </Badge>
        ) : (
          <div />
        )}

        {product.isExpress && (
          <Badge variant="leaf" className="text-[10px] px-1.5 py-0.5">
            <Zap className="w-3 h-3 fill-current text-mango" /> 10m
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative w-full aspect-square mb-2 overflow-hidden rounded-input bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basil/40"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          onLoad={() => setImgLoaded(true)}
          className={cn(
            'object-cover transition-[opacity,filter,transform] duration-500 ease-smooth group-hover:scale-105',
            imgLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
          )}
        />
      </Link>

      {/* Title & Brand */}
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="text-xs font-bold text-ink line-clamp-2 hover:text-basil transition-colors mt-0.5 mb-1 min-h-[32px] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basil/40"
        >
          {product.name}
        </Link>

        {/* Pack size — muted, static text (no in-card variant switching) */}
        <div className="text-[11px] font-medium text-ink-500 mb-3">{variant.name}</div>
      </div>

      {/* Bottom: price + mango ADD / qty stepper */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-mist/50 mt-auto">
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-sm font-black text-ink">{formatCurrency(variant.price)}</span>
          {variant.mrp > variant.price && (
            <span className="text-[10px] text-ink-400 line-through">
              {formatCurrency(variant.mrp)}
            </span>
          )}
        </div>

        {/* Fixed-width slot so ADD → stepper doesn't shift the layout */}
        <div className="w-[92px] shrink-0">
          <QtyStepper
            className="w-full"
            quantity={quantity}
            onIncrement={() => addItem(product, variant, 1)}
            onDecrement={() => updateQuantity(product.id, variant.id, quantity - 1)}
          />
        </div>
      </div>
    </div>
  );
}

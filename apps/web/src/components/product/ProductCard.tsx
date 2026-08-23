'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Star, Zap } from 'lucide-react';
import { Product } from '@quickbasket/types';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { QtyStepper } from './QtyStepper';
import { Badge } from '@/components/ui/Badge';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const { openVariantPicker } = useUiStore();

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.defaultVariantId || product.variants[0]?.id
  );

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const cartItem = items.find(
    (item: any) => item.productId === product.id && item.variantId === selectedVariant.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const discountPercent = calculateDiscount(selectedVariant.price, selectedVariant.mrp);

  return (
    <div className="group bg-surface border border-mist rounded-card p-3 shadow-card transition-all duration-300 hover:shadow-float hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden">
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
      <Link href={`/product/${product.slug}`} className="block relative w-full aspect-square mb-2 overflow-hidden rounded-input bg-surface-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Title & Brand */}
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="text-xs font-bold text-ink line-clamp-2 hover:text-basil transition-colors mt-0.5 mb-1 min-h-[32px]"
        >
          {product.name}
        </Link>

        {/* Variant selector button if multiple variants exist */}
        {product.variants.length > 1 ? (
          <button
            onClick={() => openVariantPicker(product)}
            className="w-full flex items-center justify-between text-[11px] font-semibold bg-mist/60 hover:bg-mist text-ink-700 px-2 py-1 rounded-badge mb-3 transition-colors border border-mist"
          >
            <span className="truncate">{selectedVariant.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-ink-500 shrink-0" />
          </button>
        ) : (
          <div className="text-[11px] font-medium text-ink-500 mb-3">
            {selectedVariant.name}
          </div>
        )}
      </div>

      {/* Bottom price and Qty Stepper */}
      <div className="flex items-center justify-between pt-2 border-t border-mist/50 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-sm font-black text-ink">
              {formatCurrency(selectedVariant.price)}
            </span>
            {selectedVariant.mrp > selectedVariant.price && (
              <span className="text-[10px] text-ink-400 line-through">
                {formatCurrency(selectedVariant.mrp)}
              </span>
            )}
          </div>
        </div>

        <QtyStepper
          quantity={quantity}
          onIncrement={() => addItem(product, selectedVariant, 1)}
          onDecrement={() => updateQuantity(product.id, selectedVariant.id, quantity - 1)}
        />
      </div>
    </div>
  );
}

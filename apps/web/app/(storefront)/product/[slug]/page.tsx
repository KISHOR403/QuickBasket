'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Zap, Star, Store, Truck } from 'lucide-react';
import { useProductBySlugQuery } from '@quickbasket/api-client';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { QtyStepper } from '@/components/product/QtyStepper';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: product, isLoading } = useProductBySlugQuery(slug);
  const { items, addItem, updateQuantity } = useCartStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const activeVariantId = selectedVariantId || product?.defaultVariantId || product?.variants[0]?.id;
  const selectedVariant = product?.variants.find((v) => v.id === activeVariantId) || product?.variants[0];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full aspect-square rounded-card" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full rounded-pill" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-ink">Product Not Found</h2>
        <Link href="/" className="text-basil hover:underline text-sm font-bold mt-2 block">
          Return to Home
        </Link>
      </div>
    );
  }

  const cartItem = items.find(
    (item: any) => item.productId === product.id && item.variantId === selectedVariant.id
  );
  const quantity = cartItem ? cartItem.quantity : 0;
  const discount = calculateDiscount(selectedVariant.price, selectedVariant.mrp);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-400">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${product.categorySlug}`} className="hover:text-ink">
          {product.categorySlug}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink font-bold truncate">{product.name}</span>
      </div>

      <div className="bg-surface rounded-card border border-mist p-6 shadow-card grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Image */}
        <div className="relative w-full aspect-square bg-surface-muted rounded-card overflow-hidden border border-mist">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
          {discount > 0 && (
            <Badge variant="beet" className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-ink-400 uppercase tracking-widest">
                {product.brand}
              </span>
              {product.isExpress && (
                <Badge variant="leaf">
                  <Zap className="w-3 h-3 text-mango fill-current" /> 10 MIN EXPRESS
                </Badge>
              )}
            </div>

            <h1 className="text-2xl font-black text-ink">{product.name}</h1>
            <p className="text-xs text-ink-500 mt-2 leading-relaxed">{product.description}</p>

            {/* Vendor badge */}
            <div className="mt-4 p-3 bg-surface-muted rounded-input border border-mist flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-ink">
                <Store className="w-4 h-4 text-basil" />
                <span>Sold by {product.vendorName}</span>
              </div>
              <span className="text-basil font-bold">★ {product.rating}</span>
            </div>

            {/* Variants Picker */}
            <div className="mt-6 space-y-2">
              <span className="text-xs font-extrabold uppercase text-ink-600">Select Variant / Pack Size</span>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = v.id === selectedVariant.id;
                  const vDiscount = calculateDiscount(v.price, v.mrp);

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-3 rounded-input border text-left transition-all ${
                        isSelected
                          ? 'border-basil bg-basil-light/40 shadow-sm'
                          : 'border-mist bg-surface hover:border-mist-dark'
                      }`}
                    >
                      <div className="text-xs font-bold text-ink">{v.name}</div>
                      <div className="flex items-baseline gap-1 font-mono mt-1">
                        <span className="text-sm font-black text-ink">{formatCurrency(v.price)}</span>
                        {v.mrp > v.price && (
                          <span className="text-[10px] text-ink-400 line-through">
                            {formatCurrency(v.mrp)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price & Add to Cart Action */}
          <div className="pt-6 border-t border-mist flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-ink-400">Total Price</span>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-2xl font-black text-basil">
                  {formatCurrency(selectedVariant.price)}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-xs text-ink-400 line-through">
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
      </div>
    </div>
  );
}

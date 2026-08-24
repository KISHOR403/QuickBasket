'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Zap, Store, Truck, Leaf } from 'lucide-react';
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
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
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
        <Link href={`/category/${product.categorySlug}`} className="hover:text-ink capitalize">
          {product.categorySlug?.replace(/-/g, ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink font-bold truncate">{product.name}</span>
      </div>

      <div className="bg-surface rounded-card border border-mist shadow-card grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Image */}
        <div className="p-6">
          <div className="relative w-full aspect-square bg-surface-muted rounded-card overflow-hidden border border-mist">
            <Image
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {discount > 0 && (
              <Badge variant="beet" className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1">
                FRESH ARRIVAL
              </Badge>
            )}
          </div>

          {/* Image thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-16 rounded-input overflow-hidden border-2 transition-all ${
                    idx === selectedImageIdx ? 'border-basil' : 'border-mist hover:border-ink-200'
                  }`}
                >
                  <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-ink-400 uppercase tracking-widest">
                {product.brand}
              </span>
              {product.isExpress && (
                <Badge variant="leaf">
                  <Zap className="w-3 h-3 text-mango fill-current" /> 10 MIN EXPRESS
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-black text-ink leading-tight">{product.name}</h1>
            <p className="text-sm text-ink-500 mt-3 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4 font-mono">
              <span className="text-3xl font-black text-ink">
                {formatCurrency(selectedVariant.price)}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-base text-ink-400 line-through">
                  {formatCurrency(selectedVariant.mrp)}
                </span>
              )}
            </div>

            {/* Vendor badge */}
            <div className="mt-4 p-3 bg-surface-muted rounded-card border border-mist flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-bold text-ink">
                <Store className="w-4 h-4 text-basil" />
                <span>Sold by {product.vendorName}</span>
              </div>
              <span className="text-basil font-bold">★ {product.rating}</span>
            </div>

            {/* Variants Picker */}
            <div className="mt-6 space-y-2">
              <span className="text-xs font-extrabold uppercase text-ink-600">Select Pack Size</span>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => {
                  const isSelected = v.id === selectedVariant.id;

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-3 rounded-card border text-left transition-all ${
                        isSelected
                          ? 'border-basil bg-basil-light/40 shadow-sm'
                          : 'border-mist bg-surface hover:border-ink-200'
                      }`}
                    >
                      <div className="text-sm font-bold text-ink">{v.name}</div>
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

          {/* Add to Cart Action */}
          <div className="pt-5 border-t border-mist">
            <QtyStepper
              quantity={quantity}
              onIncrement={() => addItem(product, selectedVariant, 1)}
              onDecrement={() => updateQuantity(product.id, selectedVariant.id, quantity - 1)}
            />
          </div>
        </div>
      </div>

      {/* Why it's fresh section */}
      <div className="bg-surface rounded-card border border-mist p-6 shadow-card">
        <h2 className="text-lg font-black text-ink mb-4">Why it&apos;s fresh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-basil" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">Handpicked Quality</h4>
              <p className="text-xs text-ink-500 mt-0.5">Every item is quality-checked before packing.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-basil" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">10-Minute Delivery</h4>
              <p className="text-xs text-ink-500 mt-0.5">From our dark store to your doorstep, ultra fast.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-basil" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-ink">100% Refund Guarantee</h4>
              <p className="text-xs text-ink-500 mt-0.5">Not happy? Get instant refund, no questions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

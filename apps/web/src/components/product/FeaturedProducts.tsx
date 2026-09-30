'use client';

import React from 'react';
import { Product } from '@quickbasket/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';

export interface FeaturedProductsProps {
  eyebrow?: string;
  title: string;
  products?: Product[];
  isLoading?: boolean;
}

export function FeaturedProducts({
  eyebrow,
  title,
  products,
  isLoading,
}: FeaturedProductsProps) {
  const featured = products?.[0];
  const rest = products?.slice(1, 5) || [];

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="aspect-[4/5] rounded-2xl lg:row-span-2" />
            {[0, 1, 2, 3].map((n) => (
              <Skeleton key={n} className="aspect-square rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-display-sm text-ink">{title}</h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large featured card */}
          {featured && (
            <div className="lg:row-span-2 animate-fadeInUp">
              <ProductCard product={featured} size="large" />
            </div>
          )}

          {/* 4 smaller cards */}
          {rest.map((product, i) => (
            <div
              key={product.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

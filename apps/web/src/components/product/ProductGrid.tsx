import React from 'react';
import { Product } from '@quickbasket/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';

export interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  emptyText?: string;
}

export function ProductGrid({
  products,
  isLoading,
  emptyText = 'No products found.',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
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
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 bg-cream rounded-2xl p-8 animate-fadeInUp">
        <p className="text-sm font-medium text-ink-400">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fadeInUp"
          style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

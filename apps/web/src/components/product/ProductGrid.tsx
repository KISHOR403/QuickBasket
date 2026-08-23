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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="bg-surface border border-mist rounded-card p-3 flex flex-col gap-3">
            <Skeleton className="w-full aspect-square rounded-input" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-full rounded-pill mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-muted rounded-card border border-mist p-8">
        <p className="text-sm font-semibold text-ink-500">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

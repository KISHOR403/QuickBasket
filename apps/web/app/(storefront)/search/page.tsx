'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import { useProductsQuery } from '@quickbasket/api-client';
import { ProductGrid } from '@/components/product/ProductGrid';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const { data: products, isLoading } = useProductsQuery({ search: query });

  return (
    <div className="space-y-6">
      <div className="bg-surface-muted border border-mist p-6 rounded-card flex items-center gap-3">
        <SearchIcon className="w-6 h-6 text-basil shrink-0" />
        <div>
          <h1 className="text-xl font-black text-ink">
            {query ? `Search results for "${query}"` : 'Search All Products'}
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Found {products?.length || 0} products matching your query
          </p>
        </div>
      </div>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        emptyText={`No items matching "${query}". Try searching for milk, tomatoes, lays, or paan.`}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-ink-400">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}

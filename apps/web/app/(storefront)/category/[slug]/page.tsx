'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Filter } from 'lucide-react';
import { useCategoriesQuery, useProductsQuery } from '@quickbasket/api-client';
import { ProductGrid } from '@/components/product/ProductGrid';

export default function CategoryListingPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: categories } = useCategoriesQuery();
  const currentCat = categories?.find((c) => c.slug === slug);
  const { data: products, isLoading } = useProductsQuery({ categorySlug: slug });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-400">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-ink font-bold">{currentCat?.name || slug}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-surface-muted border border-mist p-6 rounded-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">{currentCat?.name || 'Category'}</h1>
          <p className="text-xs text-ink-500 mt-1">
            Express delivery in 10-15 minutes across your pincode
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold bg-surface border border-mist px-3 py-2 rounded-pill shadow-sm">
          <Filter className="w-4 h-4 text-basil" />
          <span>Showing {products?.length || 0} Products</span>
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={products} isLoading={isLoading} emptyText="No products in this category yet." />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useCategoriesQuery, useProductsQuery } from '@quickbasket/api-client';
import { ProductGrid } from '@/components/product/ProductGrid';

export function CategoryClient({ slug }: { slug: string }) {
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">{currentCat?.name || 'Category'}</h1>
          <p className="text-sm text-ink-500 mt-1">
            Farm fresh produce, delivered in minutes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-ink-600">
          <span>Sort by:</span>
          <button className="flex items-center gap-1 bg-surface border border-mist px-3 py-2 rounded-card text-sm font-bold text-ink hover:border-ink-200 transition-colors">
            Popularity <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-card min-h-[180px] bg-ink-800">
          <Image
            src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
            alt="Alphonso Mangoes"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="relative z-10 p-5 flex flex-col justify-end h-full">
            <span className="inline-block bg-mango text-ink text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-pill tracking-wider mb-2 w-fit">
              In Season
            </span>
            <h3 className="text-xl font-black text-white">Alphonso Mangoes</h3>
            <p className="text-xs text-white/80 mt-1">
              Direct from Ratnagiri farms. Sweet, juicy, and perfect for summer.
            </p>
            <Link
              href={`/category/${slug}`}
              className="inline-flex mt-3 bg-basil hover:bg-basil-hover text-white text-xs font-bold px-4 py-2 rounded-pill transition-colors w-fit"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="bg-sage rounded-card p-5 border border-sage-dark flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-basil">Organic Greens</h3>
            <p className="text-xs text-ink-500 mt-1">Pesticide free daily essentials.</p>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-20 h-20 rounded-card bg-surface-muted overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80"
                alt="Greens"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="w-20 h-20 rounded-card bg-surface-muted overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1523473827533-2a64d0d36748?auto=format&fit=crop&w=200&q=80"
                alt="Avocado"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} isLoading={isLoading} emptyText="No products in this category yet." />
    </div>
  );
}

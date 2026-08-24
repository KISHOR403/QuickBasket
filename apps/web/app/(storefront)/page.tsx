'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery } from '@quickbasket/api-client';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="pb-4 space-y-10">
      {/* Hero Banner — Full-width image background matching Stitch */}
      <section className="relative overflow-hidden rounded-card min-h-[320px] flex items-end">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80"
          alt="Farm fresh vegetables"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 w-full space-y-3">
          <span className="inline-block bg-mango text-ink text-[11px] font-extrabold uppercase px-3 py-1 rounded-pill tracking-wider">
            Fresh Arrivals
          </span>

          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight max-w-lg">
            Farm Fresh,<br />
            In 10 Minutes.
          </h1>

          <p className="text-sm text-white/80 leading-relaxed max-w-md">
            Stock up on daily essentials sourced directly from local farms. Handpicked quality guaranteed.
          </p>

          <Link href="/category/fresh-vegetables">
            <Button variant="primary" size="md" className="font-extrabold gap-2 mt-2">
              <span>Shop Vegetables</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trending Bestsellers */}
      <section>
        <SectionHeader
          eyebrow="Trending Now"
          title="Trending Bestsellers"
          description="Delivered to your doorstep in 10-12 minutes."
          action={{ label: 'View All', href: '/category/dairy-bread-eggs' }}
        />
        <div className="mt-6">
          <ProductGrid products={products} isLoading={isProductsLoading} />
        </div>
      </section>

      {/* Farm Fresh & Organic */}
      <section>
        <SectionHeader
          eyebrow="Direct from Farms"
          title="Organic Vegetables & Farm Fruits"
          action={{ label: 'Explore Farm Fresh', href: '/category/fresh-vegetables' }}
        />
        <div className="mt-6">
          <ProductGrid products={organicProducts} isLoading={isProductsLoading} />
        </div>
      </section>
    </div>
  );
}

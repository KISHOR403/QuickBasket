'use client';

import React from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery } from '@quickbasket/api-client';
import { HeroCarousel } from '@/components/home/HeroCarousel';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="pb-4 space-y-10">
      {/* Dynamic Hero Carousel Banner (Auto-rotating background images & matching text) */}
      <HeroCarousel />

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

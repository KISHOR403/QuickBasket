'use client';

import React from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery } from '@quickbasket/api-client';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { PromoBanners } from '@/components/home/PromoBanners';
import { WhyQuickBasket } from '@/components/home/WhyQuickBasket';
import { Testimonials } from '@/components/home/Testimonials';
import { DownloadApp } from '@/components/home/DownloadApp';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="pb-4 space-y-10">
      {/* Dynamic Hero Carousel Banner (Auto-rotating background images & matching text) */}
      <HeroCarousel />

      {/* Shop by Category — icon grid */}
      <CategoryGrid />

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

      {/* Deals & Offers — promotional banners */}
      <PromoBanners />

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

      {/* Why QuickBasket — USP pillars */}
      <WhyQuickBasket />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Download the App CTA */}
      <DownloadApp />
    </div>
  );
}

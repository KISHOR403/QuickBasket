'use client';

import React from 'react';
import { useProductsQuery } from '@quickbasket/api-client';
import { HeroSection } from '@/components/home/HeroCarousel';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ShopByMood } from '@/components/home/ShopByMood';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';
import { SmartShopping } from '@/components/home/SmartShopping';
import { PromoBanners } from '@/components/home/PromoBanners';
import { PriceShelf } from '@/components/home/PriceShelf';
import { WhyQuickBasket } from '@/components/home/WhyQuickBasket';
import { Testimonials } from '@/components/home/Testimonials';
import { DownloadApp } from '@/components/home/DownloadApp';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="pb-4">
      {/* 1. Editorial Hero */}
      <HeroSection />

      {/* 2. Category Discovery — horizontal scroll tiles */}
      <CategoryGrid />

      {/* 3. Shop by Mood — lifestyle discovery */}
      <ShopByMood />

      {/* 4. Trending Today — horizontal product carousel */}
      <ProductCarousel
        eyebrow="Trending now"
        title="Trending today"
        products={products}
        isLoading={isProductsLoading}
        viewAllHref="/category/dairy-bread-eggs"
      />

      {/* 5. Freshly Picked — editorial collection */}
      <FeaturedProducts
        eyebrow="PICKED TODAY"
        title="Fresh arrivals from local suppliers"
        products={organicProducts}
        isLoading={isProductsLoading}
      />

      {/* 6. Smart Shopping — AI grocery assistant */}
      <SmartShopping />

      {/* 7. Today's Drops — editorial deals */}
      <PromoBanners />

      {/* 8. Under ₹100 — compact price shelf */}
      <PriceShelf
        products={products}
        isLoading={isProductsLoading}
      />

      {/* 9. Quality Pillars — trust storytelling */}
      <WhyQuickBasket />

      {/* 10. Testimonials — magazine style */}
      <Testimonials />

      {/* 11. Download App — immersive dark section */}
      <DownloadApp />
    </div>
  );
}

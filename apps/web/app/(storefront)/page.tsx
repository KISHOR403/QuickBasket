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
import { WhyQuickBasket } from '@/components/home/WhyQuickBasket';
import { Testimonials } from '@/components/home/Testimonials';
import { DownloadApp } from '@/components/home/DownloadApp';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];
  const expressProducts = products?.filter((p) => p.isExpress) || [];
  const affordableProducts = products?.filter((p) => {
    const variant = p.variants.find((v) => v.id === p.defaultVariantId) || p.variants[0];
    return variant.price < 200;
  }) || [];

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

      {/* 5. Freshly Picked — asymmetric featured layout */}
      <FeaturedProducts
        eyebrow="Direct from farms"
        title="Freshly picked"
        products={organicProducts}
        isLoading={isProductsLoading}
      />

      {/* 6. Smart Shopping — AI grocery assistant */}
      <SmartShopping />

      {/* 7. Today's Drops — editorial deals */}
      <PromoBanners />

      {/* 8. Under ₹199 — compact horizontal carousel */}
      <ProductCarousel
        eyebrow="Budget picks"
        title="Under ₹199"
        products={affordableProducts}
        isLoading={isProductsLoading}
        cardSize="default"
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

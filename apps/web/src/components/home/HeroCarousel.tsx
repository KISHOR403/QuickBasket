'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, PackageCheck, ShoppingBasket, Tags } from 'lucide-react';
import { Product } from '@quickbasket/types';
import { useLocationStore } from '@/store/location';
import { useUiStore } from '@/store/ui';
import { useCategoriesQuery } from '@quickbasket/api-client';
import { ProductCard } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface HeroSectionProps {
  products?: Product[];
  isLoading?: boolean;
  isError?: boolean;
}

export function HeroSection({ products, isLoading, isError }: HeroSectionProps) {
  const { city, area } = useLocationStore();
  const { openLocationModal } = useUiStore();
  const { data: categories } = useCategoriesQuery();
  const featuredRail = useRef<HTMLDivElement>(null);
  const location = (area || city || 'Choose your location').split(',')[0];
  const featuredProducts = (products || []).filter((product) => {
    const variant = product.variants.find((item) => item.id === product.defaultVariantId) || product.variants[0];
    return product.images?.[0] && variant?.inStock && variant.stockCount > 0;
  }).slice(0, 12);

  const scrollFeatured = (direction: 'previous' | 'next') => {
    if (!featuredRail.current) return;
    const card = featuredRail.current.querySelector<HTMLElement>('.qb-product-card-hero');
    const distance = (card?.offsetWidth || 180) + 10;
    featuredRail.current.scrollBy({ left: direction === 'next' ? distance : -distance, behavior: 'smooth' });
  };

  return (
    <section className="qb-home-hero" aria-labelledby="home-title">
      <aside className="qb-home-intro">
        <button type="button" onClick={openLocationModal} className="qb-home-location" aria-label={`Change delivery location. Current location: ${location}`}>
          <MapPin size={15} aria-hidden="true" /><span>{location}</span><span className="qb-home-location-action">Change</span>
        </button>
        <p className="qb-home-kicker">A thoughtful way to shop</p>
        <h1 id="home-title">Freshness<br />you can <em>trust.</em></h1>
        <p className="qb-home-intro-copy">Good ingredients for everyday cooking, chosen for your table and easy to find in one basket.</p>
        <div className="qb-home-metrics" aria-label="QuickBasket shopping details">
          <div><ShoppingBasket size={17} aria-hidden="true" /><span><strong>{products?.length ?? '—'}</strong> products</span></div>
          <div><Tags size={17} aria-hidden="true" /><span><strong>{categories?.length ?? '—'}</strong> categories</span></div>
          <div><PackageCheck size={17} aria-hidden="true" /><span>Basket saved on this device</span></div>
        </div>
      </aside>

      <div className="qb-home-showcase">
        <div className="qb-home-photo">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=85"
            alt="Fresh vegetables and leafy greens arranged at a produce market"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 75vw"
            className="qb-home-photo-img"
          />
          <div className="qb-home-photo-shade" />
          <div className="qb-home-photo-content">
            <p className="qb-home-photo-kicker">Everyday good, naturally</p>
            <h2>Bring a little<br /><em>more fresh</em> home.</h2>
            <p>Fresh produce, pantry favorites and more for the week ahead.</p>
            <Link href="/search" className="qb-home-shop-link">Shop all groceries <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <span className="qb-home-photo-caption">Good food for everyday tables</span>
        </div>

        <div className="qb-home-featured" aria-label="Featured groceries">
          <div className="qb-home-featured-heading">
            <span>From the QuickBasket pantry</span>
            <div className="qb-home-featured-actions">
              <button type="button" onClick={() => scrollFeatured('previous')} aria-label="Previous featured products"><ChevronLeft size={15} /></button>
              <button type="button" onClick={() => scrollFeatured('next')} aria-label="Next featured products"><ChevronRight size={15} /></button>
              <Link href="/search">Explore all <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
          {isLoading ? (
            <div className="qb-home-featured-grid">{Array.from({ length: 4 }).map((_, index) => <div className="qb-home-product-skeleton" key={index}><Skeleton className="aspect-[5/4] w-full" /><Skeleton className="mx-3 mt-3 h-4 w-3/4" /><Skeleton className="mx-3 mt-2 h-4 w-1/2" /></div>)}</div>
          ) : isError ? (
            <p className="qb-inline-state" role="status">Products aren’t available right now. Please try again shortly.</p>
          ) : featuredProducts.length ? (
            <div className="qb-home-featured-grid" ref={featuredRail}>{featuredProducts.map((product) => <ProductCard key={product.id} product={product} size="hero" />)}</div>
          ) : (
            <p className="qb-inline-state" role="status">No featured products are available right now. Browse the catalogue to see what’s in stock.</p>
          )}
        </div>
      </div>
    </section>
  );
}

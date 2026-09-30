'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@quickbasket/types';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

export interface ProductCarouselProps {
  eyebrow?: string;
  title: string;
  products?: Product[];
  isLoading?: boolean;
  viewAllHref?: string;
  cardSize?: 'default' | 'large' | 'compact';
}

export function ProductCarousel({
  eyebrow,
  title,
  products,
  isLoading,
  viewAllHref,
  cardSize = 'default',
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = cardSize === 'large' ? 400 : 260;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
                {eyebrow}
              </span>
            )}
            <h2 className="font-display text-display-sm text-ink">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-basil hover:underline underline-offset-4 mr-2"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-xl border border-mist bg-white hover:bg-cream text-ink-400 hover:text-ink items-center justify-center transition-all active:scale-95 hidden sm:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-xl border border-mist bg-white hover:bg-cream text-ink-400 hover:text-ink items-center justify-center transition-all active:scale-95 hidden sm:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-snap-x pb-2"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, n) => (
                <div
                  key={n}
                  className={`shrink-0 scroll-snap-start rounded-2xl overflow-hidden ${
                    cardSize === 'large'
                      ? 'w-[320px]'
                      : cardSize === 'compact'
                        ? 'w-[260px]'
                        : 'w-[200px] sm:w-[220px]'
                  }`}
                >
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : products?.map((product, i) => (
                <div
                  key={product.id}
                  className={`shrink-0 scroll-snap-start animate-fadeInUp ${
                    cardSize === 'large'
                      ? 'w-[320px]'
                      : cardSize === 'compact'
                        ? 'w-[260px]'
                        : 'w-[200px] sm:w-[220px]'
                  }`}
                  style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                >
                  <ProductCard product={product} size={cardSize} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

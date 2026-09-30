'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useCategoriesQuery } from '@quickbasket/api-client';

export function CategoryGrid() {
  const { data: categories, isLoading } = useCategoriesQuery();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
              Browse
            </span>
            <h2 className="font-display text-display-md text-ink">
              Shop by category
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl border border-mist bg-white hover:bg-cream text-ink-400 hover:text-ink flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl border border-mist bg-white hover:bg-cream text-ink-400 hover:text-ink flex items-center justify-center transition-all active:scale-95"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll tiles */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-snap-x pb-2"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[200px] aspect-[3/4] rounded-2xl skeleton shrink-0"
                />
              ))
            : categories?.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group relative min-w-[180px] sm:min-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden shrink-0 scroll-snap-start animate-fadeInUp"
                  style={{ animationDelay: `${Math.min(idx, 7) * 60}ms` }}
                >
                  {/* Category image */}
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight mb-0.5">
                          {cat.name}
                        </h3>
                        <span className="text-[11px] text-white/60 font-medium">
                          {cat.itemCount} items
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}

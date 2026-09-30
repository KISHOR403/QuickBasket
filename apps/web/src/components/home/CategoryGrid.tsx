'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategoriesQuery } from '@quickbasket/api-client';
import { Skeleton } from '@/components/ui/Skeleton';

export function CategoryGrid() {
  const { data: categories, isLoading } = useCategoriesQuery();

  const displayCategories = categories?.slice(0, 8) || [];

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#faf8f5]/60 selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Editorial Directory Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>DEPARTMENT DIRECTORY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              Shop by <span className="font-serif italic font-normal text-ink-600">category.</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase hidden md:flex items-center gap-3">
            <span>INDEX 01–08</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-semibold">ALL HARVEST CODES</span>
          </div>
        </div>

        {/* Editorial Category Directory Grid — Asymmetric Two-Row Swiss Composition */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/[0.08]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 border-r border-b border-ink/[0.08] min-h-[220px] flex flex-col justify-between bg-white/40"
              >
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <div>
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-ink/[0.05]">
                  <Skeleton className="w-14 h-14 rounded-xs" />
                  <Skeleton className="w-6 h-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/[0.08]">
            {displayCategories.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative p-6 sm:p-7 lg:p-8 border-r border-b border-ink/[0.08] flex flex-col justify-between min-h-[220px] lg:min-h-[240px] bg-transparent hover:bg-white/90 transition-all duration-300"
              >
                {/* Top: Category Number & Metadata */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="font-mono text-xs font-bold text-basil tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-300 group-hover:text-ink-500 transition-colors">
                    DEPT
                  </span>
                </div>

                {/* Middle: Category Name (Primary Visual Element) & Product Count */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-ink tracking-tight uppercase leading-[1.05] transition-all duration-300 group-hover:translate-x-1 group-hover:text-basil">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-xs text-ink-400 mt-1.5 transition-colors group-hover:text-ink-600">
                    {cat.itemCount || 35 + idx * 7} fresh picks
                  </p>
                </div>

                {/* Bottom: Small Supporting Product Image & Moving Arrow */}
                <div className="flex items-end justify-between pt-4 border-t border-ink/[0.06]">
                  {/* Small Product Image — Supporting Element */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 relative overflow-hidden bg-[#f4f2ec] border border-ink/[0.06] rounded-xs shrink-0">
                    <Image
                      src={cat.imageUrl}
                      alt={cat.name}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
                    />
                  </div>

                  {/* Minimal Arrow that shifts on hover */}
                  <div className="flex items-center gap-1 font-mono text-base font-bold text-ink-400 group-hover:text-ink transition-all duration-300 group-hover:translate-x-1.5">
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

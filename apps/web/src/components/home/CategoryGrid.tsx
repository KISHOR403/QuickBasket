'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Milk,
  Carrot,
  Apple,
  Wheat,
  Cookie,
  Croissant,
  CupSoda,
  Coffee,
  Zap,
  IceCream,
  HeartPulse,
  Sparkles,
  Baby,
  PawPrint,
  Candy,
  ShoppingBag,
  LucideIcon,
} from 'lucide-react';
import { useCategoriesQuery } from '@quickbasket/api-client';
import { SectionHeader } from '@/components/common/SectionHeader';

const ICON_MAP: Record<string, LucideIcon> = {
  Milk,
  Carrot,
  Apple,
  Wheat,
  Cookie,
  Croissant,
  CupSoda,
  Coffee,
  Zap,
  IceCream,
  HeartPulse,
  Sparkles,
  Baby,
  PawPrint,
  Candy,
};

export function CategoryGrid() {
  const { data: categories, isLoading } = useCategoriesQuery();

  return (
    <section>
      <SectionHeader
        eyebrow="Browse"
        title="Shop by Category"
        description="Find everything you need, organized for you."
      />

      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2.5 p-4 rounded-card skeleton"
              >
                <div className="w-14 h-14 rounded-full bg-white/60" />
                <div className="h-3 w-16 rounded-pill bg-white/60" />
                <div className="h-2.5 w-10 rounded-pill bg-white/60" />
              </div>
            ))
          : categories?.map((cat) => {
              const IconComponent =
                (cat.iconName && ICON_MAP[cat.iconName]) || ShoppingBag;

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center gap-2.5 p-4 rounded-card border border-mist bg-surface shadow-card hover:shadow-float hover:-translate-y-1 hover:border-basil/30 transition-all duration-300 ease-smooth"
                >
                  {/* Icon circle with category accent */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: cat.accentColor || '#E8F5E9' }}
                  >
                    {cat.imageUrl ? (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        sizes="56px"
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <IconComponent className="w-6 h-6 text-basil" />
                    )}

                    {/* Icon overlay on image */}
                    {cat.imageUrl && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <IconComponent className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-[11px] sm:text-xs font-bold text-ink text-center leading-tight line-clamp-2 min-h-[28px] group-hover:text-basil transition-colors">
                    {cat.name}
                  </span>

                  {/* Count pill */}
                  <span className="text-[10px] font-semibold text-ink-400 bg-mist px-2 py-0.5 rounded-pill">
                    {cat.itemCount} items
                  </span>
                </Link>
              );
            })}
      </div>
    </section>
  );
}

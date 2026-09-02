'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
import { cn } from '@/lib/utils';

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

export function CategorySidebar() {
  const params = useParams();
  const activeSlug = params?.slug as string | undefined;
  const { data: categories, isLoading } = useCategoriesQuery();

  return (
    <aside className="hidden lg:block w-60 shrink-0 sticky top-20 self-start">
      <div className="bg-surface rounded-card border border-mist p-4 shadow-card max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
        <h3 className="text-base font-extrabold text-basil mb-0.5">All Categories</h3>
        <p className="text-[11px] text-ink-400 font-medium mb-3">Shop by department</p>

        <hr className="border-mist mb-3" />

        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-9 skeleton rounded-input w-full" />
            ))}
          </div>
        ) : (
          <nav className="flex flex-col gap-1">
            {categories?.map((cat) => {
              const isActive = activeSlug === cat.slug;
              const IconComponent = (cat.iconName && ICON_MAP[cat.iconName]) || ShoppingBag;

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-input text-xs font-bold transition-all group',
                    isActive
                      ? 'bg-basil text-white shadow-sm'
                      : 'text-ink-700 hover:bg-sage hover:text-basil'
                  )}
                >
                  <IconComponent
                    className={cn(
                      'w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : 'text-ink-400 group-hover:text-basil'
                    )}
                  />
                  <span className="truncate flex-1">{cat.name}</span>
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-1.5 py-0.5 rounded-pill',
                      isActive ? 'bg-white/20 text-white' : 'bg-mist text-ink-400'
                    )}
                  >
                    {cat.itemCount}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </aside>
  );
}

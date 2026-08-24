'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Apple,
  Egg,
  Cookie,
  GlassWater,
  Soup,
  SprayCanIcon,
  HeartPulse,
  PawPrint,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_CATEGORIES = [
  { slug: 'fresh-vegetables', name: 'Fruits & Vegetables', icon: Apple },
  { slug: 'dairy-bread-eggs', name: 'Dairy & Breakfast', icon: Egg },
  { slug: 'snacks-munchies', name: 'Munchies', icon: Cookie },
  { slug: 'cold-drinks', name: 'Cold Drinks', icon: GlassWater },
  { slug: 'instant-food', name: 'Instant Food', icon: Soup },
  { slug: 'cleaning', name: 'Cleaning Essentials', icon: SprayCanIcon },
  { slug: 'personal-care', name: 'Personal Care', icon: HeartPulse },
  { slug: 'pet-care', name: 'Pet Care', icon: PawPrint },
];

export function CategorySidebar() {
  const params = useParams();
  const activeSlug = params?.slug as string | undefined;

  return (
    <aside className="hidden lg:block w-56 shrink-0 sticky top-20 self-start">
      <div className="bg-surface rounded-card border border-mist p-4 shadow-card">
        <h3 className="text-base font-extrabold text-basil mb-0.5">Categories</h3>
        <p className="text-[11px] text-ink-400 font-medium mb-4">Shop by department</p>

        <hr className="border-mist mb-3" />

        <nav className="flex flex-col gap-1">
          {SIDEBAR_CATEGORIES.map((cat) => {
            const isActive = activeSlug === cat.slug;
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-input text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-mango/15 text-mango border border-mango/30'
                    : 'text-ink-700 hover:bg-sage hover:text-basil'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-mango' : 'text-ink-400')} />
                <span className="truncate">{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategoriesQuery } from '@quickbasket/api-client';

export function CategoryNav() {
  const { data: categories, isLoading } = useCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} className="flex flex-col items-center gap-1.5 shrink-0 w-20">
            <div className="w-16 h-16 skeleton rounded-card" />
            <div className="h-2.5 w-14 skeleton rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar scroll-smooth">
      {categories?.map((cat, i) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="flex flex-col items-center group shrink-0 w-20 text-center transition-transform duration-300 ease-smooth hover:-translate-y-1 animate-fadeInUp"
          style={{ animationDelay: `${Math.min(i, 10) * 35}ms` }}
        >
          <div
            className="w-16 h-16 rounded-card p-2 flex items-center justify-center relative overflow-hidden mb-1.5 shadow-sm border border-mist transition-shadow duration-300 group-hover:shadow-md"
            style={{ backgroundColor: cat.accentColor || '#F6F8F5' }}
          >
            <Image
              src={cat.imageUrl}
              alt={cat.name}
              fill
              sizes="64px"
              className="object-cover group-hover:scale-110 transition-transform duration-300 ease-smooth"
            />
          </div>
          <span className="text-[11px] font-bold text-ink leading-tight line-clamp-2 group-hover:text-basil transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

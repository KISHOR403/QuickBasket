'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategoriesQuery } from '@quickbasket/api-client';

export function CategoryNav() {
  const { data: categories, isLoading } = useCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto py-3 no-scrollbar">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="w-20 h-24 bg-mist rounded-card animate-pulse shrink-0" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar scroll-smooth">
      {categories?.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="flex flex-col items-center group shrink-0 w-20 text-center transition-transform hover:-translate-y-1"
        >
          <div
            className="w-16 h-16 rounded-card p-2 flex items-center justify-center relative overflow-hidden mb-1.5 shadow-sm border border-mist transition-shadow group-hover:shadow-md"
            style={{ backgroundColor: cat.accentColor || '#F6F8F5' }}
          >
            <Image
              src={cat.imageUrl}
              alt={cat.name}
              fill
              sizes="64px"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
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

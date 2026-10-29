'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useCategoriesQuery } from '@quickbasket/api-client';
import { Skeleton } from '@/components/ui/Skeleton';

export function CategoryGrid() {
  const { data: categories, isLoading, isError } = useCategoriesQuery();
  const displayCategories = categories?.slice(0, 8) || [];

  return (
    <section id="categories" className="qb-section qb-categories">
      <div className="qb-section-heading">
        <div><p className="qb-eyebrow">Find your favorites</p><h2>Shop by <em>category</em></h2></div>
        <p className="qb-section-intro">The everyday essentials and seasonal finds for your table.</p>
      </div>
      {isLoading ? (
        <div className="qb-category-grid" aria-label="Loading categories">{Array.from({ length: 8 }).map((_, i) => <div className="qb-category-skeleton" key={i}><Skeleton className="w-full aspect-[1.15] rounded-2xl" /><Skeleton className="h-5 w-2/3 mt-3" /></div>)}</div>
      ) : isError ? (
        <p className="qb-inline-state" role="status">We couldn’t load categories just now. Please refresh to try again.</p>
      ) : displayCategories.length ? (
        <div className="qb-category-grid">
          {displayCategories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="qb-category-item">
              <div className="qb-category-photo"><Image src={cat.imageUrl} alt="" fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 22vw" /><span className="qb-category-arrow"><ArrowUpRight size={17} /></span></div>
              <div className="qb-category-label"><h3>{cat.name}</h3><span>{cat.itemCount ? `${cat.itemCount} items` : 'Shop now'}</span></div>
            </Link>
          ))}
        </div>
      ) : <p className="qb-inline-state">No categories are available right now.</p>}
    </section>
  );
}

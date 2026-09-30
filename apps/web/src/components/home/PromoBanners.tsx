'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Percent, Truck, Tag } from 'lucide-react';

const DROPS = [
  {
    id: 'drop-1',
    badge: 'Limited drop',
    headline: '20% off fresh vegetables',
    description: 'Farm-fresh vegetables at unbeatable prices. Today only.',
    cta: 'Shop now',
    href: '/category/fresh-vegetables',
    icon: Percent,
    accent: 'bg-basil',
    size: 'large' as const,
  },
  {
    id: 'drop-2',
    badge: 'Free delivery',
    headline: 'Free delivery above ₹299',
    description: 'No minimum hassles. Lightning fast delivery.',
    cta: 'Start shopping',
    href: '/',
    icon: Truck,
    accent: 'bg-ink',
    size: 'small' as const,
  },
  {
    id: 'drop-3',
    badge: 'New user',
    headline: '₹50 OFF — code FRESH50',
    description: 'Your first order deserves a treat.',
    cta: 'Claim now',
    href: '/category/dairy-bread-eggs',
    icon: Tag,
    accent: 'bg-beet',
    size: 'small' as const,
  },
];

export function PromoBanners() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
            Today only
          </span>
          <h2 className="font-display text-display-sm text-ink">
            Today&apos;s drops
          </h2>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Large featured promo */}
          <div className="md:row-span-2">
            <DropCard drop={DROPS[0]} />
          </div>
          {/* Two smaller promos */}
          <DropCard drop={DROPS[1]} />
          <DropCard drop={DROPS[2]} />
        </div>
      </div>
    </section>
  );
}

function DropCard({ drop }: { drop: (typeof DROPS)[number] }) {
  const Icon = drop.icon;
  const isLarge = drop.size === 'large';

  return (
    <Link
      href={drop.href}
      className={`group relative overflow-hidden rounded-2xl ${drop.accent} text-white flex flex-col justify-end transition-all duration-500 hover:shadow-editorial ${
        isLarge ? 'min-h-[320px] md:min-h-full p-8 md:p-10' : 'min-h-[160px] p-6 md:p-8'
      }`}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/[0.06] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/[0.04] translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl mb-4">
          <Icon className="w-3.5 h-3.5" />
          <span>{drop.badge}</span>
        </div>

        {/* Headline */}
        <h3 className={`font-display font-bold tracking-tight leading-tight mb-2 ${
          isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
        }`}>
          {drop.headline}
        </h3>

        {/* Description */}
        <p className={`text-white/70 leading-relaxed mb-4 ${
          isLarge ? 'text-sm max-w-sm' : 'text-xs max-w-xs'
        }`}>
          {drop.description}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all">
          <span>{drop.cta}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

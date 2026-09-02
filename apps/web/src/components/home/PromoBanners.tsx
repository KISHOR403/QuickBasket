import React from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Truck, Percent } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

interface PromoBanner {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  gradient: string;
  textColor: string;
  ctaStyle: string;
}

const PROMOS: PromoBanner[] = [
  {
    id: 'promo-1',
    icon: <Percent className="w-5 h-5" />,
    eyebrow: 'Limited Time Offer',
    headline: '20% OFF on Fresh Vegetables',
    description:
      'Farm-fresh vegetables at unbeatable prices. Stock up on your daily essentials today.',
    ctaText: 'Shop Veggies',
    ctaHref: '/category/fresh-vegetables',
    gradient: 'bg-gradient-to-br from-basil via-basil-dark to-ink-700',
    textColor: 'text-white',
    ctaStyle:
      'bg-mango hover:bg-mango-hover text-ink font-extrabold shadow-pill',
  },
  {
    id: 'promo-2',
    icon: <Truck className="w-5 h-5" />,
    eyebrow: 'Free Delivery',
    headline: 'Free delivery on orders above ₹299',
    description:
      'No minimum order headaches. Order anything and get it delivered lightning fast.',
    ctaText: 'Start Shopping',
    ctaHref: '/',
    gradient: 'bg-gradient-to-br from-mango via-mango-hover to-amber-700',
    textColor: 'text-ink',
    ctaStyle:
      'bg-ink hover:bg-ink-800 text-white font-extrabold shadow-sm',
  },
  {
    id: 'promo-3',
    icon: <Tag className="w-5 h-5" />,
    eyebrow: 'New User Special',
    headline: 'Flat ₹50 OFF — Use code FRESH50',
    description:
      'First order special! Apply coupon at checkout to save ₹50 on your first QuickBasket order.',
    ctaText: 'Claim Now',
    ctaHref: '/category/dairy-bread-eggs',
    gradient: 'bg-gradient-to-br from-beet via-beet to-pink-900',
    textColor: 'text-white',
    ctaStyle:
      'bg-white hover:bg-white/90 text-beet font-extrabold shadow-sm',
  },
];

export function PromoBanners() {
  return (
    <section>
      <SectionHeader
        eyebrow="Hot Deals"
        title="Deals & Offers"
        description="Save big on daily essentials and more."
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROMOS.map((promo) => (
          <div
            key={promo.id}
            className={`relative overflow-hidden rounded-card p-6 ${promo.gradient} ${promo.textColor} shadow-card hover:shadow-float transition-all duration-300 ease-smooth group`}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col h-full min-h-[180px]">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-pill w-fit mb-4">
                {promo.icon}
                <span>{promo.eyebrow}</span>
              </div>

              {/* Headline */}
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight leading-snug mb-2">
                {promo.headline}
              </h3>

              {/* Description */}
              <p className="text-xs opacity-85 leading-relaxed mb-4 flex-1">
                {promo.description}
              </p>

              {/* CTA */}
              <Link
                href={promo.ctaHref}
                className={`inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-pill w-fit transition-all active:scale-95 group-hover:gap-2.5 ${promo.ctaStyle}`}
              >
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

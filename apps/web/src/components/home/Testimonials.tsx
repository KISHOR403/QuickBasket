'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  orderCount: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Priya Sharma',
    location: 'Sector 18, Noida',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'Absolutely love QuickBasket! Got farm-fresh vegetables in 8 minutes. The quality is consistently amazing — haven\'t visited a supermarket in months.',
    orderCount: '120+ orders',
  },
  {
    id: 't-2',
    name: 'Rahul Verma',
    location: 'Cyber Hub, Gurgaon',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'The 10-minute delivery is real! I order daily essentials every morning before work and everything arrives fresh and on time. Best grocery app out there.',
    orderCount: '85+ orders',
  },
  {
    id: 't-3',
    name: 'Ananya Gupta',
    location: 'Indirapuram, Ghaziabad',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    review:
      'Great prices and the organic section is fantastic. Love the easy returns policy — they refunded me instantly when I got a slightly bruised apple.',
    orderCount: '60+ orders',
  },
  {
    id: 't-4',
    name: 'Vikram Singh',
    location: 'Connaught Place, Delhi',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'As a bachelor, QuickBasket has been a lifesaver. From late-night snacks to morning milk — everything delivered in minutes.',
    orderCount: '200+ orders',
  },
  {
    id: 't-5',
    name: 'Meera Patel',
    location: 'Lajpat Nagar, Delhi',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'The freshness of fruits here is unmatched. My kids love the organic mangoes! Plus, the discount offers keep my monthly grocery bill under budget.',
    orderCount: '150+ orders',
  },
  {
    id: 't-6',
    name: 'Arjun Reddy',
    location: 'Jubilee Hills, Hyderabad',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    review:
      "Switched from BigBasket last month and haven't looked back. Faster delivery, better prices, and exceptional customer support.",
    orderCount: '40+ orders',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating
              ? 'text-mango fill-mango'
              : 'text-mist fill-mist'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
            Trusted by thousands
          </span>
          <h2 className="font-display text-display-md text-ink">
            What people say
          </h2>
        </div>

        {/* Magazine-style layout: 1 large + grid of smaller */}
        <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
          {/* Featured large testimonial */}
          <div className="lg:col-span-2 bg-basil text-white rounded-2xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/[0.04] -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <Quote className="w-8 h-8 text-white/20 mb-6 -scale-x-100" />
              <p className="text-base md:text-lg font-medium leading-relaxed mb-8">
                &ldquo;{featured.review}&rdquo;
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 pt-6 border-t border-white/15">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                <Image
                  src={featured.avatar}
                  alt={featured.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{featured.name}</p>
                <p className="text-[11px] text-white/60 truncate">{featured.location}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StarRating rating={featured.rating} />
                <span className="text-[10px] font-bold text-white/50">{featured.orderCount}</span>
              </div>
            </div>
          </div>

          {/* Smaller testimonials grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {rest.slice(0, 4).map((t, idx) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 flex flex-col justify-between hover-lift animate-fadeInUp"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div>
                  <StarRating rating={t.rating} />
                  <p className="text-sm text-ink-600 leading-relaxed mt-3 mb-4 line-clamp-4">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2.5 pt-3 border-t border-mist">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{t.name}</p>
                    <p className="text-[10px] text-ink-400 truncate">{t.location}</p>
                  </div>
                  <span className="text-[9px] font-bold text-basil bg-basil-light px-2 py-0.5 rounded-lg shrink-0">
                    {t.orderCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

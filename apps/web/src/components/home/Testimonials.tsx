'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

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
      'As a bachelor, QuickBasket has been a lifesaver. From late-night snacks to morning milk — everything delivered in minutes. The app is super intuitive too!',
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
      'The freshness of fruits here is unmatched. My kids love the organic mangoes! Plus, the discount offers keep my monthly grocery bill way under budget.',
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
      'Switched from BigBasket to QuickBasket last month and haven\'t looked back. Faster delivery, better prices, and the customer support is exceptional.',
    orderCount: '40+ orders',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? 'text-mango fill-mango'
              : 'text-ink-200 fill-ink-200'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Trusted by Thousands"
          title="What Our Customers Say"
          description="Real reviews from real QuickBasket shoppers."
        />

        {/* Scroll arrows — desktop only */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-mist bg-surface hover:bg-basil-light text-ink-400 hover:text-basil flex items-center justify-center transition-all active:scale-90"
            aria-label="Scroll testimonials left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-mist bg-surface hover:bg-basil-light text-ink-400 hover:text-basil flex items-center justify-center transition-all active:scale-90"
            aria-label="Scroll testimonials right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally scrolling cards */}
      <div
        ref={scrollRef}
        className="mt-6 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="group min-w-[280px] max-w-[320px] flex-shrink-0 snap-start bg-surface border border-mist rounded-card p-5 shadow-card hover:shadow-float hover:-translate-y-1 hover:border-basil/20 transition-all duration-300 ease-smooth flex flex-col"
          >
            {/* Quote icon */}
            <Quote className="w-6 h-6 text-basil/20 mb-3 -scale-x-100" />

            {/* Review text */}
            <p className="text-xs text-ink-600 leading-relaxed flex-1 mb-4">
              &ldquo;{t.review}&rdquo;
            </p>

            {/* Rating */}
            <StarRating rating={t.rating} />

            {/* Divider */}
            <hr className="border-mist my-3" />

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-basil-light shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-ink truncate">
                  {t.name}
                </p>
                <p className="text-[10px] text-ink-400 truncate">
                  {t.location}
                </p>
              </div>
              <span className="text-[9px] font-bold text-basil bg-basil-light px-2 py-0.5 rounded-pill shrink-0">
                {t.orderCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

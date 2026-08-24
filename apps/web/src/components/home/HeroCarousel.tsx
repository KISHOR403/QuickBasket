'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Slide {
  id: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  imageUrl: string;
  imageAlt: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    badge: 'Fresh Arrivals',
    badgeBg: 'bg-mango',
    badgeTextColor: 'text-ink',
    headline: 'Farm Fresh,\nIn 10 Minutes.',
    subtitle: 'Stock up on daily essentials sourced directly from local farms. Handpicked quality guaranteed.',
    ctaText: 'Shop Vegetables',
    ctaHref: '/category/fresh-vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Farm fresh vegetables',
  },
  {
    id: 'slide-2',
    badge: 'Daily Essentials',
    badgeBg: 'bg-leaf',
    badgeTextColor: 'text-white',
    headline: 'Pure Organic Milk\n& Fresh Dairy.',
    subtitle: 'Farm-fresh milk, butter, paneer, and curd delivered chilled to your doorstep in 10 mins.',
    ctaText: 'Explore Dairy & Eggs',
    ctaHref: '/category/dairy-bread-eggs',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Organic fresh milk and dairy',
  },
  {
    id: 'slide-3',
    badge: 'Super Saver Sale',
    badgeBg: 'bg-beet',
    badgeTextColor: 'text-white',
    headline: 'Juicy Fruits &\nExotic Berries.',
    subtitle: 'Up to 40% OFF on imported apples, organic berries, and sweet farm-picked fruits.',
    ctaText: 'Shop Fresh Fruits',
    ctaHref: '/category/fresh-fruits',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Fresh fruits and berries',
  },
  {
    id: 'slide-4',
    badge: 'Express Munchies',
    badgeBg: 'bg-brand',
    badgeTextColor: 'text-ink',
    headline: 'Midnight Snacks\n& Cold Drinks.',
    subtitle: 'Crave-worthy chips, chocolates, artisanal beverages & snacks delivered 24x7 in minutes.',
    ctaText: 'Order Snacks & Drinks',
    ctaHref: '/category/munchies',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Snacks, chips, and drinks',
  },
  {
    id: 'slide-5',
    badge: 'Baked Fresh Daily',
    badgeBg: 'bg-amber-600',
    badgeTextColor: 'text-white',
    headline: 'Artisanal Breads\n& Oven Bakery.',
    subtitle: 'Fresh sourdough, croissants, and whole wheat loaves baked every morning.',
    ctaText: 'Browse Bakery',
    ctaHref: '/category/bakery-biscuits',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Freshly baked breads and bakery',
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide effect every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative overflow-hidden rounded-3xl min-h-[340px] sm:min-h-[380px] flex items-end shadow-float border border-white/10 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images Cross-Fade */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-7000 ease-out scale-105"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Dark Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-black/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/70 via-transparent to-transparent hidden sm:block" />

      {/* Slide Dynamic Content */}
      <div className="relative z-20 p-6 sm:p-10 w-full space-y-3.5">
        <div key={`content-${currentIndex}`} className="space-y-3 animate-fadeInUp">
          <span
            className={`inline-flex items-center gap-1.5 ${activeSlide.badgeBg} ${activeSlide.badgeTextColor} text-[11px] font-extrabold uppercase px-3 py-1 rounded-pill tracking-wider shadow-sm`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeSlide.badge}</span>
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight max-w-xl whitespace-pre-line drop-shadow-md">
            {activeSlide.headline}
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md font-medium drop-shadow">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2">
            <Link href={activeSlide.ctaHref}>
              <Button variant="primary" size="md" className="font-extrabold gap-2 shadow-pill hover:scale-105 active:scale-95 transition-all">
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Controls & Indicators Footer */}
        <div className="pt-4 flex items-center justify-between">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-mango shadow-glow'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

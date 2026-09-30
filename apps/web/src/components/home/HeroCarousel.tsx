'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Leaf, ShieldCheck } from 'lucide-react';

const FLOATING_CARDS = [
  { emoji: '🥑', name: 'Avocados', price: '₹189', position: 'top-[18%] right-[8%] md:right-[12%]' },
  { emoji: '🍓', name: 'Berries', price: '₹149', position: 'bottom-[22%] right-[4%] md:right-[6%]' },
  { emoji: '🥛', name: 'Fresh Milk', price: '₹54', position: 'top-[55%] right-[18%] md:right-[22%]' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] md:min-h-[88vh] flex items-center overflow-hidden pt-20 md:pt-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-basil-light/20 to-paper" />

      {/* Large decorative circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-basil/[0.03]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Typography & CTAs */}
          <div className="space-y-6 md:space-y-8 animate-fadeInUp">
            {/* Freshness indicator */}
            <div className="inline-flex items-center gap-2 bg-basil-light/60 border border-basil/10 px-4 py-2 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-basil animate-livePulse" />
              <span className="text-xs font-bold text-basil uppercase tracking-wider">Delivering in 10 min</span>
            </div>

            {/* Giant headline */}
            <h1 className="font-display text-display-xl text-ink">
              Fresh food.
              <br />
              <span className="text-gradient">Delivered better.</span>
            </h1>

            {/* Supporting text */}
            <p className="text-base md:text-lg text-ink-400 leading-relaxed max-w-lg font-medium">
              Handpicked groceries from local farms and trusted brands — 
              at your doorstep before you finish making chai.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/category/fresh-vegetables"
                className="group inline-flex items-center gap-2.5 bg-ink hover:bg-ink-700 text-white px-7 py-4 rounded-2xl text-sm font-bold transition-all active:scale-[0.97] shadow-float hover:shadow-editorial"
              >
                <span>Shop fresh</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 text-ink-500 hover:text-ink px-5 py-4 rounded-2xl text-sm font-bold hover:bg-ink/[0.04] transition-all"
              >
                Explore categories
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              {[
                { icon: Clock, label: '10-min delivery' },
                { icon: Leaf, label: 'Farm fresh' },
                { icon: ShieldCheck, label: 'Quality assured' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-ink-400 font-medium">
                  <item.icon className="w-4 h-4 text-basil" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Large hero image with floating product cards */}
          <div className="relative hidden lg:block">
            {/* Main hero image */}
            <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh fruits and vegetables"
                  fill
                  sizes="(max-width: 1024px) 0vw, 480px"
                  className="object-cover img-reveal"
                  priority
                />
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating product cards */}
            {FLOATING_CARDS.map((card) => (
              <div
                key={card.name}
                className={`absolute ${card.position} glass rounded-2xl px-3 py-2.5 shadow-glass border border-white/40 animate-float hover-lift cursor-default`}
                style={{ animationDelay: `${FLOATING_CARDS.indexOf(card) * 0.6}s` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{card.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-ink">{card.name}</div>
                    <div className="text-[10px] font-mono font-bold text-basil">{card.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

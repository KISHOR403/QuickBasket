'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Tag, Truck } from 'lucide-react';

export function PromoBanners() {
  return (
    <section className="py-14 md:py-20 bg-[#fbfaf8] border-b border-ink/[0.06] selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>LIMITED CURATION</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              Today&apos;s <span className="font-serif italic font-normal text-ink-600">drops.</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase hidden md:flex items-center gap-3">
            <span>DROP 01–03</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-semibold">REFRESHED 06:00 AM</span>
          </div>
        </div>

        {/* Promotional Hierarchy: 1 Hero Offer + 2 Small Drops */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* ── HERO OFFER (Primary Visual Weight) ── */}
          <Link
            href="/category/fresh-vegetables"
            className="group relative block rounded-2xl sm:rounded-3xl bg-[#14231a] text-white overflow-hidden border border-ink/20 shadow-md transition-all duration-500 hover:shadow-xl"
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"
                alt="Fresh vegetable harvest"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover object-right md:object-center opacity-30 group-hover:scale-103 group-hover:opacity-35 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#14231a] via-[#14231a]/90 to-transparent" />
            </div>

            {/* Hero Offer Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-[0.2em] text-white/90 mb-6">
                <Sparkles className="w-3 h-3 text-[#d6b06e]" />
                <span>DROP 01 / HARVEST RELEASE</span>
              </div>

              {/* Eyebrow & Main Discount Heading */}
              <div className="space-y-1 mb-4">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-emerald-300/90 font-semibold">
                  FRESH VEGETABLES
                </span>
                <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
                  UP TO 30% OFF
                </h3>
              </div>

              {/* Supporting Editorial Line */}
              <p className="text-white/70 text-sm sm:text-base font-sans leading-relaxed mb-8 max-w-lg">
                Direct from verified regional growers. Hand-graded at sunrise with zero cold storage delays — crisp greens, firm roots & farm-fresh vine produce.
              </p>

              {/* Action Button */}
              <span className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ink bg-white hover:bg-emerald-50 px-6 py-3.5 rounded-xl transition-all shadow-sm group-hover:translate-x-1">
                <span>Shop today&apos;s harvest</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* ── TWO SMALL DROPS (DROP 02 & DROP 03) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* DROP 02 */}
            <Link
              href="/category/dairy-bread-eggs"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-ink/[0.08] hover:border-ink/20 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-basil font-bold uppercase bg-basil/10 px-2.5 py-1 rounded-md">
                    DROP 02
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-400 uppercase tracking-wider">
                    <Truck className="w-3.5 h-3.5 text-ink-500" />
                    <span>LOGISTICS PERK</span>
                  </div>
                </div>

                <div className="space-y-1 mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">
                    DAILY DAIRY & BREAKFAST
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight group-hover:text-basil transition-colors">
                    Free delivery above ₹299
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-ink-600 font-sans leading-relaxed line-clamp-2">
                  Chilled glass bottles, sourdough batches & fresh morning pasture eggs dispatched in under 10 minutes.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-ink/[0.06] flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-basil transition-colors flex items-center gap-1.5">
                  <span>Start shopping</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="font-mono text-[10px] text-ink-400">NO CODE REQ.</span>
              </div>
            </Link>

            {/* DROP 03 */}
            <Link
              href="/category/fresh-vegetables"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border border-ink/[0.08] hover:border-ink/20 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#9c362a] font-bold uppercase bg-[#9c362a]/10 px-2.5 py-1 rounded-md">
                    DROP 03
                  </span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-ink bg-ink/5 px-2 py-0.5 rounded border border-ink/10 tracking-widest">
                    <Tag className="w-3 h-3 text-[#9c362a]" />
                    <span>CODE: FRESH50</span>
                  </div>
                </div>

                <div className="space-y-1 mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500 block">
                    FIRST BASKET PRIVILEGE
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight group-hover:text-basil transition-colors">
                    Flat ₹50 off your basket
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-ink-600 font-sans leading-relaxed line-clamp-2">
                  Taste the harvest standard with ₹50 instant savings applied across any organic produce or grocery cart.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-ink/[0.06] flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink group-hover:text-basil transition-colors flex items-center gap-1.5">
                  <span>Claim drop discount</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="font-mono text-[10px] text-ink-400">MIN. ₹199</span>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

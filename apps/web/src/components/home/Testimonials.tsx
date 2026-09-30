'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const MINI_REVIEWS = [
    {
      id: 'rev-1',
      quote:
        '8-minute delivery is actually real. The fresh mint and coriander smelled like morning dew.',
      author: 'Rahul V.',
      city: 'Indiranagar, Bengaluru',
      verified: true,
    },
    {
      id: 'rev-2',
      quote:
        'Zero plastic waste in my deliveries. Everything arrived in structured recycled craft paper bags.',
      author: 'Ananya G.',
      city: 'Koramangala, Bengaluru',
      verified: true,
    },
    {
      id: 'rev-3',
      quote:
        'Instant no-questions-asked refund when one avocado was too soft. Exceptional customer standard.',
      author: 'Vikram S.',
      city: 'Whitefield, Bengaluru',
      verified: true,
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-[#faf8f5] border-b border-ink/[0.06] selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-10 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] text-basil uppercase font-bold flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
              <span>COMMUNITY VOICES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              What people <span className="font-serif italic font-normal text-ink-600">say.</span>
            </h2>
          </div>

          <div className="font-mono text-[10px] tracking-[0.2em] text-ink-400 uppercase hidden md:flex items-center gap-3">
            <span>VERIFIED MEMBERS</span>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-semibold">100% UNEDITED</span>
          </div>
        </div>

        {/* ── SOCIAL PROOF WALL: Hero Statement + Aggregate Score ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12">
          
          {/* Left: Oversized Statement */}
          <div className="lg:col-span-8 space-y-4">
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] font-bold text-ink tracking-tight leading-tight">
              &ldquo;Finally a grocery app that doesn&apos;t feel like a grocery app.&rdquo;
            </blockquote>

            {/* Stars & Attribution */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-1 text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b] stroke-[#f59e0b]" />
                ))}
              </div>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-ink font-semibold">
                — Priya, Bengaluru
              </span>
            </div>
          </div>

          {/* Right: Aggregate Score Stat Box */}
          <div className="lg:col-span-4 lg:border-l border-ink/[0.08] lg:pl-10">
            <div className="inline-block p-6 sm:p-7 bg-white rounded-2xl border border-ink/[0.08] shadow-xs">
              <div className="font-display text-4xl sm:text-5xl font-black text-ink tracking-tight">
                4.8 <span className="text-ink-300 font-light text-2xl">/ 5</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-ink-600 font-semibold mt-1">
                12k+ verified reviews
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-basil font-mono font-medium mt-3 pt-3 border-t border-ink/[0.06]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Independently audited orders</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── 3 TINY REVIEW SNIPPETS BELOW ── */}
        <div className="pt-8 border-t border-ink/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MINI_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between space-y-3 p-5 rounded-xl bg-white/70 border border-ink/[0.05] hover:bg-white hover:border-ink/[0.12] transition-colors"
            >
              <p className="text-xs sm:text-sm text-ink-600 font-sans leading-relaxed">
                &ldquo;{rev.quote}&rdquo;
              </p>

              <div className="pt-2 border-t border-ink/[0.04] flex items-center justify-between font-mono text-[10.5px]">
                <span className="font-bold text-ink">{rev.author}</span>
                <span className="text-ink-400">{rev.city}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

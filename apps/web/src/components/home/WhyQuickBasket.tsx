import React from 'react';

export function WhyQuickBasket() {
  const TRUST_ITEMS = [
    'PICKED FRESH',
    'FARM SOURCED',
    'QUALITY CHECKED',
    'FAST DELIVERY',
  ];

  return (
    <section className="py-5 sm:py-6 bg-[#f7f5f0] border-b border-ink/[0.08] selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Compact Trust Ticker Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-ink">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-2.5">
              <span className="text-basil text-sm select-none">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Reassuring Quality Commitment Underneath */}
        <p className="font-serif italic text-xs sm:text-[13px] text-ink-500 mt-2 text-center tracking-normal">
          Every order is checked before it leaves the hub.
        </p>

      </div>
    </section>
  );
}

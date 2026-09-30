import React from 'react';
import { Zap, Leaf, IndianRupee, RefreshCcw } from 'lucide-react';

const PILLARS = [
  {
    id: 'usp-1',
    icon: Zap,
    title: 'Picked fresh',
    subtitle: '10-minute delivery',
    description: 'Hyperlocal dark stores ensure your essentials arrive lightning fast.',
  },
  {
    id: 'usp-2',
    icon: Leaf,
    title: 'Farm sourced',
    subtitle: 'Organic quality',
    description: 'Directly from verified farms. Every item handpicked for freshness.',
  },
  {
    id: 'usp-3',
    icon: IndianRupee,
    title: 'Best prices',
    subtitle: 'Guaranteed savings',
    description: 'Lower than supermarkets. We pass savings directly to you.',
  },
  {
    id: 'usp-4',
    icon: RefreshCcw,
    title: 'Easy returns',
    subtitle: 'Zero hassle',
    description: 'Not happy? Instant refunds — no questions asked.',
  },
];

export function WhyQuickBasket() {
  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width storytelling layout */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group text-center md:text-left animate-fadeInUp"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-basil/10 flex items-center justify-center mb-5 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-basil" />
                </div>

                {/* Large title */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight mb-1">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <span className="text-xs font-bold text-basil uppercase tracking-wider block mb-3">
                  {pillar.subtitle}
                </span>

                {/* Description */}
                <p className="text-sm text-ink-400 leading-relaxed max-w-xs mx-auto md:mx-0">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

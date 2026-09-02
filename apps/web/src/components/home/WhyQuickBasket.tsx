import React from 'react';
import { Zap, Leaf, IndianRupee, RefreshCcw, LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/common/SectionHeader';

interface USP {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const USPS: USP[] = [
  {
    id: 'usp-1',
    icon: Zap,
    iconBg: 'bg-mango-light',
    iconColor: 'text-mango-hover',
    title: '10-Minute Delivery',
    description:
      "Hyperlocal dark stores ensure your essentials arrive before you can say 'where's my order?'",
  },
  {
    id: 'usp-2',
    icon: Leaf,
    iconBg: 'bg-basil-light',
    iconColor: 'text-basil',
    title: 'Farm Fresh Quality',
    description:
      'Sourced directly from verified organic farms. Every fruit & vegetable handpicked for freshness.',
  },
  {
    id: 'usp-3',
    icon: IndianRupee,
    iconBg: 'bg-leaf-light',
    iconColor: 'text-leaf',
    title: 'Best Prices Guaranteed',
    description:
      'Lower than supermarkets, better than wholesale. We pass savings directly to you.',
  },
  {
    id: 'usp-4',
    icon: RefreshCcw,
    iconBg: 'bg-beet-light',
    iconColor: 'text-beet',
    title: 'Easy Returns & Refunds',
    description:
      'Not happy with your order? Get instant refunds — no questions asked, zero hassle.',
  },
];

export function WhyQuickBasket() {
  return (
    <section>
      <SectionHeader
        eyebrow="The QuickBasket Promise"
        title="Why Customers Love Us"
        description="Four reasons that make QuickBasket your go-to grocery partner."
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {USPS.map((usp) => {
          const Icon = usp.icon;

          return (
            <div
              key={usp.id}
              className="group bg-surface border border-mist rounded-card p-5 shadow-card hover:shadow-float hover:-translate-y-1 hover:border-basil/20 transition-all duration-300 ease-smooth"
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-input flex items-center justify-center mb-4 ${usp.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`w-5 h-5 ${usp.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="font-display text-sm font-bold text-ink tracking-tight mb-1.5">
                {usp.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-ink-500 leading-relaxed">
                {usp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

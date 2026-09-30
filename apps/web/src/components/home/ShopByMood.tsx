'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MOODS = [
  {
    id: 'breakfast',
    label: 'Breakfast essentials',
    emoji: '🍳',
    color: 'from-amber-50 to-orange-50',
    href: '/category/dairy-bread-eggs',
  },
  {
    id: 'healthy',
    label: 'Healthy week',
    emoji: '🥗',
    color: 'from-emerald-50 to-teal-50',
    href: '/category/fresh-vegetables',
  },
  {
    id: 'movie',
    label: 'Movie night',
    emoji: '🍿',
    color: 'from-rose-50 to-pink-50',
    href: '/category/snacks-munchies',
  },
  {
    id: 'dinner',
    label: 'Quick dinner',
    emoji: '🍝',
    color: 'from-violet-50 to-purple-50',
    href: '/category/instant-food',
  },
  {
    id: 'kids',
    label: "Kids' favorites",
    emoji: '🧃',
    color: 'from-sky-50 to-blue-50',
    href: '/category/cold-drinks-juices',
  },
  {
    id: 'protein',
    label: 'Protein packed',
    emoji: '💪',
    color: 'from-lime-50 to-green-50',
    href: '/category/dairy-bread-eggs',
  },
  {
    id: 'budget',
    label: 'Under ₹299',
    emoji: '💰',
    color: 'from-yellow-50 to-amber-50',
    href: '/search?q=under+299',
  },
  {
    id: 'organic',
    label: 'Organic picks',
    emoji: '🌿',
    color: 'from-teal-50 to-emerald-50',
    href: '/category/fresh-vegetables',
  },
];

export function ShopByMood() {
  return (
    <section className="py-16 md:py-24 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-basil mb-2 block">
            Discover
          </span>
          <h2 className="font-display text-display-md text-ink">
            Shop by mood
          </h2>
          <p className="text-sm text-ink-400 mt-2 max-w-md font-medium">
            Not sure what to buy? Let your mood decide.
          </p>
        </div>

        {/* Mood cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {MOODS.map((mood, idx) => (
            <Link
              key={mood.id}
              href={mood.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${mood.color} p-5 md:p-6 hover-lift animate-fadeInUp`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-3xl md:text-4xl block mb-3 transition-transform duration-300 group-hover:scale-110">
                {mood.emoji}
              </span>
              <h3 className="text-sm md:text-base font-bold text-ink leading-tight pr-6">
                {mood.label}
              </h3>
              <ArrowRight className="w-4 h-4 text-ink-400 absolute bottom-5 right-5 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

const PREFERENCES = [
  { id: 'healthy', label: 'Healthy', emoji: '🥗' },
  { id: 'budget', label: 'Budget', emoji: '💰' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'protein', label: 'High protein', emoji: '💪' },
  { id: 'quick', label: 'Quick meals', emoji: '⏱️' },
  { id: 'organic', label: 'Organic', emoji: '🌿' },
];

export function SmartShopping() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-basil-light via-white to-cream border border-basil/10 p-8 md:p-12 lg:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-basil/[0.04] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-mango/[0.06] translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 max-w-2xl">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-basil/10 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-basil" />
            </div>

            <h2 className="font-display text-display-sm text-ink mb-3">
              Not sure what to buy?
            </h2>
            <p className="text-sm text-ink-400 leading-relaxed mb-8 max-w-lg font-medium">
              Tell us your mood and we'll build the perfect grocery list for you. 
              Select your preferences below.
            </p>

            {/* Preference chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {PREFERENCES.map((pref) => {
                const isActive = selected.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    onClick={() => toggle(pref.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                      isActive
                        ? 'bg-basil text-white shadow-pill'
                        : 'bg-white border border-mist text-ink hover:border-basil/30 hover:bg-basil-light/50'
                    }`}
                  >
                    <span>{pref.emoji}</span>
                    <span>{pref.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <button
              className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold transition-all active:scale-[0.97] ${
                selected.length > 0
                  ? 'bg-ink hover:bg-ink-700 text-white shadow-float'
                  : 'bg-mist text-ink-400 cursor-not-allowed'
              }`}
              disabled={selected.length === 0}
            >
              <span>Build my grocery list</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

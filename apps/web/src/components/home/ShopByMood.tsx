'use client';

import React from 'react';
import Link from 'next/link';

interface IngredientVisual {
  name: string;
  detail: string;
  icon: React.ReactNode;
}

interface IntentOption {
  id: string;
  code: string;
  label: string;
  tagline: string;
  description: string;
  href: string;
  baseBg: string;
  hoverBg: string;
  borderColor: string;
  hoverBorderColor: string;
  accentColor: string;
  // Tiny supporting icon or ingredient
  supportingIcon: React.ReactNode;
  // Subtle abstract visual
  renderAbstractVisual: () => React.ReactNode;
  // Small ingredient visuals that appear on hover
  ingredientVisuals: IngredientVisual[];
}

const INTENTS: IntentOption[] = [
  {
    id: 'breakfast',
    code: '01',
    label: 'Quick breakfast',
    tagline: 'MORNING RITUAL',
    description: 'Warm artisan sourdough, organic pasture eggs & cold-brew concentrate.',
    href: '/category/dairy-bread-eggs',
    baseBg: 'bg-[#faf6ee]',
    hoverBg: 'group-hover:bg-[#f3e5ce]',
    borderColor: 'border-[#ede0cb]',
    hoverBorderColor: 'group-hover:border-[#deb26f]',
    accentColor: '#b07417',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#b07417]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M4 8h14v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="5" />
        <line x1="10" y1="2" x2="10" y2="5" />
        <line x1="14" y1="2" x2="14" y2="5" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <circle cx="90" cy="90" r="76" stroke="#b07417" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="90" cy="90" r="54" stroke="#b07417" strokeWidth="1.1" />
        <circle cx="90" cy="90" r="28" fill="#b07417" fillOpacity="0.08" stroke="#b07417" strokeWidth="0.8" />
        <path d="M30 90 Q90 30 150 90" stroke="#b07417" strokeWidth="1.1" />
        <path d="M45 110 Q90 60 135 110" stroke="#b07417" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="90" y1="14" x2="90" y2="34" stroke="#b07417" strokeWidth="1" />
        <line x1="144" y1="36" x2="130" y2="50" stroke="#b07417" strokeWidth="1" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'Sourdough',
        detail: 'Artisan batard',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="11" rx="8" ry="5.5" fill="#dfa65b" />
            <path d="M5 10 Q10 7 15 10" stroke="#7e4815" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M7 8 L9 6" stroke="#7e4815" strokeWidth="1" strokeLinecap="round" />
            <path d="M12 7 L14 5" stroke="#7e4815" strokeWidth="1" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: 'Pasture Eggs',
        detail: 'Golden yolk',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="10" rx="6.5" ry="8" fill="#fae8c8" stroke="#d49a37" strokeWidth="1" />
            <circle cx="10" cy="11" r="3.2" fill="#f59e0b" />
          </svg>
        ),
      },
      {
        name: 'Cold Brew',
        detail: 'Single origin',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M6 5 H14 V14 C14 16 12 17 10 17 C8 17 6 16 6 14 Z" fill="#4d2c18" />
            <path d="M7 7 H13 V13 H7 Z" fill="#6a3e22" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'healthy',
    code: '02',
    label: 'Healthy week',
    tagline: 'CLEAN PALATE',
    description: 'Microgreens, cold-chain berries & gut-friendly botanicals.',
    href: '/category/fresh-vegetables',
    baseBg: 'bg-[#f1f6f3]',
    hoverBg: 'group-hover:bg-[#dfede3]',
    borderColor: 'border-[#cde0d3]',
    hoverBorderColor: 'group-hover:border-[#8fbea0]',
    accentColor: '#1a6b42',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-basil" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-9" />
        <path d="M12 13a6 6 0 0 0 6-6c0-3.3-2.7-5-6-5s-6 1.7-6 5a6 6 0 0 0 6 6z" />
        <path d="M12 6a3 3 0 0 1 3 3" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <path d="M20 160 C20 70, 110 20, 160 20 C160 110, 70 160, 20 160 Z" stroke="#1a6b42" strokeWidth="1.1" />
        <path d="M20 160 Q90 90 160 20" stroke="#1a6b42" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="105" cy="75" r="32" stroke="#1a6b42" strokeWidth="0.8" strokeDasharray="4 4" />
        <ellipse cx="65" cy="115" rx="18" ry="10" stroke="#1a6b42" strokeWidth="0.8" transform="rotate(-30 65 115)" />
        <circle cx="120" cy="45" r="10" fill="#1a6b42" fillOpacity="0.08" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'Hass Avocado',
        detail: 'Creamy ripe',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="10" rx="6.5" ry="8" fill="#587e38" />
            <ellipse cx="10" cy="10.5" rx="4.8" ry="6.2" fill="#c3db7d" />
            <circle cx="10" cy="11.5" r="2.8" fill="#54371f" />
          </svg>
        ),
      },
      {
        name: 'Tuscan Kale',
        detail: 'Crisp leaves',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M10 18 C10 18 6 14 6 9 C6 5 8 2 10 2 C12 2 14 5 14 9 C14 14 10 18 10 18 Z" fill="#1e5c38" />
            <line x1="10" y1="4" x2="10" y2="16" stroke="#5cb878" strokeWidth="0.8" />
          </svg>
        ),
      },
      {
        name: 'Blueberries',
        detail: 'Antioxidants',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <circle cx="8" cy="11" r="4.2" fill="#2d3b66" />
            <circle cx="13" cy="10" r="4" fill="#3b4d82" />
            <circle cx="10" cy="6" r="3.6" fill="#4d6199" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'movie',
    code: '03',
    label: 'Movie night',
    tagline: 'AFTER HOURS',
    description: 'Small-batch sea salt crunch, single-origin cacao & sparkling tonic.',
    href: '/category/snacks-munchies',
    baseBg: 'bg-[#f7f3f6]',
    hoverBg: 'group-hover:bg-[#ecdfec]',
    borderColor: 'border-[#dfd3dd]',
    hoverBorderColor: 'group-hover:border-[#c29cbe]',
    accentColor: '#7a3b5c',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#7a3b5c]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
        <line x1="12" y1="5" x2="12" y2="19" strokeDasharray="2 2" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <circle cx="90" cy="90" r="76" stroke="#7a3b5c" strokeWidth="0.8" />
        <circle cx="90" cy="90" r="56" stroke="#7a3b5c" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="90" cy="90" r="35" stroke="#7a3b5c" strokeWidth="1.2" />
        <circle cx="90" cy="90" r="14" fill="#7a3b5c" fillOpacity="0.12" />
        <path d="M30 60 Q90 120 150 60" stroke="#7a3b5c" strokeWidth="0.9" />
        <path d="M30 120 Q90 60 150 120" stroke="#7a3b5c" strokeWidth="0.9" strokeDasharray="3 3" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'Sea Salt Crisp',
        detail: 'Slow baked',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="10" rx="7.5" ry="5.5" fill="#e5b158" transform="rotate(-15 10 10)" />
            <circle cx="8" cy="9" r="0.7" fill="#fff" />
            <circle cx="12" cy="10" r="0.7" fill="#fff" />
          </svg>
        ),
      },
      {
        name: '85% Cacao',
        detail: 'Dark stone ground',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <rect x="4" y="4" width="12" height="12" rx="2" fill="#3b1d17" />
            <line x1="4" y1="10" x2="16" y2="10" stroke="#633127" strokeWidth="0.8" />
            <line x1="10" y1="4" x2="10" y2="16" stroke="#633127" strokeWidth="0.8" />
          </svg>
        ),
      },
      {
        name: 'Sparkling Tonic',
        detail: 'Botanical citrus',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M7 7 H13 V16 C13 17 12 18 10 18 C8 18 7 17 7 16 Z" fill="#9d5079" />
            <path d="M9 3 H11 V7 H9 Z" fill="#7a3b5c" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'dinner',
    code: '04',
    label: 'Family dinner',
    tagline: 'HEARTH & TABLE',
    description: 'Heirloom pomodoro, bronze-cut pasta & regional garden aromatics.',
    href: '/category/instant-food',
    baseBg: 'bg-[#f8f3ed]',
    hoverBg: 'group-hover:bg-[#eddcd0]',
    borderColor: 'border-[#dfcfbe]',
    hoverBorderColor: 'group-hover:border-[#c8987b]',
    accentColor: '#b84d2a',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#b84d2a]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="8" y1="3" x2="9" y2="5" />
        <line x1="16" y1="3" x2="15" y2="5" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <ellipse cx="90" cy="90" rx="72" ry="50" stroke="#b84d2a" strokeWidth="1" />
        <ellipse cx="90" cy="90" rx="52" ry="34" stroke="#b84d2a" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx="90" cy="90" rx="30" ry="18" fill="#b84d2a" fillOpacity="0.08" />
        <path d="M40 90 Q90 140 140 90" stroke="#b84d2a" strokeWidth="0.9" />
        <circle cx="90" cy="40" r="10" stroke="#b84d2a" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'San Marzano',
        detail: 'Sun ripened',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="11" rx="6.5" ry="7" fill="#d93829" />
            <path d="M10 4 L10 2" stroke="#2d6e3f" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 4 Q10 5 12 4" stroke="#2d6e3f" strokeWidth="1.2" />
          </svg>
        ),
      },
      {
        name: 'Bronze Rigatoni',
        detail: 'Rough surface',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <rect x="5" y="7" width="10" height="6" rx="1.5" fill="#e2af56" />
            <line x1="7" y1="7" x2="7" y2="13" stroke="#b8832a" strokeWidth="0.8" />
            <line x1="10" y1="7" x2="10" y2="13" stroke="#b8832a" strokeWidth="0.8" />
            <line x1="13" y1="7" x2="13" y2="13" stroke="#b8832a" strokeWidth="0.8" />
          </svg>
        ),
      },
      {
        name: 'Sweet Basil',
        detail: 'Fragrant sprig',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M10 16 C10 16 6 12 7 8 C8 4 12 4 13 8 C14 12 10 16 10 16 Z" fill="#2d7a46" />
            <line x1="10" y1="6" x2="10" y2="15" stroke="#71b585" strokeWidth="0.7" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'protein',
    code: '05',
    label: 'High protein',
    tagline: 'PEAK NUTRITION',
    description: 'Artisan paneer, sprouted pulses, raw almonds & thick Greek curd.',
    href: '/category/dairy-bread-eggs',
    baseBg: 'bg-[#f0f6f4]',
    hoverBg: 'group-hover:bg-[#ddeee8]',
    borderColor: 'border-[#c7ded6]',
    hoverBorderColor: 'group-hover:border-[#7caea0]',
    accentColor: '#246b5a',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#246b5a]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <polygon points="90,18 152,54 152,126 90,162 28,126 28,54" stroke="#246b5a" strokeWidth="1.1" />
        <polygon points="90,44 130,68 130,112 90,136 50,112 50,68" stroke="#246b5a" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="90" cy="90" r="16" fill="#246b5a" fillOpacity="0.1" />
        <line x1="90" y1="18" x2="90" y2="162" stroke="#246b5a" strokeWidth="0.7" strokeDasharray="4 4" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'Grass-fed Paneer',
        detail: 'Soft dense cube',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <rect x="5" y="5" width="10" height="10" rx="1" fill="#fdfcf8" stroke="#d5ccba" strokeWidth="1" />
            <line x1="5" y1="10" x2="15" y2="10" stroke="#eee6d6" strokeWidth="0.8" />
          </svg>
        ),
      },
      {
        name: 'Raw Almonds',
        detail: 'California kern',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="10" rx="5" ry="8" fill="#9c5f32" transform="rotate(25 10 10)" />
            <path d="M8 6 Q11 10 10 14" stroke="#c98a5d" strokeWidth="0.8" />
          </svg>
        ),
      },
      {
        name: 'Greek Curd',
        detail: 'Live culture',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M6 7 H14 L13 16 H7 Z" fill="#e7f0ec" stroke="#246b5a" strokeWidth="0.9" />
            <ellipse cx="10" cy="7" rx="4" ry="1.5" fill="#ffffff" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'budget',
    code: '06',
    label: 'Under ₹300',
    tagline: 'ESSENTIAL CRATE',
    description: 'Farm-direct staple vegetables, essential pulses & everyday pantry.',
    href: '/search?q=under+300',
    baseBg: 'bg-[#f7f5ee]',
    hoverBg: 'group-hover:bg-[#eae3ce]',
    borderColor: 'border-[#dfd8c4]',
    hoverBorderColor: 'group-hover:border-[#b09e74]',
    accentColor: '#455949',
    supportingIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#455949]" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M12 9v6" />
        <path d="M9 12h6" />
      </svg>
    ),
    renderAbstractVisual: () => (
      <svg viewBox="0 0 180 180" className="w-full h-full opacity-20 group-hover:opacity-40 transition-all duration-700 ease-smooth" fill="none">
        <line x1="20" y1="90" x2="160" y2="90" stroke="#455949" strokeWidth="1.1" />
        <line x1="90" y1="20" x2="90" y2="160" stroke="#455949" strokeWidth="1.1" />
        <circle cx="90" cy="90" r="60" stroke="#455949" strokeWidth="0.8" strokeDasharray="4 4" />
        <rect x="68" y="68" width="44" height="44" stroke="#455949" strokeWidth="0.9" />
        <circle cx="90" cy="90" r="10" fill="#455949" fillOpacity="0.08" />
      </svg>
    ),
    ingredientVisuals: [
      {
        name: 'Red Shallot',
        detail: 'Sweet pungent',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="11" rx="6" ry="6.8" fill="#8c3352" />
            <path d="M10 4 L10 2" stroke="#521f30" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="10" y1="6" x2="10" y2="16" stroke="#aa4b6b" strokeWidth="0.7" />
          </svg>
        ),
      },
      {
        name: 'Russet Potato',
        detail: 'Farm dug',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <ellipse cx="10" cy="10" rx="7" ry="5.5" fill="#a47b4d" transform="rotate(-10 10 10)" />
            <circle cx="7" cy="9" r="0.6" fill="#694a29" />
            <circle cx="12" cy="11" r="0.6" fill="#694a29" />
          </svg>
        ),
      },
      {
        name: 'Coriander Bunch',
        detail: 'Dew fresh',
        icon: (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 shrink-0" fill="none">
            <path d="M10 17 L10 8 M7 8 Q10 4 13 8 M5 12 Q10 9 15 12" stroke="#2a6e38" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
];

export function ShopByMood() {
  return (
    <section className="py-20 md:py-28 bg-[#faf8f5] border-b border-ink/[0.08] relative overflow-hidden selection:bg-basil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Swiss Architectural Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-ink/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.28em] text-basil uppercase font-bold flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block animate-pulseFast" />
              <span>INTENT-BASED DISCOVERY — NO MANUAL SEARCH</span>
            </div>
            
            {/* Required exact headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-ink tracking-tight uppercase leading-none">
              WHAT ARE YOU SHOPPING FOR?
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-[13px] text-ink-500 font-sans leading-relaxed">
              Curated grocery discovery pathways designed around your day and table. Skip standard category browsing.
            </p>
          </div>
        </div>

        {/* 6 Large Interactive Intent Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {INTENTS.map((intent) => (
            <Link
              key={intent.id}
              href={intent.href}
              className={`group relative overflow-hidden p-7 sm:p-8 md:p-9 ${intent.baseBg} ${intent.hoverBg} border ${intent.borderColor} ${intent.hoverBorderColor} transition-all duration-500 ease-smooth flex flex-col justify-between min-h-[300px] sm:min-h-[320px] md:min-h-[335px] hover:-translate-y-1.5 hover:scale-[1.018] hover:shadow-[0_22px_44px_-16px_rgba(15,26,20,0.14)]`}
            >
              {/* Subtle Abstract Visual */}
              <div className="absolute -right-8 -bottom-8 w-52 h-52 pointer-events-none transition-transform duration-700 ease-smooth group-hover:scale-115 group-hover:-rotate-3">
                {intent.renderAbstractVisual()}
              </div>

              {/* Card Top: Code Index, Supporting Icon & Dynamic Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Tiny supporting icon */}
                  <div className="w-8 h-8 rounded-full bg-white/80 border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    {intent.supportingIcon}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-ink-400 group-hover:text-ink transition-colors uppercase block leading-none">
                      {intent.code} // {intent.tagline}
                    </span>
                  </div>
                </div>

                {/* Arrow appears on hover */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span className="uppercase tracking-wider text-[10px]">Explore</span>
                  <span className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-xs leading-none shadow-xs">
                    →
                  </span>
                </div>
              </div>

              {/* Card Middle: Primary Option Title & Short Description */}
              <div className="relative z-10 my-6">
                <h3 className="font-display text-2xl sm:text-[1.7rem] font-bold text-ink tracking-tight leading-snug group-hover:translate-x-1 transition-transform duration-300">
                  {intent.label}
                </h3>
                <p className="text-xs sm:text-[13px] text-ink-600 font-sans leading-relaxed mt-2.5 max-w-[285px]">
                  {intent.description}
                </p>
              </div>

              {/* Card Bottom: Small Ingredient Visuals Appear on Hover */}
              <div className="relative z-10 pt-4 border-t border-black/[0.06] flex items-center justify-between min-h-[46px]">
                {/* Default state hint that fades out on hover */}
                <div className="font-mono text-[10px] tracking-wider uppercase text-ink-400 group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-300" />
                  <span>3 curated ingredients</span>
                </div>

                {/* On hover: small ingredient visuals appear with playful staggered reveal */}
                <div className="absolute inset-x-0 bottom-0 top-4 flex flex-wrap items-center gap-1.5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                  {intent.ingredientVisuals.map((ing, i) => (
                    <div
                      key={ing.name}
                      style={{ transitionDelay: `${i * 50}ms` }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-black/12 text-ink shadow-2xs transition-transform duration-200 group-hover:scale-100"
                    >
                      <span className="shrink-0">{ing.icon}</span>
                      <span className="font-mono text-[10px] font-semibold tracking-tight text-ink-800">
                        {ing.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtle corner arrow visible only when not hovering */}
                <span className="font-mono text-ink-300 group-hover:opacity-0 transition-opacity duration-200 text-xs shrink-0">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Discovery Footer Strip */}
        <div className="mt-12 pt-6 border-t border-ink/[0.06] flex flex-col sm:flex-row items-center justify-between text-ink-400 font-mono text-[11px] gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-basil/70" />
            <span>INSTANT BASKET PACKING: ASSEMBLED IN 10 MINUTES FROM LOCAL MICRO-HUBS</span>
          </div>
          <span className="tracking-widest uppercase text-[10px]">
            6 DISCOVERY PATHWAYS · REAL-TIME INVENTORY
          </span>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocationStore } from '@/store/location';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useHasMounted } from '@/lib/useHasMounted';
import { ShoppingBag } from 'lucide-react';

export function HeroSection() {
  const { city } = useLocationStore();
  const { getTotalItems } = useCartStore();
  const { openCartDrawer } = useUiStore();
  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;

  const [pulseTime, setPulseTime] = useState('10 MIN');
  const [hoveredProduce, setHoveredProduce] = useState<{
    name: string;
    origin: string;
    price: string;
  } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle gentle update to delivery status indicator (real-time feel)
  useEffect(() => {
    const timer = setInterval(() => {
      const minutes = [9, 10, 11, 10];
      const randomMin = minutes[Math.floor(Math.random() * minutes.length)];
      setPulseTime(`${randomMin} MIN`);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleFocusSearch = () => {
    const input = document.getElementById('header-search-input') as HTMLInputElement | null;
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const displayCity = (city || 'Bengaluru').toUpperCase();

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[92vh] md:min-h-[96vh] bg-[#faf8f5] text-ink overflow-hidden flex flex-col justify-between pt-32 sm:pt-28 md:pt-24 pb-6 md:pb-8 selection:bg-basil/10"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. Swiss Grid Lines & Archival Metadata
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Fine vertical 22% grid guide */}
        <div className="hidden lg:block absolute left-[22%] top-0 bottom-0 w-[1px] bg-ink/[0.04]" />
        {/* Fine vertical 82% guide */}
        <div className="hidden xl:block absolute right-[18%] top-0 bottom-0 w-[1px] bg-ink/[0.03]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. Monumental Typographic Watermark (Interacts with composition)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-32 sm:top-20 lg:top-8 left-3 sm:left-6 lg:left-12 select-none pointer-events-none z-0 font-display font-black text-[22vw] sm:text-[19vw] lg:text-[17vw] leading-[0.74] tracking-[-0.05em] text-ink/[0.035] lg:text-ink/[0.04] uppercase transition-opacity duration-1000"
        aria-hidden="true"
      >
        FRESH
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. Top Editorial Datum Line (Desktop)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full hidden md:block pt-3 mb-4">
        <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3 text-[10px] font-mono tracking-[0.22em] text-ink-400 uppercase">
          <div className="flex items-center gap-6">
            <span className="text-ink font-semibold">SYS // 01</span>
            <span className="text-ink-300">/</span>
            <span>CHILLED HARVEST SUPPLY</span>
          </div>
          <div className="flex items-center gap-6">
            <span>{displayCity} HUB</span>
            <span className="text-ink-300">/</span>
            <span className="text-basil font-semibold">DIRECT FIELD INTAKE</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. Main Asymmetric Composition (Desktop / Tablet)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 20-35% Editorial Typography & Intentional Interaction */}
          <div className="lg:col-span-5 xl:col-span-5 relative z-20 pt-2 lg:pt-0">
            {/* Contextual Delivery Indicator */}
            <div className="inline-flex items-center gap-2.5 mb-6 lg:mb-8 bg-[#faf8f5]/90 backdrop-blur-xs py-1.5 px-3 rounded-xl border border-ink/[0.08] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-basil opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-basil" />
              </span>
              <div className="flex flex-col">
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-ink font-bold flex items-center gap-1.5">
                  <span>{displayCity}</span>
                  <span className="text-ink-300 font-normal">·</span>
                  <span className="text-basil font-mono transition-all duration-500">{pulseTime}</span>
                </div>
                <span className="text-xs text-ink-500 font-sans tracking-tight font-medium mt-0.5">
                  Freshness is already on the way.
                </span>
              </div>
            </div>

            {/* Confident Headline */}
            <div className="space-y-4">
              <div className="font-mono text-[10px] tracking-[0.26em] text-ink-400 uppercase flex items-center gap-2">
                <span>01</span>
                <span className="w-8 h-[1px] bg-ink/20" />
                <span>Everyday pantry</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.9rem] font-bold text-ink leading-[1.01] tracking-[-0.038em]">
                Fresh groceries
                <span className="block font-serif italic font-normal text-ink-600 text-3xl sm:text-4xl lg:text-[3.4rem] mt-1.5 tracking-[-0.02em]">
                  for everyday life.
                </span>
              </h1>

              {/* Fine Editorial Rule */}
              <div className="w-12 h-[1px] bg-ink/20 my-4" />

              <p className="text-xs sm:text-sm lg:text-[15px] text-ink-500 font-sans font-normal leading-relaxed max-w-sm">
                Harvested at dawn from regional growers. Delivered to your countertop in ten minutes, cold-chain preserved.
              </p>
            </div>

            {/* Primary Action — Compact, razor-sharp editorial button */}
            <div className="flex flex-wrap items-center gap-6 pt-6 lg:pt-8">
              <Link
                href="/category/fresh-vegetables"
                className="group inline-flex items-center gap-2.5 bg-ink text-white hover:bg-ink-700 px-5 py-3 rounded-none text-xs font-mono uppercase tracking-[0.16em] transition-all duration-300 hover:gap-3.5 active:scale-98 shadow-sm"
              >
                <span>Start shopping</span>
                <span className="text-sm font-sans transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <button
                type="button"
                onClick={handleFocusSearch}
                className="text-xs font-mono text-ink-500 hover:text-ink tracking-wider transition-colors inline-flex items-center gap-1.5 border-b border-ink/25 hover:border-ink pb-0.5 group"
              >
                <span>Search catalogue</span>
                <span className="text-[10px] text-ink-400 font-mono transition-transform group-hover:translate-x-0.5">[/]</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Fresh Supply Map & Live Harvest System */}
          <div className="lg:col-span-7 xl:col-span-7 relative z-10 mt-8 lg:mt-0 flex flex-col items-center justify-center">
            {/* The Supply System Visual Canvas — Intentionally Contained with Breathing Room */}
            <div className="w-full max-w-[540px] lg:max-w-[580px] aspect-square relative flex flex-col justify-between p-4 sm:p-6 select-none">
              
              {/* Top Bar: Editorial Live Status & System Telemetry */}
              <div className="flex items-center justify-between z-20 pb-2 min-h-[28px]">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-basil opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-basil" />
                  </span>
                  <span className="text-basil font-bold">LIVE SUPPLY</span>
                  <span className="text-ink-300">/</span>
                  <span className="text-ink-500 font-sans normal-case text-xs">Harvest cycle active</span>
                </div>

                {/* Dynamic Telemetry / Hovered Produce Inspector */}
                {hoveredProduce ? (
                  <div className="flex items-center gap-2 px-3 py-1 bg-ink text-white rounded-full text-xs font-mono shadow-md animate-fadeIn">
                    <span className="font-bold text-basil-light tracking-wider">{hoveredProduce.name}</span>
                    <span className="text-white/30">/</span>
                    <span className="text-white/80 text-[10px] tracking-wide">{hoveredProduce.origin}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-amber-300 font-bold">{hoveredProduce.price}</span>
                  </div>
                ) : (
                  <div className="hidden sm:flex items-center gap-3 font-mono text-[9px] tracking-[0.18em] text-ink-400 uppercase">
                    <span>ORBIT: 3 TRACKS</span>
                    <span className="text-ink-300">·</span>
                    <span>4°C TEMP-LOCK</span>
                  </div>
                )}
              </div>

              {/* Central Abstract Supply Map Canvas */}
              <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[340px] sm:min-h-[380px]">
                
                {/* Background Topographic / Orbital Contours */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Outer subtle ring */}
                  <div className="w-[94%] aspect-square rounded-full border border-basil/[0.12] border-dashed" />
                  {/* Second contour with subtle tone */}
                  <div className="absolute w-[78%] aspect-square rounded-full border border-basil/[0.16] bg-basil/[0.015]" />
                  {/* Third contour */}
                  <div className="absolute w-[60%] aspect-square rounded-full border border-basil/[0.22] border-dotted" />
                  {/* Inner halo */}
                  <div className="absolute w-[42%] aspect-square rounded-full bg-gradient-to-b from-basil/[0.04] to-transparent border border-basil/[0.25]" />
                  {/* Cardinal Axis lines */}
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-ink/[0.07] to-transparent" />
                  <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-ink/[0.07] to-transparent" />
                </div>

                {/* SVG Flowing Supply Routes, Orbital Tracks & Moving Produce Objects */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full relative z-10 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Subtle route gradients */}
                    <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a6b42" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#22a855" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0f1a14" stopOpacity="0.5" />
                    </linearGradient>

                    <linearGradient id="routeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a6b42" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#e08a1e" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0f1a14" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>

                  {/* Supply Flow Connectors between Nodes */}
                  <path
                    d="M 100 100 C 60 180, 55 260, 85 320 C 115 380, 180 415, 250 425"
                    stroke="url(#routeGrad1)"
                    strokeWidth="1.25"
                    strokeDasharray="4 3"
                    className="opacity-70"
                  />
                  <path
                    d="M 400 110 C 440 190, 445 260, 415 320 C 385 380, 320 415, 250 425"
                    stroke="url(#routeGrad2)"
                    strokeWidth="1.25"
                    strokeDasharray="4 3"
                    className="opacity-70"
                  />
                  <path
                    d="M 100 100 C 200 60, 300 60, 400 110"
                    stroke="rgba(26, 107, 66, 0.25)"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M 85 320 C 150 360, 350 360, 415 320"
                    stroke="rgba(15, 26, 20, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* ─────────────────────────────────────────────────────────────
                      THE 3 CONTINUOUS ORBITAL TRACKS
                  ───────────────────────────────────────────────────────────── */}
                  {/* Track 1: Inner Orbit (R=110) */}
                  <circle cx="250" cy="250" r="110" stroke="rgba(26, 107, 66, 0.25)" strokeWidth="1" strokeDasharray="3 4" />
                  
                  {/* Track 2: Middle Orbit (R=158) */}
                  <circle cx="250" cy="250" r="158" stroke="rgba(26, 107, 66, 0.22)" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Track 3: Outer Orbit (R=208) */}
                  <circle cx="250" cy="250" r="208" stroke="rgba(26, 107, 66, 0.18)" strokeWidth="1" strokeDasharray="5 5" />

                  {/* ─────────────────────────────────────────────────────────────
                      LIVE MOVING FRESH PRODUCE ITEMS (CONTINUOUS ORBITAL TRAVEL)
                  ───────────────────────────────────────────────────────────── */}

                  {/* ── INNER ORBIT (R=110) ── Clockwise Travel ──────────────── */}

                  {/* Item 1: Fresh Botanical Basil Leaf (16s CW) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCW 16s linear infinite',
                      animationDelay: '0s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'BASIL', origin: 'Farm 01 · Greenhouse', price: '₹45 / bunch' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 140)">
                      <g transform="rotate(45)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <path d="M 0,-8 C 5,-5, 6,2, 0,8 C -6,2, -5,-5, 0,-8 Z" fill="#1a6b42" />
                        <path d="M 0,-6 Q 1,0 0,6" stroke="#2fa063" strokeWidth="0.8" fill="none" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-22" y="-18" width="44" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">BASIL</text>
                      </g>
                    </g>
                  </g>

                  {/* Item 2: Miniature Meyer Lemon (21s CW, staggered at 120deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCW 21s linear infinite',
                      animationDelay: '-7s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'LEMON', origin: 'Farm 02 · Orchard', price: '₹65 / 500g' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 140)">
                      <g transform="rotate(-30)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <path d="M -7,0 C -7,-4.5, -3.5,-5.5, 0,-5.5 C 3.5,-5.5, 7,-4.5, 7,0 C 7,4.5, 3.5,5.5, 0,5.5 C -3.5,5.5, -7,4.5, -7,0 Z" fill="#e8bd33" />
                        <circle cx="-6.5" cy="0" r="0.8" fill="#d4a31e" />
                        <circle cx="6.5" cy="0" r="0.8" fill="#d4a31e" />
                        <circle cx="0" cy="-6" r="1.2" fill="#1a6b42" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-24" y="-18" width="48" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">LEMON</text>
                      </g>
                    </g>
                  </g>

                  {/* Item 3: Crisp Broccoli (26s CW, staggered at 240deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCW 26s linear infinite',
                      animationDelay: '-17.3s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'BROCCOLI', origin: 'Farm 01 · Hydroponic', price: '₹79 / pc' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 140)">
                      <g className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <rect x="-1.5" y="1" width="3" height="5" rx="1" fill="#7fa882" />
                        <path d="M -6.5,1 C -7.5,-2, -5,-5.5, -2,-5.5 C -1,-7, 1,-7, 2,-5.5 C 5,-5.5, 7.5,-2, 6.5,1 Z" fill="#1b5c34" />
                        <circle cx="-2.5" cy="-2" r="1.5" fill="#297a48" />
                        <circle cx="2.5" cy="-2" r="1.5" fill="#297a48" />
                        <circle cx="0" cy="-4" r="1.5" fill="#2e8a52" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-26" y="-18" width="52" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">BROCCOLI</text>
                      </g>
                    </g>
                  </g>

                  {/* ── MIDDLE ORBIT (R=158) ── Clockwise Travel ─────────────── */}

                  {/* Item 4: Heirloom Ruby Tomato (18s CW, staggered at 45deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCW 18s linear infinite',
                      animationDelay: '-2.25s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'HEIRLOOM TOMATO', origin: 'Farm 02 · Ratnagiri', price: '₹89 / kg' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 92)">
                      <g className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <circle cx="0" cy="0" r="6.5" fill="#c83329" />
                        <circle cx="-2" cy="-2" r="1.6" fill="#f05448" opacity="0.6" />
                        <path d="M 0,-6.5 L 1.2,-4.5 L 3.5,-5.5 L 2,-3.2 L 3.5,-1.5 L 1.5,-2.2 L 0,-1.2 L -1.5,-2.2 L -3.5,-1.5 L -2,-3.2 L -3.5,-5.5 L -1.2,-4.5 Z" fill="#1a6b42" />
                        <circle cx="0" cy="-6.5" r="0.9" fill="#22a855" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-24" y="-18" width="48" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">TOMATO</text>
                      </g>
                    </g>
                  </g>

                  {/* Item 5: Wild Field Strawberry (23s CW, staggered at 220deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCW 23s linear infinite',
                      animationDelay: '-14s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'STRAWBERRY', origin: 'Farm 01 · Chilled Transit', price: '₹149 / box' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 92)">
                      <g transform="rotate(15)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <path d="M 0,7 C -4.5,4.5, -6.5,1, -6,-2.5 C -5.5,-4.8, -3,-5.8, 0,-4.5 C 3,-5.8, 5.5,-4.8, 6,-2.5 C 6.5,1, 4.5,4.5, 0,7 Z" fill="#b82c38" />
                        <circle cx="-2" cy="0" r="0.45" fill="#eedc82" />
                        <circle cx="2" cy="0.5" r="0.45" fill="#eedc82" />
                        <circle cx="0" cy="3" r="0.45" fill="#eedc82" />
                        <circle cx="-1" cy="-2" r="0.45" fill="#eedc82" />
                        <circle cx="1.5" cy="-1.5" r="0.45" fill="#eedc82" />
                        <path d="M -4,-4.5 L 0,-3 L 4,-4.5 L 2.5,-1.8 L -2.5,-1.8 Z" fill="#22a855" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-28" y="-18" width="56" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">STRAWBERRY</text>
                      </g>
                    </g>
                  </g>

                  {/* ── OUTER ORBIT (R=208) ── Counter-Clockwise Travel ──────── */}

                  {/* Item 6: Hass Avocado (28s CCW, staggered at 90deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCCW 28s linear infinite',
                      animationDelay: '-7s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'AVOCADO', origin: 'Farm 01 · North Region', price: '₹189 / pc' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 42)">
                      <g transform="rotate(-20)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <path d="M 0,-7.5 C 4,-7.5, 5.5,-4.5, 6.2,-1 C 7.2,3.5, 5.5,7.8, 0,8.2 C -5.5,7.8, -7.2,3.5, -6.2,-1 C -5.5,-4.5, -4,-7.5, 0,-7.5 Z" fill="#293922" />
                        <path d="M 0,-6.3 C 3.2,-6.3, 4.5,-3.6, 5,-0.8 C 5.8,2.8, 4.4,6.5, 0,6.9 C -4.4,6.5, -5.8,2.8, -5,-0.8 C -4.5,-3.6, -3.2,-6.3, 0,-6.3 Z" fill="#d2de96" />
                        <circle cx="0" cy="2" r="2.6" fill="#7a4d2b" />
                        <circle cx="-0.8" cy="1.3" r="0.8" fill="#996339" opacity="0.6" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-26" y="-18" width="52" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">AVOCADO</text>
                      </g>
                    </g>
                  </g>

                  {/* Item 7: Sweet Farm Carrot (32s CCW, staggered at 260deg) */}
                  <g
                    style={{
                      transformOrigin: '250px 250px',
                      animation: 'orbitCCW 32s linear infinite',
                      animationDelay: '-23s',
                    }}
                    className="hover:[animation-play-state:paused] cursor-pointer group/produce"
                    onMouseEnter={() => setHoveredProduce({ name: 'CARROT', origin: 'Farm 02 · Local Grower', price: '₹55 / kg' })}
                    onMouseLeave={() => setHoveredProduce(null)}
                  >
                    <g transform="translate(250, 42)">
                      <g transform="rotate(35)" className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform group-hover/produce:scale-125">
                        <path d="M 0,8.5 L 3.2,-4 C 3.2,-5.8, -3.2,-5.8, -3.2,-4 Z" fill="#d96825" />
                        <line x1="-1.8" y1="-1" x2="1.8" y2="-1" stroke="#b8541a" strokeWidth="0.6" />
                        <line x1="-1.2" y1="2" x2="1.2" y2="2" stroke="#b8541a" strokeWidth="0.6" />
                        <path d="M 0,-5 L -2.5,-8.5 M 0,-5 L 0,-9 M 0,-5 L 2.5,-8.5" stroke="#1a6b42" strokeWidth="0.8" strokeLinecap="round" />
                      </g>
                      <g className="opacity-0 group-hover/produce:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x="-24" y="-18" width="48" height="13" rx="2" fill="#0f1a14" opacity="0.92" />
                        <text x="0" y="-9" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">CARROT</text>
                      </g>
                    </g>
                  </g>

                  {/* ─────────────────────────────────────────────────────────────
                      Supply Nodes (Pulsing As Produce Intersects Them)
                  ───────────────────────────────────────────────────────────── */}
                  
                  {/* Node 1: FARM 01 / NORTH REGION */}
                  <g className="cursor-default">
                    <circle cx="100" cy="100" r="3.5" fill="#0f1a14" />
                    <circle cx="100" cy="100" r="9" fill="none" stroke="#1a6b42" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '100px 100px', animationDuration: '3s' }} />
                    <line x1="100" y1="100" x2="60" y2="70" stroke="rgba(15, 26, 20, 0.25)" strokeWidth="0.8" />
                  </g>

                  {/* Node 2: FARM 02 / LOCAL GROWER */}
                  <g className="cursor-default">
                    <circle cx="400" cy="110" r="3.5" fill="#0f1a14" />
                    <circle cx="400" cy="110" r="8" fill="none" stroke="#e08a1e" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '400px 110px', animationDuration: '3.6s', animationDelay: '0.8s' }} />
                    <line x1="400" y1="110" x2="440" y2="80" stroke="rgba(15, 26, 20, 0.25)" strokeWidth="0.8" />
                  </g>

                  {/* Node 3: COLD CHAIN / 4°C TRANSIT */}
                  <g className="cursor-default">
                    <circle cx="85" cy="320" r="3.5" fill="#1a6b42" />
                    <circle cx="85" cy="320" r="9" fill="none" stroke="#1a6b42" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '85px 320px', animationDuration: '3.2s', animationDelay: '1.4s' }} />
                    <line x1="85" y1="320" x2="45" y2="345" stroke="rgba(15, 26, 20, 0.25)" strokeWidth="0.8" />
                  </g>

                  {/* Node 4: HUB 01 / CENTRAL */}
                  <g className="cursor-default">
                    <circle cx="415" cy="320" r="3.5" fill="#0f1a14" />
                    <circle cx="415" cy="320" r="9" fill="none" stroke="#0f1a14" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '415px 320px', animationDuration: '2.8s', animationDelay: '2.1s' }} />
                    <line x1="415" y1="320" x2="455" y2="345" stroke="rgba(15, 26, 20, 0.25)" strokeWidth="0.8" />
                  </g>

                  {/* Node 5: DELIVERY / 10 MIN DOORSTEP */}
                  <g className="cursor-default">
                    <circle cx="250" cy="425" r="4.5" fill="#1a6b42" />
                    <circle cx="250" cy="425" r="11" fill="none" stroke="#1a6b42" strokeWidth="1.2" className="animate-ping" style={{ transformOrigin: '250px 425px', animationDuration: '2s' }} />
                  </g>
                </svg>

                {/* HTML Labels positioned precisely over the SVG nodes */}
                {/* Node 1 Label */}
                <div className="absolute top-[8%] left-[4%] text-left pointer-events-none">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink font-bold">
                    FARM 01
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-400">
                    NORTH REGION
                  </div>
                </div>

                {/* Node 2 Label */}
                <div className="absolute top-[10%] right-[4%] text-right pointer-events-none">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink font-bold">
                    FARM 02
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-400">
                    LOCAL GROWER
                  </div>
                </div>

                {/* Node 3 Label */}
                <div className="absolute bottom-[24%] left-[2%] text-left pointer-events-none">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-basil font-bold">
                    COLD CHAIN
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-400">
                    TRANSIT 4°C
                  </div>
                </div>

                {/* Node 4 Label */}
                <div className="absolute bottom-[24%] right-[2%] text-right pointer-events-none">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink font-bold">
                    HUB 01
                  </div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-400">
                    {displayCity}
                  </div>
                </div>

                {/* Node 5 Label (Doorstep) */}
                <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-basil font-bold">
                    DELIVERY · 10 MIN
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    CENTER FOCAL POINT: 10 MIN (Refined Typography Directly on Canvas)
                ───────────────────────────────────────────────────────────── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20">
                  <div className="flex flex-col items-center text-center">
                    <span className="font-display text-5xl sm:text-6xl lg:text-[4.2rem] font-bold text-ink tracking-[-0.04em] leading-[0.9]">
                      10
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.28em] text-basil uppercase mt-1">
                      MIN
                    </span>
                    <div className="w-8 h-[1px] bg-ink/20 my-2" />
                    <span className="font-mono text-[8.5px] tracking-[0.24em] text-ink-500 uppercase font-medium leading-tight">
                      FROM HARVEST<br />TO HOME
                    </span>
                  </div>
                </div>

              </div>

              {/* ─────────────────────────────────────────────────────────────
                  Supply Timeline: Harvest -> Sort -> Cold Chain -> Delivery
              ───────────────────────────────────────────────────────────── */}
              <div className="w-full pt-4 border-t border-ink/[0.07] mt-2 z-20">
                <div className="grid grid-cols-4 gap-2 text-left">
                  {[
                    { stage: 'HARVEST', time: '08:10', state: 'done' },
                    { stage: 'SORT', time: '08:24', state: 'done' },
                    { stage: 'COLD CHAIN', time: '08:31', state: 'active' },
                    { stage: 'DELIVERY', time: '08:40', state: 'pending' },
                  ].map((step, idx) => (
                    <div key={step.stage} className="relative">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            step.state === 'active'
                              ? 'bg-basil ring-2 ring-basil/20 animate-pulse'
                              : step.state === 'done'
                              ? 'bg-ink'
                              : 'bg-ink/25'
                          }`}
                        />
                        <div
                          className={`h-[1px] flex-1 ${
                            idx === 3
                              ? 'hidden'
                              : step.state === 'done'
                              ? 'bg-ink/40'
                              : 'bg-ink/15'
                          }`}
                        />
                      </div>
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-600 font-bold truncate">
                        {step.stage}
                      </div>
                      <div className="font-mono text-[10px] text-ink-400 mt-0.5">
                        {step.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. Micro Details: Swiss Bottom Tripartite Strip
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-ink/[0.07] pt-5 mt-10 md:mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          
          <div className="flex items-start gap-3.5">
            <span className="font-mono text-xs text-basil font-bold tracking-wider">01</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 font-semibold">
                Freshness
              </div>
              <div className="font-sans text-xs text-ink-700 mt-0.5 font-normal">
                Picked daily at dawn from regional orchards.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t md:border-t-0 md:border-l border-ink/[0.06] pt-3 md:pt-0 md:pl-8">
            <span className="font-mono text-xs text-basil font-bold tracking-wider">02</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 font-semibold">
                Delivery
              </div>
              <div className="font-sans text-xs text-ink-700 mt-0.5 font-normal">
                Under 10 minutes from neighborhood dark stores.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t md:border-t-0 md:border-l border-ink/[0.06] pt-3 md:pt-0 md:pl-8">
            <span className="font-mono text-xs text-basil font-bold tracking-wider">03</span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 font-semibold">
                Quality
              </div>
              <div className="font-sans text-xs text-ink-700 mt-0.5 font-normal">
                100% cold-chain verified · Zero synthetic ripening.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. Dedicated Mobile Floating Cart Capsule
      ───────────────────────────────────────────────────────────── */}
      {totalItems > 0 && (
        <div className="md:hidden fixed bottom-18 right-4 z-40 animate-slideUp">
          <button
            onClick={openCartDrawer}
            className="flex items-center gap-2.5 bg-ink text-white px-4 py-2.5 rounded-full shadow-editorial border border-white/20 active:scale-95 transition-transform"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, MapPin, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useLocationStore } from '@/store/location';
import { useHasMounted } from '@/lib/useHasMounted';

export function Header() {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const { openCartDrawer, openLocationModal } = useUiStore();
  const { city, area } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Neighborhood / area or fallback to city
  const displayLocation = (area ? area.split(',')[0] : city) || 'New Delhi';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out bg-[#faf8f5]/95 backdrop-blur-md border-b border-ink/[0.06] ${
        scrolled ? 'shadow-[0_4px_24px_-8px_rgba(15,26,20,0.06)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Standard Single-Row Navbar across all screen sizes */}
        <div className="flex items-center justify-between h-16 md:h-18 gap-2 sm:gap-4 md:gap-6">
          
          {/* 1. Left: Brand & Delivery Location */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group focus:outline-none">
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.2em] font-bold text-ink uppercase group-hover:text-basil transition-colors">
                QUICKBASKET
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block animate-pulseFast" />
            </Link>

            {/* Location Selector (Standard pill beside brand) */}
            <div className="h-4 w-px bg-ink/15 hidden xs:block shrink-0" />
            <button
              type="button"
              onClick={openLocationModal}
              className="flex items-center gap-1 text-left px-1.5 sm:px-2 py-1 rounded-lg bg-ink/[0.04] hover:bg-ink/[0.08] transition-colors truncate max-w-[105px] sm:max-w-[150px] md:max-w-[190px]"
              aria-label="Change delivery location"
              title="Change delivery location"
            >
              <MapPin className="w-3 h-3 text-basil shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[8px] uppercase tracking-wider text-ink-400 font-bold leading-none hidden sm:block">
                  10 MIN DELIVERY
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-ink truncate leading-tight">
                  {displayLocation}
                </span>
              </div>
              <ChevronDown className="w-2.5 h-2.5 text-ink-400 shrink-0" />
            </button>
          </div>

          {/* 2. Center: Standard Search Input in the Navbar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-1 sm:mx-3 md:mx-4 min-w-0"
          >
            <div className="relative group">
              <input
                id="header-search-input"
                type="text"
                placeholder='Search "milk", "vegetables", "eggs"...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 hover:bg-white focus:bg-white border border-ink/[0.1] focus:border-ink/30 rounded-full py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm font-sans text-ink placeholder:text-ink-400 placeholder:font-normal focus:outline-none transition-all duration-200 shadow-xs"
              />
              <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-ink-400 absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-ink" />
            </div>
          </form>

          {/* 3. Right: Account & Cart CTA */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            {/* Account Icon (Hidden on mobile devices, visible on desktop) */}
            <Link
              href="/account"
              className="p-1.5 sm:p-2 rounded-lg hover:bg-ink/[0.04] text-ink-600 hover:text-ink transition-colors hidden md:flex items-center justify-center"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart — Compact Editorial CTA */}
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="relative flex items-center gap-1.5 sm:gap-2 bg-ink hover:bg-ink-700 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="font-mono bg-basil text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}

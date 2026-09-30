'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, MapPin } from 'lucide-react';
import { LocationGate } from '@/components/common/LocationGate';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useLocationStore } from '@/store/location';
import { useHasMounted } from '@/lib/useHasMounted';
import { formatCurrency } from '@quickbasket/utils';

export function Header() {
  const router = useRouter();
  const { getTotalItems, getItemTotal } = useCartStore();
  const { openCartDrawer, openLocationModal } = useUiStore();
  const { city } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;
  const itemTotal = mounted ? getItemTotal() : 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-[#faf8f5]/85 backdrop-blur-md border-b border-ink/[0.04] shadow-[0_4px_24px_-8px_rgba(15,26,20,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 gap-3 sm:gap-6">
          {/* Left: Small Refined Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group focus:outline-none">
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] font-bold text-ink uppercase group-hover:text-basil transition-colors">
              QUICKBASKET
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block animate-pulseFast" />
          </Link>

          {/* Center: Large Search / Location Interaction */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 sm:mx-4 hidden sm:block"
          >
            <div className="relative group">
              <input
                id="header-search-input"
                type="text"
                placeholder="Search for fruits, vegetables, milk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 hover:bg-white focus:bg-white border border-ink/[0.08] focus:border-ink/30 rounded-full py-2 pl-10 pr-28 text-xs md:text-sm font-sans text-ink placeholder:text-ink-400 placeholder:font-normal focus:outline-none transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              />
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-ink" />

              {/* In-bar contextual location trigger */}
              <button
                type="button"
                onClick={openLocationModal}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider text-ink-600 hover:text-ink bg-ink/[0.04] hover:bg-ink/[0.08] transition-colors"
                title="Change location"
              >
                <MapPin className="w-2.5 h-2.5 text-basil shrink-0" />
                <span className="uppercase text-[10px] font-medium truncate max-w-[85px]">
                  {city || 'Bengaluru'}
                </span>
              </button>
            </div>
          </form>

          {/* Right: Location, Account, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Location (desktop detailed view) */}
            <button
              type="button"
              onClick={openLocationModal}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-ink/[0.04] transition-colors text-xs text-ink-600 font-sans cursor-pointer"
              aria-label="Change delivery location"
            >
              <MapPin className="w-3.5 h-3.5 text-basil shrink-0" />
              <LocationGate variant="header" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 rounded-lg hover:bg-ink/[0.04] text-ink-600 hover:text-ink transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Cart — Compact Editorial CTA */}
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="relative flex items-center gap-2 bg-ink hover:bg-ink-700 text-white px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 ml-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="font-mono bg-basil text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search — Minimal single hairline bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for fruits, vegetables, milk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 border border-ink/[0.08] rounded-full py-2 pl-9 pr-24 text-xs font-sans text-ink focus:outline-none focus:border-ink/30 placeholder:text-ink-400 shadow-sm"
              />
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={openLocationModal}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider text-ink-600 bg-ink/[0.04]"
              >
                <MapPin className="w-2.5 h-2.5 text-basil" />
                <span className="truncate max-w-[65px] uppercase">{city || 'Bengaluru'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}


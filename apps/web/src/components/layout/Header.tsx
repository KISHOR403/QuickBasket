'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, MapPin, Clock } from 'lucide-react';
import { LocationGate } from '@/components/common/LocationGate';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useHasMounted } from '@/lib/useHasMounted';
import { formatCurrency } from '@quickbasket/utils';

export function Header() {
  const router = useRouter();
  const { getTotalItems, getItemTotal } = useCartStore();
  const { openCartDrawer, openLocationModal } = useUiStore();
  const [searchQuery, setSearchQuery] = useState('');

  // The cart persists to localStorage, so its contents only exist on the
  // client. Render the SSR-safe empty state until mounted so the server and
  // first client render match — otherwise the cart badge/total hydration
  // mismatches and Next surfaces a "1 error" overlay on every reload.
  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;
  const itemTotal = mounted ? getItemTotal() : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-header shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display font-black text-2xl text-brand tracking-tight">
                QuickBasket
              </span>
            </Link>

            {/* Location - Desktop */}
            <div className="hidden md:flex items-center gap-1.5 text-white/90 text-xs font-medium">
              <MapPin className="w-4 h-4 text-brand" />
              <span className="text-white/60">Delivering to</span>
              <LocationGate variant="header" />
            </div>
          </div>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for 'paneer'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 focus:bg-white/20 border border-white/15 focus:border-white/30 rounded-pill py-2.5 pl-10 pr-4 text-sm font-medium text-white transition-all placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Speed Pill */}
            <div className="hidden lg:flex items-center gap-1.5 bg-mango text-ink px-3.5 py-2 rounded-pill text-xs font-extrabold shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>Delivered in 12 min</span>
            </div>

            {/* Location icon */}
            <button
              type="button"
              onClick={openLocationModal}
              className="hidden md:flex p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors active:scale-95 cursor-pointer"
              aria-label="Change delivery location"
              title="Change Delivery Location"
            >
              <MapPin className="w-5 h-5" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="flex items-center gap-2 bg-header-dark hover:bg-basil-dark text-white px-4 py-2 rounded-pill shadow-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 border border-white/15"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mango text-ink font-mono font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono font-extrabold text-sm">
                {formatCurrency(itemTotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search & Location sub-row */}
        <div className="md:hidden pb-3 pt-1 flex flex-col gap-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            <LocationGate variant="header" />
          </div>
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/15 focus:border-white/30 rounded-pill py-2 pl-9 pr-4 text-xs font-medium text-white focus:outline-none placeholder:text-white/50"
              />
              <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 top-2.5" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

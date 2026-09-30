'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, MapPin, Heart } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-smooth ${
        scrolled
          ? 'glass border-b border-black/[0.04] shadow-glass'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-basil flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-display font-bold text-sm">Q</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-ink hidden sm:inline">
              Quick<span className="text-basil">Basket</span>
            </span>
          </Link>

          {/* Search — Desktop */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for groceries, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink/[0.04] hover:bg-ink/[0.06] focus:bg-white border border-transparent focus:border-ink/[0.08] rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium text-ink transition-all placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-basil/10 focus:shadow-glass"
              />
              <Search className="w-4.5 h-4.5 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-basil" />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Location */}
            <button
              type="button"
              onClick={openLocationModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-ink/[0.04] transition-colors text-sm group cursor-pointer"
              aria-label="Change delivery location"
            >
              <MapPin className="w-4 h-4 text-basil" />
              <span className="text-ink-500 text-xs">Delivering to</span>
              <LocationGate variant="header" />
            </button>

            {/* Wishlist */}
            <Link
              href="/account"
              className="p-2.5 rounded-xl hover:bg-ink/[0.04] text-ink-500 hover:text-ink transition-colors hidden md:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="p-2.5 rounded-xl hover:bg-ink/[0.04] text-ink-500 hover:text-ink transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="relative flex items-center gap-2 bg-ink hover:bg-ink-700 text-white pl-3 pr-4 py-2.5 rounded-2xl transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-basil/30 ml-1"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-basil text-white font-mono font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-countUp">
                    {totalItems}
                  </span>
                )}
              </div>
              {totalItems > 0 && (
                <span className="text-xs font-mono font-bold hidden sm:inline">
                  {formatCurrency(itemTotal)}
                </span>
              )}
              {totalItems === 0 && (
                <span className="text-xs font-medium hidden sm:inline">Cart</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3 -mt-1">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ink/[0.04] border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-ink focus:outline-none placeholder:text-ink-400 focus:bg-white focus:border-ink/[0.08] focus:ring-2 focus:ring-basil/10 transition-all"
              />
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Store, Zap, ShieldCheck } from 'lucide-react';
import { LocationGate } from '@/components/common/LocationGate';
import { SpeedPill } from '@/components/common/SpeedPill';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { formatCurrency } from '@quickbasket/utils';

export function Header() {
  const router = useRouter();
  const { getTotalItems, getItemTotal } = useCartStore();
  const { openCartDrawer } = useUiStore();
  const [searchQuery, setSearchQuery] = useState('');

  const totalItems = getTotalItems();
  const itemTotal = getItemTotal();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-mist shadow-card transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3 gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-card bg-basil text-white flex items-center justify-center font-extrabold text-xl shadow-pill group-hover:scale-105 transition-transform">
                QB
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl text-ink tracking-tight flex items-center gap-1">
                  Quick<span className="text-basil">Basket</span>
                  <span className="text-[10px] bg-mango text-ink font-extrabold px-1.5 py-0.5 rounded-badge uppercase">
                    10 MIN
                  </span>
                </span>
                <span className="text-[10px] font-semibold text-ink-500 uppercase tracking-widest -mt-1">
                  Multi-Vendor Express
                </span>
              </div>
            </Link>

            <div className="hidden md:block h-8 w-px bg-mist" />

            <div className="hidden sm:block">
              <LocationGate />
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search 'milk', 'tomatoes', 'lays', 'paan'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-mist/60 focus:bg-surface border border-transparent focus:border-basil rounded-pill py-2.5 pl-10 pr-4 text-xs font-medium text-ink transition-all placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-basil/20"
              />
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
            </div>
          </form>

          {/* Right Action Icons & SpeedPill */}
          <div className="flex items-center gap-3">
            <SpeedPill minutes={12} variant="header" className="hidden lg:inline-flex" />

            <Link
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-ink-600 hover:text-basil px-3 py-2 rounded-pill hover:bg-mist/50 transition-colors"
            >
              <Store className="w-4 h-4 text-basil" />
              <span>Vendors</span>
            </Link>

            <Link
              href="/account"
              className="p-2 text-ink-600 hover:text-basil hover:bg-mist/60 rounded-full transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCartDrawer}
              className="flex items-center gap-2 bg-basil hover:bg-basil-hover text-white px-4 py-2 rounded-pill shadow-pill transition-all active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mango text-ink font-mono font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left text-xs leading-tight">
                <span className="font-bold text-basil-light">My Cart</span>
                <span className="font-mono font-extrabold">{formatCurrency(itemTotal)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search & Location sub-row */}
        <div className="sm:hidden pb-3 pt-1 flex flex-col gap-2 border-t border-mist/40">
          <LocationGate />
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands & local kirana..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-mist/60 border border-transparent focus:border-basil rounded-pill py-2 pl-9 pr-4 text-xs font-medium text-ink focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-2.5" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

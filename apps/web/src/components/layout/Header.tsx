'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Bell,
  MapPin,
  ChevronDown,
  User,
  Package,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useLocationStore } from '@/store/location';
import { useHasMounted } from '@/lib/useHasMounted';
import { ProfileMenu } from '@/components/account/ProfileMenu';

export function Header() {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const { openCartDrawer, openLocationModal } = useUiStore();
  const { city, area } = useLocationStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (window.innerWidth >= 768) {
          searchInputRef.current?.focus();
        } else {
          router.push('/search');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const displayLocation = (area ? area.split(',')[0] : city) || 'Connaught Place';

  const defaultUser = {
    name: 'Vikram Kumar',
    email: 'vikram.kumar@example.com',
    phone: '+91 98765 43210',
    tier: 'Premium Member',
    memberSince: 'Aug 2024',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out bg-[#faf8f5]/95 backdrop-blur-md border-b border-ink/[0.06] ${
        scrolled ? 'shadow-[0_4px_24px_-8px_rgba(15,26,20,0.06)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* ROW 1: Brand & Location (Left) + Actions (Right) */}
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 gap-2 sm:gap-4 md:gap-6">
          
          {/* 1. Left: Brand & Delivery Location paired cleanly */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group focus:outline-none select-none">
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.2em] font-bold text-ink uppercase group-hover:text-basil transition-colors">
                QUICKBASKET
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block animate-pulseFast" />
            </Link>

            {/* Location Selector (Paired on left beside brand, preventing search collision) */}
            <div className="h-4 w-px bg-ink/15 shrink-0" />
            <button
              type="button"
              onClick={openLocationModal}
              className="flex items-center gap-1 text-left px-1.5 sm:px-2 py-1 rounded-xl bg-ink/[0.04] hover:bg-ink/[0.08] transition-colors truncate max-w-[125px] sm:max-w-[160px] md:max-w-[190px]"
              aria-label="Change delivery location"
              title="Change delivery location"
            >
              <MapPin className="w-3.5 h-3.5 text-basil shrink-0" />
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

          {/* 2. Center: Desktop Search Input (Hidden on mobile to avoid cramming) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 lg:mx-4 min-w-0 hidden md:block"
          >
            <div className="relative group">
              <input
                ref={searchInputRef}
                id="header-search-input"
                type="text"
                placeholder="Search groceries, fruits, milk, snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 hover:bg-white focus:bg-white border border-ink/[0.08] focus:border-basil/50 rounded-full py-2 pl-9 pr-14 text-xs lg:text-sm font-sans text-ink placeholder:text-ink-400 focus:outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(26,107,66,0.08)] shadow-xs"
              />
              <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-basil" />

              {/* Keyboard Shortcut Indicator */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none text-[10px] font-mono font-bold text-ink-400 bg-ink/[0.04] border border-ink/[0.08] px-1.5 py-0.5 rounded-md">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </form>

          {/* 3. Right: Notification Bell, Profile Avatar, and Desktop-Only Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl hover:bg-ink/[0.04] flex items-center justify-center text-ink-600 hover:text-ink transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-mango ring-2 ring-[#faf8f5]" />
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-ink/[0.08] rounded-2xl shadow-float p-3 z-50 animate-scaleIn text-ink">
                  <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06] px-1">
                    <span className="text-xs font-bold text-ink">Notifications</span>
                    <span className="text-[10px] font-bold text-basil bg-basil/10 px-2 py-0.5 rounded-full">
                      1 New
                    </span>
                  </div>
                  <div className="pt-2 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-leaf-light/50 border border-basil/15 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-basil text-[11px]">
                        <Package className="w-3.5 h-3.5" />
                        <span>Order #QB-88491 Dispatched</span>
                      </div>
                      <p className="text-[11px] text-ink-600">
                        Rider Ramesh is on the way with your 2 items. ETA: 7 mins.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar with Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-ink/[0.04] transition-colors focus:outline-none select-none group"
                aria-label="User Profile"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-basil to-emerald-600 text-white font-display font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  VK
                </div>
              </button>

              <ProfileMenu
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={defaultUser}
                walletBalance={245}
                onSelectTab={() => router.push('/account')}
                onLogout={() => router.push('/login')}
              />
            </div>

            {/* Cart Trigger — REMOVED on mobile and small devices (hidden md:flex) */}
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="relative hidden md:flex items-center gap-2 bg-ink hover:bg-ink-700 text-white px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 shrink-0 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-medium">Cart</span>
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

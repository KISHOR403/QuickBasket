'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Radio,
  Clock,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useAdminAuth } from '@/components/providers/AuthContext';
import { Button } from '@/components/ui/Button';

export interface TopbarProps {
  onOpenMobileNav: () => void;
  onOpenSearch: () => void;
}

export function Topbar({ onOpenMobileNav, onOpenSearch }: TopbarProps) {
  const { user } = useAdminAuth();
  const [storeOpen, setStoreOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#eae7e0] px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Area: Mobile Menu & Hub Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-lg text-ink-500 hover:text-ink hover:bg-[#f4f2ec] transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden lg:flex items-center gap-2 text-xs">
          <span className="font-bold text-ink">Dark Store #04</span>
          <span className="text-[#8e9992]">•</span>
          <span className="text-ink-500">Sector 18 Hub</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-auto">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Open command palette search"
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-[#dedad0] bg-[#faf9f6] hover:bg-[#f4f2ec] text-ink-400 hover:text-ink-600 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31] group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-ink-400 group-hover:text-ink-600" />
            <span className="truncate">Search products, orders, customers...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-ink-500 border border-[#dedad0] rounded shadow-3xs group-hover:border-[#c8c4ba]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Area: Status, Notifications & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Store Status Toggle */}
        <button
          onClick={() => setStoreOpen(!storeOpen)}
          className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
            storeOpen
              ? 'bg-[#edf8f1] text-[#145a32] border border-[#cbe8d5]'
              : 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]'
          }`}
          title="Click to toggle Dark Store operational status"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              storeOpen ? 'bg-[#22c55e] animate-pulse' : 'bg-[#ef4444]'
            }`}
          />
          <span>{storeOpen ? 'OPEN' : 'CLOSED'}</span>
        </button>

        {/* SLA Status Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-ink-500 px-2 py-1 bg-[#f4f2ec] rounded-md border border-[#e2ded5]">
          <Clock className="w-3.5 h-3.5 text-[#144d31]" />
          <span className="font-semibold text-ink">~10 min</span>
          <span className="text-[11px] text-ink-400">delivery</span>
        </div>

        {/* Quick Add Product */}
        <Link href="/products/new">
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-ink-500 hover:text-ink hover:bg-[#f4f2ec] rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#dc2626] rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-[#dcd8ce] shadow-xl p-3 z-40 animate-scaleIn space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#eae7e0]">
                  <span className="text-xs font-bold text-ink">Live Operational Alerts</span>
                  <span className="text-[10px] text-[#144d31] font-semibold cursor-pointer">
                    Mark read
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-[#fff8ea] border border-[#ffe0a3] text-[#925404]">
                    <div className="font-bold">Low Stock Warning</div>
                    <div className="text-[11px] mt-0.5">Alphonso Mango has only 8 units left in hub.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534]">
                    <div className="font-bold">SLA Adherence at 98.4%</div>
                    <div className="text-[11px] mt-0.5">142 express deliveries fulfilled within 12 min today.</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Storefront Link */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-ink px-2 py-1 rounded hover:bg-[#f4f2ec] transition-colors"
          title="Open live customer storefront"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Customer Site</span>
        </a>
      </div>
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  MapPin,
  Wallet,
  Gift,
  Share2,
  ChevronRight,
  ArrowUpRight,
  Copy,
  Check,
  Plus,
  Sparkles,
  Zap,
} from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface BentoAccountGridProps {
  totalOrders: number;
  recentOrder?: {
    id: string;
    orderNumber: string;
    status: string;
    grandTotal: number;
    items: Array<{ productName: string; quantity: number }>;
    createdAt: string;
  } | null;
  savedAddressesCount: number;
  primaryAddress?: {
    label: string;
    flatNo: string;
    building: string;
    area: string;
  } | null;
  walletBalance: number;
  totalSaved: number;
  referralCode?: string;
  onNavigateTab: (tab: 'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings') => void;
  onOpenAddMoney: () => void;
  onOpenAddAddress: () => void;
}

export function BentoAccountGrid({
  totalOrders,
  recentOrder,
  savedAddressesCount,
  primaryAddress,
  walletBalance,
  totalSaved,
  referralCode = 'QUICKVIKRAM100',
  onNavigateTab,
  onOpenAddMoney,
  onOpenAddAddress,
}: BentoAccountGridProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-ink-400 uppercase tracking-widest font-mono">
          Account Shortcuts
        </h2>
        <span className="text-[11px] text-ink-400 font-medium">Bento Command Center</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* TILE 1: LARGE TILE — ORDER HISTORY (Spans 2 cols on lg) */}
        <div
          onClick={() => onNavigateTab('orders')}
          className="lg:col-span-2 group cursor-pointer bg-white/80 hover:bg-white rounded-2xl border border-ink/[0.06] hover:border-ink/[0.12] p-5 sm:p-6 shadow-xs hover:shadow-card transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-basil/10 text-basil group-hover:scale-105 transition-transform">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider">
                  ORDER HISTORY
                </span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight pt-1">
                {totalOrders} deliveries made
              </h3>
              <p className="text-xs text-ink-500 font-medium">
                Track live orders, inspect receipts & 1-tap reorder your pantry staples.
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-basil group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Embedded recent order preview */}
          {recentOrder && (
            <div className="mt-5 p-3.5 rounded-xl bg-cream/40 border border-ink/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-ink">#{recentOrder.orderNumber}</span>
                  <span className="text-[10px] font-bold text-basil bg-basil/10 px-2 py-0.5 rounded-md uppercase">
                    {recentOrder.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-ink-600 truncate text-[11px]">
                  {recentOrder.items.map((i) => i.productName).join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="font-mono font-bold text-ink text-sm">
                  {formatCurrency(recentOrder.grandTotal)}
                </span>
                <span className="text-ink-400 text-[11px]">
                  {new Date(recentOrder.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* TILE 2: MEDIUM TILE — QUICK WALLET */}
        <div
          onClick={() => onNavigateTab('wallet')}
          className="group cursor-pointer bg-white/80 hover:bg-white rounded-2xl border border-ink/[0.06] hover:border-ink/[0.12] p-5 sm:p-6 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full uppercase">
                Instant Pay
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider block">
                QUICK WALLET
              </span>
              <p className="font-mono font-extrabold text-2xl text-ink tracking-tight mt-0.5">
                {formatCurrency(walletBalance)}
              </p>
              <p className="text-xs text-ink-500 font-medium mt-1">
                Zero-delay checkout without banking delays.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/[0.06] flex items-center justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAddMoney();
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-basil hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Top up balance
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-ink-300 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* TILE 3: MEDIUM TILE — DELIVERY ADDRESSES */}
        <div
          onClick={() => onNavigateTab('addresses')}
          className="group cursor-pointer bg-white/80 hover:bg-white rounded-2xl border border-ink/[0.06] hover:border-ink/[0.12] p-5 sm:p-6 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-mango/10 text-mango-hover group-hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-ink-500 bg-ink/[0.04] px-2 py-0.5 rounded-full">
                {savedAddressesCount} Locations
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider block">
                DELIVERY ADDRESSES
              </span>
              <p className="font-display font-extrabold text-base text-ink tracking-tight mt-0.5 truncate">
                {primaryAddress?.label || 'Home'} — {primaryAddress?.flatNo || 'A-402'}
              </p>
              <p className="text-xs text-ink-500 font-medium truncate mt-0.5">
                {primaryAddress?.building}, {primaryAddress?.area}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ink/[0.06] flex items-center justify-between">
            <span className="text-xs font-bold text-basil group-hover:underline">
              Manage locations →
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              10 Min Dark Store
            </span>
          </div>
        </div>

        {/* TILE 4: SMALL TILE — REWARDS */}
        <div
          onClick={() => onNavigateTab('rewards')}
          className="group cursor-pointer bg-white/80 hover:bg-white rounded-2xl border border-ink/[0.06] hover:border-ink/[0.12] p-5 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 group-hover:scale-105 transition-transform">
              <Gift className="w-4 h-4" />
            </div>
            <Sparkles className="w-3.5 h-3.5 text-mango" />
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider block">
              REWARDS
            </span>
            <p className="font-mono font-extrabold text-xl text-ink tracking-tight mt-0.5">
              {formatCurrency(totalSaved)} saved
            </p>
            <p className="text-xs text-ink-500 font-medium mt-0.5">
              2 active coupons available for next checkout.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-ink/[0.06] flex items-center justify-between text-xs font-bold text-basil">
            <span>Redeem coupons</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* TILE 5: SMALL TILE — REFER & EARN */}
        <div
          onClick={() => onNavigateTab('rewards')}
          className="group cursor-pointer bg-white/80 hover:bg-white rounded-2xl border border-ink/[0.06] hover:border-ink/[0.12] p-5 shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-105 transition-transform">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black text-ink bg-mango px-2 py-0.5 rounded-full uppercase">
              ₹200 Available
            </span>
          </div>

          <div className="mt-3">
            <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider block">
              REFER & EARN
            </span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono font-black text-xs text-basil bg-basil/10 px-2 py-1 rounded-md tracking-wider">
                {referralCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1 text-ink-500 hover:text-basil transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-basil" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-ink-500 font-medium mt-1.5">
              Share code with friends for ₹100 credit each.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-ink/[0.06] flex items-center justify-between text-xs font-bold text-basil">
            <span>Invite friends</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

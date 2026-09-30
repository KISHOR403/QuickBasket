'use client';

import React from 'react';
import { Wallet, Package, Gift, Zap, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface AccountMetricsProps {
  walletBalance: number;
  totalOrders: number;
  totalSavings?: number;
  avgDeliveryMinutes?: number;
  onSelectTab?: (tab: 'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings') => void;
  onOpenAddMoney?: () => void;
}

export function AccountMetrics({
  walletBalance,
  totalOrders,
  totalSavings = 1280,
  avgDeliveryMinutes = 8.4,
  onSelectTab,
  onOpenAddMoney,
}: AccountMetricsProps) {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-ink/[0.06] p-4 sm:p-5 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-ink/[0.06]">
        {/* Metric 1: Wallet Balance */}
        <div
          onClick={() => onSelectTab?.('wallet')}
          className="group cursor-pointer pt-2 sm:pt-0 sm:px-3 first:pl-0 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wider mb-1">
            <Wallet className="w-3.5 h-3.5 text-basil transition-transform group-hover:scale-110" />
            <span>Wallet balance</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-extrabold text-xl sm:text-2xl text-ink tracking-tight group-hover:text-basil transition-colors">
              {formatCurrency(walletBalance)}
            </span>
            {onOpenAddMoney && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAddMoney();
                }}
                className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-basil hover:underline transition-opacity hidden md:inline-flex items-center"
              >
                + Top up
              </button>
            )}
          </div>
        </div>

        {/* Metric 2: Orders */}
        <div
          onClick={() => onSelectTab?.('orders')}
          className="group cursor-pointer pt-2 sm:pt-0 sm:px-4 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wider mb-1">
            <Package className="w-3.5 h-3.5 text-ink-400 transition-transform group-hover:scale-110" />
            <span>Orders</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-extrabold text-xl sm:text-2xl text-ink tracking-tight group-hover:text-basil transition-colors">
              {totalOrders}
            </span>
            <span className="text-[11px] font-medium text-ink-400">delivered</span>
          </div>
        </div>

        {/* Metric 3: Saved */}
        <div
          onClick={() => onSelectTab?.('rewards')}
          className="group cursor-pointer pt-3 sm:pt-0 sm:px-4 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wider mb-1">
            <Gift className="w-3.5 h-3.5 text-mango transition-transform group-hover:scale-110" />
            <span>Saved</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-extrabold text-xl sm:text-2xl text-emerald-700 tracking-tight">
              {formatCurrency(totalSavings)}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              Lifetime
            </span>
          </div>
        </div>

        {/* Metric 4: Avg Speed */}
        <div className="pt-3 sm:pt-0 sm:px-4 last:pr-0">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5 text-basil animate-pulse" />
            <span>Avg delivery</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
              {avgDeliveryMinutes}
            </span>
            <span className="text-[11px] font-bold text-ink-500 font-mono">min</span>
            <span className="text-[10px] font-extrabold text-basil bg-basil/10 px-1.5 py-0.5 rounded-full uppercase ml-1">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

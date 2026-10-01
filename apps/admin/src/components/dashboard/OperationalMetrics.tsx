import React from 'react';
import { TrendingUp, ShoppingBag, Receipt, Users } from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface OperationalMetricsProps {
  todaySales: number;
  salesGrowth: number;
  ordersCount: number;
  avgOrderValue: number;
  activeCustomers: number;
}

export function OperationalMetrics({
  todaySales = 84240,
  salesGrowth = 12.4,
  ordersCount = 248,
  avgOrderValue = 340,
  activeCustomers = 42,
}: OperationalMetricsProps) {
  // Sparkline intervals simulation for intra-day hourly volume
  const sparklineHeights = [30, 45, 40, 60, 55, 75, 70, 95, 88, 100];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Primary Hero Metric: Today's GMV */}
      <div className="lg:col-span-6 bg-white rounded-xl border border-[#eae7e0] p-5 sm:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group">
        <div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-500">
                Today&apos;s GMV
              </span>
              <span className="text-[10px] text-ink-400 font-mono hidden sm:inline">
                (00:00–current time)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#145a32] bg-[#edf8f1] px-2 py-0.5 rounded-md border border-[#cbe8d5]">
              <TrendingUp className="w-3 h-3" /> +{salesGrowth}% vs yesterday
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black font-display text-ink tracking-tight">
              {formatCurrency(todaySales)}
            </span>
            <span className="text-xs text-ink-400 font-mono">gross merchandise value</span>
          </div>
        </div>

        {/* Intraday Sparkline Distribution */}
        <div className="mt-5 pt-4 border-t border-[#f0eee8] flex items-end justify-between gap-1.5 h-12">
          <div className="text-[11px] text-ink-400 font-mono self-center">
            Peak volume: <span className="font-semibold text-ink-600">10:00–12:00</span>
          </div>
          <div className="flex items-end gap-1.5 h-full" title="Intraday 2-hour volume intervals">
            {sparklineHeights.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-2.5 rounded-t-xs transition-all duration-200 ${
                  i === sparklineHeights.length - 1
                    ? 'bg-[#144d31]'
                    : 'bg-[#cfe3d6] hover:bg-[#a6cdb3]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Operational Metrics: Orders, AOV, Active Customers */}
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Orders Card */}
        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-500">
              Orders
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#f4f2ec] flex items-center justify-center text-ink-600">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-display text-ink">{ordersCount}</div>
            <div className="text-[11px] text-ink-400 font-mono mt-1">
              Today&apos;s fulfilled &amp; live
            </div>
          </div>
        </div>

        {/* Average Order Value (AOV) Card */}
        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-500">
              Avg Order Value
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#f4f2ec] flex items-center justify-center text-ink-600">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-display text-ink">{formatCurrency(avgOrderValue)}</div>
            <div className="text-[11px] text-ink-400 font-mono mt-1">
              Per completed basket
            </div>
          </div>
        </div>

        {/* Active Customers Card */}
        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-ink-400">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-500">
              Active Customers
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#f4f2ec] flex items-center justify-center text-ink-600">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black font-display text-ink">{activeCustomers}</div>
            <div className="text-[11px] text-ink-400 font-mono mt-1">
              Transacted in last 24h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


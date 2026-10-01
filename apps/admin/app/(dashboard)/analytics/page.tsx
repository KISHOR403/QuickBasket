'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, TrendingUp, ShoppingBag, Receipt, Users, ArrowUpRight } from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { SalesAnalyticsRangeData } from '@/services/types';
import { formatCurrency } from '@quickbasket/utils';
import { SalesAnalyticsChart } from '@/components/dashboard/SalesAnalyticsChart';
import { TopProductsList, TopProductItem } from '@/components/dashboard/TopProductsList';
import { Skeleton } from '@/components/ui/Skeleton';
import { INITIAL_ANALYTICS_DATA } from '@/services/mockAdminData';

const CATEGORY_SHARE = [
  { name: 'Dairy, Bread & Eggs', share: 34, revenue: 28640, growth: '+14%' },
  { name: 'Fresh Fruits', share: 22, revenue: 18530, growth: '+28%' },
  { name: 'Atta, Rice, Oil & Dal', share: 18, revenue: 15160, growth: '+6%' },
  { name: 'Fresh Vegetables', share: 16, revenue: 13470, growth: '+9%' },
  { name: 'Snacks & Beverages', share: 10, revenue: 8440, growth: '+21%' },
];

export default function AnalyticsPage() {
  const [topProducts, setTopProducts] = useState<TopProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState<'7d' | '30d' | '3m'>('7d');

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const prods = await AdminService.getTopProducts();
        setTopProducts(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const currentRangeData = INITIAL_ANALYTICS_DATA[range] || INITIAL_ANALYTICS_DATA['7d'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Operational Analytics &amp; Intelligence
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Revenue trends, dark store throughput, basket economics, and category share
          </p>
        </div>

        <div className="bg-[#f4f2ec] p-1 rounded-lg border border-[#e2ded5] flex text-xs">
          {(['7d', '30d', '3m'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-md font-medium uppercase text-xs transition-all ${
                range === r
                  ? 'bg-[#144d31] text-white font-bold shadow-xs'
                  : 'text-ink-500 hover:text-ink'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '3 Months'}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <>
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Total Net Revenue</span>
              <div className="text-2xl font-black font-display text-ink mt-1 font-mono">
                {formatCurrency(currentRangeData.totalRevenue)}
              </div>
              <span className="text-[11px] text-[#145a32] font-semibold">↑ +14.2% YoY</span>
            </div>

            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Total Orders Fulfilled</span>
              <div className="text-2xl font-black font-display text-ink mt-1 font-mono">
                {currentRangeData.totalOrders.toLocaleString()}
              </div>
              <span className="text-[11px] text-[#145a32] font-semibold">99.1% delivered</span>
            </div>

            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Average Basket (AOV)</span>
              <div className="text-2xl font-black font-display text-ink mt-1 font-mono">
                {formatCurrency(currentRangeData.avgOrderValue)}
              </div>
              <span className="text-[11px] text-ink-500 font-medium">Target: ₹320</span>
            </div>

            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Customer Retention</span>
              <div className="text-2xl font-black font-display text-[#144d31] mt-1 font-mono">
                68.4%
              </div>
              <span className="text-[11px] text-[#145a32] font-semibold">Weekly re-order rate</span>
            </div>
          </div>

          {/* Sales velocity chart */}
          <SalesAnalyticsChart data={INITIAL_ANALYTICS_DATA} />

          {/* 2-Column Split: Category Performance & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Performance Breakdown */}
            <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                <h3 className="text-sm font-bold text-ink">Category Revenue Contribution</h3>
                <span className="text-xs text-ink-400 font-mono">Volume share</span>
              </div>

              <div className="space-y-4">
                {CATEGORY_SHARE.map((cat) => (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-ink">{cat.name}</span>
                      <span className="font-mono text-ink">
                        {formatCurrency(cat.revenue)} ({cat.share}%)
                      </span>
                    </div>

                    <div className="w-full bg-[#f4f2ec] rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${cat.share}%` }}
                        className="bg-[#144d31] h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Performing SKUs */}
            <TopProductsList products={topProducts} />
          </div>
        </>
      )}
    </div>
  );
}

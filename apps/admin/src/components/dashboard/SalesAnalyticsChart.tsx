'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@quickbasket/utils';
import { SalesAnalyticsRangeData } from '@/services/types';

export interface SalesAnalyticsChartProps {
  data: Record<string, SalesAnalyticsRangeData>;
}

export function SalesAnalyticsChart({ data }: SalesAnalyticsChartProps) {
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d' | '3m'>('today');
  const [metricView, setMetricView] = useState<'revenue' | 'orders' | 'aov'>('revenue');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const current = data[timeframe] || data.today;
  const points = current.chartPoints.map((p) => ({
    ...p,
    aov: p.orders > 0 ? Math.round(p.revenue / p.orders) : 0,
  }));

  const getMetricValue = (pt: typeof points[0]) => {
    if (metricView === 'revenue') return pt.revenue;
    if (metricView === 'orders') return pt.orders;
    return pt.aov;
  };

  const maxValue = Math.max(...points.map(getMetricValue), 1);
  const midValue = Math.round(maxValue / 2);

  const formatYAxis = (val: number) => {
    if (metricView === 'revenue' || metricView === 'aov') {
      if (val >= 1000000) return `₹${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `₹${Math.round(val / 1000)}k`;
      return `₹${val}`;
    }
    return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${val}`;
  };

  const getActiveMetricSummary = () => {
    if (metricView === 'revenue') return formatCurrency(current.totalRevenue);
    if (metricView === 'orders') return `${current.totalOrders.toLocaleString()} Orders`;
    return `${formatCurrency(current.avgOrderValue)} AOV`;
  };

  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-ink">Sales &amp; Fulfillment</h3>
            <span className="text-[11px] font-mono font-bold text-ink-600 bg-[#f4f2ec] px-2.5 py-0.5 rounded border border-[#e2ded5]">
              {getActiveMetricSummary()}
            </span>
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Live volume and fulfillment throughput across dark store hub nodes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Metric Selector */}
          <div className="bg-[#f4f2ec] p-0.5 rounded-lg border border-[#e2ded5] flex text-xs">
            {(
              [
                { id: 'revenue', label: 'Revenue' },
                { id: 'orders', label: 'Orders' },
                { id: 'aov', label: 'AOV' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMetricView(m.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  metricView === m.id
                    ? 'bg-white text-ink shadow-xs font-semibold'
                    : 'text-ink-500 hover:text-ink'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Timeframe Selector */}
          <div className="bg-[#f4f2ec] p-0.5 rounded-lg border border-[#e2ded5] flex text-xs">
            {(['today', '7d', '30d', '3m'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-2 py-1 rounded-md font-medium uppercase text-[11px] transition-all ${
                  timeframe === t
                    ? 'bg-[#144d31] text-white shadow-xs font-bold'
                    : 'text-ink-500 hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas with Y-Axis and Horizontal Gridlines */}
      <div className="pt-2">
        <div className="flex gap-3">
          {/* Y Axis Labels */}
          <div className="w-12 h-44 flex flex-col justify-between items-end text-[10px] font-mono text-ink-400 select-none pb-2">
            <span>{formatYAxis(maxValue)}</span>
            <span>{formatYAxis(midValue)}</span>
            <span>0</span>
          </div>

          {/* Visualization Bars Area */}
          <div className="flex-1 h-44 flex items-end justify-between gap-2 sm:gap-4 relative border-b border-[#eae7e0] pb-2">
            {/* Subtle horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-[#dcd8ce] w-full" />
              <div className="border-b border-dashed border-[#dcd8ce] w-full" />
              <div className="border-b border-dashed border-[#dcd8ce] w-full" />
            </div>

            {points.map((pt, i) => {
              const val = getMetricValue(pt);
              const pct = Math.max(8, Math.round((val / maxValue) * 100));
              const isHovered = hoveredPoint === i;

              return (
                <div
                  key={pt.label}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative z-10"
                >
                  {/* Detailed Operational Hover Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-16 bg-[#0d1812] text-white text-[11px] p-2.5 rounded-lg shadow-xl whitespace-nowrap animate-fadeIn z-30 pointer-events-none border border-[#22362a]">
                      <div className="font-bold text-[#34d399] font-mono text-[10px] uppercase">
                        {timeframe === 'today' ? `TIME: ${pt.label}` : pt.label}
                      </div>
                      <div className="mt-1 space-y-0.5 text-xs font-mono">
                        <div className="flex justify-between gap-3 text-white">
                          <span className="text-[#8fa89b]">Revenue:</span>
                          <span className="font-bold">{formatCurrency(pt.revenue)}</span>
                        </div>
                        <div className="flex justify-between gap-3 text-white">
                          <span className="text-[#8fa89b]">Orders:</span>
                          <span className="font-bold">{pt.orders}</span>
                        </div>
                        <div className="flex justify-between gap-3 text-white">
                          <span className="text-[#8fa89b]">Avg Basket:</span>
                          <span className="font-bold">{formatCurrency(pt.aov)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    style={{ height: `${pct}%` }}
                    className={`w-full max-w-[34px] rounded-t-sm transition-all duration-150 ${
                      isHovered
                        ? 'bg-[#144d31]'
                        : 'bg-[#d8e8de] group-hover:bg-[#b2d5bf]'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between items-center text-[10px] font-mono text-ink-400 mt-2 pl-15 pr-2">
          {points.map((pt) => (
            <span key={pt.label} className="truncate text-center">
              {pt.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

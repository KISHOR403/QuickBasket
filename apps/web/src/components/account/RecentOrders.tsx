'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Clock,
  CheckCircle2,
  Bike,
} from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface RecentOrderItem {
  id: string;
  orderNumber: string;
  status: string;
  grandTotal: number;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
    variantName?: string;
    unitPrice: number;
  }>;
}

export interface RecentOrdersProps {
  orders?: RecentOrderItem[];
  onViewAll?: () => void;
  onReorder?: (order: RecentOrderItem) => void;
}

export function RecentOrders({ orders, onViewAll, onReorder }: RecentOrdersProps) {
  // Fallback demo recent activity if API orders is empty
  const orderList: RecentOrderItem[] =
    orders && orders.length > 0
      ? orders.slice(0, 4)
      : [
          {
            id: 'ord-1001',
            orderNumber: 'QB-88491',
            status: 'out_for_delivery',
            grandTotal: 125,
            createdAt: new Date().toISOString(),
            items: [
              { productName: 'Amul Taaza Milk', quantity: 2, variantName: '1 L', unitPrice: 54 },
              { productName: 'Maggi Masala Noodles', quantity: 1, variantName: '280 g', unitPrice: 17 },
            ],
          },
          {
            id: 'ord-1002',
            orderNumber: 'QB-88462',
            status: 'delivered',
            grandTotal: 386,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            items: [
              { productName: 'Fresh Vegetables Basket', quantity: 1, variantName: '1 kg', unitPrice: 199 },
              { productName: 'Farm Apples & Bananas', quantity: 1, variantName: '1 kg', unitPrice: 187 },
            ],
          },
          {
            id: 'ord-1003',
            orderNumber: 'QB-88391',
            status: 'delivered',
            grandTotal: 214,
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            items: [
              { productName: 'Dairy Essentials & Sourdough Bread', quantity: 1, variantName: 'Set', unitPrice: 214 },
            ],
          },
        ];

  const formatActivityDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-ink-400 uppercase tracking-widest font-mono">
          Recent Activity
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-basil hover:underline inline-flex items-center gap-1 group"
          >
            <span>View All Activity</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white/80 rounded-2xl border border-ink/[0.06] divide-y divide-ink/[0.06] overflow-hidden shadow-xs">
        {orderList.map((ord) => {
          const isOutForDelivery = ord.status.toLowerCase().includes('out_for_delivery');
          const isDelivered = ord.status.toLowerCase().includes('delivered');
          const summaryText = ord.items.map((i) => i.productName).join(' + ');

          return (
            <div
              key={ord.id}
              className="p-4 sm:p-5 transition-all duration-200 hover:bg-white hover:translate-x-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              {/* Left Column: Date, Icon & Summary */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isOutForDelivery
                      ? 'bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400/30'
                      : 'bg-ink/[0.04] text-ink-600'
                  }`}
                >
                  {isOutForDelivery ? (
                    <Bike className="w-4 h-4 text-basil" />
                  ) : (
                    <Package className="w-4 h-4 text-ink-500" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-ink-400">
                      {formatActivityDate(ord.createdAt)}
                    </span>
                    <span className="text-ink/20 text-xs">•</span>
                    <span className="font-mono text-xs font-bold text-ink">
                      #{ord.orderNumber}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isOutForDelivery
                          ? 'bg-emerald-100/70 text-emerald-800'
                          : 'bg-ink/[0.06] text-ink-600'
                      }`}
                    >
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-ink-700 truncate group-hover:text-ink transition-colors">
                    {summaryText}
                  </p>
                </div>
              </div>

              {/* Right Column: Amount & Reveal Action */}
              <div className="flex items-center justify-between sm:justify-end gap-4 self-end sm:self-center shrink-0 pl-13 sm:pl-0">
                <span className="font-mono font-extrabold text-sm sm:text-base text-ink">
                  {formatCurrency(ord.grandTotal)}
                </span>

                <div className="flex items-center gap-2">
                  {onReorder && (
                    <button
                      type="button"
                      onClick={() => onReorder(ord)}
                      className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-ink-600 hover:text-ink px-2.5 py-1 rounded-lg hover:bg-ink/[0.05] transition-colors"
                      title="Reorder items"
                    >
                      <RefreshCw className="w-3 h-3 text-basil" />
                      <span>Reorder</span>
                    </button>
                  )}

                  <Link
                    href={`/orders/${ord.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-basil group-hover:underline pl-1"
                  >
                    <span>View order</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

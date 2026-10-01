'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { Order, OrderStatus } from '@quickbasket/types';

export interface LiveOrderActivityProps {
  orders: Order[];
}

const STAGES = [
  { key: 'confirmed', label: 'CONFIRMED' },
  { key: 'preparing', label: 'PREPARING' },
  { key: 'ready', label: 'READY' },
  { key: 'out_for_delivery', label: 'OUT FOR DELIVERY' },
];

export function LiveOrderActivity({ orders }: LiveOrderActivityProps) {
  // Active orders are any orders not delivered or cancelled
  const activeOrders = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  );

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
        return 0; // CONFIRMED
      case 'packing':
        return 1; // PREPARING
      case 'out_for_delivery':
        return 3; // OUT FOR DELIVERY
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'packing':
      case 'confirmed':
        return {
          label: 'Preparing',
          className: 'bg-[#fff8ea] text-[#925404] border-[#ffe0a3]',
          dot: 'bg-[#d97706]',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for delivery',
          className: 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]',
          dot: 'bg-[#0284c7] animate-pulse',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          className: 'bg-[#edf8f1] text-[#145a32] border-[#cbe8d5]',
          dot: 'bg-[#1a8b4e]',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className: 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]',
          dot: 'bg-[#dc2626]',
        };
      default:
        return {
          label: 'Placed',
          className: 'bg-[#f4f2ec] text-[#424d45] border-[#e4e0d6]',
          dot: 'bg-[#737d75]',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
            Live Order Activity
          </h3>
          {activeOrders.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#edf8f1] text-[#145a32] border border-[#cbe8d5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              {activeOrders.length} active order{activeOrders.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <Link
          href="/orders"
          className="text-xs font-semibold text-[#144d31] hover:underline inline-flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Case 1: Exactly 1 Active Order (Adaptive rich focused view without empty space) */}
      {activeOrders.length === 1 ? (
        (() => {
          const order = activeOrders[0];
          const badge = getStatusBadge(order.status);
          const currentStage = getStageIndex(order.status);

          return (
            <div className="pt-3 space-y-4">
              <Link
                href={`/orders/${order.id}`}
                className="block p-3 rounded-lg bg-[#faf9f6] border border-[#eae7e0] hover:border-[#cfcac0] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-ink group-hover:text-[#144d31]">
                    #{order.orderNumber}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.className}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                </div>

                <div className="mt-2 text-xs text-ink flex items-center justify-between">
                  <span className="font-medium text-ink-600">
                    {order.items?.length || 1} items • {order.deliveryAddress?.area || 'Connaught Place'}
                  </span>
                  <span className="font-mono font-bold text-ink">
                    {formatCurrency(order.grandTotal)}
                  </span>
                </div>

                <div className="mt-1 text-[11px] text-ink-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-ink-300" />
                  {formatRelativeTime(order.createdAt)}
                </div>
              </Link>

              {/* Compact Fulfillment Timeline */}
              <div className="pt-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-400 mb-2">
                  Fulfillment Status
                </div>
                <div className="space-y-0.5">
                  {STAGES.map((st, idx) => {
                    const isPassed = currentStage > idx;
                    const isActive = currentStage === idx;

                    return (
                      <React.Fragment key={st.key}>
                        <div
                          className={`flex items-center justify-between text-xs py-1 px-2 rounded-md transition-colors ${
                            isActive ? 'bg-[#edf8f1] border border-[#cbe8d5]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                                isPassed
                                  ? 'bg-[#144d31] text-white'
                                  : isActive
                                  ? 'bg-[#22c55e] text-white ring-2 ring-[#22c55e]/20'
                                  : 'bg-[#eae7e0] text-ink-400'
                              }`}
                            >
                              {isPassed ? '✓' : isActive ? '●' : '○'}
                            </div>
                            <span
                              className={`font-mono text-[11px] tracking-tight ${
                                isActive
                                  ? 'font-bold text-[#144d31]'
                                  : isPassed
                                  ? 'font-medium text-ink-700'
                                  : 'text-ink-400'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>

                          {isActive && (
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#145a32]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                              IN PROGRESS
                            </span>
                          )}
                        </div>

                        {idx < STAGES.length - 1 && (
                          <div className="pl-3.5 py-0.5 text-ink-300 font-mono text-[11px] leading-none">
                            ↓
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()
      ) : activeOrders.length > 1 ? (
        /* Case 2: Multiple Active Orders (Compact List) */
        <div className="divide-y divide-[#f0eee8] mt-1">
          {activeOrders.slice(0, 4).map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="py-2.5 flex items-center justify-between hover:bg-[#faf9f6] -mx-2 px-2 rounded-lg transition-colors group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ink group-hover:text-[#144d31]">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${badge.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-400">
                    {order.items?.length || 1} items • {order.deliveryAddress?.area || 'Sector 18'}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-ink">
                    {formatCurrency(order.grandTotal)}
                  </div>
                  <div className="text-[10px] text-ink-400 font-mono mt-0.5">
                    {formatRelativeTime(order.createdAt)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Case 3: No Active Orders (Compact, zero empty vertical space) */
        <div className="py-6 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#edf8f1] text-[#145a32] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-ink">
              NO ACTIVE ORDERS
            </div>
            <p className="text-[11px] text-ink-500 mt-0.5">
              All current orders are up to date.
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#144d31] hover:underline pt-1"
          >
            View all →
          </Link>
        </div>
      )}
    </div>
  );
}

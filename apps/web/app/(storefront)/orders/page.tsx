'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ChevronRight, Clock } from 'lucide-react';
import { useOrdersQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export default function OrderHistoryPage() {
  const { data: orders, isLoading } = useOrdersQuery();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-ink">My Order History</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 bg-mist rounded-card animate-pulse" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-card border border-mist p-6">
          <Package className="w-10 h-10 text-ink-300 mx-auto mb-2" />
          <h3 className="text-base font-extrabold text-ink">No orders yet</h3>
          <p className="text-xs text-ink-500 mt-1">Place your first grocery order for 10-minute delivery!</p>
          <Link href="/" className="inline-block mt-4 text-xs font-bold bg-basil text-white px-4 py-2 rounded-pill">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3"
            >
              <div className="flex justify-between items-start border-b border-mist pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-ink">{order.orderNumber}</span>
                    <span className="text-[10px] font-extrabold uppercase bg-basil-light text-basil px-2 py-0.5 rounded-pill">
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-500 mt-0.5">{order.vendorName}</p>
                </div>
                <Link
                  href={`/orders/${order.id}`}
                  className="flex items-center gap-1 text-xs font-bold text-basil hover:underline"
                >
                  <span>Track / Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-xs text-ink-600 space-y-1">
                {order.items.map((it) => (
                  <div key={it.productId} className="flex justify-between">
                    <span>{it.productName} ({it.variantName}) x{it.quantity}</span>
                    <span className="font-mono">{formatCurrency(it.unitPrice * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-mist flex justify-between items-center text-xs font-bold text-ink">
                <span className="text-ink-400 font-normal">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="font-mono text-sm text-basil">Total: {formatCurrency(order.grandTotal)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

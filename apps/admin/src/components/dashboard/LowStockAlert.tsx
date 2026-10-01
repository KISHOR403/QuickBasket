'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface LowStockItem {
  id: string;
  name: string;
  stockCount: number;
  threshold: number;
  category: string;
}

export interface LowStockAlertProps {
  items: LowStockItem[];
  onQuickRestock?: (item: LowStockItem) => void;
}

export function LowStockAlert({ items, onQuickRestock }: LowStockAlertProps) {
  const [restockedIds, setRestockedIds] = useState<string[]>([]);

  const handleRestock = (item: LowStockItem) => {
    if (onQuickRestock) {
      onQuickRestock(item);
    }
    setRestockedIds((prev) => [...prev, item.id]);
  };

  const getUrgency = (count: number) => {
    if (count <= 0) {
      return {
        label: 'OUT OF STOCK',
        className: 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]',
        dot: 'bg-[#dc2626]',
      };
    }
    if (count <= 6) {
      return {
        label: 'CRITICAL',
        className: 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]',
        dot: 'bg-[#dc2626]',
      };
    }
    return {
      label: 'LOW',
      className: 'bg-[#fff8ea] text-[#925404] border-[#ffe0a3]',
      dot: 'bg-[#d97706]',
    };
  };

  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
              Low Stock
            </h3>
            {items.length > 0 && (
              <span className="text-[10px] font-mono text-ink-400">
                ({items.length} items)
              </span>
            )}
          </div>
          <Link
            href="/inventory"
            className="text-xs font-semibold text-[#144d31] hover:underline inline-flex items-center gap-1"
          >
            Inventory <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#edf8f1] text-[#145a32] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink">ALL STOCKS HEALTHY</div>
            <p className="text-[11px] text-ink-400">No items currently below threshold.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0eee8] mt-1">
            {items.map((it) => {
              const isRestocked = restockedIds.includes(it.id);
              const urgency = getUrgency(it.stockCount);

              return (
                <div
                  key={it.id}
                  className="py-2.5 flex items-center justify-between hover:bg-[#faf9f6] -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="text-xs font-bold text-ink truncate">{it.name}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${urgency.className}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
                        {urgency.label}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-ink-600">
                        {isRestocked ? `${it.stockCount + 50} left` : `${it.stockCount} left`}
                      </span>
                      <span className="text-[11px] text-ink-400 font-mono">
                        Threshold: {it.threshold}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Button
                      variant={isRestocked ? 'secondary' : 'outline'}
                      size="xs"
                      onClick={() => handleRestock(it)}
                      disabled={isRestocked}
                      className="text-xs font-medium"
                    >
                      {isRestocked ? (
                        'Restocked'
                      ) : (
                        <>
                          <Plus className="w-3 h-3" /> Restock
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


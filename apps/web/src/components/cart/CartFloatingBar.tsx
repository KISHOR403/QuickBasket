'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useHasMounted } from '@/lib/useHasMounted';
import { formatCurrency } from '@quickbasket/utils';

export function CartFloatingBar() {
  const { getTotalItems, getItemTotal } = useCartStore();
  const { openCartDrawer } = useUiStore();
  const mounted = useHasMounted();

  const totalItems = getTotalItems();
  const itemTotal = getItemTotal();

  // Cart lives in localStorage; only render after mount so the bar's presence
  // matches the server render (nothing) and never causes a hydration mismatch.
  if (!mounted || totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-slideUp">
      <button
        onClick={openCartDrawer}
        aria-label={`Open cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, total ${formatCurrency(itemTotal)}`}
        className="w-full bg-ink hover:bg-ink-700 text-white p-4 rounded-2xl shadow-editorial flex items-center justify-between transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-basil/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-basil flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="text-base font-mono font-bold">{formatCurrency(itemTotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-bold bg-white/10 px-4 py-2 rounded-xl">
          <span>View cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}

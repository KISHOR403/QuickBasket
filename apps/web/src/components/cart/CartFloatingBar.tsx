'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { formatCurrency } from '@quickbasket/utils';

export function CartFloatingBar() {
  const { getTotalItems, getItemTotal } = useCartStore();
  const { openCartDrawer } = useUiStore();

  const totalItems = getTotalItems();
  const itemTotal = getItemTotal();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 animate-slideUp">
      <button
        onClick={openCartDrawer}
        className="w-full bg-basil hover:bg-basil-hover text-white p-3.5 rounded-pill shadow-float flex items-center justify-between transition-transform active:scale-[0.98] border border-leaf/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mango text-ink flex items-center justify-center font-black">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-basil-light">
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'} IN CART
            </span>
            <span className="text-base font-mono font-black">{formatCurrency(itemTotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-extrabold uppercase tracking-wide bg-white/10 px-3 py-1.5 rounded-pill">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}

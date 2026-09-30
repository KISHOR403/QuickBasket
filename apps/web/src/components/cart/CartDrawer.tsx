'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight, Zap, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { formatCurrency } from '@quickbasket/utils';
import { CartItemRow } from './CartItemRow';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUiStore();
  const { items, getItemTotal, getTotalSavings, getTotalItems, clearCart } = useCartStore();

  if (!isCartDrawerOpen) return null;

  const itemTotal = getItemTotal();
  const savings = getTotalSavings();
  const totalItems = getTotalItems();

  const deliveryThreshold = 299;
  const freeDeliveryDiff = deliveryThreshold - itemTotal;
  const deliveryFee = itemTotal >= deliveryThreshold || itemTotal === 0 ? 0 : 15;
  const handlingFee = itemTotal > 0 ? 4 : 0;
  const grandTotal = itemTotal + deliveryFee + handlingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink/40 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper shadow-editorial border-l border-mist flex flex-col justify-between animate-slideInRight">
          {/* Header */}
          <div className="p-5 border-b border-mist flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-basil/10 flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5 text-basil" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-ink">My Cart</h2>
                <span className="text-[11px] text-ink-400">{totalItems} items</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-beet hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={closeCartDrawer}
                className="text-ink-400 hover:text-ink p-1.5 rounded-xl hover:bg-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery threshold */}
          {items.length > 0 && (
            <div className="bg-basil-light/50 px-5 py-3 border-b border-basil/10 flex items-center gap-2 text-xs font-bold text-basil">
              <Zap className="w-4 h-4 shrink-0" />
              {freeDeliveryDiff > 0 ? (
                <span>Add {formatCurrency(freeDeliveryDiff)} more for <b>free delivery</b></span>
              ) : (
                <span>🎉 Free express delivery unlocked!</span>
              )}
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-1">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-ink-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-ink">Your cart is empty</h3>
                <p className="text-xs text-ink-400 max-w-xs">
                  Fresh groceries are just 10 minutes away.
                </p>
                <Button onClick={closeCartDrawer} variant="primary" size="md">
                  Start shopping
                </Button>
              </div>
            ) : (
              items.map((item: any) => (
                <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-mist bg-white space-y-4">
              {savings > 0 && (
                <div className="bg-basil-light text-basil p-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>You saved {formatCurrency(savings)} on this order!</span>
                </div>
              )}

              <div className="space-y-2 text-xs text-ink-500">
                <div className="flex justify-between">
                  <span>Items total</span>
                  <span className="font-mono font-bold text-ink">{formatCurrency(itemTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-basil">FREE</span>
                    ) : (
                      formatCurrency(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-ink-400">
                  <span>Handling fee</span>
                  <span className="font-mono">{formatCurrency(handlingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-mist">
                  <span>Total</span>
                  <span className="font-mono">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <Link href="/checkout" onClick={closeCartDrawer} className="block w-full">
                <button className="w-full bg-ink hover:bg-ink-700 text-white flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] shadow-float">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase text-white/50">Total</span>
                    <span className="font-mono">{formatCurrency(grandTotal)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

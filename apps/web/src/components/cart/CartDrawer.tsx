'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight, Zap, ShieldCheck, Tag } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface shadow-float border-l border-mist flex flex-col justify-between animate-slideInRight">
          {/* Header */}
          <div className="p-4 border-b border-mist flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-basil" />
              <h2 className="text-base font-extrabold text-ink">
                My Cart <span className="text-xs text-ink-500 font-normal">({totalItems} items)</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-beet hover:underline"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCartDrawer}
                className="text-ink-400 hover:text-ink p-1 rounded-full hover:bg-mist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery threshold callout */}
          {items.length > 0 && (
            <div className="bg-basil-light/70 px-4 py-2.5 border-b border-basil/20 flex items-center gap-2 text-xs font-bold text-basil">
              <Zap className="w-4 h-4 fill-current text-mango shrink-0" />
              {freeDeliveryDiff > 0 ? (
                <span>Add {formatCurrency(freeDeliveryDiff)} more for <b>FREE Delivery</b></span>
              ) : (
                <span>🎉 Yay! You unlocked <b>FREE Express Delivery</b></span>
              )}
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-mist/60 flex items-center justify-center text-ink-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-extrabold text-ink">Your cart is empty</h3>
                <p className="text-xs text-ink-500 max-w-xs">
                  Good food and daily essentials are just 10 minutes away!
                </p>
                <Button onClick={closeCartDrawer} variant="mango" size="md">
                  Start Shopping
                </Button>
              </div>
            ) : (
              items.map((item: any) => (
                <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
              ))
            )}
          </div>

          {/* Footer Bill & CTA */}
          {items.length > 0 && (
            <div className="p-4 border-t border-mist bg-surface-muted space-y-3">
              {savings > 0 && (
                <div className="bg-leaf-light text-leaf p-2 rounded-badge text-xs font-bold flex items-center gap-2">
                  <Tag className="w-4 h-4 fill-current" />
                  <span>You saved {formatCurrency(savings)} on this order!</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-ink-700">
                <div className="flex justify-between">
                  <span>Items Total</span>
                  <span className="font-mono font-bold">{formatCurrency(itemTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-mono font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-leaf uppercase">FREE</span>
                    ) : (
                      formatCurrency(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span>Handling & Packaging Fee</span>
                  <span className="font-mono">{formatCurrency(handlingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-ink pt-2 border-t border-mist">
                  <span>Grand Total</span>
                  <span className="font-mono text-basil">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <Link href="/checkout" onClick={closeCartDrawer} className="block w-full">
                <Button variant="mango" className="w-full flex items-center justify-between text-base py-3">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold text-ink-700">Grand Total</span>
                    <span className="font-mono font-black">{formatCurrency(grandTotal)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

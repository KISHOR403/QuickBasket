'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Truck, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@quickbasket/utils';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, getItemTotal, getTotalSavings, getTotalItems, clearCart } = useCartStore();

  const itemTotal = getItemTotal();
  const savings = getTotalSavings();
  const totalItems = getTotalItems();
  const deliveryFee = itemTotal >= 299 || itemTotal === 0 ? 0 : 15;
  const handlingFee = itemTotal > 0 ? 4 : 0;
  const grandTotal = itemTotal + deliveryFee + handlingFee;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-20 h-20 bg-mist/60 rounded-full flex items-center justify-center mx-auto text-ink-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-ink">Your Cart is Empty</h1>
        <p className="text-xs text-ink-500">
          Add fresh veggies, dairy, snacks, and daily groceries to get 10-minute delivery.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg" className="mt-2">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-ink">Your Cart</h1>
        <button onClick={clearCart} className="text-xs font-bold text-beet hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Delivery estimate banner */}
          <div className="bg-sage border border-sage-dark rounded-card p-3.5 flex items-center gap-3 text-sm text-ink-700">
            <Truck className="w-5 h-5 text-basil shrink-0" />
            <span>
              Arriving in <span className="font-extrabold text-basil">12 minutes</span> to your saved address.
            </span>
          </div>

          {/* Cart items */}
          <div className="bg-surface rounded-card border border-mist p-4 shadow-card space-y-2">
            {items.map((item) => (
              <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
            ))}
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4 h-fit">
          <h3 className="text-base font-extrabold text-ink">Bill Details</h3>

          <div className="space-y-3 text-sm text-ink-700 font-medium">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="font-mono font-bold">{formatCurrency(itemTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Handling Fee</span>
              <span className="font-mono font-bold">{formatCurrency(handlingFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono font-bold">
                {deliveryFee === 0 ? (
                  <span className="flex items-center gap-1.5">
                    <span className="text-ink-400 line-through">{formatCurrency(40)}</span>
                    <span className="text-leaf font-extrabold">FREE</span>
                  </span>
                ) : (
                  formatCurrency(deliveryFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-black text-ink pt-3 border-t border-mist">
              <span>To Pay</span>
              <span className="font-mono">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          {savings > 0 && (
            <div className="bg-beet-light text-beet p-3 rounded-card text-xs font-bold flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>You saved {formatCurrency(savings)} on this order!</span>
            </div>
          )}

          <Link href="/checkout" className="block">
            <Button variant="mango" className="w-full justify-between py-3.5 text-base font-black rounded-pill">
              <span>Proceed to Pay</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

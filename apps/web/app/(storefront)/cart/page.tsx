'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
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
        <h1 className="text-2xl font-black text-ink">Shopping Cart ({totalItems} items)</h1>
        <button onClick={clearCart} className="text-xs font-bold text-beet hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface rounded-card border border-mist p-4 shadow-card space-y-2">
          {items.map((item) => (
            <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4 h-fit">
          <h3 className="text-sm font-extrabold text-ink border-b border-mist pb-2">Bill Summary</h3>

          {savings > 0 && (
            <div className="bg-leaf-light text-leaf p-2.5 rounded-badge text-xs font-bold flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Saved {formatCurrency(savings)} on MRP</span>
            </div>
          )}

          <div className="space-y-2 text-xs text-ink-700 font-medium">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="font-mono font-bold">{formatCurrency(itemTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono font-bold">
                {deliveryFee === 0 ? <span className="text-leaf">FREE</span> : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Handling Fee</span>
              <span className="font-mono">{formatCurrency(handlingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-ink pt-3 border-t border-mist">
              <span>Grand Total</span>
              <span className="font-mono text-basil">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button variant="mango" className="w-full justify-between py-3">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

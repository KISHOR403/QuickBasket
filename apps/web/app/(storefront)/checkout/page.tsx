'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, CreditCard, ShieldCheck, CheckCircle2, Plus, Lock, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useLocationStore } from '@/store/location';
import { usePlaceOrderMutation } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getItemTotal, clearCart } = useCartStore();
  const { selectedAddress, area, pincode } = useLocationStore();
  const placeOrderMutation = usePlaceOrderMutation();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [selectedSlot, setSelectedSlot] = useState('instant');
  const [selectedAddressType, setSelectedAddressType] = useState<'home' | 'work'>('home');
  const [tipAmount, setTipAmount] = useState(20);

  const itemTotal = getItemTotal();
  const deliveryFee = itemTotal >= 299 ? 0 : 15;
  const handlingFee = 4;
  const taxesAndCharges = Math.round(itemTotal * 0.04);
  const grandTotal = itemTotal + deliveryFee + handlingFee + taxesAndCharges;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return;

    try {
      const order = await placeOrderMutation.mutateAsync({
        items,
        deliveryAddress: selectedAddress,
        paymentMethod,
        deliverySlotId: selectedSlot,
        tipAmount,
      });

      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-ink">Your cart is empty</h2>
        <Button onClick={() => router.push('/')} variant="primary">
          Shop Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Checkout Header */}
      <div className="flex items-center justify-between bg-surface rounded-card border border-mist p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display font-black text-xl text-basil">
            QuickBasket
          </Link>
          <span className="text-lg font-bold text-ink">Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-basil text-xs font-extrabold uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
              <MapPin className="w-5 h-5 text-basil" /> Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Home Address */}
              <button
                onClick={() => setSelectedAddressType('home')}
                className={`p-4 rounded-card border text-left transition-all ${
                  selectedAddressType === 'home'
                    ? 'border-basil bg-basil-light/30'
                    : 'border-mist bg-surface hover:border-ink-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-ink">Home</span>
                  {selectedAddressType === 'home' && (
                    <CheckCircle2 className="w-5 h-5 text-basil" />
                  )}
                </div>
                <p className="text-xs text-ink-500">
                  {selectedAddress?.flatNo}, {selectedAddress?.building}
                </p>
                <p className="text-xs text-ink-400">{area}, {pincode}</p>
              </button>

              {/* Work Address */}
              <button
                onClick={() => setSelectedAddressType('work')}
                className={`p-4 rounded-card border text-left transition-all ${
                  selectedAddressType === 'work'
                    ? 'border-basil bg-basil-light/30'
                    : 'border-mist bg-surface hover:border-ink-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-ink">Work</span>
                  {selectedAddressType === 'work' && (
                    <CheckCircle2 className="w-5 h-5 text-basil" />
                  )}
                </div>
                <p className="text-xs text-ink-500">Tech Park, Tower C, 5th Floor</p>
                <p className="text-xs text-ink-400">{area}, {pincode}</p>
              </button>
            </div>

            <button className="flex items-center gap-2 text-sm font-bold text-basil hover:underline">
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>

          {/* Delivery Slot */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4">
            <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
              <Clock className="w-5 h-5 text-basil" /> Delivery Slot
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedSlot('instant')}
                className={`p-4 rounded-card border text-left transition-all ${
                  selectedSlot === 'instant'
                    ? 'border-basil bg-basil-light/30'
                    : 'border-mist bg-surface hover:border-ink-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-mango text-ink text-xs font-extrabold px-2.5 py-1 rounded-pill flex items-center gap-1">
                    <Zap className="w-3 h-3" /> 10 Min
                  </span>
                </div>
                <p className="text-xs text-ink-500 mt-2">
                  Standard instant delivery at your doorstep
                </p>
              </button>

              <button
                onClick={() => setSelectedSlot('scheduled')}
                className={`p-4 rounded-card border text-left transition-all ${
                  selectedSlot === 'scheduled'
                    ? 'border-basil bg-basil-light/30'
                    : 'border-mist bg-surface hover:border-ink-200'
                }`}
              >
                <div className="text-sm font-bold text-ink">📅 Evening Slot</div>
                <p className="text-xs text-ink-500 mt-2">Today 6 PM - 8 PM</p>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3">
            <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-basil" /> Payment Method
            </h3>
            <div className="space-y-2">
              {[
                { id: 'upi', label: 'UPI / GPay / PhonePe / Paytm', badge: 'Fastest' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'cod', label: 'Cash on Delivery (COD)' },
              ].map((pm) => (
                <label
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`flex items-center justify-between p-3.5 rounded-card border cursor-pointer text-sm font-bold transition-all ${
                    paymentMethod === pm.id
                      ? 'border-basil bg-basil-light/30 text-ink'
                      : 'border-mist text-ink-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id as any)}
                      className="accent-basil"
                    />
                    <span>{pm.label}</span>
                  </div>
                  {pm.badge && (
                    <span className="text-[10px] bg-mango text-ink px-2 py-0.5 rounded-pill uppercase font-extrabold">
                      {pm.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4 h-fit">
          <h3 className="text-base font-extrabold text-ink">Order Summary</h3>

          {/* Item list with thumbnails */}
          <div className="space-y-3 border-b border-mist pb-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-input bg-surface-muted overflow-hidden shrink-0 relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-ink truncate">{item.product.name}</p>
                  <p className="text-[11px] text-ink-400">{item.quantity} × {item.selectedVariant.name}</p>
                </div>
                <span className="text-sm font-mono font-bold text-ink shrink-0">
                  {formatCurrency(item.selectedVariant.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm text-ink-700">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="font-mono font-bold">{formatCurrency(itemTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-basil">Delivery Fee (Free over ₹300)</span>
              <span className="font-mono font-bold flex items-center gap-1.5">
                {deliveryFee === 0 ? (
                  <>
                    <span className="text-ink-400 line-through">{formatCurrency(40)}</span>
                    <span className="text-leaf font-extrabold">FREE</span>
                  </>
                ) : (
                  formatCurrency(deliveryFee)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Charges</span>
              <span className="font-mono">{formatCurrency(taxesAndCharges)}</span>
            </div>
          </div>

          {/* Grand total — prominent */}
          <div className="pt-3 border-t border-mist text-center">
            <span className="text-3xl font-black font-mono text-ink">{formatCurrency(grandTotal)}</span>
          </div>

          <Button
            onClick={handlePlaceOrder}
            isLoading={placeOrderMutation.isPending}
            variant="mango"
            size="lg"
            className="w-full font-black text-base py-3.5 rounded-pill"
          >
            Place Order ({formatCurrency(grandTotal)})
          </Button>

          <div className="text-[11px] text-ink-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-basil" />
            <span>100% Safe & Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

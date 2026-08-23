'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
  const [tipAmount, setTipAmount] = useState(20);

  const itemTotal = getItemTotal();
  const deliveryFee = itemTotal >= 299 ? 0 : 15;
  const handlingFee = 4;
  const grandTotal = itemTotal + deliveryFee + handlingFee + tipAmount;

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
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-ink">Checkout & Delivery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Address */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-extrabold text-ink flex items-center gap-2">
                <MapPin className="w-4 h-4 text-basil" /> Delivery Address
              </h3>
              <span className="text-xs font-bold text-basil uppercase">HOME</span>
            </div>
            <div className="text-xs text-ink-700 space-y-1 bg-surface-muted p-3 rounded-input">
              <p className="font-bold text-ink">{selectedAddress?.flatNo}, {selectedAddress?.building}</p>
              <p>{area}, {pincode}</p>
              <p className="text-ink-400">Delhi NCR</p>
            </div>
          </div>

          {/* Delivery Slot */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3">
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-2">
              <Clock className="w-4 h-4 text-basil" /> Select Delivery Time
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedSlot('instant')}
                className={`p-3 rounded-input border text-left font-bold text-xs transition-all ${
                  selectedSlot === 'instant'
                    ? 'border-basil bg-basil-light/50 text-basil'
                    : 'border-mist text-ink'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-mango">⚡</span> Instant Express
                </div>
                <div className="text-[11px] font-mono text-ink-600 mt-1">10-15 Minutes</div>
              </button>

              <button
                onClick={() => setSelectedSlot('scheduled')}
                className={`p-3 rounded-input border text-left font-bold text-xs transition-all ${
                  selectedSlot === 'scheduled'
                    ? 'border-basil bg-basil-light/50 text-basil'
                    : 'border-mist text-ink'
                }`}
              >
                <div>📅 Evening Slot</div>
                <div className="text-[11px] font-mono text-ink-600 mt-1">Today 6 PM - 8 PM</div>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3">
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-basil" /> Payment Method
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
                  className={`flex items-center justify-between p-3 rounded-input border cursor-pointer text-xs font-bold transition-all ${
                    paymentMethod === pm.id
                      ? 'border-basil bg-basil-light/40 text-ink'
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
                    <span className="text-[10px] bg-mango text-ink px-2 py-0.5 rounded-pill uppercase">
                      {pm.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Place Order Button */}
        <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-4 h-fit">
          <h3 className="text-sm font-extrabold text-ink border-b border-mist pb-2">Order Summary</h3>

          <div className="space-y-2 text-xs text-ink-700">
            <div className="flex justify-between">
              <span>Item Subtotal ({items.length} items)</span>
              <span className="font-mono font-bold">{formatCurrency(itemTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-mono font-bold">
                {deliveryFee === 0 ? <span className="text-leaf">FREE</span> : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-ink-500">
              <span>Delivery Partner Tip</span>
              <span className="font-mono">{formatCurrency(tipAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-ink pt-3 border-t border-mist">
              <span>Grand Total</span>
              <span className="font-mono text-basil">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <Button
            onClick={handlePlaceOrder}
            isLoading={placeOrderMutation.isPending}
            variant="mango"
            size="lg"
            className="w-full font-black text-base py-3"
          >
            Pay & Place Order ({formatCurrency(grandTotal)})
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

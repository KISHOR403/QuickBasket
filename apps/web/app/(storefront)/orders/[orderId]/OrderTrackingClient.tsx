'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowLeft } from 'lucide-react';
import { SpeedPill } from '@/components/common/SpeedPill';
import { useOrdersQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export function OrderTrackingClient({ orderId }: { orderId: string }) {
  const { data: orders } = useOrdersQuery();

  const order = orders?.find((o) => o.id === orderId) || orders?.[0];

  if (!order) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-ink">Order Not Found</h2>
        <Link href="/" className="text-basil hover:underline text-xs font-bold mt-2 block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink">
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>

      {/* Signature SpeedPill Hero */}
      <div className="bg-surface rounded-card border border-mist p-6 shadow-float text-center space-y-4">
        <div className="flex justify-center">
          <SpeedPill minutes={order.estimatedDeliveryMinutes || 12} variant="hero" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-basil bg-basil-light px-3 py-1 rounded-pill uppercase">
            Order #{order.orderNumber} • OUT FOR DELIVERY
          </span>
          <h1 className="text-2xl font-black text-ink mt-2">Arriving at your doorstep soon</h1>
          <p className="text-xs text-ink-500 mt-1">
            Delivering from <b>{order.vendorName}</b>
          </p>
        </div>

        {/* Delivery Timeline tracker */}
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-mist text-center">
          {[
            { label: 'Placed', done: true },
            { label: 'Packed', done: true },
            { label: 'On the way', done: true },
            { label: 'Delivered', done: false },
          ].map((st, i) => (
            <div key={st.label} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  st.done ? 'bg-basil text-white' : 'bg-mist text-ink-400'
                }`}
              >
                {st.done ? '✓' : i + 1}
              </div>
              <span className="text-[11px] font-bold text-ink">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rider Info Card */}
      {order.rider && (
        <div className="bg-surface rounded-card border border-mist p-4 shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-basil bg-mist">
              <Image src={order.rider.photo} alt={order.rider.name} fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-ink-400">Delivery Partner</span>
              <h3 className="text-sm font-extrabold text-ink">{order.rider.name}</h3>
              <p className="text-xs text-ink-500 font-mono">{order.rider.vehicleNumber}</p>
            </div>
          </div>

          <a
            href={`tel:${order.rider.phone}`}
            className="flex items-center gap-2 bg-basil-light text-basil px-4 py-2 rounded-pill text-xs font-bold hover:bg-basil hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Partner
          </a>
        </div>
      )}

      {/* Items Summary */}
      <div className="bg-surface rounded-card border border-mist p-5 shadow-card space-y-3">
        <h3 className="text-xs font-bold uppercase text-ink-500 tracking-wider">Ordered Items</h3>
        <div className="space-y-2 divide-y divide-mist">
          {order.items.map((it) => (
            <div key={`${it.productId}-${it.variantId}`} className="pt-2 flex justify-between items-center text-xs font-bold text-ink">
              <div>
                <span>{it.productName} ({it.variantName})</span>
                <span className="text-ink-400 ml-2 font-normal">x{it.quantity}</span>
              </div>
              <span className="font-mono">{formatCurrency(it.unitPrice * it.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-mist flex justify-between text-sm font-black text-ink">
          <span>Paid Total ({order.paymentMethod.toUpperCase()})</span>
          <span className="font-mono text-basil">{formatCurrency(order.grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}

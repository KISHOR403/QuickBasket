'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Bike,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Phone,
  Navigation,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface LiveDeliveryProps {
  order?: {
    id: string;
    orderNumber: string;
    status: string;
    vendorName?: string;
    grandTotal: number;
    items: Array<{
      productName: string;
      quantity: number;
      variantName?: string;
      unitPrice: number;
    }>;
    estimatedDeliveryTime?: string;
  } | null;
  onTrackClick?: () => void;
}

export function LiveDelivery({ order, onTrackClick }: LiveDeliveryProps) {
  // If no order is provided, use default mock active delivery
  const activeOrder = order || {
    id: 'ord-1001',
    orderNumber: 'QB-88491',
    status: 'out_for_delivery',
    vendorName: 'QuickBasket Dark Store #04',
    grandTotal: 125,
    items: [
      { productName: 'Amul Taaza Toned Milk', quantity: 2, variantName: '1 L', unitPrice: 54 },
      { productName: 'Fresh Coriander Bunch', quantity: 1, variantName: '100 g', unitPrice: 17 },
    ],
  };

  const [etaMinutes, setEtaMinutes] = useState(7);

  // Subtle live countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 5 ? prev - 1 : 7));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { label: 'Packed', done: true, current: false },
    { label: 'Picked up', done: true, current: false },
    { label: 'On the way', done: true, current: true },
    { label: 'Delivered', done: false, current: false },
  ];

  const itemListPreview = activeOrder.items
    .map((item) => `${item.productName}${item.quantity > 1 ? ` (x${item.quantity})` : ''}`)
    .join(', ');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ebf6ee] via-[#f7faf8] to-[#e8f5ec] border border-basil/20 shadow-[0_12px_36px_-10px_rgba(26,107,66,0.12)] p-5 sm:p-7 transition-all duration-300">
      {/* Decorative Ambient Background Wave */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-leaf/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-basil/10 rounded-full blur-2xl pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 space-y-6">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-basil/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span className="font-mono font-extrabold text-[11px] sm:text-xs text-basil-dark uppercase tracking-widest">
              OUT FOR DELIVERY
            </span>
            <span className="text-ink/20">•</span>
            <span className="font-mono text-xs font-bold text-ink-600">
              #{activeOrder.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-ink-600 bg-white/70 px-3 py-1 rounded-full border border-basil/10 shadow-xs">
            <Bike className="w-3.5 h-3.5 text-basil" />
            <span>Rider Assigned • {activeOrder.vendorName || 'Dark Store #04'}</span>
          </div>
        </div>

        {/* Main Center Grid: Arriving In + Item preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-ink-500 uppercase tracking-wider">
              Your groceries are on the way
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-xs sm:text-sm font-bold text-ink-400 uppercase tracking-widest font-mono">
                ARRIVING IN
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight">
                  0{etaMinutes}
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-basil">
                  MIN
                </span>
              </div>
            </div>
            <p className="text-xs text-ink-600 font-medium line-clamp-1 pt-1">
              <span className="font-bold text-ink">{activeOrder.items.length} items:</span>{' '}
              {itemListPreview}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-end items-start sm:items-center lg:items-end gap-3">
            <Link
              href={`/orders/${activeOrder.id}`}
              onClick={onTrackClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-basil hover:bg-basil-hover text-white text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl shadow-pill transition-all active:scale-[0.98] group"
            >
              <Navigation className="w-4 h-4 text-emerald-300 transition-transform group-hover:translate-x-0.5" />
              <span>Track Live Delivery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-[11px] font-medium text-ink-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-basil" />
              100% On-time guarantee
            </span>
          </div>
        </div>

        {/* Progress Bar & Stages */}
        <div className="space-y-2 pt-2">
          {/* Progress track */}
          <div className="w-full h-2.5 bg-ink/[0.08] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-basil via-leaf to-emerald-400 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: '75%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Stepper text row */}
          <div className="grid grid-cols-4 text-center text-[10px] sm:text-xs font-bold text-ink-500">
            {stages.map((stage, idx) => (
              <div
                key={stage.label}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 ${
                  stage.current
                    ? 'text-basil font-black'
                    : stage.done
                    ? 'text-ink-700'
                    : 'text-ink-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    stage.current
                      ? 'bg-basil ring-4 ring-basil/20 animate-pulse'
                      : stage.done
                      ? 'bg-basil'
                      : 'bg-ink/20'
                  }`}
                />
                <span className="truncate">{stage.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

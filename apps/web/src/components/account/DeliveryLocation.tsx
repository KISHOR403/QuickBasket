'use client';

import React from 'react';
import { MapPin, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface DeliveryLocationProps {
  address?: {
    label?: string;
    flatNo?: string;
    building?: string;
    area?: string;
    city?: string;
    pincode?: string;
  } | null;
  onChangeAddress?: () => void;
}

export function DeliveryLocation({ address, onChangeAddress }: DeliveryLocationProps) {
  const label = address?.label || 'HOME';
  const flatNo = address?.flatNo || 'A-402';
  const building = address?.building || 'Greenwood Apartments';
  const area = address?.area || 'Connaught Place, Sector 18';
  const city = address?.city || 'New Delhi';
  const pincode = address?.pincode || '110001';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/80 border border-ink/[0.06] p-5 sm:p-6 shadow-xs group transition-all duration-200 hover:shadow-card hover:border-ink/[0.12]">
      {/* Subtle Abstract Map Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] group-hover:opacity-[0.05] transition-opacity">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="location-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#location-grid)" />
        </svg>
      </div>

      {/* Abstract Radar Pin */}
      <div className="absolute right-4 -top-6 w-32 h-32 rounded-full border border-basil/10 pointer-events-none flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border border-basil/15 animate-ping opacity-25" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-ink-400 uppercase tracking-wider">
              DELIVERING TO
            </span>
            <span className="text-[9px] font-extrabold uppercase bg-basil/10 text-basil px-2 py-0.5 rounded-md tracking-wider">
              {label}
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-ink tracking-tight">
              {flatNo}, {building}
            </h3>
            <p className="text-xs sm:text-sm text-ink-500 font-medium">
              {area}, {city} — {pincode}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Deliverable in 10 min</span>
            </span>
            <span className="text-[11px] text-ink-400 font-medium hidden sm:inline">
              Served by Dark Store #04
            </span>
          </div>
        </div>

        {/* Change Address Action */}
        <div className="shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={onChangeAddress}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-basil hover:text-basil-dark bg-basil/[0.06] hover:bg-basil/[0.12] px-3.5 py-2 rounded-xl transition-all active:scale-95 group/btn"
          >
            <span>Change address</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

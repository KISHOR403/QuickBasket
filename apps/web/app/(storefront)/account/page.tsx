'use client';

import React from 'react';
import Link from 'next/link';
import { User, MapPin, Package, ShieldCheck, LogOut, Phone, HelpCircle } from 'lucide-react';
import { useLocationStore } from '@/store/location';

export default function AccountPage() {
  const { selectedAddress, pincode, area } = useLocationStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-ink">My Account</h1>

      {/* User Header Profile */}
      <div className="bg-surface rounded-card border border-mist p-6 shadow-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-basil text-white flex items-center justify-center font-extrabold text-xl shadow-pill">
          VK
        </div>
        <div>
          <h2 className="text-base font-black text-ink">Vikram Kumar</h2>
          <div className="flex items-center gap-2 text-xs text-ink-500 font-mono mt-0.5">
            <Phone className="w-3.5 h-3.5 text-basil" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Menu links */}
      <div className="bg-surface rounded-card border border-mist divide-y divide-mist shadow-card">
        <Link href="/orders" className="flex items-center justify-between p-4 hover:bg-surface-muted transition-colors">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-basil" />
            <span className="text-sm font-bold text-ink">My Orders</span>
          </div>
          <span className="text-xs font-bold text-basil">Track / History →</span>
        </Link>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-basil" />
              <span className="text-sm font-bold text-ink">Saved Address</span>
            </div>
            <span className="text-xs font-bold text-basil uppercase">Primary</span>
          </div>
          <div className="text-xs text-ink-600 bg-surface-muted p-3 rounded-input font-medium ml-8">
            <p className="font-bold text-ink">{selectedAddress?.flatNo}, {selectedAddress?.building}</p>
            <p>{area}, {pincode}</p>
          </div>
        </div>

        <Link href="/login" className="flex items-center gap-3 p-4 hover:bg-beet-light/30 transition-colors text-beet">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold">Logout</span>
        </Link>
      </div>
    </div>
  );
}

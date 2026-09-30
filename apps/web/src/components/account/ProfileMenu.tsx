'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Wallet,
  Gift,
  ShieldCheck,
  LogOut,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    tier: string;
    memberSince: string;
  };
  walletBalance?: number;
  onSelectTab?: (tab: 'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings') => void;
  onOpenEditProfile?: () => void;
  onLogout?: () => void;
}

export function ProfileMenu({
  isOpen,
  onClose,
  user,
  walletBalance = 245,
  onSelectTab,
  onOpenEditProfile,
  onLogout,
}: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleNav = (tab: 'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings') => {
    if (onSelectTab) {
      onSelectTab(tab);
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-label="User Profile Menu"
      className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-surface/95 backdrop-blur-xl border border-ink/[0.08] rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,26,20,0.18)] z-50 overflow-hidden animate-scaleIn origin-top-right text-ink"
    >
      {/* Top Header Card */}
      <div className="p-4 bg-gradient-to-b from-cream/60 to-transparent border-b border-ink/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-basil to-emerald-600 text-white font-display font-bold text-base flex items-center justify-center shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-ink truncate">{user.name}</h4>
              <span className="inline-flex items-center gap-0.5 bg-mango/15 border border-mango/30 text-ink text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                <Sparkles className="w-2.5 h-2.5 text-mango" />
                VIP
              </span>
            </div>
            <p className="text-[11px] text-ink-500 font-medium truncate">{user.email}</p>
            <p className="text-[10px] text-ink-400 mt-0.5">Member since {user.memberSince}</p>
          </div>
        </div>

        {onOpenEditProfile && (
          <button
            onClick={() => {
              onOpenEditProfile();
              onClose();
            }}
            className="mt-3 w-full text-center text-xs font-bold text-basil hover:text-basil-dark py-1.5 rounded-lg bg-basil/[0.06] hover:bg-basil/[0.12] transition-colors"
          >
            Edit Profile Details
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="p-2 space-y-0.5 text-xs font-semibold">
        <button
          onClick={() => handleNav('overview')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-ink-400" />
            <span>Profile Command Center</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
        </button>

        <button
          onClick={() => handleNav('orders')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-ink-400" />
            <span>Orders & Deliveries</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-basil bg-basil/10 px-1.5 py-0.5 rounded-md">
            Live
          </span>
        </button>

        <button
          onClick={() => handleNav('addresses')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-ink-400" />
            <span>Saved Addresses</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
        </button>

        <button
          onClick={() => handleNav('wallet')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <Wallet className="w-4 h-4 text-ink-400" />
            <span>Quick Wallet</span>
          </span>
          <span className="font-mono text-[11px] font-bold text-emerald-700">
            {formatCurrency(walletBalance)}
          </span>
        </button>

        <button
          onClick={() => handleNav('rewards')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-ink-400" />
            <span>Rewards & Referrals</span>
          </span>
          <span className="text-[9px] font-extrabold uppercase bg-mango text-ink px-1.5 py-0.2 rounded-full">
            ₹200
          </span>
        </button>

        <button
          onClick={() => handleNav('settings')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-700 hover:text-ink hover:bg-ink/[0.04] transition-colors text-left"
        >
          <span className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-ink-400" />
            <span>Settings & Security</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
        </button>
      </div>

      {/* Footer / Logout */}
      <div className="p-2 border-t border-ink/[0.06] bg-cream/30">
        <button
          onClick={() => {
            if (onLogout) onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-beet hover:bg-beet/[0.08] transition-colors text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out of QuickBasket</span>
        </button>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Plus, RefreshCw, Wallet, Gift, Headphones } from 'lucide-react';

export interface QuickActionsProps {
  onAddAddress?: () => void;
  onReorder?: () => void;
  onAddMoney?: () => void;
  onRewards?: () => void;
  onSupport?: () => void;
}

export function QuickActions({
  onAddAddress,
  onReorder,
  onAddMoney,
  onRewards,
  onSupport,
}: QuickActionsProps) {
  const actions = [
    {
      id: 'add-address',
      label: 'Add address',
      icon: Plus,
      onClick: onAddAddress,
      primary: false,
    },
    {
      id: 'reorder',
      label: 'Reorder',
      icon: RefreshCw,
      onClick: onReorder,
      primary: false,
    },
    {
      id: 'add-money',
      label: 'Add money',
      icon: Wallet,
      onClick: onAddMoney,
      primary: true,
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: Gift,
      onClick: onRewards,
      primary: false,
    },
    {
      id: 'support',
      label: 'Support',
      icon: Headphones,
      onClick: onSupport,
      primary: false,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 select-none shadow-xs ${
                act.primary
                  ? 'bg-basil text-white hover:bg-basil-hover shadow-pill hover:-translate-y-0.5'
                  : 'bg-white/80 hover:bg-white text-ink-700 hover:text-ink border border-ink/[0.06] hover:border-ink/[0.14] hover:-translate-y-0.5 hover:shadow-card'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${act.primary ? 'text-white' : 'text-basil'}`} />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

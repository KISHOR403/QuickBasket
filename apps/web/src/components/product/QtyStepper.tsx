'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QtyStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function QtyStepper({
  quantity,
  onIncrement,
  onDecrement,
  size = 'md',
  className,
}: QtyStepperProps) {
  if (quantity === 0) {
    return (
      <button
        onClick={onIncrement}
        className={cn(
          'w-full bg-basil-light border border-basil text-basil hover:bg-basil hover:text-white font-bold rounded-pill transition-all duration-200 shadow-sm text-xs py-1.5 px-4 uppercase tracking-wider flex items-center justify-center gap-1 active:scale-95',
          size === 'sm' && 'py-1 px-3 text-[11px]',
          className
        )}
      >
        <span>ADD</span>
        <Plus className="w-3.5 h-3.5 stroke-[3]" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-between bg-basil text-white font-bold rounded-pill shadow-pill px-1 py-0.5 min-w-[90px]',
        size === 'sm' && 'min-w-[80px]',
        className
      )}
    >
      <button
        onClick={onDecrement}
        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 stroke-[3]" />
      </button>

      <span className="text-xs font-mono font-extrabold px-1">{quantity}</span>

      <button
        onClick={onIncrement}
        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5 stroke-[3]" />
      </button>
    </div>
  );
}

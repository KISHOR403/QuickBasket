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
  // When used standalone (e.g. on product detail page), still show ADD button
  // for quantity 0.  In ProductCard, the parent now handles the ADD state.
  if (quantity === 0) {
    return (
      <button
        onClick={onIncrement}
        aria-label="Add to cart"
        className={cn(
          'w-full flex items-center justify-center gap-1 border-2 border-basil text-basil hover:bg-basil hover:text-white font-bold rounded-xl transition-all duration-200 text-xs py-2 px-4 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basil/40',
          size === 'sm' && 'py-1.5 px-3 text-[11px]',
          className
        )}
      >
        <span>Add</span>
        <Plus className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-between bg-basil text-white font-bold rounded-xl overflow-hidden min-w-[90px]',
        size === 'sm' && 'min-w-[80px]',
        className
      )}
    >
      <button
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="text-xs font-mono font-bold px-1">{quantity}</span>

      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center hover:bg-basil-hover transition-colors active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

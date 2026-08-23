import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SpeedPillProps {
  minutes?: number;
  variant?: 'header' | 'hero' | 'compact';
  className?: string;
}

export function SpeedPill({ minutes = 12, variant = 'header', className }: SpeedPillProps) {
  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-3 bg-gradient-to-r from-basil to-leaf text-white px-5 py-3 rounded-pill shadow-float animate-pulse',
          className
        )}
      >
        <div className="w-8 h-8 rounded-full bg-mango text-ink flex items-center justify-center font-black">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold text-basil-light">
            Express Delivery
          </div>
          <div className="text-lg font-extrabold tracking-tight font-mono">
            Delivered in {minutes} mins
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 bg-leaf-light text-leaf font-bold text-xs px-2.5 py-1 rounded-pill',
          className
        )}
      >
        <Zap className="w-3.5 h-3.5 fill-current text-mango" />
        <span>{minutes} mins</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-basil-light border border-basil/20 text-basil px-3 py-1.5 rounded-pill shadow-sm transition-transform hover:scale-105 cursor-pointer',
        className
      )}
    >
      <div className="w-5 h-5 rounded-full bg-mango flex items-center justify-center text-ink">
        <Zap className="w-3 h-3 fill-current" />
      </div>
      <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
        <span className="text-ink-600">ETA:</span>
        <span className="text-basil">{minutes} MINS</span>
      </div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'basil' | 'mango' | 'beet' | 'leaf' | 'mist' | 'outline';
}

export function Badge({ className, variant = 'basil', children, ...props }: BadgeProps) {
  const variants = {
    basil: 'bg-basil-light text-basil font-semibold',
    leaf: 'bg-leaf-light text-leaf font-bold',
    mango: 'bg-mango-light text-ink font-bold',
    beet: 'bg-beet-light text-beet font-semibold',
    mist: 'bg-mist text-ink-700 font-medium',
    outline: 'border border-mist text-ink-600 font-medium',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-badge px-2.5 py-0.5 text-xs transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'forest';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md tracking-tight';

  const variants = {
    success: 'bg-[#edf8f1] text-[#145a32] border border-[#cbe8d5]',
    warning: 'bg-[#fff8ea] text-[#925404] border border-[#ffe0a3]',
    danger: 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]',
    info: 'bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd]',
    neutral: 'bg-[#f4f2ec] text-[#424d45] border border-[#e4e0d6]',
    forest: 'bg-[#144d31] text-white',
  };

  const dotColors = {
    success: 'bg-[#1a8b4e]',
    warning: 'bg-[#d97706]',
    danger: 'bg-[#dc2626]',
    info: 'bg-[#0284c7]',
    neutral: 'bg-[#737d75]',
    forest: 'bg-[#a3e635]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 leading-tight',
    md: 'text-xs px-2.5 py-1 gap-1.5 leading-tight',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-ink-600">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3.5 text-ink-400">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-surface border border-mist text-ink text-sm rounded-input py-2.5 px-4 transition-colors focus:outline-none focus:border-basil focus:ring-2 focus:ring-basil/20 placeholder:text-ink-300',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-beet focus:border-beet focus:ring-beet/20',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3.5 text-ink-400">{rightIcon}</div>}
        </div>
        {error && <span className="text-xs font-medium text-beet">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

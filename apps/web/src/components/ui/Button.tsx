import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'mango' | 'beet';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-basil/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-pill';

    const variants = {
      primary: 'bg-basil text-white hover:bg-basil-hover shadow-pill',
      secondary: 'bg-basil-light text-basil hover:bg-basil-light/80 font-semibold',
      mango: 'bg-mango text-ink hover:bg-mango-hover font-bold shadow-sm',
      beet: 'bg-beet text-white hover:bg-beet/90 font-semibold',
      outline: 'border-2 border-mist text-ink hover:bg-mist/50',
      ghost: 'text-ink hover:bg-mist/40',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[32px]',
      md: 'text-sm px-5 py-2.5 min-h-[44px]',
      lg: 'text-base px-6 py-3 min-h-[50px]',
      icon: 'p-2 min-w-[40px] min-h-[40px]',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

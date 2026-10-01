import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
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
      'inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-basil/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-lg text-sm';

    const variants = {
      primary: 'bg-[#144d31] text-white hover:bg-[#0f3d26] shadow-sm font-semibold',
      secondary: 'bg-[#e8f5e9] text-[#144d31] hover:bg-[#d4edd8] font-semibold border border-[#c3e3ca]',
      subtle: 'bg-[#f4f2ec] text-ink hover:bg-[#eae7df] font-medium border border-[#e2ded5]',
      outline: 'border border-[#dcd8ce] bg-white text-ink hover:bg-[#f7f5ef] shadow-sm',
      ghost: 'text-ink-500 hover:text-ink hover:bg-[#f2efe9]',
      danger: 'bg-[#b91c1c] text-white hover:bg-[#991b1b] shadow-sm font-semibold',
    };

    const sizes = {
      xs: 'text-xs px-2.5 py-1 min-h-[28px] gap-1.5',
      sm: 'text-xs px-3 py-1.5 min-h-[32px] gap-1.5',
      md: 'text-sm px-4 py-2 min-h-[38px] gap-2',
      lg: 'text-base px-5 py-2.5 min-h-[44px] gap-2.5',
      icon: 'p-2 min-w-[36px] min-h-[36px]',
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
            <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hover = false, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-[#eae7e0] shadow-[0_1px_3px_rgba(15,26,20,0.03)] p-5',
        hover && 'transition-all duration-150 hover:border-[#cfcac0] hover:shadow-[0_4px_12px_rgba(15,26,20,0.05)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

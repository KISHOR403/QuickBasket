import React from 'react';
import { Store, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { VendorType } from '@quickbasket/types';
import { cn } from '@/lib/utils';

export interface VendorBadgeProps {
  type: VendorType;
  name: string;
  className?: string;
}

export function VendorBadge({ type, name, className }: VendorBadgeProps) {
  const configs = {
    dark_store: {
      icon: ShieldCheck,
      color: 'bg-basil-light text-basil border-basil/20',
      label: 'Express Dark Store',
    },
    local_kirana: {
      icon: Store,
      color: 'bg-mango-light text-ink border-mango/30',
      label: 'Neighborhood Kirana',
    },
    organic_farm: {
      icon: Leaf,
      color: 'bg-leaf-light text-leaf border-leaf/20',
      label: 'Direct Farm Produce',
    },
    specialty: {
      icon: Sparkles,
      color: 'bg-beet-light text-beet border-beet/20',
      label: 'Specialty Shop',
    },
  };

  const config = configs[type] || configs.dark_store;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-bold border',
        config.color,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="truncate max-w-[140px]">{name}</span>
    </div>
  );
}

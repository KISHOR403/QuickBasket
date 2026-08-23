import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  /** Small brand (basil) eyebrow shown above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /**
   * Optional right-aligned navigation link. Rendered in brand basil (a link,
   * not an action button) so it stays clear of the mango action color.
   */
  action?: { label: string; href: string };
  className?: string;
}

/**
 * The house section-header pattern: a basil eyebrow over a large display title,
 * with an optional muted description and an optional "view all" style link.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div className="space-y-1">
        {eyebrow && (
          <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-basil">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-ink-500 leading-relaxed">{description}</p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1 shrink-0 text-sm font-bold text-basil rounded-pill px-1 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-basil/40"
        >
          <span>{action.label}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-smooth group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

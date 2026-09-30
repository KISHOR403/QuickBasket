'use client';

import React, { useMemo } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export interface PersonalGreetingProps {
  name: string;
  tier?: string;
  memberSince?: string;
  onAvatarClick?: () => void;
}

export function PersonalGreeting({
  name,
  tier = 'Premium Member',
  memberSince = 'Aug 2024',
  onAvatarClick,
}: PersonalGreetingProps) {
  const firstName = name.split(' ')[0] || 'there';

  const greetingTime = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
      {/* Left Editorial Greeting */}
      <div className="space-y-1">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
          {greetingTime},{' '}
          <span className="text-basil relative inline-block">
            {firstName}
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-basil/20 rounded-full" />
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 font-medium">
          Here&apos;s what&apos;s happening with your groceries.
        </p>
      </div>

      {/* Right Compact Profile Token */}
      <div
        onClick={onAvatarClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onAvatarClick?.()}
        className="flex items-center gap-3 self-start sm:self-center bg-white/70 hover:bg-white border border-ink/[0.06] hover:border-ink/[0.12] rounded-2xl p-2 pr-3.5 transition-all shadow-xs hover:shadow-card cursor-pointer group select-none"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-basil to-emerald-600 text-white font-display font-bold text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            {initials}
          </div>
          <span
            className="absolute -bottom-1 -right-1 bg-basil text-white p-0.5 rounded-full ring-2 ring-white"
            title="Verified Member"
          >
            <ShieldCheck className="w-2.5 h-2.5" />
          </span>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-ink group-hover:text-basil transition-colors">
              {tier}
            </span>
            <Sparkles className="w-3 h-3 text-mango shrink-0" />
          </div>
          <p className="text-[10px] text-ink-400 font-mono">Since {memberSince}</p>
        </div>
      </div>
    </div>
  );
}

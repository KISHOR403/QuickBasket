'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useHasMounted } from '@/lib/useHasMounted';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const { openCartDrawer } = useUiStore();

  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Cart', href: '#', icon: ShoppingBag, onClick: openCartDrawer, badge: totalItems },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-black/[0.04] py-2 px-4">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex flex-col items-center gap-0.5 text-ink-400 hover:text-basil transition-colors relative py-1 px-3"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge ? (
                    <span className="absolute -top-1.5 -right-2.5 bg-basil text-white font-mono font-bold text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 transition-colors py-1 px-3',
                isActive ? 'text-basil' : 'text-ink-400 hover:text-ink'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  Truck,
  Users,
  Star,
  TicketPercent,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Store,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/components/providers/AuthContext';

interface NavSection {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'CATALOG',
    items: [
      { label: 'Products', href: '/products', icon: Package },
      { label: 'Categories', href: '/categories', icon: Layers },
      { label: 'Inventory', href: '/inventory', icon: Boxes },
    ],
  },
  {
    title: 'ORDERS',
    items: [
      { label: 'Orders', href: '/orders', icon: ShoppingBag },
      { label: 'Delivery', href: '/delivery', icon: Truck },
    ],
  },
  {
    title: 'CUSTOMERS',
    items: [
      { label: 'Customers', href: '/customers', icon: Users },
      { label: 'Reviews', href: '/reviews', icon: Star },
    ],
  },
  {
    title: 'MARKETING',
    items: [
      { label: 'Coupons', href: '/coupons', icon: TicketPercent },
    ],
  },
  {
    title: 'INSIGHTS',
    items: [
      { label: 'Analytics', href: '/analytics', icon: LineChart },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const isLinkActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#0d1812] text-[#d4ded8] select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[#1b2f24] shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 overflow-hidden group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1a6b42] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm border border-[#2a8b57]">
            QB
          </div>
          {!isCollapsed && (
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-base text-white tracking-tight">
                QuickBasket
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#72a385] uppercase mt-0.5">
                OPERATIONS
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-md text-[#8fa89b] hover:text-white hover:bg-[#1a2f24]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Collapse button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-md text-[#8fa89b] hover:text-white hover:bg-[#1a2f24] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6 no-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-mono font-bold tracking-wider text-[#678274] uppercase">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    'flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative',
                    active
                      ? 'bg-[#183024] text-white font-semibold shadow-inner'
                      : 'text-[#a2b5ab] hover:text-white hover:bg-[#13241b]'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 shrink-0 transition-colors',
                      active ? 'text-[#34d399]' : 'text-[#7d9689] group-hover:text-white'
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  )}
                  {active && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#34d399] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Store Location Info & Admin Profile Footer */}
      <div className="p-3 border-t border-[#1b2f24] shrink-0 bg-[#09120e] space-y-2">
        {!isCollapsed && (
          <div className="px-2 py-1.5 rounded-md bg-[#13241b] border border-[#1b3427] flex items-center gap-2">
            <Store className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
            <div className="text-[11px] leading-tight truncate">
              <span className="block text-[#a2b5ab] truncate font-medium">Dark Store #04</span>
              <span className="text-[10px] text-[#5e776a]">Hub Zone SLA: 12 min</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user?.name || 'Admin'}
              className="w-7 h-7 rounded-full object-cover border border-[#2a4435] shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate leading-tight">
                  {user?.name || 'kishorgogoi'}
                </div>
                <div className="text-[10px] text-[#7d9689] truncate capitalize">
                  {user?.role?.replace('_', ' ') || 'Super Admin'}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => logout()}
            className="p-1.5 text-[#8fa89b] hover:text-white hover:bg-[#1a2f24] rounded-md transition-colors shrink-0"
            title="Sign out of Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col h-screen fixed top-0 left-0 z-30 border-r border-[#1a2d22] transition-all duration-200',
          isCollapsed ? 'w-16' : 'w-60'
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-[#0f1a14]/60 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-200 shadow-2xl',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {navContent}
      </aside>
    </>
  );
}

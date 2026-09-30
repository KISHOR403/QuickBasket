'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

export function CompactFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-ink/[0.06] bg-transparent mt-12 pt-8 pb-12 text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Brand & Statement */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/" className="inline-flex items-center gap-1.5 group">
              <span className="font-mono text-xs tracking-[0.2em] font-bold text-ink uppercase group-hover:text-basil transition-colors">
                QUICKBASKET
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
            </Link>
            <p className="text-xs text-ink-500 font-medium">
              Better groceries. Better everyday.
            </p>
          </div>

          {/* Social Icons on the right */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-xl bg-ink/[0.03] hover:bg-basil/10 text-ink-400 hover:text-basil flex items-center justify-center transition-colors active:scale-95"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-xl bg-ink/[0.03] hover:bg-basil/10 text-ink-400 hover:text-basil flex items-center justify-center transition-colors active:scale-95"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-xl bg-ink/[0.03] hover:bg-basil/10 text-ink-400 hover:text-basil flex items-center justify-center transition-colors active:scale-95"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-xl bg-ink/[0.03] hover:bg-basil/10 text-ink-400 hover:text-basil flex items-center justify-center transition-colors active:scale-95"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Compact Single Row Links & Copyright */}
        <div className="pt-4 border-t border-ink/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-500 font-medium">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/about" className="hover:text-ink transition-colors">
              Company
            </Link>
            <span className="text-ink/20">•</span>
            <Link href="/support" className="hover:text-ink transition-colors">
              Support
            </Link>
            <span className="text-ink/20">•</span>
            <Link href="/category/dairy-bread-eggs" className="hover:text-ink transition-colors">
              Shop
            </Link>
            <span className="text-ink/20">•</span>
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <span className="text-ink/20">•</span>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>

          <p className="text-[11px] text-ink-400">
            © {currentYear} QuickBasket Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

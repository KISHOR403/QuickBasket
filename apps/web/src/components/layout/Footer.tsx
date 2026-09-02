import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone,
  Mail,
  Phone,
} from 'lucide-react';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Partner with Us', href: '/admin' },
  { label: 'Store Locations', href: '#' },
  { label: 'Careers', href: '#' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-mist pt-10 sm:pt-12 pb-28 sm:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid — responsive across all breakpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-10">
          {/* Brand Info — full width on mobile, single col on tablet+ */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-3">
            <h3 className="font-display font-black text-xl text-ink tracking-tight">
              Quick<span className="text-basil">Basket</span>
            </h3>
            <p className="text-sm text-ink-500 leading-relaxed max-w-xs">
              The fastest way to get your favorite groceries delivered fresh to
              your door. Order now and get delivery in 10 minutes.
            </p>

            {/* Contact info */}
            <div className="space-y-1.5 pt-1">
              <a
                href="mailto:support@quickbasket.in"
                className="flex items-center gap-2 text-xs text-ink-400 hover:text-basil transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>support@quickbasket.in</span>
              </a>
              <a
                href="tel:+911800123456"
                className="flex items-center gap-2 text-xs text-ink-400 hover:text-basil transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>1800-123-456 (Toll Free)</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-basil mb-3">Company</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-basil mb-3">Support</h4>
            <ul className="space-y-2.5 text-sm text-ink-500">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download & Social — 4th column */}
          <div>
            <h4 className="text-sm font-bold text-basil mb-3">Get the App</h4>

            {/* App store badges */}
            <div className="space-y-2 mb-5">
              <a
                href="#"
                className="flex items-center gap-2.5 bg-ink hover:bg-ink-800 text-white px-3.5 py-2 rounded-input w-fit transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-[8px] font-medium text-white/60 leading-none">
                    Download on the
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    App Store
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 bg-ink hover:bg-ink-800 text-white px-3.5 py-2 rounded-input w-fit transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.09l2.312 1.338a1 1 0 010 1.732l-2.123 1.229-2.532-2.532 2.343-1.767zM5.864 2.658L16.802 8.99l-2.303 2.303L5.864 2.658z" />
                </svg>
                <div className="text-left">
                  <div className="text-[8px] font-medium text-white/60 leading-none">
                    GET IT ON
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    Google Play
                  </div>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <h4 className="text-sm font-bold text-basil mb-2.5">Follow Us</h4>
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-mist hover:bg-basil-light text-ink-400 hover:text-basil flex items-center justify-center transition-all active:scale-90"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="border-mist" />

        {/* Bottom bar — copyright + payment icons */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>© {new Date().getFullYear()} QuickBasket. All rights reserved.</p>

          {/* Payment methods hint */}
          <div className="flex items-center gap-2 text-[10px] font-medium text-ink-300">
            <Smartphone className="w-3.5 h-3.5" />
            <span>UPI</span>
            <span className="text-mist">|</span>
            <span>Cards</span>
            <span className="text-mist">|</span>
            <span>Net Banking</span>
            <span className="text-mist">|</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

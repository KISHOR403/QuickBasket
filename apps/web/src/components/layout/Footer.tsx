import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

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

const CATEGORY_LINKS = [
  { label: 'Fresh Vegetables', href: '/category/fresh-vegetables' },
  { label: 'Fresh Fruits', href: '/category/fresh-fruits' },
  { label: 'Dairy & Eggs', href: '/category/dairy-bread-eggs' },
  { label: 'Snacks', href: '/category/snacks-munchies' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-mist bg-paper mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big statement */}
        <div className="py-16 md:py-24 border-b border-mist">
          <div className="max-w-2xl">
            <Link href="/" className="inline-block mb-8">
              <span className="font-display font-bold text-2xl text-ink">
                Quick<span className="text-basil">Basket</span>
              </span>
            </Link>
            <h2 className="font-display text-display-lg text-ink mb-4">
              Better groceries.
              <br />
              <span className="text-ink-400">Better everyday.</span>
            </h2>
            <p className="text-sm text-ink-400 leading-relaxed max-w-md">
              The fastest way to get your favorite groceries delivered fresh to your door. 
              Fresh in 10 minutes.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Connect</h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:support@quickbasket.in"
                className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>support@quickbasket.in</span>
              </a>
              <a
                href="tel:+911800123456"
                className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>1800-123-456</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-cream hover:bg-basil-light text-ink-400 hover:text-basil flex items-center justify-center transition-all active:scale-90"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-mist flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>© {new Date().getFullYear()} QuickBasket. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[10px] font-medium text-ink-300">
            <span>UPI</span>
            <span className="text-mist">•</span>
            <span>Cards</span>
            <span className="text-mist">•</span>
            <span>Net Banking</span>
            <span className="text-mist">•</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

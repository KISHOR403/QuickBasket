import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-mist pt-12 pb-24 sm:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          {/* Brand Info */}
          <div className="space-y-2">
            <h3 className="font-display font-black text-xl text-ink tracking-tight">
              Quick<span className="text-basil">Basket</span>
            </h3>
            <p className="text-sm text-ink-500 leading-relaxed">
              The fastest way to get your favorite groceries delivered fresh to your door.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-basil mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ink transition-colors">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ink transition-colors">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-basil mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>
                <Link href="#" className="hover:text-ink transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ink transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-ink transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-mist" />

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-ink-400">
          <p>© {new Date().getFullYear()} QuickBasket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

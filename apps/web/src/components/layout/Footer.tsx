import React from 'react';
import Link from 'next/link';
import { Zap, Store, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-paper pt-12 pb-24 sm:pb-12 border-t border-ink-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-ink-700">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-card bg-basil text-white flex items-center justify-center font-extrabold text-lg">
                QB
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Quick<span className="text-leaf">Basket</span>
              </span>
            </div>
            <p className="text-xs text-ink-300 leading-relaxed">
              India&apos;s premier multi-vendor quick-commerce network. Delivering dark store essentials and local kirana favorites to your doorstep in 10-15 minutes.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-basil-dark text-basil-light px-2.5 py-1 rounded-pill">
                ⚡ 10 Min Guarantee
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-mango/20 text-mango px-2.5 py-1 rounded-pill">
                🏪 Local Vendors Enabled
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-leaf mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-ink-200">
              <li><Link href="/category/dairy-bread-eggs" className="hover:text-white transition-colors">Dairy, Bread & Eggs</Link></li>
              <li><Link href="/category/fresh-vegetables" className="hover:text-white transition-colors">Fresh Vegetables & Organic</Link></li>
              <li><Link href="/category/snacks-munchies" className="hover:text-white transition-colors">Snacks & Indian Munchies</Link></li>
              <li><Link href="/category/atta-rice-dal" className="hover:text-white transition-colors">Atta, Rice & Staples</Link></li>
              <li><Link href="/category/paan-sweets" className="hover:text-white transition-colors">Local Paan & Sweets</Link></li>
            </ul>
          </div>

          {/* Partner & Vendors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mango mb-3">
              Partner With Us
            </h4>
            <ul className="space-y-2 text-xs text-ink-200">
              <li><Link href="/admin" className="hover:text-white transition-colors">Local Kirana Partner Onboarding</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Dark Store Partner Program</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Rider Fleet Partner</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Vendor Inventory Manager</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-paper mb-3">
              Customer & Trust
            </h4>
            <ul className="space-y-2 text-xs text-ink-200">
              <li><Link href="/account" className="hover:text-white transition-colors">My Profile & Addresses</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order Tracking & History</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service & Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Instant Refund Guarantee</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-400 gap-4">
          <p>© 2026 QuickBasket Logistics Pvt Ltd. Crafted for Indian Quick Commerce.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-beet fill-current" />
            <span>for Web + Mobile</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

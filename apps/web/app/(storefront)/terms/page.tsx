import React from 'react';
import Link from 'next/link';
import { Scale, Clock, RefreshCw, AlertCircle, CheckCircle2, ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | QuickBasket',
  description: 'Review the terms, conditions, 10-minute delivery SLA, and refund policies for QuickBasket.',
};

export default function TermsPage() {
  const lastUpdated = 'September 30, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 space-y-12 pb-20">
      {/* Back link & Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-basil transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-basil-light text-basil text-xs font-extrabold px-3 py-1 rounded-pill">
            <Scale className="w-3.5 h-3.5" />
            <span>Customer Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-ink">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 font-medium">
            Effective Date: {lastUpdated} • Version 2.1
          </p>
        </div>

        <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
          These Terms of Service ("Terms") govern your access to and use of the website, mobile applications, and on-demand delivery services provided by <strong className="text-ink">QuickBasket Technologies Pvt. Ltd.</strong> ("QuickBasket"). By placing an order, creating an account, or browsing our catalog, you agree to be bound by these Terms.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-mango-light text-mango flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">10-15 Min Express SLA</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            We endeavor to deliver groceries in 10-15 minutes subject to traffic, extreme weather, and serviceable dark store range.
          </p>
        </div>

        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-basil-light text-basil flex items-center justify-center">
            <RefreshCw className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">Hassle-Free Refunds</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Damaged, expired, or missing grocery items are refunded or credited immediately with zero friction.
          </p>
        </div>

        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-leaf-light text-leaf flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">Transparent Pricing</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Free delivery on orders over ₹299. No hidden convenience markups on MRP items.
          </p>
        </div>
      </div>

      {/* Main Legal Clauses */}
      <div className="space-y-10 text-ink leading-relaxed divide-y divide-mist">
        {/* Clause 1 */}
        <section className="space-y-3 pt-6 first:pt-0">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">1</span>
            Eligibility & Account Registration
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>
              To use QuickBasket, you must be at least 18 years of age and capable of entering into legally binding contracts under the Indian Contract Act, 1872.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You register using a valid 10-digit Indian mobile number authenticated via a One-Time Password (OTP).</li>
              <li>You are responsible for maintaining the confidentiality of your device and login credentials.</li>
              <li>You agree to provide accurate, complete delivery address information and contact details.</li>
            </ul>
          </div>
        </section>

        {/* Clause 2 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">2</span>
            Fulfillment SLA & Delivery Disclaimer
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>
              Our 10-15 minute delivery speed is made possible by hyper-local dark stores within a 2-3km radius. While we maintain a 98%+ SLA fulfillment rate, delivery times are estimates and may occasionally be impacted by:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Severe rain, monsoon waterlogging, or extreme weather conditions.</li>
              <li>Unforeseen traffic congestion, road diversions, or VIP security movement.</li>
              <li>High-demand surge periods during festivals and major holidays.</li>
            </ul>
            <p>
              In such scenarios, our riders prioritize road safety. QuickBasket does not guarantee sub-15 minute delivery in events beyond reasonable operational control.
            </p>
          </div>
        </section>

        {/* Clause 3 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">3</span>
            Pricing, Delivery Fees & Platform Charges
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-ink">Product Pricing:</strong> All prices are displayed in Indian Rupees (₹) and are inclusive of applicable GST taxes.
              </li>
              <li>
                <strong className="text-ink">Delivery Fees:</strong> Orders with an item total exceeding <strong>₹299</strong> qualify for <strong>FREE Delivery</strong>. Orders below this threshold incur a flat ₹15 delivery charge.
              </li>
              <li>
                <strong className="text-ink">Handling Fee:</strong> A nominal platform handling fee of ₹4 is applied per order to maintain micro-fulfillment centers and cold-storage operations.
              </li>
              <li>
                <strong className="text-ink">Rider Tips:</strong> 100% of optional tips selected during checkout are transferred directly to your delivery partner.
              </li>
            </ul>
          </div>
        </section>

        {/* Clause 4 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">4</span>
            Cancellation & Instant Refund Policy
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>
              Due to our ultra-fast 10-minute dispatch cycle:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Orders can be cancelled free of charge only before the dark store begins packing (typically within 60 seconds of placement).</li>
              <li>Once packed or out for delivery, cancellations are not permitted unless delivery SLA exceeds 45 minutes without prior notice.</li>
              <li>If an item is missing, damaged, or expired upon arrival, report it via <Link href="/support" className="text-basil font-bold underline">Help & Support</Link> within 2 hours of delivery for an instant replacement or refund to original payment source (UPI/Card: 2-4 business days; Wallet/Credits: Instant).</li>
            </ul>
          </div>
        </section>

        {/* Clause 5 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">5</span>
            Governing Law & Dispute Resolution
          </h2>
          <p className="text-sm text-ink-500">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts located in New Delhi, India.
          </p>
        </section>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, MapPin, Eye, FileText, Smartphone, ArrowLeft, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | QuickBasket',
  description: 'Learn how QuickBasket protects your personal information, delivery addresses, and payment data.',
};

export default function PrivacyPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Trust & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-400 font-medium">
            Effective Date: {lastUpdated} • Version 2.4
          </p>
        </div>

        <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
          At <strong className="text-ink">QuickBasket Technologies Pvt. Ltd.</strong> ("QuickBasket", "we", "our", or "us"), we value your trust. This Privacy Policy details how we collect, handle, store, and safeguard your personal information when you use our web platform, mobile applications, and 10-minute on-demand grocery delivery services.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-basil-light text-basil flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">Zero Data Selling</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            We never sell or rent your personal contact information or purchase histories to third-party ad brokers.
          </p>
        </div>

        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-leaf-light text-leaf flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">Hyperlocal Precision</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Location access is utilized strictly to verify dark store serviceability and dispatch riders to your doorstep.
          </p>
        </div>

        <div className="bg-surface p-5 rounded-card border border-mist shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-mango-light text-mango flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-ink">Transparent Controls</h3>
          <p className="text-xs text-ink-500 leading-relaxed">
            Easily review, modify, or delete your saved delivery addresses and account profile at any time.
          </p>
        </div>
      </div>

      {/* Main Legal Sections */}
      <div className="space-y-10 text-ink leading-relaxed divide-y divide-mist">
        {/* Section 1 */}
        <section className="space-y-3 pt-6 first:pt-0">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">1</span>
            Information We Collect
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>To provide lightning-fast 10-minute grocery delivery, we collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-ink">Account & Identification Data:</strong> Mobile phone number (verified via OTP), optional full name, and email address.
              </li>
              <li>
                <strong className="text-ink">Delivery Coordinates & Address Book:</strong> Flat/house numbers, building names, street locality, landmark details, 6-digit postal pincodes, and device GPS latitude/longitude.
              </li>
              <li>
                <strong className="text-ink">Transaction & Payment Tokens:</strong> Payment mode selection (UPI, Credit/Debit cards, Netbanking, COD), order totals, and transaction reference IDs. <em>We never store your raw CVV or banking passwords.</em>
              </li>
              <li>
                <strong className="text-ink">Device & Telemetry Data:</strong> IP addresses, operating system version, browser user-agent, application crash logs, and network performance indicators.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">2</span>
            How We Use Your Data
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>Your information is used strictly to power our quick-commerce operations:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To route orders to the closest active dark store or partner kirana within 2km of your address.</li>
              <li>To provide your delivery rider with direct navigation directions and order verification contact.</li>
              <li>To send real-time order status updates via SMS, push notifications, and WhatsApp.</li>
              <li>To detect fraudulent order placements, abuse of promo codes, and verify payment settlements.</li>
              <li>To optimize inventory forecasting and ensure essential grocery items remain in stock.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">3</span>
            Information Sharing & Disclosures
          </h2>
          <div className="space-y-3 text-sm text-ink-500">
            <p>We do not share your personal information with third parties except under the following strict conditions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-ink">Delivery Partners & Riders:</strong> We share your delivery address, landmark, and masked contact number with our assigned delivery rider solely for fulfilling your active order.
              </li>
              <li>
                <strong className="text-ink">Payment Processors:</strong> Transactions are routed through RBI-compliant payment gateways using end-to-end tokenization and 256-bit SSL encryption.
              </li>
              <li>
                <strong className="text-ink">Legal & Regulatory Mandates:</strong> We may disclose data when required by applicable laws, court orders, or governmental directives.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">4</span>
            Data Security & Retention
          </h2>
          <p className="text-sm text-ink-500">
            All user data in transit is encrypted using modern TLS 1.3 standards. Our server infrastructure adheres to industry best practices, including regular vulnerability scans, least-privilege access controls, and strict authentication mechanisms. We retain your transaction histories for accounting compliance and active address management until you request account closure.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-8">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-surface-muted text-basil text-xs font-mono font-bold flex items-center justify-center">5</span>
            Your Rights & Controls
          </h2>
          <div className="space-y-2 text-sm text-ink-500">
            <p>As a QuickBasket customer, you have full control over your information:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Review and delete saved delivery addresses from your <Link href="/account" className="text-basil font-bold underline">Account</Link> screen.</li>
              <li>Revoke device location permissions via your browser or smartphone settings at any time.</li>
              <li>Request an export of your personal data or request permanent account deletion by emailing our support team.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 - Grievance Officer */}
        <section className="space-y-4 pt-8">
          <div className="bg-surface-muted p-6 rounded-card border border-mist space-y-3">
            <h3 className="text-base font-bold text-ink">Grievance Officer & Inquiries</h3>
            <p className="text-xs sm:text-sm text-ink-500">
              In accordance with the Information Technology Act 2000 and Digital Personal Data Protection Act, the designated Grievance Officer for QuickBasket is:
            </p>
            <div className="text-xs sm:text-sm text-ink-600 space-y-1 font-mono">
              <p><strong>Name:</strong> Rajesh Sharma</p>
              <p><strong>Designation:</strong> Data Protection & Grievance Officer</p>
              <p><strong>Address:</strong> QuickBasket Technologies Pvt. Ltd., Connaught Place, New Delhi - 110001</p>
              <p><strong>Email:</strong> privacy@quickbasket.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

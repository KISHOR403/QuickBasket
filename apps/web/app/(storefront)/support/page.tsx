'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  PhoneCall,
  MessageSquare,
  Mail,
  Clock,
  Package,
  RefreshCw,
  MapPin,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'How does QuickBasket achieve delivery in under 15 minutes?',
    a: 'We operate a dense network of hyper-local micro-fulfillment centers (dark stores) within 2-3km of residential clusters. Orders are packed by dedicated pickers within 2 minutes of placement and handed off to our electric vehicle delivery partners for immediate dispatch.',
  },
  {
    q: 'What should I do if an item is damaged, expired, or missing?',
    a: 'We take freshness and order accuracy very seriously. If any item is subpar or missing, tap on your active order in the Orders tab or contact us via WhatsApp/call within 2 hours. We will initiate an instant replacement or immediate refund to your original payment source.',
  },
  {
    q: 'What is the delivery fee structure?',
    a: 'Delivery is 100% FREE for all orders with an item total of ₹299 or higher. For orders below ₹299, a flat delivery fee of ₹15 applies. A platform handling charge of ₹4 is added to support cold chain warehousing.',
  },
  {
    q: 'Can I schedule my delivery for later in the day?',
    a: 'Yes! During checkout, you can choose between "Instant (12-15 mins)" delivery or select scheduled delivery windows (e.g. 4 PM - 6 PM or 7 PM - 9 PM) to receive groceries at your convenience.',
  },
  {
    q: 'What payment modes are accepted?',
    a: 'We support all major payment modes including UPI (Google Pay, PhonePe, Paytm, CRED), Credit & Debit Cards (Visa, Mastercard, RuPay), Netbanking across 50+ banks, and Cash on Delivery (COD).',
  },
  {
    q: 'How can I change my delivery address?',
    a: 'You can update your default address or add new home/work locations anytime in the Account section before placing an order. If an order has already been placed, contact our helpline immediately so we can re-route our delivery rider if within the same dark store radius.',
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', orderId: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.message) return;
    setTicketSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 space-y-12 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-basil transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-basil-light text-basil text-xs font-extrabold px-3 py-1 rounded-pill">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>24/7 Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-ink">
            How can we help you?
          </h1>
          <p className="text-sm sm:text-base text-ink-500 leading-relaxed font-sans">
            Need assistance with an active delivery, item refund, or have feedback? Our support team is here to assist you.
          </p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/orders"
          className="bg-surface p-4 rounded-card border border-mist shadow-card hover:shadow-float hover:border-basil/30 transition-all text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-basil-light text-basil flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-ink">Track Order</h3>
          <p className="text-[11px] text-ink-400">Live rider GPS</p>
        </Link>

        <Link
          href="/orders"
          className="bg-surface p-4 rounded-card border border-mist shadow-card hover:shadow-float hover:border-basil/30 transition-all text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-leaf-light text-leaf flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-ink">Refunds</h3>
          <p className="text-[11px] text-ink-400">Instant credit</p>
        </Link>

        <Link
          href="/account"
          className="bg-surface p-4 rounded-card border border-mist shadow-card hover:shadow-float hover:border-basil/30 transition-all text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-mango-light text-mango flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-ink">Addresses</h3>
          <p className="text-[11px] text-ink-400">Manage locations</p>
        </Link>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface p-4 rounded-card border border-mist shadow-card hover:shadow-float hover:border-basil/30 transition-all text-center space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-beet-light text-beet flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-ink">WhatsApp</h3>
          <p className="text-[11px] text-ink-400">Chat with agent</p>
        </a>
      </div>

      {/* Direct Contact Channels */}
      <div className="bg-surface rounded-card p-6 sm:p-8 border border-mist shadow-card space-y-6">
        <h2 className="text-lg sm:text-xl font-bold font-display text-ink">
          Direct Contact Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <div className="inline-flex p-2 rounded-lg bg-surface-muted text-basil mb-1">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">Toll-Free Helpline</h4>
            <p className="text-sm font-mono font-bold text-ink">1800-200-QUICK</p>
            <p className="text-xs text-ink-500">6:00 AM – 12:00 Midnight (Daily)</p>
          </div>

          <div className="space-y-1">
            <div className="inline-flex p-2 rounded-lg bg-surface-muted text-leaf mb-1">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">WhatsApp Chat</h4>
            <p className="text-sm font-mono font-bold text-ink">+91 98765 43210</p>
            <p className="text-xs text-ink-500">Instant AI & human agent reply</p>
          </div>

          <div className="space-y-1">
            <div className="inline-flex p-2 rounded-lg bg-surface-muted text-mango mb-1">
              <Mail className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-400">Email Support</h4>
            <p className="text-sm font-mono font-bold text-ink">support@quickbasket.com</p>
            <p className="text-xs text-ink-500">Average response time: &lt; 1 hour</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black font-display text-ink">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-ink-500">
            Quick answers to common questions about orders, payments, and 10-minute deliveries.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-surface rounded-card border border-mist overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 hover:bg-cream/40 transition-colors"
                >
                  <span className="text-sm font-bold text-ink">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-ink-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-basil' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-ink-500 leading-relaxed border-t border-mist/50">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket / Feedback Form */}
      <div className="bg-surface-muted rounded-2xl p-6 sm:p-8 border border-mist space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-display text-ink">Send Us a Message</h3>
          <p className="text-xs text-ink-500">
            Have a question or feedback? Fill out the form below and we will get back to you shortly.
          </p>
        </div>

        {ticketSent ? (
          <div className="bg-basil-light border border-basil/20 p-6 rounded-card text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-basil mx-auto" />
            <h4 className="text-base font-bold text-basil">Message Received!</h4>
            <p className="text-xs text-ink-600">
              Ticket #QB-{Math.floor(10000 + Math.random() * 90000)} created. Our customer care team will contact you at {formData.phone} shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aarti Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-mist rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:border-basil"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9811233445"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface border border-mist rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:border-basil"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-ink">Order ID (Optional)</label>
              <input
                type="text"
                placeholder="e.g. QB-48291"
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                className="w-full bg-surface border border-mist rounded-xl px-3 py-2 text-xs text-ink focus:outline-none focus:border-basil font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-ink">Describe Your Issue or Feedback *</label>
              <textarea
                required
                rows={3}
                placeholder="Please provide details about what happened..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface border border-mist rounded-xl p-3 text-xs text-ink focus:outline-none focus:border-basil"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="gap-2 font-bold shadow-pill">
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

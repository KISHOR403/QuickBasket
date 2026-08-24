import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Sprout, ShieldCheck, Truck, HeartHandshake, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About Us | QuickBasket',
  description: 'Learn about QuickBasket, your 10-minute grocery delivery service delivering farm-fresh essentials straight to your door.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-ink-800 to-header text-white p-8 sm:p-12 md:p-16 shadow-float">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 bg-basil/30 text-leaf-light text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-pill backdrop-blur-md border border-leaf/20">
            <Zap className="w-3.5 h-3.5 text-mango" />
            Our Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
            Fresh Groceries Delivered in <span className="text-mango">10 Minutes</span>.
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-sans">
            At QuickBasket, we believe everyone deserves access to farm-fresh produce and daily household essentials without waiting hours. We source directly from local farms and deliver to your doorstep in minutes.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/">
              <Button variant="primary" size="lg" className="font-extrabold gap-2 shadow-pill">
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-mango/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Avg Delivery Time', value: '10 Mins', icon: Zap, color: 'text-mango' },
          { label: 'Local Farm Partners', value: '500+', icon: Sprout, color: 'text-basil' },
          { label: 'Happy Customers', value: '50,000+', icon: HeartHandshake, color: 'text-beet' },
          { label: 'Freshness Guaranteed', value: '100%', icon: ShieldCheck, color: 'text-leaf' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-surface border border-mist p-6 rounded-card shadow-card space-y-2 text-center sm:text-left">
              <div className="inline-flex p-3 rounded-xl bg-surface-muted mb-2">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl sm:text-3xl font-black font-display text-ink">{stat.value}</p>
              <p className="text-xs sm:text-sm text-ink-500 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* Our Story / How It Works */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-basil text-xs font-bold uppercase tracking-widest">How We Do It</span>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-ink tracking-tight">
            The QuickBasket Difference
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed">
            By reinventing the traditional grocery supply chain, we deliver unmatched speed and peak freshness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Direct Farm Sourcing',
              description: 'We partner directly with regional organic growers. Produce is harvested daily and brought to our micro-hubs within hours.',
              icon: Sprout,
              image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
            },
            {
              step: '02',
              title: 'Neighborhood Dark Stores',
              description: 'Our hyper-local micro-fulfillment centers are strategically placed within 2km of your home for instantaneous processing.',
              icon: ShieldCheck,
              image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80',
            },
            {
              step: '03',
              title: 'Lightning EV Delivery',
              description: 'Our dedicated electric delivery fleet ensures your groceries arrive fresh, fast, and eco-friendly every single time.',
              icon: Truck,
              image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
            },
          ].map((card, i) => (
            <div key={i} className="bg-surface rounded-card border border-mist overflow-hidden shadow-card hover:shadow-float transition-all duration-300 group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-ink text-paper text-xs font-black px-3 py-1 rounded-pill">
                  STEP {card.step}
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold font-display text-ink">{card.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-surface-muted rounded-2xl p-8 sm:p-12 border border-mist space-y-8">
        <div className="max-w-xl space-y-2">
          <span className="text-basil text-xs font-bold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-ink tracking-tight">
            Our Core Promises To You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Farm-Fresh Quality',
              desc: 'If you are not 100% satisfied with the quality of any fruit or vegetable, we replace it instantly with zero hassle.',
            },
            {
              title: 'Zero Plastic Packaging',
              desc: 'We use biodegradable bags and sustainable paper totes to protect our planet for future generations.',
            },
            {
              title: 'Fair Trade Sourcing',
              desc: 'We guarantee fair wages and direct pricing to local farmers, cutting out exploitative middlemen.',
            },
            {
              title: 'No Minimum Order',
              desc: 'Order a single lemon or a full month of groceries — you get the exact same 10-minute speed.',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-surface p-5 rounded-card border border-mist shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-basil shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-ink text-base font-display">{item.title}</h4>
                <p className="text-xs sm:text-sm text-ink-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-10 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black font-display text-ink">
          Experience Ultra-Fast Grocery Shopping
        </h2>
        <p className="text-sm sm:text-base text-ink-500 max-w-xl mx-auto">
          Join thousands of happy households getting organic fruits, veggies, and daily essentials delivered in 10 minutes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg" className="font-extrabold px-8">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

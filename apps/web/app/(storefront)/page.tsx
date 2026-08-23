'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { SpeedPill } from '@/components/common/SpeedPill';
import { CategoryNav } from '@/components/common/CategoryNav';
import { VendorBadge } from '@/components/common/VendorBadge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery, useVendorsQuery } from '@quickbasket/api-client';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();
  const { data: vendors, isLoading: isVendorsLoading } = useVendorsQuery();

  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="pb-4">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-card bg-gradient-to-br from-basil to-leaf text-white p-6 sm:p-8 shadow-float mt-4">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-mango/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <SpeedPill minutes={10} variant="hero" />

            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              Groceries & Local Kirana Favorites in{' '}
              <span className="text-mango underline decoration-mango decoration-4">10 Minutes</span>.
            </h1>

            <p className="text-xs sm:text-sm text-basil-light leading-relaxed">
              Order fresh milk, organic produce, snacks & paan shop delights directly from nearby dark stores & neighborhood vendors.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/category/dairy-bread-eggs">
                <Button variant="mango" size="md" className="font-extrabold gap-2">
                  <span>Shop Daily Essentials</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-pill border border-white/20">
                <ShieldCheck className="w-4 h-4 text-mango" />
                <span>Zero Minimum Order</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative w-72 aspect-square rounded-card overflow-hidden border-2 border-white/20 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
              alt="Fresh groceries packed for express delivery"
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12">
        <SectionHeader eyebrow="Browse" title="Shop by Category" />
        <div className="mt-6">
          <CategoryNav />
        </div>
      </section>

      {/* Multi-Vendor Showcase */}
      <section className="py-12">
        <SectionHeader
          eyebrow="Multi-Vendor Network"
          title="Local Stores & Specialty Shops"
          description="Supporting neighborhood businesses in your pincode."
        />

        <div className="mt-6 bg-surface-muted p-5 rounded-card border border-mist">
          {isVendorsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-36 skeleton rounded-card animate-fadeIn"
                  style={{ animationDelay: `${n * 60}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vendors?.map((vendor, i) => (
                <div
                  key={vendor.id}
                  className="bg-surface rounded-card p-4 border border-mist shadow-card hover:shadow-float hover:-translate-y-0.5 hover:border-basil/30 transition-all duration-300 ease-smooth flex flex-col justify-between animate-fadeInUp"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <VendorBadge type={vendor.type} name={vendor.name} />
                      <span className="text-[10px] font-extrabold bg-basil-light text-basil px-2 py-0.5 rounded-pill">
                        ★ {vendor.rating}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-ink line-clamp-1">{vendor.name}</h3>
                    <p className="text-[11px] text-ink-400 mt-0.5">{vendor.address}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-mist/50 mt-3 text-xs font-bold font-mono text-ink-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-basil" /> {vendor.deliveryTimeMin} mins
                    </span>
                    <span className="text-basil">₹{vendor.deliveryFee} fee</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Bestsellers */}
      <section className="py-12">
        <SectionHeader
          eyebrow="Trending Now"
          title="Trending Bestsellers"
          description="Delivered to your doorstep in 10-12 minutes."
          action={{ label: 'View All', href: '/category/dairy-bread-eggs' }}
        />
        <div className="mt-6">
          <ProductGrid products={products} isLoading={isProductsLoading} />
        </div>
      </section>

      {/* Farm Fresh & Organic */}
      <section className="py-12">
        <SectionHeader
          eyebrow="Direct from Farms"
          title="Organic Vegetables & Farm Fruits"
          action={{ label: 'Explore Farm Fresh', href: '/category/fresh-vegetables' }}
        />
        <div className="mt-6">
          <ProductGrid products={organicProducts} isLoading={isProductsLoading} />
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Store, Sparkles, ArrowRight, ShieldCheck, Clock, Flame } from 'lucide-react';
import { SpeedPill } from '@/components/common/SpeedPill';
import { CategoryNav } from '@/components/common/CategoryNav';
import { VendorBadge } from '@/components/common/VendorBadge';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProductsQuery, useVendorsQuery } from '@quickbasket/api-client';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const { data: products, isLoading: isProductsLoading } = useProductsQuery();
  const { data: vendors, isLoading: isVendorsLoading } = useVendorsQuery();

  const expressProducts = products?.filter((p) => p.isExpress) || [];
  const organicProducts = products?.filter((p) => p.isOrganic) || [];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-card bg-gradient-to-br from-basil to-leaf text-white p-6 sm:p-8 shadow-float">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-mango/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-4">
            <SpeedPill minutes={10} variant="hero" />

            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
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
              alt="Grocery delivery express"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick Categories Nav Bar */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-extrabold text-ink flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-mango" /> Shop by Category
          </h2>
        </div>
        <CategoryNav />
      </section>

      {/* Multi-Vendor Showcase Section */}
      <section className="space-y-4 bg-surface-muted p-5 rounded-card border border-mist">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-basil">
              MULTI-VENDOR NETWORK
            </span>
            <h2 className="text-lg font-extrabold text-ink flex items-center gap-2">
              <Store className="w-5 h-5 text-basil" /> Local Stores & Specialty Shops
            </h2>
          </div>
          <span className="text-xs text-ink-500 font-medium">
            Supporting neighborhood businesses in your pincode
          </span>
        </div>

        {isVendorsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-36 bg-mist rounded-card animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendors?.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-surface rounded-card p-4 border border-mist shadow-card hover:shadow-md transition-all flex flex-col justify-between"
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
      </section>

      {/* Trending Bestsellers */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-extrabold text-ink flex items-center gap-2">
              <Flame className="w-5 h-5 text-beet" /> Trending Bestsellers
            </h2>
            <p className="text-xs text-ink-500">Delivered to your doorstep in 10-12 minutes</p>
          </div>
          <Link href="/category/dairy-bread-eggs" className="text-xs font-bold text-basil hover:underline">
            View All →
          </Link>
        </div>

        <ProductGrid products={products} isLoading={isProductsLoading} />
      </section>

      {/* Farm Fresh & Organic Shelf */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-leaf">
              DIRECT FROM FARMS
            </span>
            <h2 className="text-lg font-extrabold text-ink">Organic Vegetables & Farm Fruits</h2>
          </div>
          <Link href="/category/fresh-vegetables" className="text-xs font-bold text-leaf hover:underline">
            Explore Farm Fresh →
          </Link>
        </div>

        <ProductGrid products={organicProducts} isLoading={isProductsLoading} />
      </section>
    </div>
  );
}

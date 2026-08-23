'use client';

import React from 'react';
import Link from 'next/link';
import { Store, Package, TrendingUp, Users, ArrowLeft } from 'lucide-react';
import { useVendorsQuery, useProductsQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export default function AdminDashboardPage() {
  const { data: vendors } = useVendorsQuery();
  const { data: products } = useProductsQuery();

  return (
    <div className="min-h-screen bg-surface-muted p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Storefront
            </Link>
            <h1 className="text-2xl font-black text-ink">Vendor & Inventory Admin Portal</h1>
            <p className="text-xs text-ink-500">Manage dark stores, local kirana partners, and stock</p>
          </div>
          <div className="bg-basil text-white px-4 py-2 rounded-pill text-xs font-bold">
            Live Vendor Network: Active
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-surface rounded-card p-5 border border-mist shadow-card">
            <span className="text-[10px] font-bold uppercase text-ink-400">Total Vendors</span>
            <div className="text-2xl font-black text-ink font-mono mt-1">{vendors?.length || 0}</div>
            <span className="text-xs font-semibold text-leaf mt-1 inline-block">100% Serviceable</span>
          </div>

          <div className="bg-surface rounded-card p-5 border border-mist shadow-card">
            <span className="text-[10px] font-bold uppercase text-ink-400">Active SKUs</span>
            <div className="text-2xl font-black text-ink font-mono mt-1">{products?.length || 0}</div>
            <span className="text-xs font-semibold text-basil mt-1 inline-block">Across 8 Categories</span>
          </div>

          <div className="bg-surface rounded-card p-5 border border-mist shadow-card">
            <span className="text-[10px] font-bold uppercase text-ink-400">Daily Express Orders</span>
            <div className="text-2xl font-black text-basil font-mono mt-1">1,248</div>
            <span className="text-xs font-semibold text-leaf mt-1 inline-block">↑ 18% vs Yesterday</span>
          </div>

          <div className="bg-surface rounded-card p-5 border border-mist shadow-card">
            <span className="text-[10px] font-bold uppercase text-ink-400">Avg Delivery Speed</span>
            <div className="text-2xl font-black text-mango font-mono mt-1">11.4 min</div>
            <span className="text-xs font-semibold text-ink-500 mt-1 inline-block">SLA: 15 min</span>
          </div>
        </div>

        {/* Vendor List */}
        <div className="bg-surface rounded-card p-6 border border-mist shadow-card space-y-4">
          <h3 className="text-base font-extrabold text-ink">Registered Partner Stores</h3>
          <div className="divide-y divide-mist">
            {vendors?.map((v) => (
              <div key={v.id} className="py-3 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-ink">{v.name}</h4>
                  <span className="text-[11px] text-ink-500">{v.type.toUpperCase()} • {v.address}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-basil font-mono">★ {v.rating}</span>
                  <span className="text-[11px] text-ink-400 block">{v.deliveryTimeMin} min delivery</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  RefreshCw,
  Clock,
  AlertTriangle,
  Plus,
  ShoppingBag,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '@/components/providers/AuthContext';
import { AdminService } from '@/services/adminService';
import { OperationalMetrics } from '@/components/dashboard/OperationalMetrics';
import { SalesAnalyticsChart } from '@/components/dashboard/SalesAnalyticsChart';
import { LiveOrderActivity } from '@/components/dashboard/LiveOrderActivity';
import { TopProductsList, TopProductItem } from '@/components/dashboard/TopProductsList';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Order } from '@quickbasket/types';
import { INITIAL_ANALYTICS_DATA } from '@/services/mockAdminData';

export default function DashboardPage() {
  const { user } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductItem[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);

  // Section-isolated error states for graceful degradation
  const [errors, setErrors] = useState<{
    orders?: string;
    products?: string;
    inventory?: string;
  }>({});

  const loadOrders = useCallback(async () => {
    try {
      setErrors((prev) => ({ ...prev, orders: undefined }));
      const ords = await AdminService.getOrders();
      setOrders(ords);
    } catch {
      setErrors((prev) => ({ ...prev, orders: 'Unable to load orders.' }));
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setErrors((prev) => ({ ...prev, products: undefined }));
      const prods = await AdminService.getTopProducts();
      setTopProducts(prods);
    } catch {
      setErrors((prev) => ({ ...prev, products: 'Unable to load top products.' }));
    }
  }, []);

  const loadInventory = useCallback(async () => {
    try {
      setErrors((prev) => ({ ...prev, inventory: undefined }));
      const inv = await AdminService.getInventoryItems({ statusFilter: 'low_stock' });
      setLowStockItems(
        inv.slice(0, 4).map((i) => ({
          id: i.variantId,
          name: `${i.productName} (${i.variantName})`,
          stockCount: i.stockCount,
          threshold: i.lowStockThreshold,
          category: i.categoryName,
        }))
      );
    } catch {
      setErrors((prev) => ({ ...prev, inventory: 'Unable to load inventory alerts.' }));
    }
  }, []);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([loadOrders(), loadProducts(), loadInventory()]);
    setIsLoading(false);
  }, [loadOrders, loadProducts, loadInventory]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleQuickRestock = async (item: any) => {
    try {
      await AdminService.adjustStock({
        productId: 'prod-4',
        variantId: item.id,
        type: 'add',
        quantity: 50,
        reason: 'supplier_delivery',
        notes: 'Quick restock from dashboard alert',
      });
    } catch (e) {
      console.error('Failed to restock item:', e);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome, Operational Hub Status & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#eae7e0]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight font-display">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Kishor'}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#edf8f1] text-[#145a32] border border-[#cbe8d5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              HUB ACTIVE
            </span>
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Live fulfillment operations for {user?.storeName || 'Dark Store #04'} • Connaught Place Sector 18
          </p>
        </div>

        {/* Operational Quick Actions (Section 11) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Primary Action */}
          <Link href="/products/new">
            <Button variant="primary" size="sm" className="shadow-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Button>
          </Link>

          {/* Secondary Actions */}
          <Link href="/orders">
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Orders</span>
            </Button>
          </Link>

          <Link href="/inventory">
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Inventory Alerts</span>
            </Button>
          </Link>

          {/* SLA Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-ink-500 px-2.5 py-1 bg-[#f4f2ec] rounded-lg border border-[#e2ded5]">
            <Clock className="w-3.5 h-3.5 text-[#144d31]" />
            <span className="font-semibold text-ink">~10 min</span>
            <span className="text-[11px] text-ink-400">avg fulfillment</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={loadDashboardData}
            title="Refresh Live Operations"
            aria-label="Refresh Dashboard Data"
            className="text-ink-500 hover:text-ink hover:bg-[#f4f2ec]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Loading Skeletons matching exact final shapes (Section 12) */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          {/* Metrics Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 bg-white rounded-xl border border-[#eae7e0] p-6 h-40 flex flex-col justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-40 flex flex-col justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-40 flex flex-col justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-40 flex flex-col justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Chart Skeleton */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 h-72 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-44 w-full" />
          </div>

          {/* 3-Column Activity Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-64 flex flex-col justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-64 flex flex-col justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 h-64 flex flex-col justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Level 1: Primary Operational Metrics (Section 5) */}
          <OperationalMetrics
            todaySales={84240}
            salesGrowth={12.4}
            ordersCount={248}
            avgOrderValue={340}
            activeCustomers={42}
          />

          {/* Level 2: Sales & Fulfillment Analytics Chart (Section 4) */}
          <SalesAnalyticsChart data={INITIAL_ANALYTICS_DATA} />

          {/* Level 3: 3-Column Operational Activity Grid (Items start naturally without empty stretch) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Live Order Activity with Section Error Fallback */}
            {errors.orders ? (
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-ink">{errors.orders}</div>
                <Button variant="outline" size="xs" onClick={loadOrders}>
                  Try again
                </Button>
              </div>
            ) : (
              <LiveOrderActivity orders={orders} />
            )}

            {/* Best-Selling Items with Section Error Fallback */}
            {errors.products ? (
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-ink">{errors.products}</div>
                <Button variant="outline" size="xs" onClick={loadProducts}>
                  Try again
                </Button>
              </div>
            ) : (
              <TopProductsList products={topProducts} />
            )}

            {/* Low Stock Alerts with Section Error Fallback */}
            {errors.inventory ? (
              <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-ink">{errors.inventory}</div>
                <Button variant="outline" size="xs" onClick={loadInventory}>
                  Try again
                </Button>
              </div>
            ) : (
              <LowStockAlert
                items={
                  lowStockItems.length > 0
                    ? lowStockItems
                    : [
                        { id: 'v-1', name: 'Alphonso Mango (1kg)', stockCount: 8, threshold: 15, category: 'Fruits' },
                        { id: 'v-2', name: 'Organic Brown Eggs (Pack 6)', stockCount: 12, threshold: 20, category: 'Dairy' },
                        { id: 'v-3', name: 'Amul Taaza Fresh Milk (500ml)', stockCount: 6, threshold: 30, category: 'Dairy' },
                      ]
                }
                onQuickRestock={handleQuickRestock}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}


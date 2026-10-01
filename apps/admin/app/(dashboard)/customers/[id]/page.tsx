'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { CustomerSummary } from '@/services/types';
import { Order } from '@quickbasket/types';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [customerData, setCustomerData] = useState<{
    customer: CustomerSummary;
    orders: Order[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const res = await AdminService.getCustomerById(id);
        if (res) setCustomerData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!customerData) {
    return (
      <div className="text-center py-16 space-y-3">
        <h2 className="text-lg font-bold text-ink">Customer Account Not Found</h2>
        <p className="text-xs text-ink-500">The requested profile could not be located.</p>
        <Link href="/customers">
          <Button variant="primary" size="sm">Back to Customer Directory</Button>
        </Link>
      </div>
    );
  }

  const { customer, orders } = customerData;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <Link
            href="/customers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Customers
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-ink tracking-tight font-display">
              {customer.name}
            </h1>
            <Badge variant={customer.status === 'vip' ? 'success' : 'info'} size="md" dot>
              {customer.status === 'vip' ? 'VIP Loyalty' : 'Active Account'}
            </Badge>
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Member since {new Date(customer.registeredAt).toLocaleDateString()} • City: {customer.city}
          </p>
        </div>
      </div>

      {/* Profile & Lifetime Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#eae7e0]"
              />
              <div>
                <h3 className="font-bold text-base text-ink">{customer.name}</h3>
                <span className="text-xs text-ink-400 font-mono">ID: {customer.id}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f0eee8] space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-ink-600">
                <Phone className="w-4 h-4 text-ink-400 shrink-0" />
                <span className="font-mono">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-600">
                <Mail className="w-4 h-4 text-ink-400 shrink-0" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-600">
                <MapPin className="w-4 h-4 text-ink-400 shrink-0" />
                <span>Primary Zone: {customer.city}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-sm space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">
              Account Value
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#faf9f6] rounded-lg border border-[#eae7e0]">
                <span className="text-ink-400 block text-[10px]">TOTAL ORDERS</span>
                <span className="text-xl font-bold font-mono text-ink mt-0.5 block">
                  {customer.totalOrders}
                </span>
              </div>
              <div className="p-3 bg-[#faf9f6] rounded-lg border border-[#eae7e0]">
                <span className="text-ink-400 block text-[10px]">LIFETIME SPEND</span>
                <span className="text-xl font-bold font-mono text-[#144d31] mt-0.5 block">
                  {formatCurrency(customer.totalSpent)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
              <h3 className="text-sm font-bold text-ink">
                Order History ({orders.length} order{orders.length > 1 ? 's' : ''})
              </h3>
              <span className="text-xs text-ink-400 font-mono">
                Last active {formatRelativeTime(customer.lastOrderDate)}
              </span>
            </div>

            <div className="divide-y divide-[#f0eee8]">
              {orders.map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs font-bold font-mono text-ink hover:text-[#144d31]"
                      >
                        #{order.orderNumber}
                      </Link>
                      <Badge variant="neutral" size="sm">
                        {order.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-ink-400 mt-1">
                      {order.items?.length || 1} items • {formatDate(order.createdAt)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-ink">
                      {formatCurrency(order.grandTotal)}
                    </div>
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-[11px] text-[#144d31] font-semibold hover:underline mt-0.5 block"
                    >
                      View Order &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

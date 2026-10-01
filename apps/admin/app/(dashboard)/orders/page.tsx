'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Eye, Clock, CheckCircle2, Truck, AlertCircle, RefreshCw } from 'lucide-react';
import { Order, OrderStatus } from '@quickbasket/types';
import { formatCurrency, formatRelativeTime, formatDate } from '@/lib/utils';
import { AdminService } from '@/services/adminService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

const STATUS_TABS: { label: string; value: string }[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Placed', value: 'placed' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Packing', value: 'packing' },
  { label: 'Out for Delivery', value: 'out_for_delivery' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getOrders({
        search,
        status: statusFilter,
        paymentStatus: paymentFilter,
      });
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [search, statusFilter, paymentFilter]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return <Badge variant="neutral" dot>Placed</Badge>;
      case 'confirmed':
        return <Badge variant="info" dot>Confirmed</Badge>;
      case 'packing':
        return <Badge variant="warning" dot>Packing</Badge>;
      case 'out_for_delivery':
        return <Badge variant="info" dot>Out for Delivery</Badge>;
      case 'delivered':
        return <Badge variant="success" dot>Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="danger" dot>Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Fulfillment Orders Dispatch
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Live order queue, packaging status, and rider handoff controls
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadOrders}>
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Live Queue
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="border-b border-[#eae7e0] flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              statusFilter === tab.value
                ? 'bg-[#144d31] text-white font-bold shadow-xs'
                : 'text-ink-500 hover:text-ink hover:bg-[#f4f2ec]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Secondary Filter Toolbar */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Order #, customer, delivery address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none"
          >
            <option value="all">All Payment Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6" />}
          title="No orders found"
          description="There are currently no active orders matching this filter."
        />
      ) : (
        <div className="bg-white rounded-xl border border-[#eae7e0] shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#eae7e0] bg-[#faf9f6] text-ink-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Basket Items</th>
                  <th className="py-3 px-3">Total (₹)</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Dispatch Status</th>
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#faf9f6] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-ink">
                      <Link href={`/orders/${order.id}`} className="hover:text-[#144d31]">
                        #{order.orderNumber}
                      </Link>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-ink">{order.deliveryAddress?.area || 'Sector 18'}</div>
                      <div className="text-[11px] text-ink-400 truncate max-w-[180px]">
                        {order.deliveryAddress?.city} • {order.deliveryAddress?.pincode}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-bold text-ink">{order.items?.length || 1} items</span>
                      <span className="text-[11px] text-ink-400 block truncate max-w-[160px]">
                        {order.items?.[0]?.productName}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-ink text-xs">
                      {formatCurrency(order.grandTotal)}
                    </td>

                    <td className="py-3 px-3">
                      <span className="uppercase font-mono text-[11px] font-bold text-ink-600 block">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${
                          order.paymentStatus === 'paid' ? 'text-[#145a32]' : 'text-amber-700'
                        }`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3 px-3">{getStatusBadge(order.status)}</td>

                    <td className="py-3 px-3 text-[11px] text-ink-400 font-mono">
                      {formatRelativeTime(order.createdAt)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="xs">
                          <Eye className="w-3 h-3" /> View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based Transformation */}
          <div className="md:hidden divide-y divide-[#f0eee8]">
            {orders.map((order) => (
              <div key={order.id} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-ink">
                    #{order.orderNumber}
                  </span>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                <div className="flex items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-ink">{order.deliveryAddress?.area}</span>
                    <span className="text-[11px] text-ink-400 block">
                      {order.items?.length} items ({order.items?.[0]?.productName})
                    </span>
                  </div>
                  <div className="text-right font-mono font-bold text-ink">
                    {formatCurrency(order.grandTotal)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#f0eee8] text-xs">
                  <span className="text-[11px] text-ink-400">
                    {formatRelativeTime(order.createdAt)}
                  </span>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

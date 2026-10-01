'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  CreditCard,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { Order, OrderStatus } from '@quickbasket/types';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { AdminService } from '@/services/adminService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

const TIMELINE_STAGES: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'placed', label: 'Order Placed', desc: 'Customer completed instant checkout' },
  { status: 'confirmed', label: 'Confirmed', desc: 'Inventory reserved in Dark Store' },
  { status: 'packing', label: 'Packing & QA', desc: 'Picker bin assigned and checked' },
  { status: 'out_for_delivery', label: 'Out for Delivery', desc: 'Handed off to express delivery rider' },
  { status: 'delivered', label: 'Delivered', desc: 'Fulfillment successfully verified' },
];

export default function OrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const found = await AdminService.getOrderById(id);
        if (found) setOrder(found);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (!order) return;
    setIsUpdatingStatus(true);
    try {
      const updated = await AdminService.updateOrderStatus(order.id, newStatus);
      setOrder(updated);
      setStatusMessage(`Order updated to "${newStatus.replace(/_/g, ' ')}"`);
      setTimeout(() => setStatusMessage(''), 3000);
      setCancelModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!order) {
    return (
      <div className="text-center py-16 space-y-3">
        <h2 className="text-lg font-bold text-ink">Order Not Found</h2>
        <p className="text-xs text-ink-500">The requested order number could not be retrieved.</p>
        <Link href="/orders">
          <Button variant="primary" size="sm">Back to Orders Queue</Button>
        </Link>
      </div>
    );
  }

  const currentStageIndex = TIMELINE_STAGES.findIndex((s) => s.status === order.status);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-ink tracking-tight font-display">
              Order #{order.orderNumber}
            </h1>
            <Badge variant="forest" size="md">
              {order.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            Placed on {formatDate(order.createdAt)} • Express Fulfillment SLA ~15 mins
          </p>
        </div>

        <div className="flex items-center gap-2">
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <>
              {order.status === 'placed' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('confirmed')}
                  isLoading={isUpdatingStatus}
                >
                  Confirm Order
                </Button>
              )}
              {order.status === 'confirmed' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('packing')}
                  isLoading={isUpdatingStatus}
                >
                  Start Packing
                </Button>
              )}
              {order.status === 'packing' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('out_for_delivery')}
                  isLoading={isUpdatingStatus}
                >
                  Dispatch to Rider
                </Button>
              )}
              {order.status === 'out_for_delivery' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus('delivered')}
                  isLoading={isUpdatingStatus}
                >
                  Mark as Delivered
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:border-red-200"
                onClick={() => setCancelModal(true)}
              >
                Cancel Order
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            title="Print packing slip"
          >
            <Printer className="w-4 h-4" /> Print Slip
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#edf8f1] text-[#145a32] text-xs font-bold rounded-lg border border-[#cbe8d5] flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> {statusMessage}
        </div>
      )}

      {/* Interactive Order Timeline */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-ink-400 mb-6">
          Dispatch Timeline &amp; SLA Milestones
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          {TIMELINE_STAGES.map((st, i) => {
            const isCompleted = currentStageIndex >= i && order.status !== 'cancelled';
            const isCurrent = currentStageIndex === i && order.status !== 'cancelled';

            return (
              <div key={st.status} className="flex flex-col space-y-2 relative">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isCompleted
                        ? 'bg-[#144d31] text-white'
                        : isCurrent
                        ? 'bg-[#22c55e] text-white ring-4 ring-[#22c55e]/20'
                        : 'bg-[#f4f2ec] text-ink-400 border border-[#e2ded5]'
                    }`}
                  >
                    {isCompleted ? '✓' : i + 1}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-[#144d31]' : isCompleted ? 'text-ink' : 'text-ink-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
                <p className="text-[11px] text-ink-400 leading-snug pl-8 sm:pl-0">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {order.status === 'cancelled' && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
            This order was cancelled and refunded.
          </div>
        )}
      </div>

      {/* Main 2-Column Details View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Basket Items & Financials */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basket Items Table */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
              <h3 className="text-sm font-bold text-ink">
                Itemized Basket ({order.items.length} unique SKU{order.items.length > 1 ? 's' : ''})
              </h3>
              <span className="text-xs font-mono text-ink-400">
                Hub: {order.vendorName}
              </span>
            </div>

            <div className="divide-y divide-[#f0eee8]">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={it.image}
                      alt={it.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#eae7e0] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-ink truncate">{it.productName}</div>
                      <div className="text-[11px] text-ink-400">
                        {it.variantName} • {formatCurrency(it.unitPrice)} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 text-right">
                    <span className="text-xs font-mono font-semibold text-ink">
                      Qty: {it.quantity}
                    </span>
                    <span className="text-xs font-mono font-bold text-ink w-16">
                      {formatCurrency(it.unitPrice * it.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="pt-4 border-t border-[#f0eee8] space-y-2 text-xs">
              <div className="flex justify-between text-ink-500">
                <span>Items Subtotal</span>
                <span className="font-mono text-ink">{formatCurrency(order.itemTotal)}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>10-Min Express Delivery Fee</span>
                <span className="font-mono text-ink">
                  {order.deliveryFee === 0 ? 'FREE' : formatCurrency(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Order Handling Fee</span>
                <span className="font-mono text-ink">{formatCurrency(order.handlingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#145a32] font-semibold">
                  <span>Promo Coupon Discount</span>
                  <span className="font-mono">-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#eae7e0] flex justify-between font-black text-sm text-ink">
                <span>Grand Total Paid</span>
                <span className="font-mono text-[#144d31] text-base">
                  {formatCurrency(order.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customer & Delivery Details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer & Address Card */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-sm space-y-4">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">
              Delivery Address &amp; Contact
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#144d31] shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <div className="font-bold text-ink">
                    {order.deliveryAddress?.flatNo}, {order.deliveryAddress?.building}
                  </div>
                  <div className="text-ink-500">{order.deliveryAddress?.area}</div>
                  <div className="text-ink-500">
                    {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-[#f0eee8]">
                <User className="w-4 h-4 text-ink-400 shrink-0" />
                <div>
                  <span className="font-semibold text-ink">Customer Account #{order.userId}</span>
                  <span className="text-[11px] text-ink-400 block">+91 98201 44521</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-sm space-y-3 text-xs">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">
              Payment Information
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Payment Gateway</span>
              <span className="font-bold font-mono uppercase text-ink">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Payment Status</span>
              <Badge
                variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}
                size="sm"
              >
                {order.paymentStatus.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Transaction ID</span>
              <span className="font-mono text-ink-400 text-[10px]">
                TXN-{order.orderNumber}-QB
              </span>
            </div>
          </div>

          {/* Assigned Rider Card */}
          {order.rider && (
            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-sm space-y-3 text-xs">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">
                Assigned Express Rider
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={order.rider.photo}
                  alt={order.rider.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#2a4435] shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-ink">{order.rider.name}</div>
                  <div className="text-[11px] text-ink-400 font-mono">
                    {order.rider.vehicleNumber}
                  </div>
                  <div className="text-[11px] text-[#145a32] font-semibold">
                    {order.rider.phone}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      <ConfirmDialog
        isOpen={cancelModal}
        onClose={() => setCancelModal(false)}
        onConfirm={() => handleUpdateStatus('cancelled')}
        title="Cancel Order & Release Inventory?"
        message={`Are you sure you want to cancel order #${order.orderNumber}? Reserved shelf inventory will be instantly restored to live catalog.`}
        confirmLabel="Cancel Order"
        variant="danger"
        isLoading={isUpdatingStatus}
      />
    </div>
  );
}

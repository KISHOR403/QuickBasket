'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  ArrowRight,
  RefreshCw,
  Package,
} from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { DispatchDeliveryItem } from '@/services/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DeliveryOperationsPage() {
  const [items, setItems] = useState<DispatchDeliveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState<'all' | 'preparing' | 'packed' | 'out_for_delivery' | 'delivered'>('all');

  const loadDispatch = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getDispatchItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDispatch();
  }, []);

  const handleStageAdvance = async (orderId: string, currentStage: DispatchDeliveryItem['stage']) => {
    let nextStage: DispatchDeliveryItem['stage'] = 'delivered';
    if (currentStage === 'preparing') nextStage = 'packed';
    else if (currentStage === 'packed') nextStage = 'out_for_delivery';
    else if (currentStage === 'out_for_delivery') nextStage = 'delivered';

    try {
      const updated = await AdminService.updateDispatchStage(orderId, nextStage);
      setItems(items.map((it) => (it.orderId === orderId ? updated : it)));
    } catch (err) {
      console.error(err);
    }
  };

  const preparingCount = items.filter((i) => i.stage === 'preparing' || i.stage === 'packed').length;
  const outCount = items.filter((i) => i.stage === 'out_for_delivery').length;
  const deliveredCount = items.filter((i) => i.stage === 'delivered').length;

  const filteredItems =
    stageFilter === 'all' ? items : items.filter((i) => i.stage === stageFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Express Fulfillment &amp; Rider Dispatch
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Dark store hub dispatch telemetry, rider handoff, and 15-minute SLA tracking
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadDispatch}>
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Dispatch Telemetry
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-ink-400">
            Active Hub Queue
          </span>
          <div className="text-2xl font-black font-display text-ink mt-1 font-mono">
            {preparingCount + outCount}
          </div>
          <span className="text-[11px] text-ink-500">Live fulfillment load</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-700">
            In Packaging
          </span>
          <div className="text-2xl font-black font-display text-[#b45309] mt-1 font-mono">
            {preparingCount}
          </div>
          <span className="text-[11px] text-amber-700">Picker bins assigned</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0369a1]">
            Riders in Transit
          </span>
          <div className="text-2xl font-black font-display text-[#0369a1] mt-1 font-mono">
            {outCount}
          </div>
          <span className="text-[11px] text-[#0369a1]">Last-mile dispatched</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-[#145a32]">
            SLA Adherence
          </span>
          <div className="text-2xl font-black font-display text-[#145a32] mt-1 font-mono">
            98.4%
          </div>
          <span className="text-[11px] text-[#145a32] font-semibold">Target &le; 15 min</span>
        </div>
      </div>

      {/* Stage Filter Buttons */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-3 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(['all', 'preparing', 'packed', 'out_for_delivery', 'delivered'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStageFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
              stageFilter === st
                ? 'bg-[#144d31] text-white font-bold shadow-xs'
                : 'text-ink-500 hover:text-ink hover:bg-[#f4f2ec]'
            }`}
          >
            {st.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Dispatch List */}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.orderId}
              className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 border ${
                    item.stage === 'delivered'
                      ? 'bg-[#edf8f1] text-[#145a32] border-[#cbe8d5]'
                      : item.stage === 'out_for_delivery'
                      ? 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'
                      : 'bg-[#fff8ea] text-[#925404] border-[#ffe0a3]'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs text-ink">
                      #{item.orderNumber}
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      {item.customerName}
                    </span>
                    <Badge
                      variant={
                        item.stage === 'delivered'
                          ? 'success'
                          : item.stage === 'out_for_delivery'
                          ? 'info'
                          : 'warning'
                      }
                      size="sm"
                      dot
                    >
                      {item.stage.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                    {item.isDelayed && (
                      <Badge variant="danger" size="sm">
                        SLA Delay Warning
                      </Badge>
                    )}
                  </div>

                  <div className="text-[11px] text-ink-400">
                    Destination: <strong className="text-ink-600">{item.addressArea}</strong> •{' '}
                    {item.itemsCount} basket items • {formatCurrency(item.grandTotal)}
                  </div>

                  {item.riderName && (
                    <div className="text-[11px] text-ink-500 font-medium flex items-center gap-1.5 pt-0.5">
                      <User className="w-3 h-3 text-ink-400" /> Rider: {item.riderName} (
                      {item.vehicleNumber}) • {item.riderPhone}
                    </div>
                  )}
                </div>
              </div>

              {/* SLA speed counter and action */}
              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-ink flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-ink-400" />
                    <span>{item.timeElapsedMinutes} min</span>
                  </div>
                  <span className="text-[10px] text-ink-400">SLA: {item.targetSlaMinutes} min</span>
                </div>

                {item.stage !== 'delivered' && (
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => handleStageAdvance(item.orderId, item.stage)}
                  >
                    {item.stage === 'preparing'
                      ? 'Mark Packed'
                      : item.stage === 'packed'
                      ? 'Dispatch Rider'
                      : 'Confirm Delivery'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

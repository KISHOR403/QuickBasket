'use client';

import React, { useEffect, useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Truck,
  Plus,
  Minus,
  Search,
  History,
} from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { InventoryItem, StockAdjustment } from '@/services/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Adjust Modal
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustType, setAdjustType] = useState<'add' | 'subtract'>('add');
  const [adjustQty, setAdjustQty] = useState('10');
  const [adjustReason, setAdjustReason] = useState<StockAdjustment['reason']>('supplier_delivery');
  const [adjustNotes, setAdjustNotes] = useState('');
  const [isAdjusting, setIsAdjusting] = useState(false);

  // Destructive confirmation dialog for stock removal
  const [confirmDialog, setConfirmDialog] = useState(false);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const [inv, adjs] = await Promise.all([
        AdminService.getInventoryItems({ search, statusFilter }),
        AdminService.getStockAdjustments(),
      ]);
      setItems(inv);
      setAdjustments(adjs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [search, statusFilter]);

  const openAdjust = (item: InventoryItem, type: 'add' | 'subtract') => {
    setSelectedItem(item);
    setAdjustType(type);
    setAdjustQty('10');
    setAdjustReason(type === 'add' ? 'supplier_delivery' : 'damaged_stock');
    setAdjustNotes('');
  };

  const executeAdjustment = async () => {
    if (!selectedItem) return;
    const qty = Number(adjustQty);
    if (isNaN(qty) || qty <= 0) return;

    setIsAdjusting(true);
    try {
      const adj = await AdminService.adjustStock({
        productId: selectedItem.productId,
        variantId: selectedItem.variantId,
        type: adjustType,
        quantity: qty,
        reason: adjustReason,
        notes: adjustNotes,
      });

      // Update local state
      setItems((prev) =>
        prev.map((it) =>
          it.variantId === selectedItem.variantId
            ? {
                ...it,
                stockCount: adj.newStock,
                status: adj.newStock === 0 ? 'out_of_stock' : adj.newStock <= 10 ? 'low_stock' : 'in_stock',
              }
            : it
        )
      );
      setAdjustments([adj, ...adjustments]);
      setSelectedItem(null);
      setConfirmDialog(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdjusting(false);
    }
  };

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adjustType === 'subtract') {
      // Destructive confirmation required
      setConfirmDialog(true);
    } else {
      executeAdjustment();
    }
  };

  // Metrics
  const totalStockCount = items.reduce((acc, it) => acc + it.stockCount, 0);
  const lowStockCount = items.filter((it) => it.status === 'low_stock').length;
  const outOfStockCount = items.filter((it) => it.status === 'out_of_stock').length;
  const reservedCount = items.reduce((acc, it) => acc + it.reservedCount, 0);
  const incomingCount = items.reduce((acc, it) => acc + it.incomingCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Dark Store Shelf Inventory
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Real-time stock audit, threshold alarms, and inbound shipment reconciliation
          </p>
        </div>
      </div>

      {/* 5-Metric Quick Telemetry Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Total Live Units</span>
          <div className="text-2xl font-black font-display text-ink mt-1 font-mono">{totalStockCount}</div>
          <span className="text-[11px] text-[#145a32] font-semibold">{items.length} Tracked SKUs</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-amber-700">Low Stock</span>
          <div className="text-2xl font-black font-display text-[#b45309] mt-1 font-mono">{lowStockCount}</div>
          <span className="text-[11px] text-amber-700 font-medium">Needs re-order</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-red-700">Out of Stock</span>
          <div className="text-2xl font-black font-display text-[#b91c1c] mt-1 font-mono">{outOfStockCount}</div>
          <span className="text-[11px] text-red-600 font-medium">Customer order blocker</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs">
          <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Reserved in Carts</span>
          <div className="text-2xl font-black font-display text-ink mt-1 font-mono">{reservedCount}</div>
          <span className="text-[11px] text-ink-500 font-medium">Checkout hold</span>
        </div>

        <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono font-bold uppercase text-ink-400">Incoming Inbound</span>
          <div className="text-2xl font-black font-display text-[#144d31] mt-1 font-mono">{incomingCount}</div>
          <span className="text-[11px] text-[#144d31] font-semibold">ETA ~4 hours</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search SKU code, item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === st
                  ? 'bg-[#144d31] text-white font-bold shadow-xs'
                  : 'bg-[#faf9f6] text-ink-500 border border-[#eae7e0] hover:text-ink'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Boxes className="w-6 h-6" />}
          title="No inventory records found"
          description="Try broadening your search keyword or stock status filter."
        />
      ) : (
        <div className="bg-white rounded-xl border border-[#eae7e0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#eae7e0] bg-[#faf9f6] text-ink-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">SKU Code</th>
                  <th className="py-3 px-3">Item &amp; Packaging</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">On Shelf</th>
                  <th className="py-3 px-3">Reserved</th>
                  <th className="py-3 px-3">Incoming</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {items.map((it) => (
                  <tr key={it.variantId} className="hover:bg-[#faf9f6] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-ink text-[11px]">
                      {it.sku}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.productName}
                          className="w-9 h-9 rounded-lg object-cover border border-[#eae7e0] shrink-0"
                        />
                        <div>
                          <div className="font-bold text-ink text-xs">{it.productName}</div>
                          <div className="text-[11px] text-ink-400">{it.variantName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 capitalize text-ink-500">{it.categoryName}</td>

                    <td className="py-3 px-3 font-mono font-bold text-ink text-xs">
                      {it.stockCount} <span className="text-[10px] text-ink-400 font-normal">{it.unit}</span>
                    </td>

                    <td className="py-3 px-3 font-mono text-ink-500">{it.reservedCount}</td>

                    <td className="py-3 px-3 font-mono text-[#144d31] font-semibold">
                      {it.incomingCount > 0 ? `+${it.incomingCount}` : '-'}
                    </td>

                    <td className="py-3 px-3">
                      {it.status === 'out_of_stock' ? (
                        <Badge variant="danger" dot size="sm">Out of Stock</Badge>
                      ) : it.status === 'low_stock' ? (
                        <Badge variant="warning" dot size="sm">Low Stock</Badge>
                      ) : (
                        <Badge variant="success" dot size="sm">Optimal</Badge>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => openAdjust(it, 'add')}
                          title="Restock Units"
                        >
                          <Plus className="w-3 h-3 text-[#145a32]" /> Restock
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => openAdjust(it, 'subtract')}
                          title="Reduce Units"
                        >
                          <Minus className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={adjustType === 'add' ? 'Restock Stock Units' : 'Record Stock Reduction'}
          description={`${selectedItem.productName} (${selectedItem.variantName})`}
        >
          <form onSubmit={handleAdjustSubmit} className="space-y-4">
            <div className="p-3 bg-[#faf9f6] rounded-xl border border-[#eae7e0] flex items-center justify-between text-xs">
              <span className="text-ink-500">Current Shelf Stock:</span>
              <span className="font-mono font-bold text-ink text-sm">
                {selectedItem.stockCount} {selectedItem.unit}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-ink-500 mb-1.5">
                  ACTION TYPE
                </label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#dcd8ce] rounded-lg font-medium text-ink"
                >
                  <option value="add">+ Inbound Restock</option>
                  <option value="subtract">- Damaged / Shrinkage</option>
                </select>
              </div>

              <div>
                <Input
                  label="QUANTITY UNITS *"
                  type="number"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-ink-500 mb-1.5">
                REASON / AUDIT CATEGORY
              </label>
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#dcd8ce] rounded-lg font-medium text-ink"
              >
                <option value="supplier_delivery">Supplier / Inbound PO Delivery</option>
                <option value="inventory_audit">Periodic Warehouse Audit</option>
                <option value="damaged_stock">Damaged in Transit / Handling</option>
                <option value="customer_return">Customer Return / Restock</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-ink-500 mb-1.5">
                AUDIT NOTES (OPTIONAL)
              </label>
              <textarea
                rows={2}
                value={adjustNotes}
                onChange={(e) => setAdjustNotes(e.target.value)}
                placeholder="Batch number, invoice reference, or pallet number..."
                className="w-full text-xs p-2.5 bg-white border border-[#dcd8ce] rounded-lg text-ink"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eae7e0]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={adjustType === 'add' ? 'primary' : 'danger'}
                size="sm"
                isLoading={isAdjusting}
              >
                {adjustType === 'add' ? 'Apply Restock' : 'Proceed with Deduction'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Destructive stock reduction confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog}
        onClose={() => setConfirmDialog(false)}
        onConfirm={executeAdjustment}
        title="Confirm Stock Deduction"
        message={`Are you sure you want to deduct ${adjustQty} units from ${selectedItem?.productName}? This will immediately lower available inventory for customer checkouts.`}
        confirmLabel="Confirm Deduction"
        variant="danger"
        isLoading={isAdjusting}
      />
    </div>
  );
}

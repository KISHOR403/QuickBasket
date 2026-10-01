'use client';

import React, { useEffect, useState } from 'react';
import { TicketPercent, Plus, Trash2, Calendar, Tag, CheckCircle } from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { Coupon } from '@/services/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [discountValue, setDiscountValue] = useState('50');
  const [minOrderValue, setMinOrderValue] = useState('299');
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('100');
  const [usageLimit, setUsageLimit] = useState('1000');
  const [endDate, setEndDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; code: string }>({
    isOpen: false,
    id: '',
    code: '',
  });

  const loadCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getCoupons();
      setCoupons(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSaving(true);
    try {
      const newCoupon = await AdminService.createCoupon({
        code: code.toUpperCase().replace(/\s+/g, ''),
        description,
        discountType,
        discountValue: Number(discountValue),
        minOrderValue: Number(minOrderValue),
        maxDiscountAmount: discountType === 'percentage' ? Number(maxDiscountAmount) : undefined,
        usageLimit: Number(usageLimit),
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
      });
      setCoupons([newCoupon, ...coupons]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: Coupon['status']) => {
    const nextStatus = currentStatus === 'active' ? 'disabled' : 'active';
    try {
      const updated = await AdminService.updateCouponStatus(id, nextStatus);
      setCoupons(coupons.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await AdminService.deleteCoupon(deleteModal.id);
      setCoupons(coupons.filter((c) => c.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: '', code: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Coupons &amp; Promotional Codes
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Configure cart discounts, festive vouchers, and customer threshold promotions
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> Create Coupon
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : coupons.length === 0 ? (
        <EmptyState
          icon={<TicketPercent className="w-6 h-6" />}
          title="No promo coupons active"
          description="Create your first campaign voucher to boost order volume."
          actionLabel="Create Coupon"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((cpn) => {
            const usagePercent = Math.round((cpn.usageCount / cpn.usageLimit) * 100);

            return (
              <div
                key={cpn.id}
                className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#cfcac0] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-[#144d31] text-white font-mono text-xs font-black tracking-wider">
                      {cpn.code}
                    </span>
                    <Badge
                      variant={
                        cpn.status === 'active'
                          ? 'success'
                          : cpn.status === 'scheduled'
                          ? 'info'
                          : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {cpn.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-bold text-ink">
                      {cpn.discountType === 'percentage'
                        ? `${cpn.discountValue}% OFF`
                        : `Flat ₹${cpn.discountValue} OFF`}
                    </div>
                    <p className="text-xs text-ink-500 mt-0.5 leading-relaxed">{cpn.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0eee8] space-y-2 text-xs">
                  <div className="flex justify-between text-ink-400">
                    <span>Min Order:</span>
                    <span className="font-mono font-semibold text-ink">
                      {formatCurrency(cpn.minOrderValue)}
                    </span>
                  </div>

                  <div className="flex justify-between text-ink-400">
                    <span>Usage:</span>
                    <span className="font-mono font-semibold text-ink">
                      {cpn.usageCount} / {cpn.usageLimit} ({usagePercent}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#f4f2ec] rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, usagePercent)}%` }}
                      className="bg-[#144d31] h-full rounded-full"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleStatus(cpn.id, cpn.status)}
                      className="text-xs font-semibold text-ink-500 hover:text-ink underline"
                    >
                      {cpn.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, id: cpn.id, code: cpn.code })
                      }
                      className="p-1 text-ink-400 hover:text-red-600 transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Coupon Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Promotional Coupon"
        description="Set discount rules and minimum basket requirements."
      >
        <form onSubmit={handleCreateCoupon} className="space-y-4">
          <Input
            label="COUPON CODE *"
            placeholder="e.g. FLASH50"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            required
          />

          <Input
            label="DESCRIPTION"
            placeholder="e.g. Flat ₹50 off on weekend organic baskets"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-500 mb-1.5">
                DISCOUNT TYPE
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-white border border-[#dcd8ce] rounded-lg font-medium text-ink"
              >
                <option value="fixed">Flat INR (₹)</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </div>

            <Input
              label={discountType === 'percentage' ? 'DISCOUNT % *' : 'DISCOUNT ₹ *'}
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="MINIMUM ORDER (₹)"
              type="number"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(e.target.value)}
            />
            {discountType === 'percentage' ? (
              <Input
                label="MAX DISCOUNT CAP (₹)"
                type="number"
                value={maxDiscountAmount}
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
              />
            ) : (
              <Input
                label="TOTAL USAGE LIMIT"
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eae7e0]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
              Launch Coupon
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Coupon Confirmation */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', code: '' })}
        onConfirm={handleConfirmDelete}
        title="Delete Promo Voucher?"
        message={`Are you sure you want to permanently delete coupon code "${deleteModal.code}"? Customers will no longer be able to apply it at checkout.`}
        confirmLabel="Delete Coupon"
        variant="danger"
      />
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Star, Search, CheckCircle, Flag, Trash2, MessageSquareQuote } from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { ProductReview } from '@/services/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getReviews({
        rating: ratingFilter,
        status: statusFilter,
        search,
      });
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [ratingFilter, statusFilter, search]);

  const handleUpdateStatus = async (id: string, status: ProductReview['status']) => {
    try {
      const updated = await AdminService.updateReviewStatus(id, status);
      setReviews(reviews.map((r) => (r.id === id ? updated : r)));
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
            Customer Reviews Moderation
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Audit item ratings, verify purchase feedback, and flag spam or policy violations
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search reviews by product or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Rating filter */}
          <select
            value={ratingFilter ?? 'all'}
            onChange={(e) =>
              setRatingFilter(e.target.value === 'all' ? undefined : Number(e.target.value))
            }
            className="px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none"
          >
            <option value="all">All Star Ratings</option>
            <option value="5">★ 5 Stars Only</option>
            <option value="4">★ 4 Stars</option>
            <option value="3">★ 3 Stars</option>
            <option value="2">★ 2 Stars</option>
            <option value="1">★ 1 Star</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none"
          >
            <option value="all">All Moderation States</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Audit</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* Review List */}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={<MessageSquareQuote className="w-6 h-6" />}
          title="No customer reviews found"
          description="Try clearing search or filter selections to view reviews."
        />
      ) : (
        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={rev.productImage}
                  alt={rev.productName}
                  className="w-12 h-12 rounded-lg object-cover border border-[#eae7e0] shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-ink">{rev.productName}</span>
                    <span className="text-[11px] text-ink-400">• By {rev.customerName}</span>
                    {rev.isVerifiedPurchase && (
                      <span className="text-[10px] bg-[#edf8f1] text-[#145a32] px-1.5 py-0.5 rounded font-bold">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-mono">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-ink-400 text-[11px] ml-1">
                      {formatRelativeTime(rev.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-ink-600 pt-1 leading-relaxed max-w-2xl">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Badge
                  variant={
                    rev.status === 'approved'
                      ? 'success'
                      : rev.status === 'flagged'
                      ? 'danger'
                      : 'warning'
                  }
                  size="sm"
                  dot
                >
                  {rev.status.toUpperCase()}
                </Badge>

                {rev.status !== 'approved' && (
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => handleUpdateStatus(rev.id, 'approved')}
                  >
                    <CheckCircle className="w-3 h-3" /> Approve
                  </Button>
                )}
                {rev.status !== 'flagged' && (
                  <Button
                    variant="outline"
                    size="xs"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleUpdateStatus(rev.id, 'flagged')}
                  >
                    <Flag className="w-3 h-3" /> Flag
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

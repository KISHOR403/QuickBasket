'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Product } from '@quickbasket/types';
import { formatCurrency } from '@quickbasket/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface ProductTableProps {
  products: Product[];
  onDeleteProduct: (id: string, name: string) => void;
  onBulkArchive?: (ids: string[]) => void;
}

export function ProductTable({ products, onDeleteProduct, onBulkArchive }: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(products.length / pageSize) || 1;
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStockStatus = (prod: Product) => {
    const total = prod.variants.reduce((acc, v) => acc + (v.stockCount ?? 10), 0);
    if (total === 0) {
      return <Badge variant="danger" dot>Out of stock</Badge>;
    }
    if (total <= 15) {
      return <Badge variant="warning" dot>Low ({total})</Badge>;
    }
    return <Badge variant="success" dot>{total} in stock</Badge>;
  };

  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] shadow-sm overflow-hidden space-y-0">
      {/* Bulk actions bar if items are selected */}
      {selectedIds.length > 0 && (
        <div className="bg-[#edf8f1] border-b border-[#cbe8d5] px-4 py-2.5 flex items-center justify-between text-xs text-[#145a32]">
          <span className="font-bold">
            {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={() => {
                if (onBulkArchive) onBulkArchive(selectedIds);
                setSelectedIds([]);
              }}
            >
              Bulk Archive
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setSelectedIds([])}
            >
              Deselect
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#eae7e0] bg-[#faf9f6] text-ink-500 font-mono text-[11px] uppercase tracking-wider sticky top-0 z-10">
              <th className="py-3 px-4 w-10">
                <button onClick={toggleSelectAll} className="text-ink-400 hover:text-ink">
                  {selectedIds.length === paginatedProducts.length && paginatedProducts.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-[#144d31]" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-3">Product</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Price &amp; MRP</th>
              <th className="py-3 px-3">Inventory</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0eee8]">
            {paginatedProducts.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              const defaultVariant = p.variants[0];

              return (
                <tr
                  key={p.id}
                  className={`hover:bg-[#faf9f6] transition-colors ${
                    isSelected ? 'bg-[#f4faf6]' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleSelectOne(p.id)}
                      className="text-ink-400 hover:text-ink"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#144d31]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Image & Title */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80'}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-[#eae7e0] shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/products/${p.id}`}
                          className="font-bold text-ink hover:text-[#144d31] truncate block text-xs"
                        >
                          {p.name}
                        </Link>
                        <div className="text-[11px] text-ink-400 flex items-center gap-1.5 mt-0.5">
                          <span>{p.brand}</span>
                          {p.isExpress && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-[#145a32] font-bold">
                              <Zap className="w-2.5 h-2.5 text-[#145a32]" /> Express
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3">
                    <span className="text-ink-600 font-medium capitalize">
                      {p.categorySlug.replace(/-/g, ' ')}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3 font-mono">
                    <div className="font-bold text-ink text-xs">
                      {formatCurrency(defaultVariant?.price || 0)}
                    </div>
                    {defaultVariant?.mrp && defaultVariant.mrp > defaultVariant.price && (
                      <span className="text-[10px] text-ink-400 line-through">
                        {formatCurrency(defaultVariant.mrp)}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-3">
                    <span className="font-mono text-xs font-bold text-ink">
                      {p.variants.reduce((acc, v) => acc + (v.stockCount ?? 10), 0)}
                    </span>
                    <span className="text-[11px] text-ink-400 ml-1">
                      {defaultVariant?.unit || 'units'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">{getStockStatus(p)}</td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/products/${p.id}`}>
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="w-3.5 h-3.5 text-ink-500" />
                        </Button>
                      </Link>
                      <button
                        onClick={() => onDeleteProduct(p.id, p.name)}
                        className="p-1.5 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Archive/Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-Based Transformation View */}
      <div className="md:hidden divide-y divide-[#f0eee8]">
        {paginatedProducts.map((p) => {
          const defaultVariant = p.variants[0];
          return (
            <div key={p.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover border border-[#eae7e0] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${p.id}`}
                      className="font-bold text-ink text-xs hover:text-[#144d31] leading-snug"
                    >
                      {p.name}
                    </Link>
                    <span className="font-mono font-bold text-xs text-ink shrink-0">
                      {formatCurrency(defaultVariant?.price || 0)}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-400 capitalize mt-0.5">
                    {p.brand} • {p.categorySlug.replace(/-/g, ' ')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div>{getStockStatus(p)}</div>
                <div className="flex items-center gap-2">
                  <Link href={`/products/${p.id}`}>
                    <Button variant="outline" size="xs">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onDeleteProduct(p.id, p.name)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-[#eae7e0] bg-[#faf9f6] flex items-center justify-between text-xs text-ink-500">
        <div>
          Showing{' '}
          <span className="font-semibold text-ink">
            {products.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-ink">
            {Math.min(currentPage * pageSize, products.length)}
          </span>{' '}
          of <span className="font-semibold text-ink">{products.length}</span> SKUs
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="xs"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </Button>
          <span className="px-2 font-mono font-semibold text-ink">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="xs"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

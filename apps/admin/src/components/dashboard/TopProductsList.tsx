import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp, PackageOpen } from 'lucide-react';
import { formatCurrency } from '@quickbasket/utils';

export interface TopProductItem {
  id: string;
  name: string;
  image: string;
  unitsSold: number;
  revenue: number;
  stock: number;
  trend: string;
}

export interface TopProductsListProps {
  products: TopProductItem[];
}

export function TopProductsList({ products }: TopProductsListProps) {
  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
              Best-Selling Items
            </h3>
            {products.length > 0 && (
              <span className="text-[10px] font-mono text-ink-400">
                (Top {products.length})
              </span>
            )}
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#144d31] hover:underline inline-flex items-center gap-1"
          >
            Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-8 text-center space-y-1.5">
            <div className="w-8 h-8 rounded-full bg-[#f4f2ec] text-ink-400 flex items-center justify-center mx-auto">
              <PackageOpen className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-ink">NO SALES RECORDED</div>
            <p className="text-[11px] text-ink-400">Product sales velocity will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0eee8] mt-1">
            {products.map((p) => (
              <div
                key={p.id}
                className="py-2.5 flex items-center justify-between hover:bg-[#faf9f6] -mx-2 px-2 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-9 h-9 rounded-lg object-cover border border-[#e8e5dc] shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/products/${p.id}`}
                      className="text-xs font-bold text-ink hover:text-[#144d31] truncate block"
                    >
                      {p.name}
                    </Link>
                    <div className="text-[11px] text-ink-500 font-mono mt-0.5 flex items-center gap-2">
                      <span>{p.unitsSold} units</span>
                      <span className="text-ink-300">•</span>
                      <span>
                        Stock: <span className="font-semibold text-ink-700">{p.stock}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold font-mono text-ink">
                    {formatCurrency(p.revenue)}
                  </div>
                  <div className="text-[10px] text-[#145a32] font-semibold flex items-center justify-end gap-0.5 mt-0.5 font-mono">
                    <TrendingUp className="w-2.5 h-2.5" /> {p.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package, ShoppingBag, Users, Tag, ArrowRight, X } from 'lucide-react';
import { AdminService } from '@/services/adminService';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    products: any[];
    orders: any[];
    customers: any[];
  }>({ products: [], orders: [], customers: [] });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], orders: [], customers: [] });
      return;
    }

    const timer = setTimeout(async () => {
      const [prods, ords, custs] = await Promise.all([
        AdminService.getProducts({ search: query }),
        AdminService.getOrders({ search: query }),
        AdminService.getCustomers({ search: query }),
      ]);
      setResults({
        products: prods.slice(0, 4),
        orders: ords.slice(0, 3),
        customers: custs.slice(0, 3),
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-[#0f1a14]/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl border border-[#dcd8ce] shadow-2xl overflow-hidden z-10 animate-scaleIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#eae7e0] gap-3">
          <Search className="w-5 h-5 text-ink-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search products, orders, customers, or SKUs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-medium text-ink placeholder:text-ink-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-ink-400 hover:text-ink p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-[#f4f2ec] text-ink-400 border border-[#e2ded5] rounded">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-ink-400">
              Type to instantly search across Catalog, Orders, and Customers
            </div>
          ) : results.products.length === 0 &&
            results.orders.length === 0 &&
            results.customers.length === 0 ? (
            <div className="py-8 text-center text-xs text-ink-400">
              No matching records found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {results.products.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 px-3 py-1 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" /> Products ({results.products.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {results.products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => navigateTo(`/products/${p.id}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f7f5ef] text-left transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-8 h-8 rounded object-cover border border-[#e8e5dc]"
                          />
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-[#144d31]">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-ink-400">
                              ₹{p.variants[0]?.price} • {p.variants[0]?.name}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-300 group-hover:text-[#144d31] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.orders.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 px-3 py-1 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" /> Orders ({results.orders.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {results.orders.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => navigateTo(`/orders/${o.id}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f7f5ef] text-left transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold text-ink group-hover:text-[#144d31]">
                            Order #{o.orderNumber}
                          </div>
                          <div className="text-[11px] text-ink-400">
                            {o.deliveryAddress?.area} • ₹{o.grandTotal} •{' '}
                            <span className="capitalize">{o.status}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-300 group-hover:text-[#144d31] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.customers.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 px-3 py-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Customers ({results.customers.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {results.customers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => navigateTo(`/customers/${c.id}`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f7f5ef] text-left transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-ink group-hover:text-[#144d31]">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-ink-400">
                              {c.phone} • {c.totalOrders} orders
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-300 group-hover:text-[#144d31] transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

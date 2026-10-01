'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Users, Eye, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { CustomerSummary } from '@/services/types';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getCustomers({ search, status: statusFilter });
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Customer Directory
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Registered accounts, ordering velocity, and loyalty lifetime value
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'active', 'vip', 'inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === st
                  ? 'bg-[#144d31] text-white font-bold shadow-xs'
                  : 'bg-[#faf9f6] text-ink-500 border border-[#eae7e0] hover:text-ink'
              }`}
            >
              {st === 'vip' ? 'VIP Loyalty' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : customers.length === 0 ? (
        <EmptyState
          icon={<Users className="w-6 h-6" />}
          title="No customers found"
          description="Try modifying your search or status filter."
        />
      ) : (
        <div className="bg-white rounded-xl border border-[#eae7e0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#eae7e0] bg-[#faf9f6] text-ink-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Orders Count</th>
                  <th className="py-3 px-3">Lifetime GMV</th>
                  <th className="py-3 px-3">Last Order</th>
                  <th className="py-3 px-3">Tier Status</th>
                  <th className="py-3 px-4 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#faf9f6] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#eae7e0] shrink-0"
                        />
                        <div>
                          <Link
                            href={`/customers/${c.id}`}
                            className="font-bold text-ink hover:text-[#144d31] block"
                          >
                            {c.name}
                          </Link>
                          <div className="text-[11px] text-ink-400">{c.phone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-ink-500">{c.city}</td>

                    <td className="py-3 px-3 font-mono font-bold text-ink text-xs">
                      {c.totalOrders}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-[#144d31] text-xs">
                      {formatCurrency(c.totalSpent)}
                    </td>

                    <td className="py-3 px-3 text-[11px] text-ink-400 font-mono">
                      {formatRelativeTime(c.lastOrderDate)}
                    </td>

                    <td className="py-3 px-3">
                      {c.status === 'vip' ? (
                        <Badge variant="success" dot size="sm">VIP Member</Badge>
                      ) : c.status === 'active' ? (
                        <Badge variant="info" dot size="sm">Active</Badge>
                      ) : (
                        <Badge variant="neutral" size="sm">Inactive</Badge>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link href={`/customers/${c.id}`}>
                        <Button variant="outline" size="xs">
                          <Eye className="w-3 h-3" /> View History
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

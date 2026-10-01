import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '@quickbasket/types';

export interface ProductFiltersProps {
  categories: Category[];
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  stockFilter: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  onStockFilterChange: (val: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock') => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  onReset: () => void;
}

export function ProductFilters({
  categories,
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters =
    search || selectedCategory !== 'all' || stockFilter !== 'all' || sortBy !== 'name-asc';

  return (
    <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search title, brand, SKU..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter */}
        <div>
          <select
            value={stockFilter}
            onChange={(e) => onStockFilterChange(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock (&gt; 15)</option>
            <option value="low_stock">Low Stock (1 - 15)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>

        {/* Sorting */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#dcd8ce] rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
          >
            <option value="name-asc">Product Name (A-Z)</option>
            <option value="name-desc">Product Name (Z-A)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-desc">Stock: High to Low</option>
            <option value="stock-asc">Stock: Low to High</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-[#f0eee8] text-xs">
          <span className="text-ink-400">Filtered view active</span>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-[#144d31] hover:underline inline-flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

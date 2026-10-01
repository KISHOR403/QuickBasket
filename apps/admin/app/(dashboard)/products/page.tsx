'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Package, Download } from 'lucide-react';
import { Product, Category } from '@quickbasket/types';
import { AdminService } from '@/services/adminService';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [sortBy, setSortBy] = useState('name-asc');

  // Deletion modal state
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        AdminService.getProducts({
          search,
          categorySlug: selectedCategory,
          stockFilter,
        }),
        AdminService.getCategories(),
      ]);

      // Apply sorting
      let sorted = [...prods];
      if (sortBy === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
      if (sortBy === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
      if (sortBy === 'price-asc') sorted.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
      if (sortBy === 'price-desc') sorted.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
      if (sortBy === 'stock-desc') {
        sorted.sort(
          (a, b) =>
            b.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0) -
            a.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0)
        );
      }
      if (sortBy === 'stock-asc') {
        sorted.sort(
          (a, b) =>
            a.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0) -
            b.variants.reduce((acc, v) => acc + (v.stockCount || 0), 0)
        );
      }

      setProducts(sorted);
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, selectedCategory, stockFilter, sortBy]);

  const handleOpenDelete = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await AdminService.deleteProduct(deleteModal.id);
      setProducts(products.filter((p) => p.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: '', name: '' });
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleBulkArchive = (ids: string[]) => {
    setProducts(products.filter((p) => !ids.includes(p.id)));
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Catalog &amp; Product Master
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Manage SKUs, dark store pricing, variant packaging, and inventory stock
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/products/new">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" /> Add New SKU
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <ProductFilters
        categories={categories}
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onReset={() => {
          setSearch('');
          setSelectedCategory('all');
          setStockFilter('all');
          setSortBy('name-asc');
        }}
      />

      {/* Content Area */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Package className="w-6 h-6" />}
          title="No products matched your criteria"
          description="Try adjusting your keyword search or category filters to locate products."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setSelectedCategory('all');
            setStockFilter('all');
          }}
        />
      ) : (
        <ProductTable
          products={products}
          onDeleteProduct={handleOpenDelete}
          onBulkArchive={handleBulkArchive}
        />
      )}

      {/* Confirmation Dialog for Destructive Product Deletion */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
        onConfirm={handleConfirmDelete}
        title="Archive / Remove Product?"
        message={`Are you sure you want to remove "${deleteModal.name}" from dark store operations? It will immediately stop appearing on customer searches.`}
        confirmLabel="Archive SKU"
        variant="danger"
      />
    </div>
  );
}

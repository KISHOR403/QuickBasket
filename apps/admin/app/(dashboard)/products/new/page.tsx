'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@quickbasket/types';
import { AdminService } from '@/services/adminService';
import { ProductForm } from '@/components/products/ProductForm';
import { Skeleton } from '@/components/ui/Skeleton';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const cats = await AdminService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleCreate = async (payload: any) => {
    setIsSubmitting(true);
    try {
      const created = await AdminService.createProduct(payload);
      router.push(`/products/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-ink tracking-tight font-display">
          Add New SKU
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Index a new grocery product into active dark store inventory
        </p>
      </div>

      <ProductForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={isSubmitting}
      />
    </div>
  );
}

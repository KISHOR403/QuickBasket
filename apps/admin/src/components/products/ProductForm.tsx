'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, Zap, Sparkles } from 'lucide-react';
import { Product, Category } from '@quickbasket/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface ProductFormProps {
  initialProduct?: Product;
  categories: Category[];
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({
  initialProduct,
  categories,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name || '');
  const [brand, setBrand] = useState(initialProduct?.brand || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [categoryId, setCategoryId] = useState(initialProduct?.categoryId || categories[0]?.id || 'cat-1');
  const [isExpress, setIsExpress] = useState(initialProduct?.isExpress ?? true);
  const [isOrganic, setIsOrganic] = useState(initialProduct?.isOrganic ?? false);
  const [images, setImages] = useState<string[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80']
  );
  const [tags, setTags] = useState(initialProduct?.tags?.join(', ') || 'Grocery, Essential');

  // Variant fields
  const defaultVar = initialProduct?.variants?.[0];
  const [variantName, setVariantName] = useState(defaultVar?.name || 'Standard Pack');
  const [price, setPrice] = useState(defaultVar?.price?.toString() || '120');
  const [mrp, setMrp] = useState(defaultVar?.mrp?.toString() || '150');
  const [stockCount, setStockCount] = useState(defaultVar?.stockCount?.toString() || '50');
  const [unit, setUnit] = useState(defaultVar?.unit || 'pcs');

  const [error, setError] = useState('');

  const handleAddImageUrl = () => {
    const url = prompt('Enter product image URL (https://...):');
    if (url && url.startsWith('http')) {
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product title is required');
      return;
    }
    if (!price || Number(price) <= 0) {
      setError('Please provide a valid price');
      return;
    }

    const selectedCat = categories.find((c) => c.id === categoryId) || categories[0];

    const payload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: brand || 'QuickBasket Select',
      description,
      categoryId: selectedCat.id,
      categorySlug: selectedCat.slug,
      vendorId: 'vendor-1',
      vendorName: 'Dark Store #04',
      images,
      rating: initialProduct?.rating || 4.8,
      reviewCount: initialProduct?.reviewCount || 12,
      isExpress,
      isOrganic,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      defaultVariantId: 'v-1',
      variants: [
        {
          id: 'v-1',
          name: variantName,
          price: Number(price),
          mrp: Number(mrp) || Number(price),
          inStock: Number(stockCount) > 0,
          stockCount: Number(stockCount),
          unit,
        },
      ],
    };

    try {
      await onSubmit(payload);
    } catch (err: any) {
      setError(err?.message || 'Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return
        </button>

        <div className="flex items-center gap-2">
          <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
            <Save className="w-4 h-4" />
            <span>{initialProduct ? 'Update Product' : 'Create Product'}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: General & Pricing Information */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Product Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="PRODUCT TITLE *"
                placeholder="e.g. Fresh Organic Tomatoes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="BRAND / PRODUCER"
                placeholder="e.g. Farm Fresh"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500">
                DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed nutritional details, origin, temperature storage notes..."
                className="w-full text-xs p-3 bg-white border border-[#dcd8ce] rounded-lg text-ink placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
              />
            </div>
          </div>

          {/* Pricing & Stock Variant Details */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Default Variant &amp; Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="VARIANT LABEL"
                placeholder="e.g. 500g, 1L, Pack of 4"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
              />
              <Input
                label="SELLING PRICE (₹) *"
                type="number"
                placeholder="120"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <Input
                label="MRP / LIST PRICE (₹)"
                type="number"
                placeholder="150"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="CURRENT STOCK UNITS"
                type="number"
                placeholder="50"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
              />
              <Input
                label="UNIT TYPE"
                placeholder="g, kg, ml, pcs"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-2">
            <Input
              label="TAGS (COMMA SEPARATED)"
              placeholder="Dairy, Morning, Breakfast, Essentials"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              hint="Keywords used in fast customer search indexing"
            />
          </div>
        </div>

        {/* Right Column: Category, Images & Attributes */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category selection */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Category
            </h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#dcd8ce] rounded-lg text-ink focus:outline-none focus:ring-2 focus:ring-[#144d31]/20 focus:border-[#144d31]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="space-y-2.5 pt-2 border-t border-[#f0eee8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="rounded text-[#144d31] focus:ring-[#144d31]"
                />
                <span className="flex items-center gap-1 text-[#145a32]">
                  <Zap className="w-3.5 h-3.5" /> 10-15 Min Express Eligible
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded text-[#144d31] focus:ring-[#144d31]"
                />
                <span className="flex items-center gap-1 text-[#144d31]">
                  <Sparkles className="w-3.5 h-3.5" /> Certified Organic Produce
                </span>
              </label>
            </div>
          </div>

          {/* Product Media Gallery */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
                Images ({images.length})
              </h3>
              <Button type="button" variant="outline" size="xs" onClick={handleAddImageUrl}>
                <Plus className="w-3 h-3" /> Add URL
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative rounded-lg border border-[#eae7e0] overflow-hidden group aspect-square">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

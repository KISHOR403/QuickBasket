'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Edit3,
  Star,
  Zap,
  Sparkles,
  Boxes,
  TrendingUp,
  Receipt,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { Product, Category } from '@quickbasket/types';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { AdminService } from '@/services/adminService';
import { ProductReview, StockAdjustment } from '@/services/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ProductForm } from '@/components/products/ProductForm';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'reviews' | 'edit'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Quick stock adjust state
  const [adjustQty, setAdjustQty] = useState('10');
  const [adjustType, setAdjustType] = useState<'add' | 'subtract'>('add');

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const [prod, cats, revs, adjs] = await Promise.all([
          AdminService.getProductById(id),
          AdminService.getCategories(),
          AdminService.getReviews(),
          AdminService.getStockAdjustments(),
        ]);
        if (prod) {
          setProduct(prod);
        }
        setCategories(cats);
        setReviews(revs.filter((r) => r.productId === id || r.productName === prod?.name));
        setAdjustments(adjs.filter((a) => a.productId === id));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleUpdateProduct = async (data: any) => {
    setIsUpdating(true);
    try {
      const updated = await AdminService.updateProduct(id, data);
      setProduct(updated);
      setActiveTab('overview');
      setFeedback('Product updated successfully');
      setTimeout(() => setFeedback(''), 4000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuickAdjust = async (variantId: string) => {
    if (!product) return;
    const qty = Number(adjustQty);
    if (isNaN(qty) || qty <= 0) return;

    try {
      const adj = await AdminService.adjustStock({
        productId: product.id,
        variantId,
        type: adjustType,
        quantity: qty,
        reason: 'inventory_audit',
        notes: 'Manual adjustment from product detail page',
      });
      // Update local product variant
      const updatedVariants = product.variants.map((v) =>
        v.id === variantId ? { ...v, stockCount: adj.newStock, inStock: adj.newStock > 0 } : v
      );
      setProduct({ ...product, variants: updatedVariants });
      setAdjustments([adj, ...adjustments]);
      setFeedback(`Stock adjusted to ${adj.newStock} units`);
      setTimeout(() => setFeedback(''), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-lg font-bold text-ink">Product Not Found</h2>
        <p className="text-xs text-ink-500">The requested SKU does not exist in this catalog.</p>
        <Link href="/products">
          <Button variant="primary" size="sm">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const defaultVariant = product.variants[0];
  const discountPercent = calculateDiscount(defaultVariant?.price || 0, defaultVariant?.mrp || 0);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500 hover:text-ink mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-ink tracking-tight font-display">
              {product.name}
            </h1>
            {product.isExpress && (
              <Badge variant="success" dot>
                <Zap className="w-2.5 h-2.5 mr-0.5" /> 10-Min Express
              </Badge>
            )}
            {product.isOrganic && (
              <Badge variant="info">
                <Sparkles className="w-2.5 h-2.5 mr-0.5" /> Organic
              </Badge>
            )}
          </div>
          <p className="text-xs text-ink-500 mt-0.5">
            SKU ID: <span className="font-mono font-semibold">{product.id}</span> • Brand:{' '}
            <span className="font-semibold text-ink">{product.brand}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab !== 'edit' ? (
            <Button variant="primary" size="sm" onClick={() => setActiveTab('edit')}>
              <Edit3 className="w-4 h-4" /> Edit Product
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setActiveTab('overview')}>
              View Overview
            </Button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-[#edf8f1] text-[#145a32] text-xs font-bold rounded-lg border border-[#cbe8d5] flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Tabs Bar */}
      <div className="border-b border-[#eae7e0] flex items-center gap-6 text-xs font-semibold">
        {(['overview', 'inventory', 'reviews', 'edit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition-all relative ${
              activeTab === tab
                ? 'text-[#144d31] font-bold'
                : 'text-ink-400 hover:text-ink'
            }`}
          >
            {tab === 'edit' ? 'Edit SKU' : tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#144d31] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Images & Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-[#eae7e0] p-4 shadow-sm space-y-3">
              <img
                src={product.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg border border-[#eae7e0]"
              />
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Thumbnail"
                      className="w-full aspect-square object-cover rounded border border-[#eae7e0]"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-[#eae7e0] p-5 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-ink uppercase tracking-wider font-mono text-[11px]">
                Product Attributes
              </h4>
              <div className="divide-y divide-[#f0eee8]">
                <div className="py-2 flex justify-between">
                  <span className="text-ink-400">Category</span>
                  <span className="font-semibold text-ink capitalize">
                    {product.categorySlug.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-ink-400">Rating</span>
                  <span className="font-semibold text-ink flex items-center gap-1 font-mono">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {product.rating} ({product.reviewCount} ratings)
                  </span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-ink-400">Fulfillment Hub</span>
                  <span className="font-semibold text-ink">{product.vendorName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Description & Variants */}
          <div className="lg:col-span-8 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-ink">Description &amp; Storage Guidelines</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                {product.description || 'No specialized description provided for this catalog item.'}
              </p>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#f4f2ec] text-[11px] text-ink-500 border border-[#e2ded5]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Variants & Pricing Table */}
            <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">Packaging Variants &amp; Pricing</h3>
                <span className="text-xs text-ink-400 font-mono">
                  {product.variants.length} packaging option{product.variants.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#eae7e0] text-ink-400 font-mono text-[11px] uppercase">
                      <th className="pb-2">Variant</th>
                      <th className="pb-2">Selling Price</th>
                      <th className="pb-2">MRP</th>
                      <th className="pb-2">Discount</th>
                      <th className="pb-2">Live Stock</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eee8]">
                    {product.variants.map((v) => (
                      <tr key={v.id}>
                        <td className="py-3 font-bold text-ink">{v.name}</td>
                        <td className="py-3 font-mono font-bold text-[#144d31]">
                          {formatCurrency(v.price)}
                        </td>
                        <td className="py-3 font-mono text-ink-400 line-through">
                          {formatCurrency(v.mrp)}
                        </td>
                        <td className="py-3 font-mono text-[#145a32] font-semibold">
                          {calculateDiscount(v.price, v.mrp)}% OFF
                        </td>
                        <td className="py-3 font-mono font-bold text-ink">
                          {v.stockCount} {v.unit}
                        </td>
                        <td className="py-3">
                          {v.inStock ? (
                            <Badge variant="success" dot size="sm">Available</Badge>
                          ) : (
                            <Badge variant="danger" dot size="sm">Out of Stock</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Inventory & Restock */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-ink">Stock Adjustment Control</h3>
            <p className="text-xs text-ink-500">
              Update shelf counts for incoming shipments or damaged wastage.
            </p>

            <div className="space-y-4 pt-2">
              {product.variants.map((v) => (
                <div key={v.id} className="p-4 rounded-xl bg-[#faf9f6] border border-[#eae7e0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-ink">{v.name}</h4>
                      <span className="text-[11px] text-ink-400 font-mono">
                        Current stock: <strong className="text-ink">{v.stockCount}</strong> {v.unit}
                      </span>
                    </div>
                    {v.stockCount <= 10 && (
                      <Badge variant="warning" dot size="sm">Low Stock Alert</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <select
                      value={adjustType}
                      onChange={(e) => setAdjustType(e.target.value as any)}
                      className="text-xs px-2.5 py-1.5 bg-white border border-[#dcd8ce] rounded-lg font-medium text-ink"
                    >
                      <option value="add">+ Add Units (Restock)</option>
                      <option value="subtract">- Subtract Units (Damage/Return)</option>
                    </select>

                    <input
                      type="number"
                      value={adjustQty}
                      onChange={(e) => setAdjustQty(e.target.value)}
                      placeholder="Qty"
                      className="w-20 text-xs px-2.5 py-1.5 bg-white border border-[#dcd8ce] rounded-lg font-mono text-ink text-center"
                    />

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleQuickAdjust(v.id)}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-ink">Adjustment Audit Log</h3>
            {adjustments.length === 0 ? (
              <p className="text-xs text-ink-400 py-6 text-center">
                No recent stock adjustments recorded for this SKU.
              </p>
            ) : (
              <div className="divide-y divide-[#f0eee8]">
                {adjustments.map((a) => (
                  <div key={a.id} className="py-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-ink">
                        {a.type === 'add' ? `+${a.quantity}` : `-${a.quantity}`} units
                      </span>
                      <span className="text-[10px] text-ink-400">
                        {new Date(a.adjustedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-500 capitalize">
                      Reason: {a.reason.replace(/_/g, ' ')} • By {a.adjustedBy}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
            <h3 className="text-base font-bold text-ink">Customer Feedback</h3>
            <span className="text-xs font-mono text-ink-400">
              {reviews.length} customer review{reviews.length > 1 ? 's' : ''}
            </span>
          </div>

          {reviews.length === 0 ? (
            <p className="text-xs text-ink-400 py-10 text-center">
              No product reviews submitted yet for this item.
            </p>
          ) : (
            <div className="divide-y divide-[#f0eee8]">
              {reviews.map((r) => (
                <div key={r.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">{r.customerName}</span>
                      {r.isVerifiedPurchase && (
                        <span className="text-[10px] bg-[#edf8f1] text-[#145a32] px-1.5 py-0.5 rounded font-bold">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {r.rating}.0
                    </div>
                  </div>
                  <p className="text-xs text-ink-600 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Edit Product */}
      {activeTab === 'edit' && (
        <ProductForm
          initialProduct={product}
          categories={categories}
          onSubmit={handleUpdateProduct}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
}

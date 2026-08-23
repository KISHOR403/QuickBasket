'use client';

import React from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { useUiStore } from '@/store/ui';
import { useCartStore } from '@/store/cart';
import { formatCurrency, calculateDiscount } from '@quickbasket/utils';
import { QtyStepper } from './QtyStepper';

export function VariantPickerModal() {
  const { activeVariantProduct, closeVariantPicker } = useUiStore();
  const { items, addItem, updateQuantity } = useCartStore();

  if (!activeVariantProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-card max-w-md w-full p-5 shadow-float border border-mist relative">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pr-6">
          <div className="relative w-16 h-16 rounded-input bg-surface-muted border border-mist overflow-hidden shrink-0">
            <Image
              src={activeVariantProduct.images[0]}
              alt={activeVariantProduct.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">
              {activeVariantProduct.brand}
            </span>
            <h3 className="text-sm font-extrabold text-ink line-clamp-2">
              {activeVariantProduct.name}
            </h3>
            <p className="text-xs text-ink-500 mt-0.5">Select your preferred pack size</p>
          </div>
          <button
            onClick={closeVariantPicker}
            className="absolute top-4 right-4 text-ink-400 hover:text-ink p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Variants List */}
        <div className="flex flex-col gap-2.5 my-4 max-h-[60vh] overflow-y-auto pr-1">
          {activeVariantProduct.variants.map((variant: any) => {
            const cartItem = items.find(
              (item: any) =>
                item.productId === activeVariantProduct.id && item.variantId === variant.id
            );
            const qty = cartItem ? cartItem.quantity : 0;
            const discount = calculateDiscount(variant.price, variant.mrp);

            return (
              <div
                key={variant.id}
                className="flex items-center justify-between p-3 rounded-input border border-mist bg-surface hover:border-basil/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">{variant.name}</span>
                    {discount > 0 && (
                      <span className="text-[10px] font-extrabold text-beet bg-beet-light px-1.5 py-0.5 rounded-badge">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5 font-mono mt-1">
                    <span className="text-sm font-black text-ink">
                      {formatCurrency(variant.price)}
                    </span>
                    {variant.mrp > variant.price && (
                      <span className="text-xs text-ink-400 line-through">
                        {formatCurrency(variant.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <QtyStepper
                  quantity={qty}
                  onIncrement={() => addItem(activeVariantProduct, variant, 1)}
                  onDecrement={() => updateQuantity(activeVariantProduct.id, variant.id, qty - 1)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { CartItem } from '@quickbasket/types';
import { formatCurrency } from '@quickbasket/utils';
import { useCartStore } from '@/store/cart';
import { QtyStepper } from '@/components/product/QtyStepper';

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-mist/60 last:border-0">
      <div className="relative w-14 h-14 rounded-input bg-surface-muted border border-mist overflow-hidden shrink-0">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h4 className="text-xs font-bold text-ink truncate">{item.product.name}</h4>
        <span className="text-[11px] text-ink-500 font-medium">{item.selectedVariant.name}</span>
        <div className="font-mono text-xs font-extrabold text-ink mt-0.5">
          {formatCurrency(item.selectedVariant.price)}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <QtyStepper
          size="sm"
          quantity={item.quantity}
          onIncrement={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
          onDecrement={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
        />
        <button
          onClick={() => removeItem(item.productId, item.variantId)}
          className="text-ink-300 hover:text-beet p-1 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

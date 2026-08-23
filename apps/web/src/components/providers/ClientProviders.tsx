'use client';

import React from 'react';
import { ApiQueryProvider } from '@quickbasket/api-client';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartFloatingBar } from '@/components/cart/CartFloatingBar';
import { VariantPickerModal } from '@/components/product/VariantPickerModal';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApiQueryProvider>
      {children}
      <CartDrawer />
      <VariantPickerModal />
      <CartFloatingBar />
    </ApiQueryProvider>
  );
}

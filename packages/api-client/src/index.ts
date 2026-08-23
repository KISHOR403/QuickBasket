'use client';

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getMockCategories,
  getMockProducts,
  getMockProductBySlug,
  getMockVendors,
  getMockOrders,
  MOCK_ORDERS,
} from '@quickbasket/mocks';
import { Category, Product, Vendor, Order, CartItem, Address, PaymentMethod } from '@quickbasket/types';

// Create default QueryClient instance
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 mins
        refetchOnWindowFocus: false,
      },
    },
  });

export function ApiQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => createQueryClient());

  return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// Queries
export function useCategoriesQuery() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return getMockCategories();
    },
  });
}

export function useProductsQuery(params?: {
  categorySlug?: string;
  vendorId?: string;
  search?: string;
  isExpress?: boolean;
}) {
  return useQuery<Product[]>({
    queryKey: ['products', params],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 150));
      return getMockProducts(params);
    },
  });
}

export function useProductBySlugQuery(slug: string) {
  return useQuery<Product | undefined>({
    queryKey: ['product', slug],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return getMockProductBySlug(slug);
    },
    enabled: Boolean(slug),
  });
}

export function useVendorsQuery() {
  return useQuery<Vendor[]>({
    queryKey: ['vendors'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return getMockVendors();
    },
  });
}

export function useOrdersQuery() {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return getMockOrders();
    },
  });
}

// Mutations
export interface PlaceOrderPayload {
  items: CartItem[];
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  deliverySlotId: string;
  tipAmount: number;
}

export function usePlaceOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, PlaceOrderPayload>({
    mutationFn: async (payload) => {
      await new Promise((res) => setTimeout(res, 500));

      const itemTotal = payload.items.reduce(
        (acc, item) => acc + item.selectedVariant.price * item.quantity,
        0
      );
      const deliveryFee = itemTotal > 299 ? 0 : 15;
      const handlingFee = 4;
      const grandTotal = itemTotal + deliveryFee + handlingFee + payload.tipAmount;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `QB-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: 'usr-1',
        vendorId: payload.items[0]?.vendorId || 'vendor-1',
        vendorName: payload.items[0]?.product.vendorName || 'QuickBasket Dark Store #04',
        status: 'placed',
        deliveryAddress: payload.deliveryAddress,
        items: payload.items.map((it) => ({
          productId: it.productId,
          variantId: it.variantId,
          productName: it.product.name,
          variantName: it.selectedVariant.name,
          unitPrice: it.selectedVariant.price,
          quantity: it.quantity,
          image: it.product.images[0],
          vendorName: it.product.vendorName,
        })),
        itemTotal,
        deliveryFee,
        handlingFee,
        discount: 0,
        grandTotal,
        paymentMethod: payload.paymentMethod,
        paymentStatus: 'paid',
        estimatedDeliveryMinutes: 12,
        createdAt: new Date().toISOString(),
        rider: {
          name: 'Vikram Singh',
          phone: '+91 98112 33445',
          vehicleNumber: 'DL 03 XY 8899',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
      };

      MOCK_ORDERS.unshift(newOrder);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

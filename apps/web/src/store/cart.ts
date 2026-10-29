import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@quickbasket/types';

interface CartStoreState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed getters
  getTotalItems: () => number;
  getItemTotal: () => number;
  getMrpTotal: () => number;
  getTotalSavings: () => number;
  getVendorId: () => string | null;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, qty = 1) => {
        const stockLimit = variant.inStock ? Math.max(0, Math.floor(variant.stockCount)) : 0;
        if (stockLimit === 0 || qty <= 0) return;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.variantId === variant.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity = Math.min(
              updatedItems[existingIndex].quantity + Math.floor(qty),
              stockLimit
            );
            return { items: updatedItems };
          }

          const newItem: CartItem = {
            productId: product.id,
            variantId: variant.id,
            product,
            selectedVariant: variant,
            quantity: Math.min(Math.floor(qty), stockLimit),
            vendorId: product.vendorId,
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (Math.floor(quantity) <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const existingItem = get().items.find(
          (item) => item.productId === productId && item.variantId === variantId
        );
        if (!existingItem) return;
        const stockLimit = existingItem.selectedVariant.inStock
          ? Math.max(0, Math.floor(existingItem.selectedVariant.stockCount))
          : 0;
        if (stockLimit === 0) {
          get().removeItem(productId, variantId);
          return;
        }
        const safeQuantity = Math.min(Math.floor(quantity), stockLimit);

        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId === productId && item.variantId === variantId) {
              return { ...item, quantity: safeQuantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getItemTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.selectedVariant.price * item.quantity,
          0
        );
      },

      getMrpTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.selectedVariant.mrp * item.quantity,
          0
        );
      },

      getTotalSavings: () => {
        const mrpTotal = get().getMrpTotal();
        const itemTotal = get().getItemTotal();
        return Math.max(0, mrpTotal - itemTotal);
      },

      getVendorId: () => {
        const items = get().items;
        return items.length > 0 ? items[0].vendorId : null;
      },
    }),
    {
      name: 'quickbasket-cart-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);

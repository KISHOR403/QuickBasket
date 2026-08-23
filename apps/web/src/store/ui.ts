import { create } from 'zustand';
import { Product } from '@quickbasket/types';

interface UiStoreState {
  isCartDrawerOpen: boolean;
  isLocationModalOpen: boolean;
  activeVariantProduct: Product | null;
  
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  
  openLocationModal: () => void;
  closeLocationModal: () => void;
  
  openVariantPicker: (product: Product) => void;
  closeVariantPicker: () => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  isCartDrawerOpen: false,
  isLocationModalOpen: false,
  activeVariantProduct: null,

  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openLocationModal: () => set({ isLocationModalOpen: true }),
  closeLocationModal: () => set({ isLocationModalOpen: false }),

  openVariantPicker: (product) => set({ activeVariantProduct: product }),
  closeVariantPicker: () => set({ activeVariantProduct: null }),
}));

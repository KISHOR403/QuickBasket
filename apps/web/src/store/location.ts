import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Address } from '@quickbasket/types';

interface LocationStoreState {
  pincode: string;
  area: string;
  city: string;
  isServiceable: boolean;
  selectedAddress: Address | null;
  setPincodeLocation: (pincode: string, area: string, city: string) => void;
  setSelectedAddress: (address: Address) => void;
}

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set) => ({
      pincode: '110001',
      area: 'Connaught Place, Sector 18',
      city: 'New Delhi',
      isServiceable: true,
      selectedAddress: {
        id: 'addr-default',
        type: 'home',
        label: 'Home',
        flatNo: 'A-402',
        building: 'Greenwood Apartments',
        area: 'Connaught Place',
        city: 'New Delhi',
        pincode: '110001',
        isDefault: true,
      },
      setPincodeLocation: (pincode, area, city) => {
        // Quick serviceability check mock
        const isServ = ['110001', '110002', '110003', '122001', '122002'].includes(pincode);
        set({ pincode, area, city, isServiceable: isServ });
      },
      setSelectedAddress: (address) => {
        set({
          selectedAddress: address,
          pincode: address.pincode,
          area: address.area,
          city: address.city,
        });
      },
    }),
    {
      name: 'quickbasket-location-storage',
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

'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown, CheckCircle2, AlertCircle, Navigation } from 'lucide-react';
import { useLocationStore } from '@/store/location';
import { useUiStore } from '@/store/ui';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function LocationGate() {
  const { pincode, area, isServiceable, setPincodeLocation } = useLocationStore();
  const { isLocationModalOpen, openLocationModal, closeLocationModal } = useUiStore();
  const [inputPincode, setInputPincode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[1-9][0-9]{5}$/.test(inputPincode)) {
      setErrorMsg('Please enter a valid 6-digit Indian pincode');
      return;
    }

    // Mock areas based on pincode
    const mockMap: Record<string, { area: string; city: string }> = {
      '110001': { area: 'Connaught Place, Sector 18', city: 'New Delhi' },
      '110002': { area: 'Daryaganj, ITO', city: 'New Delhi' },
      '110003': { area: 'Khan Market, Lodhi Colony', city: 'New Delhi' },
      '122001': { area: 'DLF Phase 3, Cyber City', city: 'Gurugram' },
    };

    const found = mockMap[inputPincode] || { area: `Sector ${inputPincode.slice(3)}`, city: 'Metro Zone' };
    setPincodeLocation(inputPincode, found.area, found.city);
    setErrorMsg('');
    closeLocationModal();
  };

  return (
    <>
      {/* Header Button Trigger */}
      <button
        onClick={openLocationModal}
        className="flex items-center gap-2 text-left p-1.5 hover:bg-mist/60 rounded-card transition-colors group"
      >
        <div className="w-9 h-9 rounded-full bg-basil-light text-basil flex items-center justify-center group-hover:scale-105 transition-transform">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-500">
            <span>Delivering to</span>
            <ChevronDown className="w-3.5 h-3.5 text-basil group-hover:translate-y-0.5 transition-transform" />
          </div>
          <div className="text-sm font-extrabold text-ink truncate max-w-[200px]">
            {area} ({pincode})
          </div>
        </div>
      </button>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface rounded-card max-w-md w-full p-6 shadow-float border border-mist relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-extrabold text-ink flex items-center gap-2">
                <MapPin className="w-5 h-5 text-basil" /> Select Delivery Location
              </h3>
              <button
                onClick={closeLocationModal}
                className="text-ink-400 hover:text-ink text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-ink-600 mb-5">
              Enter your Indian pincode to check instant 10-15 minute grocery serviceability in your neighborhood.
            </p>

            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <Input
                label="Enter 6-Digit Pincode"
                placeholder="e.g. 110001, 122001"
                value={inputPincode}
                onChange={(e) => setInputPincode(e.target.value)}
                maxLength={6}
                error={errorMsg}
                rightIcon={
                  <button type="submit" className="text-basil font-bold text-xs hover:underline">
                    CHECK
                  </button>
                }
              />

              <div className="flex gap-2">
                <Button type="submit" variant="primary" className="w-full">
                  Check Serviceability
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-mist">
              <div className="text-xs font-bold text-ink-500 mb-2">QUICK POPULAR PINCODES</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: '110001', label: 'Connaught Place' },
                  { code: '122001', label: 'Gurugram Cyber Hub' },
                  { code: '110003', label: 'Khan Market' },
                ].map((item: { code: string; label: string }) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setPincodeLocation(item.code, item.label, 'Delhi NCR');
                      closeLocationModal();
                    }}
                    className="text-xs bg-mist/70 hover:bg-basil-light hover:text-basil px-3 py-1.5 rounded-pill transition-colors font-medium"
                  >
                    {item.code} - {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-surface-muted rounded-input flex items-center gap-2 text-xs">
              {isServiceable ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                  <span className="text-ink-700">Currently serving: <b>{area}</b></span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-beet shrink-0" />
                  <span className="text-beet">Pincode unserviceable for 10-min express.</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

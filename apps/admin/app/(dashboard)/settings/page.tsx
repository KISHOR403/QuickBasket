'use client';

import React, { useEffect, useState } from 'react';
import { Save, Store, Clock, ShieldCheck, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { AdminService } from '@/services/adminService';
import { StoreSettings } from '@/services/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState('');

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await AdminService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const updated = await AdminService.updateSettings(settings);
      setSettings(updated);
      setSavedFeedback('Store settings updated successfully');
      setTimeout(() => setSavedFeedback(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#eae7e0]">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight font-display">
            Dark Store &amp; Fulfillment Settings
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Configure delivery radius, instant order thresholds, operating hours, and dispatch parameters
          </p>
        </div>

        <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
          <Save className="w-4 h-4" /> Save Configuration
        </Button>
      </div>

      {savedFeedback && (
        <div className="p-3 bg-[#edf8f1] text-[#145a32] text-xs font-bold rounded-lg border border-[#cbe8d5] flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> {savedFeedback}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Core Operating Settings */}
        <div className="lg:col-span-8 space-y-6">
          {/* Operational Hours & Status */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Storefront Availability &amp; SLA
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="STORE NODE NAME"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              />

              <Input
                label="OPERATING TIMINGS"
                value={settings.operatingHours}
                onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 p-3 bg-[#faf9f6] rounded-xl border border-[#eae7e0] cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isOpen}
                  onChange={(e) => setSettings({ ...settings, isOpen: e.target.checked })}
                  className="rounded text-[#144d31] focus:ring-[#144d31] w-4 h-4"
                />
                <div>
                  <span className="text-xs font-bold text-ink block">
                    Dark Store Operational (Accepting Orders)
                  </span>
                  <span className="text-[11px] text-ink-400 block">
                    When turned off, instant express checkouts are disabled for this hub pin code
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing & Threshold Rules */}
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Delivery Economics &amp; Thresholds
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="EXPRESS DELIVERY FEE (₹)"
                type="number"
                value={settings.instantDeliveryFee}
                onChange={(e) =>
                  setSettings({ ...settings, instantDeliveryFee: Number(e.target.value) })
                }
              />

              <Input
                label="FREE DELIVERY MIN BASKET (₹)"
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })
                }
              />

              <Input
                label="TARGET SLA DURATION (MINUTES)"
                type="number"
                value={settings.targetSlaMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, targetSlaMinutes: Number(e.target.value) })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="LOW STOCK WARNING THRESHOLD (UNITS)"
                type="number"
                value={settings.lowStockThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })
                }
                hint="Triggers dashboard warning badge when shelf count falls below this limit"
              />

              <Input
                label="FULFILLMENT RADIUS (KM)"
                type="number"
                step="0.5"
                value={settings.dispatchRadiusKm}
                onChange={(e) =>
                  setSettings({ ...settings, dispatchRadiusKm: Number(e.target.value) })
                }
                hint="Maximum delivery perimeter served by this dark store hub"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Support & Automation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#eae7e0] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink-400 font-mono">
              Store Support Contacts
            </h3>

            <Input
              label="OPERATIONS HELPLINE"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
            />

            <Input
              label="DISPATCH EMAIL"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            />

            <div className="pt-2 border-t border-[#f0eee8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={settings.autoAssignRiders}
                  onChange={(e) => setSettings({ ...settings, autoAssignRiders: e.target.checked })}
                  className="rounded text-[#144d31] focus:ring-[#144d31]"
                />
                <span>Auto-dispatch available riders within 200m</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

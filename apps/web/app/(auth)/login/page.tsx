'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError('Enter 4-digit OTP (e.g. 1234)');
      return;
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col justify-center items-center p-4">
      <div className="bg-surface rounded-card border border-mist p-8 max-w-md w-full shadow-float space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-basil text-white font-extrabold text-2xl rounded-card flex items-center justify-center mx-auto shadow-pill">
            QB
          </div>
          <h1 className="text-2xl font-black text-ink">Welcome to QuickBasket</h1>
          <p className="text-xs text-ink-500">
            India&apos;s 10-Minute Grocery & Multi-Vendor Delivery App
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <Input
              label="Mobile Number"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              error={error}
              leftIcon={<span className="text-xs font-bold font-mono text-ink-500">+91</span>}
            />

            <Button type="submit" variant="mango" className="w-full font-black py-3">
              Continue with OTP <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-basil-light rounded-input text-xs text-basil font-bold flex items-center justify-between">
              <span>OTP sent to +91 {phone}</span>
              <button type="button" onClick={() => setStep('phone')} className="underline">
                Edit
              </button>
            </div>

            <Input
              label="Enter 4-Digit OTP"
              placeholder="1234"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              error={error}
            />

            <Button type="submit" variant="primary" className="w-full font-black py-3">
              Verify & Login
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-mist text-center text-[11px] text-ink-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-leaf" />
          <span>By continuing, you agree to QuickBasket Terms & Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

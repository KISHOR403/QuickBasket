'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock, User, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAdminAuth } from '@/components/providers/AuthContext';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';
  const { login } = useAdminAuth();

  const [username, setUsername] = useState('kishorgogoi');
  const [password, setPassword] = useState('Moikun@0');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide administrator username and password');
      return;
    }

    setError('');
    setIsLoading(true);

    const result = await login({
      username: username.trim(),
      password: password.trim(),
      role: 'super_admin',
      storeId: 'vendor-1',
    });

    if (result.success) {
      router.push(from);
      router.refresh();
    } else {
      setError(result.error || 'Invalid administrator username or password.');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setUsername('kishorgogoi');
    setPassword('Moikun@0');
    setIsLoading(true);
    const result = await login({
      username: 'kishorgogoi',
      password: 'Moikun@0',
      role: 'super_admin',
      storeId: 'vendor-1',
    });
    if (result.success) {
      router.push(from);
      router.refresh();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Brand header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#144d31] text-white flex items-center justify-center font-black text-xl mx-auto shadow-md border border-[#236845]">
          QB
        </div>
        <h1 className="text-2xl font-black text-ink font-display tracking-tight">
          QuickBasket Operations
        </h1>
        <p className="text-xs text-ink-500 font-medium">
          Dark Store &amp; Fulfillment Control Portal
        </p>
      </div>

      {/* Login Box */}
      <div className="bg-white rounded-2xl border border-[#eae7e0] p-7 shadow-[0_4px_24px_rgba(15,26,20,0.06)] space-y-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#edf8f1] border border-[#cbe8d5] text-[#145a32] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#1a8b4e]" />
          <span>Protected enterprise route with session verification</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ADMIN USERNAME"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="kishorgogoi"
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="PASSWORD"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Moikun@0"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          {error && (
            <div className="text-xs font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full font-bold py-2.5 rounded-lg"
            isLoading={isLoading}
          >
            Sign In to Console <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        {/* Credentials Notice & 1-Click Fill */}
        <div className="pt-4 border-t border-[#eae7e0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">
              Active Admin Credentials
            </span>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="text-[11px] font-bold text-[#144d31] hover:underline"
            >
              Auto Fill &amp; Login
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-[#faf9f6] border border-[#e2ded5] text-xs space-y-1 font-mono">
            <div className="flex justify-between">
              <span className="text-ink-400">Username:</span>
              <span className="font-bold text-ink">kishorgogoi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-400">Password:</span>
              <span className="font-bold text-[#144d31]">Moikun@0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-ink-400">
        Administrator: <span className="font-semibold text-ink">kishorgogoi</span> • QuickBasket Operations OS
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] flex flex-col justify-center items-center p-4">
      <Suspense fallback={<div className="text-xs text-ink-400">Loading console authentication...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}

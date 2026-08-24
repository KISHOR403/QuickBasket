'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Package,
  ShieldCheck,
  LogOut,
  Phone,
  Mail,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Wallet,
  Gift,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Headphones,
  Bell,
  ArrowUpRight,
  Shield,
  Zap,
  Star,
  X,
  CreditCard,
  Building,
  Home,
  Briefcase,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';
import { useLocationStore } from '@/store/location';
import { useOrdersQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';

export default function AccountPage() {
  const { selectedAddress, pincode, area, city, setSelectedAddress } = useLocationStore();
  const { data: orders } = useOrdersQuery();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings'>('overview');

  // User State
  const [userProfile, setUserProfile] = useState({
    name: 'Vikram Kumar',
    phone: '+91 98765 43210',
    email: 'vikram.kumar@example.com',
    memberSince: 'August 2024',
    tier: 'Premier Member',
  });

  // Modal States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [walletBalance, setWalletBalance] = useState(245.0);
  const [topUpAmount, setTopUpAmount] = useState('500');

  // Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editEmail, setEditEmail] = useState(userProfile.email);

  // Address List State
  const [addressList, setAddressList] = useState([
    {
      id: 'addr-1',
      type: 'home',
      label: 'Home',
      flatNo: selectedAddress?.flatNo || 'A-402',
      building: selectedAddress?.building || 'Greenwood Apartments',
      area: area || 'Connaught Place, Sector 18',
      city: city || 'New Delhi',
      pincode: pincode || '110001',
      isDefault: true,
    },
    {
      id: 'addr-2',
      type: 'work',
      label: 'Work / Office',
      flatNo: 'Tower B, 7th Floor',
      building: 'Cyber Tech Park',
      area: 'DLF Phase 3',
      city: 'Gurugram',
      pincode: '122002',
      isDefault: false,
    },
    {
      id: 'addr-3',
      type: 'other',
      label: 'Parents Home',
      flatNo: 'House #42',
      building: 'Green Avenue',
      area: 'Vasant Kunj',
      city: 'New Delhi',
      pincode: '110070',
      isDefault: false,
    },
  ]);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    type: 'home',
    flatNo: '',
    building: '',
    area: '',
    pincode: '',
  });

  // Settings Toggles State
  const [settings, setSettings] = useState({
    orderUpdatesWhatsapp: true,
    promoEmails: false,
    oneClickCheckout: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: editName,
      phone: editPhone,
      email: editEmail,
    }));
    setIsEditProfileOpen(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.flatNo || !newAddress.area) return;
    const added = {
      id: `addr-${Date.now()}`,
      type: newAddress.type,
      label: newAddress.label || 'Other',
      flatNo: newAddress.flatNo,
      building: newAddress.building,
      area: newAddress.area,
      city: 'New Delhi',
      pincode: newAddress.pincode || '110001',
      isDefault: false,
    };
    setAddressList((prev) => [...prev, added]);
    setIsAddAddressOpen(false);
    setNewAddress({ label: 'Home', type: 'home', flatNo: '', building: '', area: '', pincode: '' });
  };

  const handleSetPrimaryAddress = (addr: (typeof addressList)[0]) => {
    setAddressList((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === addr.id,
      }))
    );
    setSelectedAddress({
      id: addr.id,
      type: addr.type as any,
      label: addr.label,
      flatNo: addr.flatNo,
      building: addr.building,
      area: addr.area,
      city: addr.city,
      pincode: addr.pincode,
      isDefault: true,
    });
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('QUICKVIKRAM100');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTopUpWallet = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topUpAmount);
    if (!isNaN(val) && val > 0) {
      setWalletBalance((prev) => prev + val);
      setIsAddMoneyOpen(false);
    }
  };

  const activeOrder = orders && orders.length > 0 ? orders[0] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* ========================================================================= */}
      {/* HERO PROFILE BANNER */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ink via-header-dark to-basil-dark text-white p-6 sm:p-8 shadow-float border border-white/10">
        {/* Decorative Background Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-leaf/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-mango/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-mango to-brand text-ink font-display font-black text-2xl sm:text-3xl flex items-center justify-center shadow-glow border-2 border-white/20">
                {userProfile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <span className="absolute -bottom-1 -right-1 bg-basil border-2 border-ink text-white p-1 rounded-full text-xs shadow-sm" title="Verified Account">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-mango/20 border border-mango/40 text-mango px-2.5 py-0.5 rounded-pill text-[11px] font-extrabold uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" />
                  {userProfile.tier}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80 font-medium">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-brand" />
                  {userProfile.phone}
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-brand" />
                  {userProfile.email}
                </span>
              </div>
              <p className="text-[11px] text-white/50">Member since {userProfile.memberSince}</p>
            </div>
          </div>

          {/* Edit Profile Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white px-4 py-2.5 rounded-pill text-xs font-bold transition-all border border-white/15 backdrop-blur-md"
            >
              <Edit3 className="w-4 h-4 text-brand" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-2 bg-beet/30 hover:bg-beet/50 text-white px-4 py-2.5 rounded-pill text-xs font-bold transition-all border border-beet/40"
            >
              <LogOut className="w-4 h-4 text-pink-300" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Ribbon */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-basil/30 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 font-medium">Avg Speed</p>
              <p className="text-sm sm:text-base font-mono font-extrabold text-white">8.4 mins</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-mango/20 text-mango">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 font-medium">Quick Wallet</p>
              <p className="text-sm sm:text-base font-mono font-extrabold text-mango">
                {formatCurrency(walletBalance)}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 font-medium">Delivered</p>
              <p className="text-sm sm:text-base font-mono font-extrabold text-white">14 Orders</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-white/60 font-medium">Saved Total</p>
              <p className="text-sm sm:text-base font-mono font-extrabold text-emerald-400">₹1,280</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIVE ACTIVE ORDER TRACKING BANNER (If recent order) */}
      {/* ========================================================================= */}
      {activeOrder && (
        <div className="bg-gradient-to-r from-leaf-light via-surface to-basil-light border-2 border-basil/30 rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-basil text-white flex items-center justify-center shadow-pill">
                  <Package className="w-6 h-6 animate-bounce" />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-mango rounded-full border-2 border-white animate-ping" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-basil-dark uppercase tracking-wider bg-basil/15 px-2 py-0.5 rounded-md">
                    Order Active #{activeOrder.orderNumber}
                  </span>
                  <span className="text-xs font-bold text-ink">
                    • Arriving in <span className="text-basil font-mono">7 Mins</span>
                  </span>
                </div>
                <p className="text-xs text-ink-600 font-medium mt-1">
                  {activeOrder.items.length} items from {activeOrder.vendorName} • Delivery Rider Assigned
                </p>
              </div>
            </div>

            <Link
              href={`/orders/${activeOrder.id}`}
              className="inline-flex items-center gap-2 bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-5 py-2.5 rounded-pill shadow-pill transition-all active:scale-95 shrink-0"
            >
              <span>Track Live Delivery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DASHBOARD NAVIGATION TABS & CONTENT LAYOUT */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Navigation Sidebar */}
        <div className="space-y-2">
          <nav className="bg-surface rounded-2xl border border-mist p-3 shadow-card space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'overview' ? 'opacity-100' : 'opacity-40'}`} />
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>My Orders & History</span>
              </div>
              <span className="bg-mango/20 text-mango-hover font-mono text-[10px] px-2 py-0.5 rounded-full font-black">
                {orders?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <span className="text-[10px] bg-mist px-2 py-0.5 rounded-full text-ink-500 font-bold">
                {addressList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'wallet'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4" />
                <span>Quick Wallet & Refunds</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-extrabold">
                {formatCurrency(walletBalance)}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rewards')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rewards'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4" />
                <span>Rewards & Referrals</span>
              </div>
              <span className="text-[10px] bg-mango text-ink font-black px-1.5 py-0.5 rounded-full">
                HOT
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-basil text-white shadow-pill font-extrabold'
                  : 'text-ink-600 hover:bg-surface-muted hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Settings & Security</span>
              </div>
            </button>
          </nav>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-paper to-surface-muted rounded-2xl p-4 border border-mist shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-basil-light text-basil">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-ink">Need Help with Order?</h4>
                <p className="text-[11px] text-ink-500 font-medium">24x7 Customer Care Support</p>
              </div>
            </div>
            <button
              onClick={() => alert('Opening QuickBasket Live Support Chat...')}
              className="w-full text-center bg-surface border border-mist hover:bg-white text-ink text-xs font-bold py-2 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Chat with Support</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-basil" />
            </button>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('orders')}
                  className="bg-surface hover:border-basil/40 p-5 rounded-2xl border border-mist shadow-card cursor-pointer transition-all hover:shadow-float group"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-basil-light text-basil group-hover:scale-110 transition-transform">
                      <Package className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-basil group-hover:underline">View All →</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-ink mt-4">Order History</h3>
                  <p className="text-xs text-ink-500 font-medium mt-0.5">
                    Track deliveries & instant reorders
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('addresses')}
                  className="bg-surface hover:border-basil/40 p-5 rounded-2xl border border-mist shadow-card cursor-pointer transition-all hover:shadow-float group"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-mango-light text-mango-hover group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-basil group-hover:underline">Manage →</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-ink mt-4">Delivery Addresses</h3>
                  <p className="text-xs text-ink-500 font-medium mt-0.5">
                    {addressList.length} saved delivery locations
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('wallet')}
                  className="bg-surface hover:border-basil/40 p-5 rounded-2xl border border-mist shadow-card cursor-pointer transition-all hover:shadow-float group"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-beet-light text-beet group-hover:scale-110 transition-transform">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-basil group-hover:underline">Top Up →</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-ink mt-4">Quick Wallet</h3>
                  <p className="text-xs font-mono font-bold text-basil mt-0.5">
                    {formatCurrency(walletBalance)} Available
                  </p>
                </div>
              </div>

              {/* Default Delivery Address Card */}
              <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-basil" />
                    <h3 className="text-base font-extrabold text-ink">Primary Delivery Location</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className="text-xs font-bold text-basil hover:underline flex items-center gap-1"
                  >
                    <span>Change Address</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-surface-muted p-4 rounded-xl border border-mist flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-ink uppercase tracking-wider bg-basil-light text-basil px-2 py-0.5 rounded-md">
                        {selectedAddress?.label || 'PRIMARY HOME'}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-ink mt-1">
                      {selectedAddress?.flatNo}, {selectedAddress?.building}
                    </p>
                    <p className="text-xs text-ink-500 font-medium">
                      {area}, {city} - {pincode}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Deliverable in 10 mins
                  </span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-ink">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-basil hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders && orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.slice(0, 2).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-xl bg-paper border border-mist flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-surface-muted transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-ink">{ord.orderNumber}</span>
                            <span className="text-[10px] font-extrabold uppercase bg-basil-light text-basil px-2 py-0.5 rounded-pill">
                              {ord.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-ink-600 font-medium">
                            {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                          </p>
                          <p className="text-[11px] text-ink-400 font-mono">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="font-mono text-sm font-extrabold text-ink">
                            {formatCurrency(ord.grandTotal)}
                          </span>
                          <Link
                            href={`/orders/${ord.id}`}
                            className="bg-basil-light hover:bg-basil hover:text-white text-basil text-xs font-bold px-3.5 py-1.5 rounded-pill transition-all"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ink-400 py-4 text-center">No orders found.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-ink">My Order History</h2>
                  <p className="text-xs text-ink-500 font-medium">
                    All your past grocery & daily essentials orders
                  </p>
                </div>
                <Link
                  href="/"
                  className="bg-basil text-white text-xs font-bold px-4 py-2 rounded-pill shadow-pill hover:bg-basil-hover transition-all"
                >
                  Order Fresh Groceries
                </Link>
              </div>

              {!orders || orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-ink-300 mx-auto" />
                  <h3 className="text-sm font-extrabold text-ink">No orders found</h3>
                  <p className="text-xs text-ink-500">Your basket history will appear here once you order.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-surface border border-mist shadow-sm space-y-4 hover:border-basil/30 transition-all"
                    >
                      <div className="flex justify-between items-start border-b border-mist pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-ink">{order.orderNumber}</span>
                            <span className="text-[10px] font-extrabold uppercase bg-basil-light text-basil px-2.5 py-0.5 rounded-pill">
                              {order.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-ink-500 font-medium mt-0.5">{order.vendorName}</p>
                        </div>
                        <Link
                          href={`/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-basil hover:underline"
                        >
                          <span>Track / Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((it) => (
                          <div key={it.productId} className="flex justify-between items-center text-xs">
                            <span className="font-medium text-ink">
                              {it.productName} ({it.variantName}){' '}
                              <span className="text-basil font-mono font-bold">x{it.quantity}</span>
                            </span>
                            <span className="font-mono font-bold text-ink">
                              {formatCurrency(it.unitPrice * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-mist flex justify-between items-center text-xs">
                        <span className="text-ink-400 font-medium">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-black text-basil">
                            Total: {formatCurrency(order.grandTotal)}
                          </span>
                          <button
                            onClick={() => alert(`Reordering items from ${order.orderNumber}...`)}
                            className="flex items-center gap-1 text-[11px] font-bold bg-mango-light text-ink hover:bg-mango px-3 py-1 rounded-pill transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-ink">Saved Delivery Addresses</h2>
                  <p className="text-xs text-ink-500 font-medium">
                    Manage your home, office, and frequent delivery spots
                  </p>
                </div>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="flex items-center gap-1.5 bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-4 py-2.5 rounded-pill shadow-pill transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addressList.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      addr.isDefault
                        ? 'border-basil bg-leaf-light/40 shadow-sm'
                        : 'border-mist bg-surface hover:border-ink/20'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {addr.type === 'home' && <Home className="w-4 h-4 text-basil" />}
                          {addr.type === 'work' && <Briefcase className="w-4 h-4 text-mango-hover" />}
                          {addr.type === 'other' && <Building className="w-4 h-4 text-purple-600" />}
                          <span className="text-xs font-black text-ink">{addr.label}</span>
                        </div>
                        {addr.isDefault ? (
                          <span className="text-[10px] font-black uppercase bg-basil text-white px-2 py-0.5 rounded-md">
                            PRIMARY
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetPrimaryAddress(addr)}
                            className="text-[11px] font-bold text-basil hover:underline"
                          >
                            Set as Primary
                          </button>
                        )}
                      </div>

                      <div className="text-xs text-ink-600 space-y-1 font-medium pt-1">
                        <p className="font-extrabold text-ink">{addr.flatNo}, {addr.building}</p>
                        <p>{addr.area}</p>
                        <p>{addr.city} - {addr.pincode}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-mist/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Express 10 Min
                      </span>
                      <button
                        onClick={() =>
                          setAddressList((prev) => prev.filter((a) => a.id !== addr.id))
                        }
                        className="text-ink-400 hover:text-beet transition-colors p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WALLET & REFUNDS */}
          {activeTab === 'wallet' && (
            <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-ink to-basil-dark p-6 rounded-2xl text-white shadow-float">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-mango" />
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      QuickBasket Wallet Balance
                    </span>
                  </div>
                  <h3 className="text-3xl font-mono font-black text-mango">
                    {formatCurrency(walletBalance)}
                  </h3>
                  <p className="text-[11px] text-white/60">
                    Instant 1-second checkout & 100% refund guarantee
                  </p>
                </div>

                <button
                  onClick={() => setIsAddMoneyOpen(true)}
                  className="flex items-center gap-2 bg-mango hover:bg-mango-hover text-ink text-xs font-black px-5 py-2.5 rounded-pill shadow-pill transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Money</span>
                </button>
              </div>

              {/* Features & Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-paper border border-mist space-y-1">
                  <Zap className="w-5 h-5 text-basil" />
                  <h4 className="text-xs font-bold text-ink">Zero-Delay Payment</h4>
                  <p className="text-[11px] text-ink-500 font-medium">Skip OTPs and payment gates</p>
                </div>
                <div className="p-4 rounded-xl bg-paper border border-mist space-y-1">
                  <TrendingUp className="w-5 h-5 text-mango-hover" />
                  <h4 className="text-xs font-bold text-ink">5% Extra Cashback</h4>
                  <p className="text-[11px] text-ink-500 font-medium">On wallet recharges ₹500+</p>
                </div>
                <div className="p-4 rounded-xl bg-paper border border-mist space-y-1">
                  <Shield className="w-5 h-5 text-sky-600" />
                  <h4 className="text-xs font-bold text-ink">Instant Refund</h4>
                  <p className="text-[11px] text-ink-500 font-medium">Refunds credited in 3 seconds</p>
                </div>
              </div>

              {/* Saved UPI / Cards */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-ink">Saved Payment Methods</h3>
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-surface border border-mist flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-basil" />
                      <div>
                        <p className="font-bold text-ink">Google Pay / PhonePe UPI</p>
                        <p className="text-[11px] text-ink-500">vikram.kumar@okicici</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-basil-light text-basil px-2 py-0.5 rounded-md">
                      DEFAULT
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-mist flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-bold text-ink">HDFC Bank Credit Card</p>
                        <p className="text-[11px] text-ink-500">•••• •••• •••• 4092</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-ink-400">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REWARDS & REFERRALS */}
          {activeTab === 'rewards' && (
            <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-mango-light via-paper to-leaf-light p-6 rounded-2xl border border-mango/30 space-y-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-mango-hover" />
                  <h2 className="text-lg font-black text-ink">Refer & Earn ₹100 Free Groceries</h2>
                </div>
                <p className="text-xs text-ink-600 font-medium max-w-xl">
                  Invite your friends and family to QuickBasket. When they place their first 10-minute order, both of you get ₹100 credited to your QuickWallet!
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <div className="w-full sm:w-auto flex items-center justify-between gap-4 bg-surface border-2 border-dashed border-basil/40 px-4 py-2.5 rounded-xl">
                    <span className="font-mono text-sm font-black text-basil tracking-wider">
                      QUICKVIKRAM100
                    </span>
                    <button
                      onClick={handleCopyReferral}
                      className="text-xs font-bold text-ink-600 hover:text-basil flex items-center gap-1"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-4 h-4 text-basil" />
                          <span className="text-basil">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleCopyReferral}
                    className="w-full sm:w-auto bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-6 py-3 rounded-pill shadow-pill transition-all"
                  >
                    Share Referral Link
                  </button>
                </div>
              </div>

              {/* Active Vouchers & Coupons */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-ink">Active Discount Coupons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-dashed border-basil/40 bg-leaf-light/30 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-black bg-basil text-white px-2.5 py-0.5 rounded-md">
                        QUICK50
                      </span>
                      <span className="text-[10px] font-bold text-basil">Expires in 3 days</span>
                    </div>
                    <p className="text-xs font-bold text-ink">Flat ₹50 OFF on orders above ₹299</p>
                    <p className="text-[11px] text-ink-500 font-medium">Applicable on fresh vegetables & dairy</p>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-mango/50 bg-mango-light/30 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-black bg-mango text-ink px-2.5 py-0.5 rounded-md">
                        FREESHIP
                      </span>
                      <span className="text-[10px] font-bold text-mango-hover">Unlimited Use</span>
                    </div>
                    <p className="text-xs font-bold text-ink">Free Express 10-Min Delivery</p>
                    <p className="text-[11px] text-ink-500 font-medium">No minimum cart amount required</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & SECURITY */}
          {activeTab === 'settings' && (
            <div className="bg-surface rounded-2xl border border-mist p-6 shadow-card space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-lg font-black text-ink">Account Settings & Notifications</h2>
                <p className="text-xs text-ink-500 font-medium">Manage preferences and security settings</p>
              </div>

              <div className="space-y-4 divide-y divide-mist">
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-ink">WhatsApp Order Updates</p>
                    <p className="text-[11px] text-ink-500">Receive live delivery tracking on WhatsApp</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.orderUpdatesWhatsapp}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, orderUpdatesWhatsapp: e.target.checked }))
                    }
                    className="w-4 h-4 accent-basil rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-ink">1-Click Express Checkout</p>
                    <p className="text-[11px] text-ink-500">Auto-select primary address and payment mode</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.oneClickCheckout}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, oneClickCheckout: e.target.checked }))
                    }
                    className="w-4 h-4 accent-basil rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-ink">Promotional Offers & Discounts</p>
                    <p className="text-[11px] text-ink-500">Receive weekend sales & coupon alerts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.promoEmails}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, promoEmails: e.target.checked }))
                    }
                    className="w-4 h-4 accent-basil rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-mist">
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center gap-2 text-xs font-extrabold text-beet hover:underline"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out of QuickBasket Account</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDIT PROFILE */}
      {/* ========================================================================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-mist shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-mist pb-3">
              <h3 className="text-base font-black text-ink">Edit Profile Details</h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-ink-400 hover:text-ink p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-ink-500 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-5 py-2.5 rounded-pill shadow-pill transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD ADDRESS */}
      {/* ========================================================================= */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-mist shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-mist pb-3">
              <h3 className="text-base font-black text-ink">Add New Delivery Address</h3>
              <button
                onClick={() => setIsAddAddressOpen(false)}
                className="text-ink-400 hover:text-ink p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {['home', 'work', 'other'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setNewAddress((prev) => ({
                        ...prev,
                        type: t,
                        label: t === 'home' ? 'Home' : t === 'work' ? 'Work' : 'Other',
                      }))
                    }
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      newAddress.type === t
                        ? 'bg-basil text-white border-basil shadow-sm font-extrabold'
                        : 'bg-surface-muted text-ink-600 border-mist'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">House / Flat / Floor No.</label>
                <input
                  type="text"
                  placeholder="e.g. Flat B-201, 2nd Floor"
                  value={newAddress.flatNo}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, flatNo: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Building / Apartment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sunshine Residency"
                  value={newAddress.building}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, building: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Area / Street / Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Connaught Place, Sector 18"
                  value={newAddress.area}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, area: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Pincode</label>
                <input
                  type="text"
                  placeholder="110001"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-ink-500 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-5 py-2.5 rounded-pill shadow-pill transition-all"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TOP UP WALLET */}
      {/* ========================================================================= */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-mist shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-mist pb-3">
              <h3 className="text-base font-black text-ink">Add Money to QuickWallet</h3>
              <button
                onClick={() => setIsAddMoneyOpen(false)}
                className="text-ink-400 hover:text-ink p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTopUpWallet} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Enter Amount (₹)</label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-sm font-mono font-bold text-ink focus:outline-none"
                  required
                  min="50"
                />
              </div>

              <div className="flex gap-2">
                {['200', '500', '1000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className="flex-1 py-1.5 bg-paper hover:bg-basil-light border border-mist text-xs font-mono font-bold text-ink rounded-lg transition-colors"
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-mango-light/40 border border-mango/30 text-xs text-ink-600 font-medium">
                🎁 Add ₹500 or more to get instant ₹25 bonus cashback!
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMoneyOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-ink-500 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-mango hover:bg-mango-hover text-ink text-xs font-black px-5 py-2.5 rounded-pill shadow-pill transition-all"
                >
                  Proceed to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: LOGOUT CONFIRMATION */}
      {/* ========================================================================= */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl border border-mist shadow-float max-w-sm w-full p-6 text-center space-y-4 animate-scaleIn">
            <div className="w-12 h-12 rounded-full bg-beet-light text-beet flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-ink">Log out of your account?</h3>
              <p className="text-xs text-ink-500 font-medium mt-1">
                You will need to sign in again to access your saved addresses & order history.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-pill border border-mist text-xs font-bold text-ink hover:bg-surface-muted"
              >
                Cancel
              </button>
              <Link
                href="/login"
                className="flex-1 py-2.5 rounded-pill bg-beet hover:bg-beet/90 text-white text-xs font-extrabold transition-all"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

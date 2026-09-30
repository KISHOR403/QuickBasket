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
  Share2,
} from 'lucide-react';
import { useLocationStore } from '@/store/location';
import { useOrdersQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';
import { SupportChatModal } from '@/components/common/SupportChatModal';

// Redesigned 2026 Modular Account Components
import { PersonalGreeting } from '@/components/account/PersonalGreeting';
import { AccountMetrics } from '@/components/account/AccountMetrics';
import { LiveDelivery } from '@/components/account/LiveDelivery';
import { QuickActions } from '@/components/account/QuickActions';
import { BentoAccountGrid } from '@/components/account/BentoAccountGrid';
import { RecentOrders } from '@/components/account/RecentOrders';
import { DeliveryLocation } from '@/components/account/DeliveryLocation';

export default function AccountPage() {
  const { selectedAddress, pincode, area, city, setSelectedAddress, openLocationModal } =
    useLocationStore() as any;
  const { data: orders } = useOrdersQuery();

  // Tab State: Horizontal Navigation
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings'
  >('overview');

  // User State
  const [userProfile, setUserProfile] = useState({
    name: 'Vikram Kumar',
    phone: '+91 98765 43210',
    email: 'vikram.kumar@example.com',
    memberSince: 'Aug 2024',
    tier: 'Premium Member',
  });

  // Modal States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
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
    if (setSelectedAddress) {
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
    }
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

  // Active Live Order
  const activeOrder = orders && orders.length > 0 ? orders[0] : null;

  interface AccountTabItem {
    id: 'overview' | 'orders' | 'addresses' | 'wallet' | 'rewards' | 'settings';
    label: string;
    count?: number;
    badge?: string;
  }

  const tabs: AccountTabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders', count: orders?.length || 14 },
    { id: 'addresses', label: 'Addresses', count: addressList.length },
    { id: 'wallet', label: 'Wallet', badge: formatCurrency(walletBalance) },
    { id: 'rewards', label: 'Rewards', badge: 'HOT' },
    { id: 'settings', label: 'Security' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] text-ink selection:bg-basil/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-28 md:pt-24 space-y-6 pb-12">
        {/* ========================================================================= */}
        {/* 1. PERSONAL GREETING (Warm, Editorial) */}
        {/* ========================================================================= */}
        <PersonalGreeting
          name={userProfile.name}
          tier={userProfile.tier}
          memberSince={userProfile.memberSince}
          onAvatarClick={() => setIsEditProfileOpen(true)}
        />

        {/* ========================================================================= */}
        {/* 2. COMPACT METRICS STRIP (Typography & Icons, No Heavy Cards) */}
        {/* ========================================================================= */}
        <AccountMetrics
          walletBalance={walletBalance}
          totalOrders={orders?.length || 14}
          totalSavings={1280}
          avgDeliveryMinutes={8.4}
          onSelectTab={setActiveTab}
          onOpenAddMoney={() => setIsAddMoneyOpen(true)}
        />

        {/* ========================================================================= */}
        {/* 3. ACTIVE LIVE DELIVERY — MAIN FOCUS */}
        {/* ========================================================================= */}
        <LiveDelivery
          order={activeOrder}
          onTrackClick={() => {
            if (activeOrder) setActiveTab('orders');
          }}
        />

        {/* ========================================================================= */}
        {/* 4. QUICK ACTIONS ROW */}
        {/* ========================================================================= */}
        <QuickActions
          onAddAddress={() => setIsAddAddressOpen(true)}
          onReorder={() => setActiveTab('orders')}
          onAddMoney={() => setIsAddMoneyOpen(true)}
          onRewards={() => setActiveTab('rewards')}
          onSupport={() => setIsSupportChatOpen(true)}
        />

        {/* ========================================================================= */}
        {/* 5. HORIZONTAL NAVIGATION TABS (Sidebar Completely Removed) */}
        {/* ========================================================================= */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-ink/[0.03] border border-ink/[0.05] rounded-2xl overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-ink text-white shadow-xs font-extrabold'
                      : 'text-ink-600 hover:text-ink hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-ink/[0.06] text-ink-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                        tab.badge === 'HOT'
                          ? 'bg-mango text-ink'
                          : isActive
                          ? 'bg-emerald-400 text-ink'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. TAB CONTENT VIEWS */}
        {/* ========================================================================= */}
        {/* TAB A: OVERVIEW (BENTO GRID + INTEGRATED LOCATION + RECENT ACTIVITY) */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Bento Account Grid */}
            <BentoAccountGrid
              totalOrders={orders?.length || 14}
              recentOrder={activeOrder}
              savedAddressesCount={addressList.length}
              primaryAddress={addressList.find((a) => a.isDefault) || addressList[0]}
              walletBalance={walletBalance}
              totalSaved={1280}
              onNavigateTab={setActiveTab}
              onOpenAddMoney={() => setIsAddMoneyOpen(true)}
              onOpenAddAddress={() => setIsAddAddressOpen(true)}
            />

            {/* Primary Delivery Location */}
            <DeliveryLocation
              address={addressList.find((a) => a.isDefault) || addressList[0]}
              onChangeAddress={() => setActiveTab('addresses')}
            />

            {/* Recent Activity Timeline */}
            <RecentOrders
              orders={orders as any}
              onViewAll={() => setActiveTab('orders')}
              onReorder={(ord) => {
                alert(`Reordering items from ${ord.orderNumber}...`);
              }}
            />
          </div>
        )}

        {/* TAB B: ORDERS & HISTORY */}
        {activeTab === 'orders' && (
          <div className="bg-white/80 rounded-2xl border border-ink/[0.06] p-6 space-y-6 shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-ink">My Order History</h2>
                <p className="text-xs text-ink-500 font-medium">
                  All past grocery baskets delivered to your doorstep in minutes
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 bg-basil hover:bg-basil-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow-pill transition-all active:scale-95 self-start sm:self-center"
              >
                <span>Shop Fresh Groceries</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {!orders || orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Package className="w-12 h-12 text-ink-300 mx-auto" />
                <h3 className="text-sm font-extrabold text-ink">No orders found</h3>
                <p className="text-xs text-ink-500">
                  Your past deliveries and grocery bills will appear right here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl bg-white border border-ink/[0.06] hover:border-basil/30 transition-all shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-start border-b border-ink/[0.04] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-ink">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase bg-basil/10 text-basil px-2.5 py-0.5 rounded-full">
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-ink-500 font-medium mt-0.5">
                          {order.vendorName}
                        </p>
                      </div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-basil hover:underline"
                      >
                        <span>Track / Invoice</span>
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

                    <div className="pt-3 border-t border-ink/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
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
                        <span className="font-mono text-sm font-black text-ink">
                          Total: {formatCurrency(order.grandTotal)}
                        </span>
                        <button
                          onClick={() => alert(`Reordering items from ${order.orderNumber}...`)}
                          className="flex items-center gap-1 text-[11px] font-bold bg-basil/10 text-basil hover:bg-basil hover:text-white px-3 py-1.5 rounded-xl transition-all"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>1-Tap Reorder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB C: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="bg-white/80 rounded-2xl border border-ink/[0.06] p-6 space-y-6 shadow-xs animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-ink">Saved Delivery Locations</h2>
                <p className="text-xs text-ink-500 font-medium">
                  Locations served by QuickBasket 10-minute dark stores
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddAddressOpen(true)}
                className="inline-flex items-center gap-1.5 bg-basil hover:bg-basil-hover text-white text-xs font-bold px-4 py-2 rounded-xl shadow-pill transition-all active:scale-95 self-start sm:self-center"
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
                      ? 'border-basil/40 bg-emerald-50/40 shadow-xs'
                      : 'border-ink/[0.06] bg-white hover:border-ink/[0.12]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {addr.type === 'home' && <Home className="w-4 h-4 text-basil" />}
                        {addr.type === 'work' && <Briefcase className="w-4 h-4 text-mango" />}
                        {addr.type === 'other' && <Building className="w-4 h-4 text-purple-600" />}
                        <span className="text-xs font-black text-ink">{addr.label}</span>
                      </div>
                      {addr.isDefault ? (
                        <span className="text-[9px] font-black uppercase bg-basil text-white px-2 py-0.5 rounded-md">
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

                    <div className="text-xs text-ink-600 space-y-0.5 font-medium pt-1">
                      <p className="font-extrabold text-ink">
                        {addr.flatNo}, {addr.building}
                      </p>
                      <p>{addr.area}</p>
                      <p>
                        {addr.city} — {addr.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-ink/[0.04] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-basil" /> 10-Min Fast Dark Store
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

        {/* TAB D: QUICK WALLET */}
        {activeTab === 'wallet' && (
          <div className="bg-white/80 rounded-2xl border border-ink/[0.06] p-6 space-y-6 shadow-xs animate-fadeIn">
            {/* Top balance hero */}
            <div className="bg-gradient-to-br from-ink via-header-dark to-basil-dark p-6 sm:p-7 rounded-2xl text-white shadow-float flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-mango" />
                  <span className="text-[11px] font-mono font-bold text-white/70 uppercase tracking-wider">
                    QuickBasket Wallet Balance
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-mono font-black text-mango">
                  {formatCurrency(walletBalance)}
                </h3>
                <p className="text-xs text-white/60">
                  Instant 1-second checkout with 100% refund guarantee
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddMoneyOpen(true)}
                className="flex items-center gap-2 bg-mango hover:bg-mango-hover text-ink text-xs font-black px-5 py-2.5 rounded-xl shadow-pill transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Money</span>
              </button>
            </div>

            {/* Benefits 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-ink/[0.06] space-y-1">
                <Zap className="w-4 h-4 text-basil" />
                <h4 className="text-xs font-bold text-ink">Zero-Delay Payment</h4>
                <p className="text-[11px] text-ink-500 font-medium">
                  Skip OTPs, passwords, and bank gateway errors.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-ink/[0.06] space-y-1">
                <TrendingUp className="w-4 h-4 text-mango" />
                <h4 className="text-xs font-bold text-ink">5% Extra Cashback</h4>
                <p className="text-[11px] text-ink-500 font-medium">
                  On every recharge of ₹500 or more.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-ink/[0.06] space-y-1">
                <Shield className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-ink">Instant Refund</h4>
                <p className="text-[11px] text-ink-500 font-medium">
                  Credited in 3 seconds if an item is out of stock.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB E: REWARDS & REFERRALS */}
        {activeTab === 'rewards' && (
          <div className="bg-white/80 rounded-2xl border border-ink/[0.06] p-6 space-y-6 shadow-xs animate-fadeIn">
            {/* Referral Hero Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-cream/60 to-emerald-50 border border-mango/30 space-y-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-mango" />
                <h2 className="text-base sm:text-lg font-black text-ink">
                  Refer & Earn ₹100 Free Groceries
                </h2>
              </div>
              <p className="text-xs text-ink-600 font-medium max-w-xl">
                Invite friends to QuickBasket. When they place their first 10-minute order, both of
                you receive ₹100 instantly in your QuickWallet!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <div className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white border-2 border-dashed border-basil/30 px-4 py-2 rounded-xl">
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
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleCopyReferral}
                  className="w-full sm:w-auto bg-basil hover:bg-basil-hover text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-pill transition-all"
                >
                  Share Referral Link
                </button>
              </div>
            </div>

            {/* Active Discount Coupons */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-ink-400 uppercase tracking-wider">
                Active Discount Coupons
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-dashed border-basil/40 bg-leaf-light/30 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-black bg-basil text-white px-2.5 py-0.5 rounded-md">
                      QUICK50
                    </span>
                    <span className="text-[10px] font-bold text-basil">Expires in 3 days</span>
                  </div>
                  <p className="text-xs font-bold text-ink">Flat ₹50 OFF on orders above ₹299</p>
                  <p className="text-[11px] text-ink-500 font-medium">
                    Applicable on fresh vegetables & dairy
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-mango/50 bg-mango-light/30 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-black bg-mango text-ink px-2.5 py-0.5 rounded-md">
                      FREESHIP
                    </span>
                    <span className="text-[10px] font-bold text-mango-hover">Unlimited Use</span>
                  </div>
                  <p className="text-xs font-bold text-ink">Free Express 10-Min Delivery</p>
                  <p className="text-[11px] text-ink-500 font-medium">
                    No minimum cart amount required
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB F: SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <div className="bg-white/80 rounded-2xl border border-ink/[0.06] p-6 space-y-6 shadow-xs animate-fadeIn">
            <div>
              <h2 className="text-lg font-black text-ink">Account Settings & Security</h2>
              <p className="text-xs text-ink-500 font-medium">
                Manage notifications, one-click checkout, and security preferences
              </p>
            </div>

            <div className="space-y-4 divide-y divide-ink/[0.06]">
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <p className="text-xs font-extrabold text-ink">WhatsApp Order Updates</p>
                  <p className="text-[11px] text-ink-500">
                    Receive live rider tracking & bill receipts on WhatsApp
                  </p>
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
                  <p className="text-[11px] text-ink-500">
                    Auto-select primary address and fastest payment method
                  </p>
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
                  <p className="text-xs font-extrabold text-ink">Promotional Offers & Weekend Sales</p>
                  <p className="text-[11px] text-ink-500">
                    Receive weekly organic produce and deal alerts
                  </p>
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

            <div className="pt-4 border-t border-ink/[0.06] flex items-center justify-between">
              <button
                type="button"
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

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE */}
      {/* ========================================================================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-ink/[0.08] shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
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
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-600 hover:bg-surface-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-basil hover:bg-basil-hover text-white shadow-pill transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW ADDRESS */}
      {/* ========================================================================= */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-ink/[0.08] shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
              <h3 className="text-base font-black text-ink">Add Delivery Address</h3>
              <button
                onClick={() => setIsAddAddressOpen(false)}
                className="text-ink-400 hover:text-ink p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Address Label</label>
                <div className="flex gap-2">
                  {['home', 'work', 'other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setNewAddress((prev) => ({
                          ...prev,
                          type: type as any,
                          label: type === 'home' ? 'Home' : type === 'work' ? 'Work' : 'Other',
                        }))
                      }
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                        newAddress.type === type
                          ? 'bg-basil text-white shadow-sm'
                          : 'bg-surface-muted text-ink-600 hover:bg-mist'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Flat / House / Floor No.</label>
                <input
                  type="text"
                  placeholder="e.g. A-402, 4th Floor"
                  value={newAddress.flatNo}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, flatNo: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink">Building / Society Name</label>
                <input
                  type="text"
                  placeholder="e.g. Greenwood Apartments"
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
                  placeholder="e.g. 110001"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-xs font-medium text-ink focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-600 hover:bg-surface-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-basil hover:bg-basil-hover text-white shadow-pill transition-all active:scale-95"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD MONEY TO WALLET */}
      {/* ========================================================================= */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-ink/[0.08] shadow-float max-w-md w-full p-6 space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-mango" />
                <h3 className="text-base font-black text-ink">Recharge QuickWallet</h3>
              </div>
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
                  min="50"
                  step="50"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-surface-muted border border-mist focus:border-basil rounded-input px-3.5 py-2.5 text-lg font-mono font-bold text-ink focus:outline-none"
                  required
                />
              </div>

              {/* Quick Select Buttons */}
              <div className="flex gap-2">
                {['200', '500', '1000', '2000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(amt)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      topUpAmount === amt
                        ? 'bg-mango text-ink shadow-sm'
                        : 'bg-surface-muted text-ink-600 hover:bg-mist'
                    }`}
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-leaf-light/40 border border-basil/20 flex items-center gap-2 text-xs text-basil font-bold">
                <Sparkles className="w-4 h-4 text-mango shrink-0" />
                <span>Get 5% instant cashback on wallet top-up above ₹500!</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMoneyOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-ink-600 hover:bg-surface-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-basil hover:bg-basil-hover text-white shadow-pill transition-all active:scale-95"
                >
                  Proceed to Pay ₹{topUpAmount}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: LOGOUT CONFIRMATION */}
      {/* ========================================================================= */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-ink/[0.08] shadow-float max-w-sm w-full p-6 text-center space-y-4 animate-scaleIn">
            <div className="w-12 h-12 bg-beet-light text-beet rounded-2xl flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-ink">Log out of QuickBasket?</h3>
              <p className="text-xs text-ink-500 font-medium">
                You will need to sign in again to view your active deliveries and wallet.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-surface-muted text-ink hover:bg-mist transition-colors"
              >
                Cancel
              </button>
              <Link
                href="/login"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-beet text-white hover:bg-beet-hover transition-colors"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: CUSTOMER SUPPORT CHAT */}
      {/* ========================================================================= */}
      <SupportChatModal
        isOpen={isSupportChatOpen}
        onClose={() => setIsSupportChatOpen(false)}
        initialTopic="Order Help"
      />
    </div>
  );
}

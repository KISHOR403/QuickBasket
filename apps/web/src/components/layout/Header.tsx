'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ShoppingBag, UserRound, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { useLocationStore } from '@/store/location';
import { useHasMounted } from '@/lib/useHasMounted';

export function Header() {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const { openCartDrawer, openLocationModal } = useUiStore();
  const { city, area } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const mounted = useHasMounted();
  const totalItems = mounted ? getTotalItems() : 0;
  const location = (area || city || 'Choose location').split(',')[0];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="qb-header">
      <div className="qb-header-inner">
        <Link href="/" className="qb-wordmark" aria-label="QuickBasket home">
          <span>QuickBasket</span><i aria-hidden="true" />
        </Link>

        <nav className="qb-header-nav" aria-label="Main navigation">
          <Link href="/search">Shop</Link>
          <Link href="/#categories">Categories</Link>
        </nav>

        <button type="button" onClick={openLocationModal} className="qb-header-location" aria-label={`Change delivery location. Current location: ${location}`}>
          <MapPin size={15} aria-hidden="true" /><span>{location}</span><ChevronDown size={13} aria-hidden="true" />
        </button>

        <form onSubmit={handleSearch} className="qb-header-search" role="search">
          <Search size={16} aria-hidden="true" />
          <input id="header-search-input" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search groceries" aria-label="Search groceries" />
        </form>
        <Link href="/search" className="qb-header-mobile-search" aria-label="Search groceries"><Search size={19} /></Link>

        <Link href="/account" className="qb-header-account"><UserRound size={17} aria-hidden="true" /><span>Account</span></Link>
        <button type="button" onClick={openCartDrawer} className="qb-header-cart" aria-label={`Open cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}>
          <ShoppingBag size={18} aria-hidden="true" /><span>Cart</span><b>{totalItems}</b>
        </button>
      </div>
    </header>
  );
}

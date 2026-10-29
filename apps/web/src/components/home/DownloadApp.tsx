import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBasket } from 'lucide-react';

export function DownloadApp() {
  return (
    <section className="qb-app-promo">
      <div className="qb-app-mark" aria-hidden="true"><ShoppingBasket size={34} strokeWidth={1.4} /></div>
      <div className="qb-app-copy">
        <p className="qb-eyebrow">QuickBasket, wherever you are</p>
        <h2>A good basket,<br /><em>just around the corner.</em></h2>
        <p>Browse and build your grocery basket right here. Mobile app details will be shared when they’re available.</p>
      </div>
      <Link href="/category/fresh-vegetables" className="qb-app-link">Start shopping <ArrowRight size={17} aria-hidden="true" /></Link>
    </section>
  );
}

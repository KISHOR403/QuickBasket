import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoBanners() {
  return (
    <section className="qb-offers">
      <div className="qb-offers-image">
        <Image
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=80"
          alt="Fresh leafy greens and seasonal vegetables"
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
        />
      </div>
      <div className="qb-offers-copy">
        <p className="qb-eyebrow">Offers & seasonal picks</p>
        <h2>Good things<br /><em>for your table.</em></h2>
        <p>Browse fresh produce and everyday pantry favorites. Current prices are shown with each product.</p>
        <Link href="/category/fresh-vegetables" className="qb-button-primary">Shop fresh produce <ArrowRight size={16} aria-hidden="true" /></Link>
        <span className="qb-offers-note">Live promotions will appear here when available.</span>
      </div>
    </section>
  );
}

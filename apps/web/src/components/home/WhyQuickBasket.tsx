import React from 'react';
import Image from 'next/image';
import { Box, Leaf, PackageCheck, Truck } from 'lucide-react';

const FEATURES = [
  {
    title: 'Quality sourcing',
    copy: 'Explore the assortment and review the details available for each product.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=520&q=75',
    Icon: Leaf,
  },
  {
    title: 'Freshness & handling',
    copy: 'Review product images, descriptions and pack sizes before adding.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=520&q=75',
    Icon: PackageCheck,
  },
  {
    title: 'Reliable delivery',
    copy: 'Check delivery and order details during checkout.',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=520&q=75',
    Icon: Truck,
  },
  {
    title: 'Responsible packaging',
    copy: 'Packaging information is not currently listed consistently in the catalogue.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=520&q=75',
    Icon: Box,
  },
];

export function WhyQuickBasket() {
  return (
    <section className="qb-feature-strip" aria-label="Shopping at QuickBasket">
      {FEATURES.map(({ title, copy, image, Icon }) => (
        <article className="qb-feature-tile" key={title}>
          <div className="qb-feature-image"><Image src={image} alt="" fill sizes="(max-width: 640px) 45vw, 22vw" /><span><Icon size={17} aria-hidden="true" /></span></div>
          <h2>{title}</h2>
          <p>{copy}</p>
        </article>
      ))}
    </section>
  );
}

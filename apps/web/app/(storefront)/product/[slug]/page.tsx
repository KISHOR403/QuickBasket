import React from 'react';
import { MOCK_PRODUCTS } from '@quickbasket/mocks';
import { ProductClient } from './ProductClient';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductClient slug={params.slug} />;
}

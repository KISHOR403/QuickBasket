import React from 'react';
import { MOCK_CATEGORIES } from '@quickbasket/mocks';
import { CategoryClient } from './CategoryClient';

export function generateStaticParams() {
  return MOCK_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function CategoryListingPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}

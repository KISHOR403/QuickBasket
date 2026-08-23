import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'QuickBasket - 10 Min Grocery & Multi-Vendor Express Delivery',
  description:
    'Order fresh milk, organic vegetables, snacks, staples and local kirana favorites delivered in 10-15 minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-basil-light selection:text-basil">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

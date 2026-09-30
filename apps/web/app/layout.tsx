import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'QuickBasket — Fresh Groceries in 10 Minutes',
  description:
    'Order fresh milk, organic vegetables, snacks, staples and local kirana favorites delivered in 10-15 minutes. Premium grocery delivery reimagined.',
};

export const viewport: Viewport = {
  themeColor: '#1a6b42',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Warm up the font hosts before the CSS @import fires, so type
            paints sooner and the layout settles without a late reflow. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

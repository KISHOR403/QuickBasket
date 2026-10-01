import type { Metadata } from 'next';
import './globals.css';
import { AdminProviders } from '@/components/providers/AdminProviders';

export const metadata: Metadata = {
  title: 'QuickBasket Operations | Admin Portal',
  description: 'Enterprise fulfillment, inventory, and vendor operations console.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-admin-bg font-sans antialiased text-ink">
        <AdminProviders>{children}</AdminProviders>
      </body>
    </html>
  );
}

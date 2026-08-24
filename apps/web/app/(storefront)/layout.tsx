import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CategorySidebar } from '@/components/common/CategorySidebar';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <CategorySidebar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}

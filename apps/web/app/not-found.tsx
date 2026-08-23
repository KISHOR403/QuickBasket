import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-paper">
      <div className="w-16 h-16 rounded-full bg-basil-light text-basil flex items-center justify-center text-2xl font-black mb-4">
        404
      </div>
      <h1 className="text-2xl font-black text-ink">Page Not Found</h1>
      <p className="text-xs text-ink-500 max-w-sm mt-1 mb-6">
        The grocery item or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-basil text-white px-5 py-2.5 rounded-pill text-xs font-bold shadow-pill hover:bg-basil-hover transition-colors"
      >
        Return to Home Storefront
      </Link>
    </div>
  );
}

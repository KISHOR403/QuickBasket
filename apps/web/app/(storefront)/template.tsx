import React from 'react';

// A template re-mounts on every navigation (unlike layout), so each route's
// content arrives with a quick fade-up instead of snapping into place.
export default function StorefrontTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-fadeInUp">{children}</div>;
}

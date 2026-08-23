'use client';

import { useEffect, useState } from 'react';

/**
 * Returns `false` on the server and on the very first client render, then
 * flips to `true` after the component mounts.
 *
 * Use it to gate UI that depends on client-only state — e.g. a zustand store
 * rehydrated from `localStorage` — so the first client render matches the
 * server markup and React doesn't throw a hydration mismatch. Read the
 * client-only value only once this returns `true`; render the SSR-safe default
 * (usually "empty") until then.
 */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

'use client';
// ============================================================
// React Query Provider
// Wraps the app with QueryClientProvider for all client-side
// data fetching. Configured for NH's data freshness requirements.
// ============================================================

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Content queries: cache for 5 minutes, show stale while refetching
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,

            // Retry failed requests up to 2 times with exponential backoff
            retry: 2,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),

            // Refetch on window focus for slot availability (overridden per query)
            refetchOnWindowFocus: false,

            // Don't refetch on reconnect by default
            refetchOnReconnect: false,
          },
          mutations: {
            // Retry mutations once (for appointment booking, etc.)
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}

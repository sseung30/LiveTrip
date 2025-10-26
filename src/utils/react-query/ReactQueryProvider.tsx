'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Devtools are optional. Avoid importing the package to prevent build errors
// when '@tanstack/react-query-devtools' is not installed.
const ReactQueryDevtools: React.ComponentType | null = null;

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ReactQueryDevtools ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
}

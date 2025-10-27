import { cache } from 'react';
import { HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const getQueryClient = cache(() => new QueryClient());
export const Hydrate = HydrationBoundary;

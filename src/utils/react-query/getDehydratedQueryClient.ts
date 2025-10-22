import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  type QueryKey,
} from '@tanstack/react-query';

export const getQueryClient = cache(() => new QueryClient());

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

export async function getDehydratedQueryClient(queries: QueryProps[]) {
  // 캐싱된 QueryClient를 불러오기
  const queryClient = getQueryClient();

  // 모든 쿼리를 병렬로 prefetch
  await Promise.allSettled(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient);
}
export const Hydrate = HydrationBoundary;

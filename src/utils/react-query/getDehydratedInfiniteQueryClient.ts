import { dehydrate, type QueryKey } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/react-query/getQueryClient';

interface InfiniteQueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
  initialPageParam: number | undefined;
}

export async function getDehydratedInfiniteQueryClient({
  queryKey,
  queryFn,
  initialPageParam,
}: InfiniteQueryProps) {
  // 캐싱된 QueryClient를 불러오기
  const queryClient = getQueryClient();

  // 모든 쿼리를 병렬로 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
  });

  return dehydrate(queryClient);
}

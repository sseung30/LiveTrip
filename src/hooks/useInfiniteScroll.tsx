import {
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

export interface UseInfiniteOptions<TPage, TItem> {
  /**
   * React Query key (필터/검색어 등을 포함해 캐시 분리)
   */
  queryKey: QueryKey;

  /**
   * 페이지의 전체 URL
   */
  initialCursor: number;

  buildUrl: (cursor: number) => string;

  /**
   * 페이지 객체에서 아이템 배열 뽑기
   * 서버의 응답으로부터 원하는 아이템 추출
   */
  selectItems: (page: TPage) => TItem[];

  /**
   * 다음 페이지의 커서를 반환 (없으면 undefined)
   */
  selectNextCursor: (page: TPage) => number | undefined;

  /** 총 아이템 개수 */
  selectTotalCount?: (firstPage: TPage | undefined) => number;

  /** ✅ (선택) 목/특수 로직: 커서 기반으로 페이지를 반환 */
  requestPage?: (cursor: number, signal: AbortSignal) => Promise<TPage>;
}

/** URL 자체를 커서로 쓰는 범용 무한 스크롤 훅 */
export function useInfiniteByCursor<TPage, TItem>({
  queryKey,
  initialCursor,
  buildUrl,
  selectItems,
  selectNextCursor,
  selectTotalCount,
  requestPage,
}: UseInfiniteOptions<TPage, TItem>) {
  const query = useInfiniteQuery<
    TPage,
    Error,
    InfiniteData<TPage>,
    QueryKey,
    number
  >({
    queryKey,
    initialPageParam: initialCursor,
    queryFn: async ({ pageParam, signal }) => {
      if (requestPage) {
        // ✅ 목/특수 로직 사용
        return requestPage(pageParam, signal);
      }
      const url = buildUrl(pageParam);
      const res = await fetch(url, { signal });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      return (await res.json()) as TPage;
    },
    getNextPageParam: (lastPage) => selectNextCursor(lastPage),
  });

  // 데이터 평탄화
  const items = query.data?.pages.flatMap((p) => selectItems(p)) ?? [];
  // 전체 아이템 개수
  const totalCount = selectTotalCount?.(query.data?.pages.at(0)) ?? 0;

  return {
    ...query,
    items,
    totalCount,
  };
}

'use client';

import {
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { apiFetch } from '@/api/api';

const DEFAULT_STALE_TIME = 1000 * 60 * 5;
const DEFAULT_GC_TIME = 1000 * 60 * 30;

export interface UseInfiniteOptions<TPage, TItem> {
  /**
   * React Query key (필터/검색어 등을 포함해 캐시 분리)
   */
  queryKey: QueryKey;

  /**
   * 페이지의 전체 URL
   */
  initialCursor: number | undefined;

  buildUrl: (cursor: number) => string;

  /**
   * 페이지 객체에서 아이템 배열 뽑기
   * 서버의 응답으로부터 원하는 아이템 추출
   */
  selectItems: (page: TPage) => TItem[];

  /**
   * 다음 페이지의 커서를 반환 (없으면 undefined)
   */
  selectNextCursor?: (page: TPage) => number | undefined;

  /** 총 아이템 개수 */
  selectTotalCount?: (firstPage: TPage | undefined) => number;

  pageSize?: number;

  /**
   * 기본 로직용: 아이템에서 커서(id 등)를 뽑는 함수
   * - selectNextCursor를 주지 않는 경우 필요합니다.
   * - “마지막 아이템의 커서”를 다음 커서로 사용합니다.
   */
  getItemCursor?: (item: TItem) => number;
  staleTime?: number;
  gcTime?: number;
}

/** URL 자체를 커서로 쓰는 범용 무한 스크롤 훅 */
export function useInfiniteByCursor<TPage, TItem>({
  queryKey,
  initialCursor,
  buildUrl,
  selectItems,
  selectNextCursor,
  selectTotalCount,
  pageSize = 20,
  getItemCursor,
  staleTime = DEFAULT_STALE_TIME,
  gcTime = DEFAULT_GC_TIME,
}: UseInfiniteOptions<TPage, TItem>) {
  const query = useInfiniteQuery<
    TPage,
    Error,
    InfiniteData<TPage>,
    QueryKey,
    number
  >({
    queryKey,
    initialPageParam: initialCursor as number,
    queryFn: async ({ pageParam }) => {
      const url = buildUrl(pageParam);

      return (await apiFetch<TPage>(url)) as TPage;
    },
    getNextPageParam: (lastPage) => {
      // 사용자가 제공한 계산기가 있으면 그걸 우선 사용
      if (selectNextCursor) {
        return selectNextCursor(lastPage);
      }

      // 기본 로직: “마지막 아이템의 커서” 사용
      const pageItems = selectItems(lastPage);

      if (pageItems.length < pageSize) {
        return undefined;
      }
      if (!getItemCursor) {
        return undefined;
      }
      const lastItem = pageItems[pageItems.length - 1];

      return getItemCursor(lastItem);
    },
  });

  const pageItemsFlat = query.data?.pages.flatMap((p) => selectItems(p)) ?? [];

  const totalCount = selectTotalCount?.(query.data?.pages.at(0)) ?? 0;

  return {
    ...query,
    items: pageItemsFlat,
    totalCount,
    staleTime,
    gcTime,
  };
}

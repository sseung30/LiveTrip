import type { Activity, MyActivities } from '@/domain/myactivities/type';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';

export function useMyActivities() {
  const pageSize = 5;
  const {
    items: activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteByCursor<MyActivities, Activity>({
    queryKey: ['myActivities'],
    initialCursor: 0,
    buildUrl: (cursor) => {
      const url =
        cursor !== 0
          ? `/my-activities?cursorId=${cursor}&size=${pageSize}`
          : `/my-activities?size=${pageSize}`;

      return url;
    },
    selectItems: (view) => view.activities,
    selectNextCursor: (view) => {
      const list = view.activities;

      if (list.length < pageSize) {
        return undefined;
      }

      return list[list.length - 1]?.id;
    },
    selectTotalCount: (first) => first?.totalCount ?? 0,
    pageSize,
  });

  return {
    activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

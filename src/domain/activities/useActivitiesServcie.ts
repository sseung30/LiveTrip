import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import createQueryString from '@/api/create-query-string';
import { queryKeys, queryOptions } from '@/domain/activities/queryOptions';
import type {
  Activity,
  getAllActivitiesResponse,
} from '@/domain/activities/type';
import type { useInfiniteActivitiesParams } from '@/domain/home/type';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';

export function useDetailActivity({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.detail(activityId));
}
export function useSchedules({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.schedules(activityId));
}
export function useReviews({ activityId }: { activityId: number }) {
  return useQuery(queryOptions.reviews(activityId));
}
export function useInfiniteActivities({
  category,
  sort,
  keyword,
}: useInfiniteActivitiesParams) {
  const [page, setPage] = useState(0);
  const { fetchNextPage, ...rest } = useInfiniteByCursor<
    getAllActivitiesResponse,
    Activity
  >({
    queryKey: queryKeys.all(category, sort, keyword),
    initialCursor: undefined,
    buildUrl: (cursorId) => {
      const queryString = createQueryString({
        category,
        sort,
        size: 4,
        cursorId,
        keyword,
        method: 'cursor',
      });
      const endPoint = '/activities/?';

      return `${endPoint}${queryString}`;
    },
    selectNextCursor: (page) => page.cursorId ?? undefined,
    selectItems: (page) => page.activities,
  });

  useEffect(() => {
    if (page > 0) {
      fetchNextPage();
    }
  }, [page, fetchNextPage]);

  return { ...rest, setPage };
}

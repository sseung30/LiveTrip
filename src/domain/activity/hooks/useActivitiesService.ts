import { useEffect, useState } from 'react';
import createQueryString from '@/api/create-query-string';
import type {
  Activity,
  getAllActivitiesResponse,
  useInfiniteActivitiesParams,
} from '@/domain/activity/types';
import { activityQueryKeys } from '@/domain/activity/utils/queryOptions';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';

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
    queryKey: activityQueryKeys.all(category, sort, keyword),
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

import type {
  MyReservationsResponse,
  UserReservation,
} from '@/domain/reservation/types';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';

export function useMyReservations() {
  const pageSize = 5;

  const {
    items: reservationList,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteByCursor<MyReservationsResponse, UserReservation>({
    queryKey: ['myReservations'],
    initialCursor: 0,
    buildUrl: (cursor) => {
      const url =
        cursor !== 0
          ? `/my-reservations?cursorId=${cursor}&size=${pageSize}`
          : `/my-reservations?size=${pageSize}`;

      return url;
    },
    selectItems: (view) => view.reservations,
    selectNextCursor: (view) => {
      const list = view.reservations;

      if (list.length < pageSize) {
        return undefined;
      }

      return list[list.length - 1]?.id;
    },
    selectTotalCount: (first) => first?.totalCount ?? 0,
    pageSize,
  });

  const hasReservations = Boolean(totalCount);

  return {
    reservationList,
    totalCount,
    hasReservations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

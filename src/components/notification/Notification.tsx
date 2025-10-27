'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { apiFetch } from '@/api/api';
import NotificationItem from '@/components/notification/NotificationItem';
import type {
  Notification,
  Notifications,
} from '@/components/notification/type';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function Notification() {
  const pageSize = 1;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    items: notifications,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteByCursor<Notifications, Notification>({
    queryKey: ['myNotifications'],
    initialCursor: 0,
    buildUrl: (cursor) => {
      const url =
        cursor !== 0
          ? `/my-notifications?cursorId=${cursor}&size=${pageSize}`
          : `/my-notifications?size=${pageSize}`;

      return url;
    },
    selectItems: (view) => view.notifications,
    selectNextCursor: (view) => {
      const list = view.notifications;

      if (list.length < pageSize) {
        return undefined;
      }

      return list[list.length - 1]?.id;
    },
    selectTotalCount: (first) => first?.totalCount ?? 0,
    pageSize,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const [page, setPage] = useState(0);

  const { loader } = useIntersectionObserver({
    loading: isFetchingNextPage,
    hasMore: hasNextPage,
    setPage,
    rootRef: containerRef,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  });

  useEffect(() => {
    if (page > 0) {
      fetchNextPage();
    }
  }, [page, fetchNextPage]);

  // const [targetId, setTargetId] = useState<number | null>(null);

  async function deleteNotification(id: number) {
    try {
      await apiFetch(`/my-notifications/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('delete failed', error);
    }
  }

  const queryClient = useQueryClient();

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['myNotifications'] });
    /**
     * },
     */
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['myNotifications'] });

      const previousData = queryClient.getQueryData<
        InfiniteData<Notifications, number>
      >(['myNotifications']);

      queryClient.setQueryData(
        ['myNotifications'],
        (old?: InfiniteData<Notifications, number>) => {
          return (
            old && {
              ...old,
              pages: old.pages.map((p, i) => {
                return {
                  ...p,
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  notifications: (p.notifications ?? []).filter(
                    (n) => n.id !== id
                  ),
                  ...(i === 0
                    ? { totalCount: Math.max(0, p.totalCount - 1) }
                    : {}),
                };
              }),
            }
          );
        }
      );

      return () => queryClient.setQueryData(['myNotifications'], previousData);
    },
    onError: (error, variable, rollback) => {
      if (rollback) {
        rollback();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myNotifications'] });
    },
  });

  /**
   * 메모이제이션을 통해 불필요한 재렌더 감소
   */
  const onDeleteNotification = useCallback(
    (id: number) => {
      deleteNotificationMutation.mutate(id);
    },
    [deleteNotificationMutation]
  );

  return (
    <>
      <div className='w-57.5 rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.25)]'>
        <div className='flex w-full items-center justify-between border-b border-gray-100 px-5 pt-4 pb-3.5'>
          {/* <div className='mb mt-4 mb-3.5 flex w-full items-center justify-between border-b border-gray-100 px-5'> */}
          <h2 className='text-16 leading-4 font-bold text-gray-950'>
            알림 {totalCount}개
          </h2>
          <button className='relative h-6 w-6'>
            <Image fill src='/icons/delete.svg' alt='close' />
          </button>
        </div>
        <div
          ref={containerRef}
          className='h-68 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden'
        >
          {notifications.map((n: Notification) => {
            console.log(n.id);

            return (
              <NotificationItem
                key={n.id}
                n={n}
                onClick={onDeleteNotification}
              />
            );
          })}
          <div ref={loader} />
        </div>
      </div>
    </>
  );
}

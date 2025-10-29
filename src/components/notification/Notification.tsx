'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import NotificationItem from '@/components/notification/NotificationItem';
import type {
  Notification,
  Notifications,
} from '@/components/notification/type';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { apiFetch } from '@/api/api';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export default function Notification({ onClose }: { onClose?: () => void }) {
  const pageSize = 2;
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

  const [now, setNow] = useState(Date.now());

  // 1분마다 기준 시각 갱신 (UI에 상대시간이 갱신되게)
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
    onMutate: async (id) => {
      // 낙관적 업데이트
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
      <div className='w-57.5 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]'>
        <div className='flex w-full items-center justify-between border-b border-gray-100 px-5 pt-4 pb-3.5'>
          {/* <div className='mb mt-4 mb-3.5 flex w-full items-center justify-between border-b border-gray-100 px-5'> */}
          <h2 className='text-16 leading-4 font-bold text-gray-950'>
            알림 {totalCount}개
          </h2>
          <button
            className='text-12 relative flex h-3 items-center leading-[12px] font-medium text-gray-400'
            type='button'
            onClick={onClose}
          >
            닫기
          </button>
        </div>
        <div
          ref={containerRef}
          className='h-75 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden'
        >
          {notifications.map((n: Notification) => {
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

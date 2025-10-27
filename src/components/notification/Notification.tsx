'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import NotificationItem from '@/components/notification/NotificationItem';
import type {
  Notification,
  Notifications,
} from '@/components/notification/type';
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

  return (
    <>
      <div className='w-57.5 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]'>
        <div className='flex w-full items-center justify-between border-b border-gray-100 px-5 pt-4 pb-3.5'>
          {/* <div className='mb mt-4 mb-3.5 flex w-full items-center justify-between border-b border-gray-100 px-5'> */}
          <h2 className='text-16 leading-4 font-bold text-gray-950'>
            알림 {totalCount}개
          </h2>
          <button
            className='relative h-6 w-6'
            type='button'
            onClick={onClose}
          >
            <Image fill src='/icons/delete.svg' alt='close' />
          </button>
        </div>
        <div
          ref={containerRef}
          className='h-68 overflow-auto pb-2 [&::-webkit-scrollbar]:hidden'
        >
          {notifications.map((n: Notification) => (
            <NotificationItem key={n.id} n={n} now={now} />
          ))}
          <div ref={loader} />
        </div>
      </div>
    </>
  );
}

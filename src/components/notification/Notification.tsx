'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type {
  Notification,
  Notifications,
} from '@/components/notification/type';
import { useInfiniteByCursor } from '@/hooks/useInfiniteScroll';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

function parseTime(updatedAt: string) {
  const year = Number(updatedAt.slice(0, 4));
  const month = Number(updatedAt.slice(5, 7));
  const day = Number(updatedAt.slice(8, 10));
  const hour = Number(updatedAt.slice(11, 13));
  const minutes = Number(updatedAt.slice(14, 16));
  const seconds = Number(updatedAt.slice(17, 19));
  const milliseconds = Number(updatedAt.slice(20, 23));

  // 윤달이 있어서 사실상 이게 아주 미세하게 좀 더 정확
  return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
}

function formattedMilliseconds(ms: number) {
  if (ms < 1000) {
    return '방금 전';
  }

  const units = [
    { label: '년', ms: 365 * 30 * 24 * 60 * 60 * 1000 },
    { label: '개월', ms: 30 * 24 * 60 * 60 * 1000 },
    { label: '일', ms: 24 * 60 * 60 * 1000 },
    { label: '시간', ms: 60 * 60 * 1000 },
    { label: '분', ms: 60 * 1000 },
    { label: '초', ms: 1000 },
  ];

  for (const unit of units) {
    if (ms >= unit.ms) {
      const formattedResult = Math.floor(ms / unit.ms);

      return `${formattedResult}${unit.label} 전`;
    }
  }
}

function formattedContents(content: string) {
  const title = content.slice(0, content.indexOf('('));
  const reservedDate = content.slice(
    content.indexOf('('),
    content.indexOf(')') + 1
  );
  const status = content.slice(
    content.indexOf(')') + 6,
    content.indexOf(')') + 8
  );

  return [title, reservedDate, status];
}

export default function Notification() {
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

  const date = new Date();

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
            const { id, content, updatedAt } = n;

            const ReservationStatus = content.slice(-8, -6);
            const updatedTime = parseTime(updatedAt);

            const [title, reservedDate, status] = formattedContents(content);
            const isConfirmed = status === '승인';

            return (
              <div
                key={id}
                className='hover:bg-primary-100 flex w-full flex-col px-5 py-4'
              >
                <div className='mb-2 flex justify-between'>
                  <h3 className='text-14 leading-3.5 font-bold text-gray-950'>
                    예약 {ReservationStatus}
                  </h3>
                  <h3 className='text-12 leading-3 font-medium text-gray-400'>
                    {formattedMilliseconds(
                      date.getTime() - 32400000 - updatedTime.getTime()
                    )}
                  </h3>
                </div>
                <div className='text-14-body font-medium text-gray-800'>
                  {title}
                  <br />
                  {reservedDate}
                  <br />
                  예약이{' '}
                  <span
                    className={
                      isConfirmed ? 'text-primary-500' : 'text-red-500'
                    }
                  >
                    {status}
                  </span>
                  되었어요.
                </div>
              </div>
            );
          })}
          <div ref={loader} />
        </div>
      </div>
    </>
  );
}

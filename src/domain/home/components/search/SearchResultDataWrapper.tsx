'use client';
import { toast } from '@/components/toast';
import { useInfiniteActivities } from '@/domain/activities/useActivitiesServcie';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useEffect } from 'react';
import GridCardList from '../GridCardList';
import EmptyResult from '@/components/ui/EmptyResult';
import Spinner from '@/components/ui/Spinner';

export default function SearchResultDataWrapper({ q }: { q: string }) {
  const {
    items: activities,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    error,
    setPage,
  } = useInfiniteActivities({
    sort: 'latest',
    keyword: q,
  });

  const { loader } = useIntersectionObserver({
    loading: isPending || isFetchingNextPage,
    hasMore: hasNextPage,
    setPage,
  });

  useEffect(() => {
    if (error) {
      toast({ message: error.message, eventType: 'error' });
    }
  }, [error]);

  const hasResult = activities.length > 0;
  return (
    <>
      <div className='flex w-full flex-col items-start gap-6 md:gap-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-18 md:text-24 font-medium'>
            <span className='font-bold'>{q}</span>
            (으)로 검색한 결과입니다.
          </h2>
          <span className='text-14 md:text-18 font-medium text-gray-700'>
            {activities.length}개의 결과
          </span>
        </div>
        {hasResult ? (
          <div className='flex-center flex-col'>
            <GridCardList activities={activities} />
            <div className='mt-12'>
              {isFetchingNextPage && <Spinner size='md' />}
            </div>
            <div ref={loader} />
          </div>
        ) : (
          <div className='self-center-safe'>
            <EmptyResult text='검색 결과가 없어요' />
          </div>
        )}
      </div>
    </>
  );
}

import Skeleton from 'react-loading-skeleton';
import GridCardListSkeleton from '@/domain/home/components/GridCardListSkeleton';

export default function SearchResultSkeleton() {
  return (
    <>
      <div className='items-first flex flex-col justify-between'>
        <div className='mb-4 w-64'>
          <Skeleton className='h-8' />
        </div>
        <div className='mb-6 w-32'>
          <Skeleton className='h-6' />
        </div>
        <GridCardListSkeleton length={4} />
      </div>
    </>
  );
}

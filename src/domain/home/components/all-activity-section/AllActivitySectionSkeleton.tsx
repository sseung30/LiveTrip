import Skeleton from 'react-loading-skeleton';
import GridCardListSkeleton from '../GridCardListSkeleton';

export default function AllActivitySectionSkeleton() {
  return (
    <>
      <div className='items-first mb-2.5 flex flex-col justify-between md:mb-4'>
        <div className='mb:mb-4 mb-2.5 flex w-full flex-row justify-between'>
          <Skeleton
            style={{ borderRadius: 'inherit' }}
            containerClassName='w-[8rem] mb-2.5  md:mb-4'
            className='h-[2.875rem]'
          />
          <Skeleton
            style={{ borderRadius: 'inherit' }}
            containerClassName='w-[5.625rem] mb-2.5  md:mb-4'
            className='h-[2.875rem]'
          />
        </div>
        <div className='*:rounded-[1.125rem]'>
          <Skeleton
            style={{ borderRadius: 'inherit' }}
            className='mb-6 h-[2.875rem] md:mb-8'
          />
        </div>
        <GridCardListSkeleton length={8} />
      </div>
    </>
  );
}

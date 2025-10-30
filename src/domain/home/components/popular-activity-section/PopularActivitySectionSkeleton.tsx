import Skeleton from 'react-loading-skeleton';
import GridCardListSkeleton from '../GridCardListSkeleton';

export default function PopularActivitySectionSkeleton() {
  return (
    <>
      <div className='items-first mb-2 flex flex-col justify-between'>
        <div className='mb:mb-4 mb-2.5'>
          <Skeleton
            style={{ borderRadius: 'inherit' }}
            containerClassName='w-[8rem] mb-2.5  md:mb-4'
            className='h-[2.875rem]'
          />
        </div>
        <GridCardListSkeleton length={4} />
      </div>
    </>
  );
}

import Skeleton from 'react-loading-skeleton';

export default function SessionNavSkeleton() {
  return (
    <div className='flex flex-row gap-4'>
      <Skeleton containerClassName='w-6  mr-4' className='h-6' />
      <Skeleton containerClassName='w-[5rem]' className='h-6' />
      <Skeleton containerClassName='w-12' className='h-6' />
    </div>
  );
}

import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

export default function GridCardListSkeleton({ length }: { length: number }) {
  return (
    <div className='grid w-full grid-cols-2 gap-3.5 overflow-x-scroll md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
      {Array.from({ length }).map((_) => (
        <div
          key={`skeleton-card-${crypto.randomUUID()}`}
          className='w-full *:rounded-[1.125rem] *:md:rounded-4xl'
        >
          <Skeleton
            style={{ borderRadius: 'inherit' }}
            className='aspect-square h-[15.125rem] w-full md:h-[26.43rem] md:rounded-4xl xl:h-[21.562rem]'
          />
        </div>
      ))}
    </div>
  );
}

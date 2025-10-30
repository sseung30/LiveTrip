import EmptyResult from '@/components/ui/EmptyResult';
import { getAllActivitiesWithCache } from '@/domain/activities/api';
import type { getAllActivitiesParams } from '@/domain/activities/type';
import GridCardList from '@/domain/home/components/GridCardList';

interface SearchResultProps {
  q: string;
}
export default async function SearchResult({ q }: SearchResultProps) {
  const { activities, totalCount } = await getAllActivitiesWithCache({
    sort: 'latest',
    keyword: q,
    page: 1,
    size: 8,
    method: 'cursor',
  } as getAllActivitiesParams);
  const hasResult = totalCount > 0;
  return (
    <>
      <div className='flex w-full flex-col items-start gap-6 md:gap-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-18 md:text-24 font-medium'>
            <span className='font-bold'>{q}</span>
            (으)로 검색한 결과입니다.
          </h2>
          <span className='text-14 md:text-18 font-medium text-gray-700'>
            {totalCount}개의 결과
          </span>
        </div>
        {hasResult ? (
          <GridCardList activities={activities} />
        ) : (
          <div className='self-center-safe'>
            <EmptyResult text='검색 결과가 없어요' />
          </div>
        )}
      </div>
    </>
  );
}

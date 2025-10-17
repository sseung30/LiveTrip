import { useSearchParams } from 'next/navigation';
import GridCardList from '@/domain/home/components/GridCardList';
import { getActivityList } from '@/domain/home/mock';

interface SearchResultProps {
  q: string;
}
export default function SearchResult({ q }: SearchResultProps) {
  const params = useSearchParams();
  const { activities } = getActivityList();
  const count = 200;

  return (
    <>
      <div className='flex flex-col gap-6 md:gap-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-18 md:text-24 font-medium'>
            <span className='font-bold'>{q}</span>
            (으)로 검색한 결과입니다.
          </h2>
          <span className='text-14 md:text-18 font-medium text-gray-700'>
            {count}개의 결과
          </span>
        </div>
        <GridCardList activities={activities} />
      </div>
    </>
  );
}

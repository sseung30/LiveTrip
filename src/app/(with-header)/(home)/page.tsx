import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import AllActivitySection from '@/domain/home/components/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';
import { stringToBoolean } from '@/utils/string-to-boolean';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { page, sort, categoryIndex, descending } = await searchParams;
  const isDescending = stringToBoolean(descending || 'true');

  return (
    <>
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection />
        <Suspense fallback={<Spinner size='md' key={categoryIndex} />}>
          <AllActivitySection
            page={Number(page)}
            sort={sort}
            categoryIndex={Number(categoryIndex)}
            isDescending={isDescending}
          />
        </Suspense>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

import { Suspense } from 'react';
import { queryOptions } from '@/domain/activities/queryOptions';
import AllActivitySection from '@/domain/home/components/all-activity-section/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/popular-activity-section/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';
import IntroSection from '@/domain/home/components/IntroSection';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { sort, category } = await searchParams;

  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...queryOptions.all({
      sort,
      category,
      method: 'cursor',
      size: 8,
    }),
    initialPageParam: undefined,
  });

  return (
    <>
      <IntroSection />
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection />
        <Hydrate state={hydratedInfiniteActivities}>
          <AllActivitySection sort={sort} category={category} />
        </Hydrate>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

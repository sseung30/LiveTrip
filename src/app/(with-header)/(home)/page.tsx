import { Suspense } from 'react';
import { getAllActivitiesWithCache } from '@/domain/activities/api';
import { queryOptions } from '@/domain/activities/queryOptions';
import type { getAllActivitiesParams } from '@/domain/activities/type';
import AllActivitySection from '@/domain/home/components/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

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

  const { activities } = await getAllActivitiesWithCache({
    sort: 'most_reviewed',
    page: 1,
    size: 16,
    method: 'offset',
  } as getAllActivitiesParams);

  return (
    <>
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection activities={activities} />
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

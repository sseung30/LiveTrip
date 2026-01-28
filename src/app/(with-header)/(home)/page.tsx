import { Suspense } from 'react';
import AllActivitySection from '@/domain/activity/components/display/AllActivitySection';
import AllActivityPrefetch from '@/domain/activity/components/display/AllActivitySection/AllActivityPrefetch';
import GridCardListSkeleton from '@/domain/activity/components/display/GridCardListSkeleton';
import IntroSection from '@/domain/activity/components/display/IntroSection';
import PopularActivitySection from '@/domain/activity/components/display/PopularActivitySection';
import PopularActivitySectionSkeleton from '@/domain/activity/components/display/PopularActivitySection/PopularActivitySectionSkeleton';
import ToastLayer from '@/domain/activity/components/display/ToastLayer';
import type { homeSearchParams } from '@/domain/activity/types';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { sort, category } = await searchParams;
  const suspenseKey = `${sort}-${category}`;

  return (
    <>
      <IntroSection />
      <div className='flex-center w-full flex-col gap-20'>
        <Suspense fallback={<PopularActivitySectionSkeleton />}>
          <PopularActivitySection />
        </Suspense>
        <AllActivitySection sort={sort} category={category}>
          <Suspense
            fallback={<GridCardListSkeleton length={8} />}
            key={suspenseKey}
          >
            <AllActivityPrefetch sort={sort} category={category} />
          </Suspense>
        </AllActivitySection>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

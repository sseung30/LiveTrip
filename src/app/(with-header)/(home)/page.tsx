import { Suspense } from 'react';
import AllActivityPrefetch from '@/domain/home/components/all-activity-section/AllActivityPrefetch';
import AllActivitySection from '@/domain/home/components/all-activity-section/AllActivitySection';
import GridCardListSkeleton from '@/domain/home/components/GridCardListSkeleton';
import IntroSection from '@/domain/home/components/IntroSection';
import PopularActivitySection from '@/domain/home/components/popular-activity-section/PopularActivitySection';
import PopularActivitySectionSkeleton from '@/domain/home/components/popular-activity-section/PopularActivitySectionSkeleton';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';

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

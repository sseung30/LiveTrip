import { Suspense } from 'react';
import AllActivitySection from '@/domain/home/components/all-activity-section/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/popular-activity-section/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';
import IntroSection from '@/domain/home/components/IntroSection';
import AllActivitySectionSkeleton from '@/domain/home/components/all-activity-section/AllActivitySectionSkeleton';
import PopularActivitySectionSkeleton from '@/domain/home/components/popular-activity-section/PopularActivitySectionSkeleton';

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
        <Suspense fallback={<AllActivitySectionSkeleton />} key={suspenseKey}>
          <AllActivitySection sort={sort} category={category} />
        </Suspense>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

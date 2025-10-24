import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import AllActivitySection from '@/domain/home/components/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { page, sort, category } = await searchParams;
  const pageProp = page ? Number(page) : 1;

  return (
    <>
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection />
        <AllActivitySection page={pageProp} sort={sort} category={category} />
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

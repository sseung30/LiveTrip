import { Suspense } from 'react';
import Pagination from '@/components/pagination/Pagination';
import AllActivitySection from '@/domain/home/components/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';

export default async function Home() {
  return (
    <>
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection />
        <AllActivitySection />
        {/* <Pagination /> */}
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

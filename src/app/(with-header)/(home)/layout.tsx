import { type ReactNode, Suspense } from 'react';
import HeroBanner from '@/domain/home/components/HeroBanner';
import SearchForm from '@/domain/home/SearchForm';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex-center mx-auto my-0 w-full flex-col gap-4 px-0 pt-10 md:gap-[1.875rem] md:pt-12 xl:w-[75rem] xl:gap-12 xl:px-10 xl:pt-14'>
      <HeroBanner />
      <div className='mb-6 flex w-full flex-col gap-3 md:mb-8 md:gap-9'>
        <h1 className='text-16 md:text-32 text-center font-bold'>
          무엇을 체험하고 싶으신가요?
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchForm />
        </Suspense>
      </div>
      {children}
    </main>
  );
}

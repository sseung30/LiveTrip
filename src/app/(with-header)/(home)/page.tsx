import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import AllActivitySection from '@/domain/home/components/AllActivitySection';
import PopularActivitySection from '@/domain/home/components/PopularActivitySection';
import ToastLayer from '@/domain/home/components/ToastLayer';
import type { homeSearchParams } from '@/domain/home/type';
import { paramsStringToProps } from '@/domain/home/utils/params-string-to-props';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const params = await searchParams;
  const props = paramsStringToProps(params);
  const { page, sort, categoryIndex } = props;
  const suspenseKey = `${page}-${sort}-${categoryIndex}`;

  return (
    <>
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection />
        <Suspense fallback={<Spinner size='md' />} key={suspenseKey}>
          <AllActivitySection
            page={page}
            sort={sort}
            categoryIndex={categoryIndex}
          />
        </Suspense>
      </div>
      <Suspense>
        <ToastLayer />
      </Suspense>
    </>
  );
}

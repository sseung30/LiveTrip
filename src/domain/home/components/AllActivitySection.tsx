import { Suspense } from 'react';
import Spinner from '@/components/ui/Spinner';
import { ActivityTabs } from '@/domain/home/components/ActivityTabs';
import AllActivityCards from '@/domain/home/components/AllActivityCards';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import { tabEmojiMapping } from '@/domain/home/constants/categoryTabs';
import type { AllActivitySectionProps } from '@/domain/home/type';

export default async function AllActivitySection({
  page = 1,
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const isCategorySelected = category !== undefined;
  const sectionTitle = isCategorySelected
    ? `${tabEmojiMapping[category]} ${category}`
    : '🛼 모든 체험';
  const suspenseKey = `${page}-${sort}-${category}`;

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 mb-2.5 flex font-bold md:mb-4'>
          {sectionTitle}
        </h2>
        <DropdownTabs sortOption={sort} />
      </div>
      <ActivityTabs category={category} />
      <Suspense fallback={<Spinner size='md' />} key={suspenseKey}>
        <AllActivityCards category={category} sort={sort} page={page} />
      </Suspense>
    </section>
  );
}

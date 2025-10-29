import { ActivityTabs } from '@/domain/home/components/all-activity-section/ActivityTabs';
import AllActivityDataWrapper from '@/domain/home/components/all-activity-section/AllActivityDataWrapper';
import DropdownTabs from '@/domain/home/components/all-activity-section/DropdownTabs';
import { tabEmojiMapping } from '@/domain/home/constants/categoryTabs';
import type { AllActivitySectionProps } from '@/domain/home/type';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { queryOptions } from '@/domain/activities/queryOptions';
import { Hydrate } from '@/utils/react-query/getQueryClient';

export default async function AllActivitySection({
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const isCategorySelected = category !== undefined;
  const sectionTitle = isCategorySelected
    ? `${tabEmojiMapping[category]} ${category}`
    : '🛼 모든 체험';
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
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 mb-2.5 flex font-bold md:mb-4'>
          {sectionTitle}
        </h2>
        <DropdownTabs sortOption={sort} />
      </div>
      <ActivityTabs category={category} />
      <Hydrate state={hydratedInfiniteActivities}>
        <AllActivityDataWrapper category={category} sort={sort} />
      </Hydrate>
    </section>
  );
}

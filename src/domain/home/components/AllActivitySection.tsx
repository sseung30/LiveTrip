import { getAllActivitiesWithCache } from '@/domain/activities/api';
import type { getAllActivitiesParams } from '@/domain/activities/type';
import { ActivityTabs } from '@/domain/home/components/ActivityTabs';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import GridCardList from '@/domain/home/components/GridCardList';
import { tabEmojiMapping } from '@/domain/home/constants/categoryTabs';
import type { AllActivitySectionProps } from '@/domain/home/type';

export default async function AllActivitySection({
  page = 1,
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const isCategorySelected = category !== undefined;
  const { activities } = await getAllActivitiesWithCache({
    category,
    sort,
    page,
    size: 8,
    method: 'cursor',
  } as getAllActivitiesParams);

  const sectionTitle = isCategorySelected
    ? `${tabEmojiMapping[category]} ${category}`
    : '🛼 모든 체험';

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 mb-2.5 flex font-bold md:mb-4'>
          {sectionTitle}
        </h2>
        <DropdownTabs sortOption={sort} />
      </div>
      <ActivityTabs category={category} />
      <GridCardList activities={activities} />
    </section>
  );
}

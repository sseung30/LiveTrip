import { getAllActivitiesWithCache } from '@/domain/activities/api';
import type {
  activityCategory,
  getAllActivitiesParams,
} from '@/domain/activities/type';
import { ActivityTabs } from '@/domain/home/components/ActivityTabs';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import GridCardList from '@/domain/home/components/GridCardList';
import type { AllActivitySectionProps } from '@/domain/home/type';

export default async function AllActivitySection({
  page = 1,
  sort = 'latest',
  category,
}: AllActivitySectionProps) {
  const isCategorySelected = category !== '';
  const { activities } = await getAllActivitiesWithCache({
    category,
    sort,
    page,
    size: 8,
    method: 'cursor',
  } as getAllActivitiesParams);
  const sectionTitle = isCategorySelected ? category : '🛼 모든 체험';

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 font-bold'>{sectionTitle}</h2>
        <DropdownTabs sortOption={sort} />
      </div>
      <ActivityTabs category={category} />
      <GridCardList activities={activities} />
    </section>
  );
}

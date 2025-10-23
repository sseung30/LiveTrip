import {
  ActivityTabs,
  categoryTabs,
} from '@/domain/home/components/ActivityTabs';
import DropdownTabs from '@/domain/home/components/DropdownTabs';
import GridCardList from '@/domain/home/components/GridCardList';
import { getActivityList } from '@/domain/home/mock';
import type { AllActivitySectionProps } from '@/domain/home/type';

export default function AllActivitySection({
  page = 1,
  sort = 'latest',
  categoryIndex = -1,
  isDescending = true,
}: AllActivitySectionProps) {
  const { activities } = getActivityList();

  console.log(categoryIndex);
  console.log(categoryTabs[categoryIndex]);
  const sectionTitle =
    categoryIndex === -1 ? '🛼 모든 체험' : categoryTabs[categoryIndex]?.title;

  return (
    <section className='relative w-full'>
      <div className='mb-2.5 flex items-center justify-between md:mb-4'>
        <h2 className='text-18 md:text-24 font-bold'>{sectionTitle}</h2>
        <DropdownTabs sortOption={sort} isDescending={isDescending} />
      </div>
      <ActivityTabs categoryIndex={categoryIndex} />
      <GridCardList activities={activities} />
    </section>
  );
}

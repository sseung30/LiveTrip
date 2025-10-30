import { ActivityTabs } from '@/domain/home/components/all-activity-section/ActivityTabs';
import DropdownTabs from '@/domain/home/components/all-activity-section/DropdownTabs';
import { tabEmojiMapping } from '@/domain/home/constants/categoryTabs';
import { activityCategory, sortType } from '@/domain/activities/type';
import { ReactNode } from 'react';
export default async function AllActivitySection({
  sort = 'latest',
  category,
  children,
}: {
  sort?: sortType;
  category?: activityCategory;
  children: ReactNode;
}) {
  const isCategorySelected = category !== undefined;
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
      {children}
    </section>
  );
}

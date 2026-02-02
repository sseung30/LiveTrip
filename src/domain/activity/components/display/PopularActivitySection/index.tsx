import { getAllActivitiesWithCache } from '@/domain/activity/api';
import PopularActivityCarouselWrapper from '@/domain/activity/components/display/PopularActivitySection/PopularActivityCarouselWrapper';
import type { getAllActivitiesParams } from '@/domain/activity/types';

export default async function PopularActivitySection() {
  const { activities } = await getAllActivitiesWithCache({
    sort: 'most_reviewed',
    page: 1,
    size: 16,
    method: 'offset',
  } as getAllActivitiesParams);

  return (
    <section className='relative w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      <PopularActivityCarouselWrapper activities={activities} />
    </section>
  );
}

import type { Activity } from '@/domain/activities/type';
import PopularActivityCarouselWrapper from '@/domain/home/components/PopularActivityCarouselWrapper';

export default function PopularActivitySection({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <section className='relative w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      <PopularActivityCarouselWrapper activities={activities} />
    </section>
  );
}

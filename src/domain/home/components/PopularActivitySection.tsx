import { getAllActivitiesWithCache } from '@/domain/activities/api';
import type { getAllActivitiesParams } from '@/domain/activities/type';
import Card from '@/domain/home/components/Card';

export default async function PopularActivitySection() {
  const { activities } = await getAllActivitiesWithCache({
    sort: 'most_reviewed',
    page: 1,
    size: 4,
    method: 'cursor',
  } as getAllActivitiesParams);

  return (
    <section className='w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      <div className='scrollbar-hide flex w-full items-center gap-3.5 overflow-x-scroll md:grid md:grid-cols-2 md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
        {activities.map((activity) => {
          return (
            <Card
              title={activity.title}
              src={activity.bannerImageUrl}
              alt={activity.title}
              key={crypto.randomUUID()}
            />
          );
        })}
      </div>
    </section>
  );
}

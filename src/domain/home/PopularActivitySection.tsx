import Card from '@/domain/home/Card';
import { getActivityList } from '@/domain/home/mock';

export default function PopularActivitySection() {
  const { activities } = getActivityList();

  return (
    <section className='w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      <div className='scrollbar-hide flex w-full items-center gap-3.5 overflow-x-scroll md:grid md:grid-cols-2 md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
        {activities.map((activity) => {
          return (
            <Card
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

import { Activity } from '@/domain/activities/type';
import Card from '@/domain/home/components/Card';

interface GridCardListProps {
  activities: Activity[];
}
export default function GridCardList({ activities }: GridCardListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-3.5 overflow-x-scroll md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
      {activities.map((activity) => {
        return (
          <Card
            activity={activity}
            alt={activity.title}
            key={`card-${crypto.randomUUID()}`}
            imageClassNames='aspect-1/1'
          />
        );
      })}
    </div>
  );
}

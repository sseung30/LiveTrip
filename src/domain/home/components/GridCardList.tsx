import Card from '@/domain/home/components/Card';

interface activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}
interface GridCardListProps {
  activities: activity[];
}
export default function GridCardList({ activities }: GridCardListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-3.5 overflow-x-scroll md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
      {activities.map((activity) => {
        return (
          <Card
            src={activity.bannerImageUrl}
            alt={activity.title}
            key={crypto.randomUUID()}
            imageClassNames='aspect-1/1'
          />
        );
      })}
    </div>
  );
}

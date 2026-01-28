import LocationInfo from '@/components/ui/LocationInfo';
import StarRating from '@/components/ui/StarRating';
import type { ActivityDetail } from '@/domain/activity/types';

interface ActivityHeaderProps {
  activity: ActivityDetail;
}

export default function ActivityHeader({ activity }: ActivityHeaderProps) {
  return (
    <div className='relative mb-7'>
      <div>
        <div className='mb-2 text-sm font-medium text-gray-600'>
          {activity.category}
        </div>
        <h1 className='mb-2 pr-12 text-xl font-bold text-gray-900'>
          {activity.title}
        </h1>
        <div className='mb-2'>
          <StarRating
            rating={activity.rating}
            reviewCount={activity.reviewCount}
          />
        </div>
        <div className='mb-6'>
          <LocationInfo address={activity.address} />
        </div>
        <p className='text-sm text-gray-700'>{activity.shortDescription}</p>
      </div>
    </div>
  );
}

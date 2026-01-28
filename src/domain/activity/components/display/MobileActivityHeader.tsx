import LocationInfo from '@/components/ui/LocationInfo';
import StarRating from '@/components/ui/StarRating';
import type { ActivityDetail } from '@/domain/activity/types';

interface MobileActivityHeaderProps {
  activity: ActivityDetail;
}

export default function MobileActivityHeader({
  activity,
}: MobileActivityHeaderProps) {
  return (
    <div className='relative mb-7'>
      <div className='mx-auto max-w-md'>
        <div className='mb-2 text-sm font-medium text-gray-600'>
          {activity.category}
        </div>
        <h1 className='mb-2 text-xl font-bold text-gray-900'>
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
      </div>
      {/* 구분선 */}
      <div className='mt-6 border-t border-gray-200'></div>
    </div>
  );
}

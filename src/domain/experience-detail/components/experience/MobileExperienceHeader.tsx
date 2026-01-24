import LocationInfo from '@/components/ui/LocationInfo';
import StarRating from '@/components/ui/StarRating';
import type { ExperienceDetail } from '@/domain/experience-detail/type';

interface MobileExperienceHeaderProps {
  experience: ExperienceDetail;
}

export default function MobileExperienceHeader({
  experience,
}: MobileExperienceHeaderProps) {
  return (
    <div className='relative mb-7'>
      <div className='mx-auto max-w-md'>
        <div className='mb-2 text-sm font-medium text-gray-600'>
          {experience.category}
        </div>
        <h1 className='mb-2 text-xl font-bold text-gray-900'>
          {experience.title}
        </h1>
        <div className='mb-2'>
          <StarRating
            rating={experience.rating}
            reviewCount={experience.reviewCount}
          />
        </div>
        <div className='mb-6'>
          <LocationInfo address={experience.address} />
        </div>
      </div>
      {/* 구분선 */}
      <div className='mt-6 border-t border-gray-200'></div>
    </div>
  );
}

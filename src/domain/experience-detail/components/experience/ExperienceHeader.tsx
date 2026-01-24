import LocationInfo from '@/components/ui/LocationInfo';
import StarRating from '@/components/ui/StarRating';
import type { ExperienceDetail } from '@/domain/experience-detail/type';

interface ExperienceHeaderProps {
  experience: ExperienceDetail;
}

export default function ExperienceHeader({
  experience,
}: ExperienceHeaderProps) {
  return (
    <div className='relative mb-7'>
      <div>
        <div className='mb-2 text-sm font-medium text-gray-600'>
          {experience.category}
        </div>
        <h1 className='mb-2 pr-12 text-xl font-bold text-gray-900'>
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
        <p className='text-sm text-gray-700'>{experience.shortDescription}</p>
      </div>
    </div>
  );
}

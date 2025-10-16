import Image from 'next/image';
import type { ExperienceDetail } from '@/components/experienceDetail/type';

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
        <div className='mb-2 flex items-center gap-2'>
          <Image src='/icons/star.svg' alt='별점' width={14} height={14} />
          <span className='text-sm font-medium text-gray-900'>
            {experience.rating} ({experience.reviewCount})
          </span>
        </div>
        <div className='mb-6 flex items-center gap-2 text-sm text-gray-600'>
          <Image
            src='/icons/icon_locations.svg'
            alt='위치'
            width={12}
            height={12}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span>{experience.address}</span>
        </div>
        <p className='text-sm text-gray-700'>{experience.shortDescription}</p>
      </div>
    </div>
  );
}

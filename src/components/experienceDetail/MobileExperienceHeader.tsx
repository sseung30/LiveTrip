import Image from 'next/image';
import type { ExperienceDetail } from '@/components/experienceDetail/type';

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
        <div className='mb-2 flex items-center gap-2'>
          <Image src='/icons/star.svg' alt='별점' width={14} height={14} />
          <span className='text-sm font-medium text-gray-900'>
            {experience.rating} ({experience.reviewCount})
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <Image
            src='/icons/icon_locations.svg'
            alt='위치'
            width={12}
            height={12}
            style={{ width: 'auto', height: 'auto' }}
          />
          <span>{experience.address}</span>
        </div>
      </div>
      {/* 구분선 */}
      <div className='mt-6 border-t border-gray-200'></div>
    </div>
  );
}

'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { SIZE_CONFIG } from '@/components/side-menu';
import type { ProfileImageProps } from '@/components/side-menu/type';

export default function ProfileImage({ size }: ProfileImageProps) {
  const config = SIZE_CONFIG[size];
  const defaultImage = '/images/default_profile.png';

  const { data: sessionData } = useSession();

  return (
    <div className={`flex flex-col items-center ${config.spacing.padding}`}>
      <div className='bg-gray-25 relative h-[4.375rem] w-[4.375rem] rounded-full xl:h-[7.5rem] xl:w-[7.5rem]'>
        <Image
          priority
          src={sessionData?.user.profileImageUrl || defaultImage}
          alt='프로필 사진'
          width={config.profile.size}
          height={config.profile.size}
          className='aspect-1/1 rounded-full object-cover'
        />
      </div>
    </div>
  );
}

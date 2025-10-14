import Image from 'next/image';
import starIcon from '@/domain/myactivities/assets/icon_star.svg';
import type { ActivityCardProps } from '@/domain/myactivities/components/type';

export default function ActivityCard({
  title,
  rating,
  reviewCount,
  price,
  bannerImageUrl,
}: ActivityCardProps) {
  const formattedPrice = `₩${price.toLocaleString()}`;

  return (
    <div className='flex h-[202px] w-[640px] items-center justify-between rounded-3xl px-7.5 shadow-[0_4px_24px_rgba(156,180,202,0.2)]'>
      <div>
        <h2 className='text-16 md:text-18 mb-1.5 font-bold text-gray-950 md:mb-2'>
          {title}
        </h2>
        <div className='mb-2.5 flex items-center gap-0.5 md:mb-3'>
          <div className='relative h-[14px] w-[14px] md:h-[16px] md:w-[16px]'>
            <Image fill src={starIcon} alt='별점' className='object-cover' />
          </div>
          <div className='text-13 md:text-16 flex gap-0.5 text-gray-500'>
            <p>{rating}</p>
            <p>({reviewCount})</p>
          </div>
        </div>
        <div className='mb-3 flex items-center gap-1 md:mb-5'>
          <p className='text-16 md:text-18 font-bold text-gray-950'>
            {formattedPrice}
          </p>
          <p className='text-14 md:text-16 font-medium text-gray-400'>/ 인</p>
        </div>
        <div className='flex gap-2'>
          <button className='text-14 h-[29px] w-[68px] rounded-lg border border-gray-50 font-medium text-gray-600'>
            수정하기
          </button>
          <button className='text-14 h-[29px] w-[68px] rounded-lg bg-gray-50 font-medium text-gray-600'>
            삭제하기
          </button>
        </div>
      </div>
      <div className='relative h-[82px] w-[82px] md:h-[142px] md:w-[142px]'>
        <Image
          fill
          className='rounded-[20px] object-cover md:rounded-4xl'
          src={bannerImageUrl}
          alt={title}
        />
      </div>
    </div>
  );
}

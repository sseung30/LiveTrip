import Image from 'next/image';
import Link from 'next/link';
import { cx } from '@/utils/cx';
import { Activity } from '@/domain/activities/type';

interface CardProps {
  activity: Activity;
  alt?: string;
  imageClassNames?: string;
}
export default function Card({ activity, alt, imageClassNames }: CardProps) {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = activity;
  const priceAsKorCurrency = price.toLocaleString('ko-KR');

  return (
    <div className='relative mb-20 min-w-[8.25rem] md:w-full'>
      <Link href={`/experiences/${id}`}>
        <Image
          src={bannerImageUrl}
          width={700}
          height={700}
          alt={alt ?? title}
          loading='lazy'
          className={cx(
            'aspect-3/4 max-w-full rounded-[1.125rem] object-cover md:aspect-1/1 md:rounded-4xl',
            imageClassNames
          )}
        />
      </Link>
      <div className='text-14 absolute -bottom-18 flex w-full flex-col gap-[5px] rounded-[1.125rem] bg-white p-4 text-gray-950 drop-shadow-md md:-bottom-12 md:rounded-4xl md:px-[1.875rem] md:py-5 xl:-bottom-18'>
        <span className='text-14 md:text-18 font-semibold'>{title}</span>
        <div className='mb-1 flex items-center gap-[5px]'>
          <Image
            src={'/icons/star.svg'}
            alt='노란색 별'
            width={20}
            height={20}
            className='h-2.5 w-2.5 md:h-5 md:w-5'
          />
          <div className='text-12 md:text-14 flex gap-0.5 font-medium'>
            <span className=' '>{rating.toFixed(1)}</span>
            <span className='text-gray-400'>({reviewCount})</span>
          </div>
        </div>
        <div>
          <span className='text-15 md:text-20 font-bold'>
            ₩{priceAsKorCurrency}
          </span>
          <span className='text-12 md:text-14 font-semibold text-gray-400'>
            {' / 인'}
          </span>
        </div>
      </div>
    </div>
  );
}

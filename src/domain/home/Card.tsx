import Image from 'next/image';
import { cx } from '@/utils/cx';

interface CardProps {
  src: string;
  alt: string;
  imageClassNames?: string;
}
export default function Card({ src, alt, imageClassNames }: CardProps) {
  return (
    <div className='relative mb-20 min-w-[8.25rem] md:w-full'>
      <Image
        src={src}
        width={700}
        height={700}
        alt={alt}
        className={cx(
          'aspect-3/4 max-w-full rounded-[1.125rem] object-cover md:aspect-1/1 md:rounded-4xl',
          imageClassNames
        )}
      />
      <div className='text-14 absolute -bottom-18 flex w-full flex-col gap-[5px] rounded-[1.125rem] bg-white p-4 text-gray-950 drop-shadow-md md:-bottom-12 md:rounded-4xl md:px-[1.875rem] md:py-5 xl:-bottom-18'>
        <span className='text-14 md:text-18 font-semibold'> 피오르 체험</span>
        <div className='mb-1 flex items-center gap-[5px]'>
          <Image
            src={'/icons/star.svg'}
            alt='노란색 별'
            width={20}
            height={20}
            className='h-2.5 w-2.5 md:h-5 md:w-5'
          />
          <div className='text-12 md:text-14 flex gap-0.5 font-medium'>
            <span className=' '>3.9</span>
            <span className='text-gray-400'>(160)</span>
          </div>
        </div>
        <div>
          <span className='text-15 md:text-18 font-bold'>₩ 42,800</span>
          <span className='text-12 md:text-16 font-semibold text-gray-400'>
            /인
          </span>
        </div>
      </div>
    </div>
  );
}

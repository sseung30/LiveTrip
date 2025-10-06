import Image from 'next/image';

interface CardProps {
  src: string;
  alt: string;
}
export default function Card({ src, alt }: CardProps) {
  return (
    <>
      <div className=''>
        <Image
          src={src}
          width={332}
          height={332}
          alt={alt}
          className='aspect-1/1 max-w-full rounded-4xl object-cover'
        />
        <div className='text-14 relative bottom-14 flex flex-col gap-[5px] rounded-4xl bg-white px-[1.875rem] py-5 text-gray-950 shadow'>
          <span className='text-18 font-semibold'> 피오르 체험</span>
          <div className='mb-3 flex gap-[5px]'>
            <Image
              src={'/icons/star.svg'}
              alt='노란색 별'
              width={20}
              height={20}
            />
            <div className='flex gap-0.5'>
              <span className='font-medium'>3.9</span>
              <span className='font-medium text-gray-400'>(160)</span>
            </div>
          </div>
          <div>
            <span className='text-18 font-bold'>₩ 42,800</span>
            <span className='text-16 font-semibold text-gray-400'>/인</span>
          </div>
        </div>
      </div>
    </>
  );
}

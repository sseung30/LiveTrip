import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/button/Button';

export default function EmptyResult({ text }: { text: string }) {
  return (
    <div className='mt-7.5 flex flex-col'>
      <div className='flex items-center justify-center'>
        <Image
          src='/images/reservation_empty.png'
          alt='empty'
          width={122}
          height={122}
          className='mb-7.5'
        />
      </div>
      <p className='text-18 mb-7.5 flex justify-center font-medium text-gray-600'>
        {text}
      </p>
      <div className='flex justify-center'>
        <Link href={'/'}>
          <Button classNames='w-[182px]' variant='secondary' style='accent'>
            둘러보기
          </Button>
        </Link>
      </div>
    </div>
  );
}

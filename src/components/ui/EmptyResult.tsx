import Image from 'next/image';
import Button from '@/components/button/Button';
import Link from 'next/link';

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
          <Button variant='primary' classNames='w-[182px]'>
            둘러보기
          </Button>
        </Link>
      </div>
    </div>
  );
}

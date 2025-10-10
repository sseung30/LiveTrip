import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href={'/'}
      aria-label='메인 페이지로 이동'
      className='flex-center flex-col gap-5'
    >
      <Image
        src='/icons/logo-symbol.svg'
        width={144}
        height={144}
        alt='livetrip의 푸른색 지도 마커 모양 로고'
        className='h-24 w-24 xl:h-36 xl:w-36'
      />
      <h1 className='font-notosans block text-[2.5rem] font-bold xl:text-5xl'>
        Live<span className='font-light'>Trip</span>
      </h1>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/components/header/asset/logo.svg';
import logoSymbol from '@/components/header/asset/logo-symbol.svg';
import SessionNav from '@/components/header/SessionNav';

export default async function Header() {
  return (
    <header className='sticky top-0 flex h-12 items-center justify-between border-b border-gray-100 bg-white px-6 md:h-20 md:px-8 xl:px-50'>
      {/* 좌측 로고 영역 */}
      <Link href='/'>
        <Image
          src={logoSymbol}
          alt='LiveTrip Logo'
          width={40}
          height={40}
          className='pr-4 md:hidden'
        />
        <Image
          src={logo}
          alt='LiveTrip Logo'
          width={140}
          height={20}
          className='hidden pr-4 md:block'
        />
      </Link>
      {/* 우측 버튼/링크 영역 */}
      <SessionNav />
    </header>
  );
}

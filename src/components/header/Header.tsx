import Image from 'next/image';
import Link from 'next/link';
import bellDefault from '@/components/header/asset/bell-default.svg';
import defaultProfileImg from '@/components/header/asset/default-profile-img.svg';
import logo from '@/components/header/asset/logo.svg';
import logoSymbol from '@/components/header/asset/logo-symbol.svg';
import LogoutForm from '@/components/header/LogoutForm';
import { getAuth } from '@/utils/getAuth';

export default async function Header() {
  const session = await getAuth();

  return (
    <header className='flex h-12 items-center justify-between border-b border-gray-100 bg-white px-6 md:h-20 md:px-8 xl:px-50'>
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
      <nav className='flex items-center space-x-3 pl-4 text-sm text-gray-950'>
        {session ? (
          // ⭐️ 로그인 상태
          <div className='flex items-center space-x-4'>
            <button className='items-center focus:outline-none'>
              <Image
                src={bellDefault}
                alt='Notifications'
                width={24}
                height={24}
                className='h-6 w-6'
              />
            </button>
            <div className='h-4 w-px bg-gray-100' /> {/* 구분선 */}
            <div
              id='profile'
              className='flex cursor-pointer items-center space-x-2 py-8'
            >
              <Image
                src={session.user.profileImageUrl || defaultProfileImg}
                alt='Profile'
                width={30}
                height={30}
                className='h-[30px] w-[30px] rounded-full object-cover'
              />
              <Link href='/profile' aria-label='내 정보 수정 페이지로 이동'>
                <span className='font-medium'>{session.user.nickname}</span>
              </Link>
            </div>
            {/* Server Action을 이용한 로그아웃 폼 */}
            <LogoutForm sessionType={session.type} />
          </div>
        ) : (
          // ⭐️ 로그아웃 상태: 로그인 및 회원가입 링크
          <>
            <Link
              href='/auth/signin'
              className='color-gray-950 px-2 py-2 text-sm md:px-4 md:py-3'
            >
              로그인
            </Link>
            <Link
              href='/auth/signup'
              className='color-gray-950 px-2 py-2 text-sm md:px-4 md:py-3'
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

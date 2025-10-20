'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import bellDefault from '@/components/header/asset/bell-default.svg';
import defaultProfileImg from '@/components/header/asset/default-profile-img.svg';
import LogoutButton from '@/components/header/LogoutButton';

export default function SessionNav() {
  const { data, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <nav className='flex items-center space-x-3 pl-4 text-sm text-gray-950'>
      {isAuthenticated ? (
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
              src={data.user.profileImageUrl || defaultProfileImg}
              alt='Profile'
              width={30}
              height={30}
              className='h-[30px] w-[30px] rounded-full object-cover'
            />
            <Link href='/profile' aria-label='내 정보 수정 페이지로 이동'>
              <span className='font-medium'>{data.user.nickname}</span>
            </Link>
          </div>
          <LogoutButton sessionType={data.type} />
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
  );
}

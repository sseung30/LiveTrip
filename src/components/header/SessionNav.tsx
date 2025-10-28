'use client';
import Image from 'next/image';
import Link from 'next/link';
import bellDefault from '@/components/header/asset/bell-default.svg';
import defaultProfileImg from '@/components/header/asset/default-profile-img.svg';
import LogoutButton from '@/components/header/LogoutButton';
import { useEffect, useRef, useState } from 'react';
import Notification from '@/components/notification/Notification';
import { useUserInfo } from '@/domain/auth/queries/useUserInfo';
import Spinner from '@/components/ui/Spinner';

export default function SessionNav() {
  const { data, isPending, error } = useUserInfo();
  const isKakao = data?.email?.split('@')[1].includes('kakao.com');
  const type = isKakao ? 'kakao' : 'normal';

  const [showNotification, setShowNotification] = useState(false);
  const bellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!showNotification) return;
      const target = e.target as Node;
      if (bellRef.current && !bellRef.current.contains(target)) {
        setShowNotification(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotification]);

  if (isPending) return <Spinner size='sm' />;
  return (
    <nav className='flex items-center space-x-3 pl-4 text-sm text-gray-950'>
      {!error && data ? (
        // ⭐️ 로그인 상태
        <div className='flex items-center space-x-4'>
          {/* Bell + Notification popover */}
          <div ref={bellRef} className='relative'>
            <button
              type='button'
              aria-label='알림 열기'
              className='items-center focus:outline-none'
              onClick={() => setShowNotification((v) => !v)}
            >
              <Image
                src={bellDefault}
                alt='Notifications'
                width={24}
                height={24}
                className='h-6 w-6'
              />
            </button>
            {showNotification && (
              <div className='absolute top-full right-0 z-50 mt-2'>
                {/*
                  Panel is positioned so the bell sits at the panel's top-right.
                */}
                <Notification onClose={() => setShowNotification(false)} />
              </div>
            )}
          </div>
          <div className='h-4 w-px bg-gray-100' /> {/* 구분선 */}
          <div
            id='profile'
            className='flex cursor-pointer items-center space-x-2 py-8'
          >
            <Image
              src={data.profileImageUrl || defaultProfileImg}
              alt='Profile'
              width={30}
              height={30}
              className='h-[30px] w-[30px] rounded-full object-cover'
            />
            <Link href='/profile' aria-label='내 정보 수정 페이지로 이동'>
              <span className='font-medium'>{data.nickname}</span>
            </Link>
          </div>
          <LogoutButton sessionType={type} />
        </div>
      ) : (
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

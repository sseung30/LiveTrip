'use client';

import Image from 'next/image';
import kakaoIcon from '@/domain/auth/assets/icon_kakao.svg';

interface KaKaoAuthButtonProps {
  text: string;
}
export default function KaKaoAuthButton({ text }: KaKaoAuthButtonProps) {
  return (
    <button className='flex-center hover:bg-gray-25 w-full gap-1 rounded-2xl border-1 border-gray-200 px-10 py-4 text-gray-600 active:bg-gray-50 xl:w-[40rem]'>
      <Image src={kakaoIcon} width={24} height={24} alt='카카오톡 아이콘' />
      {text}
    </button>
  );
}

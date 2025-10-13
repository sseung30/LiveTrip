'use client';

import Image from 'next/image';
import Button from '@/components/button/Button';
import kakaoIcon from '@/domain/auth/assets/icon_kakao.svg';
import type { KaKaoAuthButtonProps } from '@/domain/auth/type';

export default function KaKaoAuthButton({ text }: KaKaoAuthButtonProps) {
  return (
    <Button variant='secondary' style='accent'>
      <Image src={kakaoIcon} width={24} height={24} alt='카카오톡 아이콘' />
      {text}
    </Button>
  );
}

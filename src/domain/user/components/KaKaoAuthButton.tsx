import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/button/Button';
import kakaoIcon from '@/domain/user/assets/icon_kakao.svg';
import type { KaKaoAuthButtonProps } from '@/domain/user/types';
import { getKaKaoAuthroizeURL } from '@/domain/user/utils/auth';

export default function KaKaoAuthButton({
  text,
  kakaoUri,
}: KaKaoAuthButtonProps) {
  return (
    <Link href={getKaKaoAuthroizeURL(kakaoUri)}>
      <Button variant='secondary' style='accent'>
        <Image src={kakaoIcon} width={24} height={24} alt='카카오톡 아이콘' />
        {text}
      </Button>
    </Link>
  );
}

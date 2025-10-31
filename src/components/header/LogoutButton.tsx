'use client';

import Link from 'next/link';
import type { SessionType } from 'next-auth';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { toast } from '@/components/toast';
import { getKaKaoLogoutURL } from '@/domain/auth/util';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutForm({
  sessionType,
}: {
  sessionType: SessionType;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      router.push('/');
      await nextAuthSignOut();
      toast({ message: '로그아웃에 성공했습니다', eventType: 'success' });
    });
  };

  return sessionType === 'kakao' ? (
    <KaKaoLogoutLink />
  ) : (
    <button onClick={handleLogout}>로그아웃</button>
  );
}

function KaKaoLogoutLink() {
  return (
    <Link href={getKaKaoLogoutURL()} aria-label='로그아웃'>
      로그아웃
    </Link>
  );
}

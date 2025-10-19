'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SessionType } from 'next-auth';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from '@/components/toast';
import { getKaKaoLogoutURL } from '@/domain/auth/util';
import { logoutAction } from '@/form/auth/logout.action';

export default function LogoutForm({
  sessionType,
}: {
  sessionType: SessionType;
}) {
  const [state, formAction] = useActionState(logoutAction, null);
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state?.success) {
      startTransition(() => {
        toast({ message: '로그아웃에 성공했습니다', eventType: 'success' });
        router.push('/');
        router.refresh();
      });
    }
  }, [state, router]);

  return sessionType === 'kakao' ? (
    <KaKaoLogoutLink />
  ) : (
    <form action={formAction}>
      <button>로그아웃</button>
    </form>
  );
}

function KaKaoLogoutLink() {
  return (
    <Link href={getKaKaoLogoutURL()} aria-label='로그아웃'>
      로그아웃
    </Link>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from '@/components/toast';
import { logoutAction } from '@/form/auth/logout.action';

export default function LogoutForm() {
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

  return (
    <form action={formAction}>
      <button>로그아웃</button>
    </form>
  );
}

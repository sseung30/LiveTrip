'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from '@/components/toast';

export default function ToastLayer() {
  const searchParams = useSearchParams();
  const login = searchParams.get('login');
  const logout = searchParams.get('logout');
  const router = useRouter();

  useEffect(() => {
    if (login === 'success') {
      toast({ message: '로그인에 성공했습니다', eventType: 'success' });
      router.replace('/');
    }
    if (logout === 'success') {
      toast({ message: '로그아웃에 성공했습니다', eventType: 'success' });
      router.replace('/');
    }
  }, [login, logout, router]);

  return <></>;
}

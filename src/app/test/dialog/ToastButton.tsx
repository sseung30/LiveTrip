'use client';

import { toast } from '@/components/toast';

export default function ToastButton() {
  const handleClick = () => {
    toast({ message: '이미 사용 중인 이메일입니다.', eventType: 'error' });
  };
  const handleClick2 = () => {
    toast({ message: '성공했습니다', eventType: 'success' });
  };

  return (
    <>
      <button className='bg-amber-400 p-6' onClick={handleClick}>
        Toast Test
      </button>
      <button className='bg-amber-400 p-6' onClick={handleClick2}>
        Toast Test2
      </button>
    </>
  );
}

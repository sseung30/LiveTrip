'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';

export default function RegisterActivity() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/registration`);
  };

  return (
    <Button variant='primary' classNames='w-[138px]' onClick={handleClick}>
      {/* 여기도 a 태그? */}
      체험 등록하기
    </Button>
  );
}

'use client';
import Button from '@/components/button/Button';
import { useRouter } from 'next/navigation';

export default function RegisterActivity() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/registration`);
  };

  return (
    <Button variant='primary' classNames='w-[138px]' onClick={handleClick}>
      체험 등록하기
    </Button>
  );
}

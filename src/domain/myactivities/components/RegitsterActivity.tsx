'use client';
import Button from '@/components/button/Button';

export default function RegisterActivity() {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <Button variant='primary' classNames='w-[138px]' onClick={handleClick}>
      체험 등록하기
    </Button>
  );
}

'use client';
import Button from '@/components/button/Button';
import Input from '@/components/ui/Input/Input';

export default function ProfileEditForm() {
  const nickname = '정만철';
  const email = 'example@test.com';

  return (
    <form className='mb:gap-6 flex w-full flex-col gap-5'>
      <Input label='닉네임' placeholder={nickname} className='w-full' />
      <Input label='이메일' placeholder={email} className='w-full' />
      <Input
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        type='password'
        className='w-full'
      />
      <Input
        label='비밀번호 확인'
        placeholder='비밀번호를 한 번 더 입력해 주세요'
        type='password'
        className='w-full'
      />
      <Button variant='primary' classNames='w-[7.5rem] self-center'>
        저장하기
      </Button>
    </form>
  );
}

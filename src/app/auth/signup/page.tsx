import Link from 'next/link';
import KaKaoAuthButton from '@/domain/auth/components/KaKaoAuthButton';
import Logo from '@/domain/auth/components/Logo';
import SignUpForm from '@/domain/auth/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='flex-center flex-col'>
      <div className='flex flex-col gap-7 md:gap-10 xl:gap-20'>
        <Logo />
        <div className='flex flex-col gap-5 md:gap-8'>
          <SignUpForm />
          <div className='flex basis-full items-center gap-3 font-medium text-gray-400'>
            <div className='h-[1px] grow bg-gray-100' />
            <div>SNS 계정으로 회원가입하기</div>
            <div className='h-[1px] grow bg-gray-100' />
          </div>
          <KaKaoAuthButton text='카카오 회원가입' />
          <div className='flex-center gap-1 font-medium text-gray-400'>
            <span>회원이신가요?</span>
            <Link
              href={'/auth/siinup'}
              aria-label='로그인 페이지로 이동'
              className='text-gray-400 underline'
            >
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

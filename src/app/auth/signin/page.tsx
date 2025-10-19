import Link from 'next/link';
import KaKaoAuthButton from '@/domain/auth/components/KaKaoAuthButton';
import Logo from '@/domain/auth/components/Logo';
import SignInForm from '@/domain/auth/components/SignInForm';

export default function SignInPage() {
  return (
    <div className='flex-center flex-col'>
      <div className='flex w-full flex-col gap-7 md:gap-10 xl:w-fit xl:gap-16'>
        <Logo />
        <div className='flex flex-col gap-5 md:gap-8'>
          <SignInForm />
          <div className='flex basis-full items-center gap-3 font-medium text-gray-400'>
            <div className='h-[1px] grow bg-gray-100' />
            <div>or</div>
            <div className='h-[1px] grow bg-gray-100' />
          </div>
          <KaKaoAuthButton
            text='카카오 로그인'
            kakaoUri={`${process.env.NEXT_PUBLIC_KAKAO_SIGNIN_CALLBACK_URI}`}
          />
          <div className='flex-center gap-1 font-medium text-gray-400'>
            <span>회원이 아니신가요?</span>
            <Link
              href={'/auth/signup'}
              aria-label='회원가입 페이지로 이동'
              className='text-gray-400 underline'
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

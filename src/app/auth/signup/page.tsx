import Link from 'next/link';
import KaKaoAuthButton from '@/domain/user/components/KaKaoAuthButton';
import SignFormLogo from '@/domain/user/components/SignFormLogo';
import SignUpForm from '@/domain/user/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='flex-center flex-col'>
      <div className='flex w-full flex-col gap-7 md:gap-10 xl:w-fit xl:gap-16'>
        <SignFormLogo />
        <div className='flex flex-col gap-5 md:gap-8'>
          <SignUpForm />
          <div className='flex basis-full items-center gap-3 font-medium text-gray-400'>
            <div className='h-[1px] grow bg-gray-100' />
            <div>SNS 계정으로 회원가입하기</div>
            <div className='h-[1px] grow bg-gray-100' />
          </div>
          <KaKaoAuthButton
            text='카카오 회원가입'
            kakaoUri={`${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_CALLBACK_URI}`}
          />
          <div className='flex-center gap-1 font-medium text-gray-400'>
            <span>회원이신가요?</span>
            <Link
              href={'/auth/signin'}
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

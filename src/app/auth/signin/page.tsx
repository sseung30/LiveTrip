import Link from 'next/link';
import Logo from '@/domain/auth/components/Logo';
import SignInForm from '@/domain/auth/components/SignInForm';

export default function Page() {
  return (
    <>
      <div className='flex-center flex-col gap-7 md:gap-10 xl:gap-20'>
        <Logo />
        <SignInForm />
      </div>
    </>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import ButtonSpinner from '@/components/ui/ButtonSpinner';
import Input from '@/components/ui/Input/Input';
import { mutateSignin } from '@/domain/auth/api';
import type { SigninInputs } from '@/domain/auth/type';
import { SignInFormRegisterKey } from '@/form/register-key/auth';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninInputs>();

  const router = useRouter();
  const login: SubmitHandler<SigninInputs> = async (signinInputs) => {
    mutateSignin({ signinInputs, router });
  };

  return (
    <form
      className='flex-center w-full flex-col gap-6 xl:w-fit'
      onSubmit={handleSubmit(login)}
    >
      <div className='flex-center w-full flex-col gap-4 xl:w-fit'>
        <Input
          label='이메일'
          placeholder='이메일을 입력해 주세요'
          className='w-full xl:w-[40rem]'
          error={errors.email?.message}
          {...register('email', SignInFormRegisterKey.email())}
        />
        <Input
          label='비밀번호'
          placeholder='8자 이상 입력해 주세요'
          type='password'
          className='w-full xl:w-[40rem]'
          error={errors.password?.message}
          {...register('password', SignInFormRegisterKey.password())}
        />
      </div>
      <Button variant='primary'>
        {isSubmitting ? <ButtonSpinner /> : '로그인'}
      </Button>
    </form>
  );
}

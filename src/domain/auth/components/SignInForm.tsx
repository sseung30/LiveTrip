'use client';
import { useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import ButtonSpinner from '@/components/ui/ButtonSpinner';
import Input from '@/components/ui/Input/Input';
import { SignInFormRegisterKey } from '@/form/register-key/auth';

interface SigninInputs {
  email: string;
  password: string;
}
export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputs>();

  return (
    <form
      className='flex-center w-full flex-col gap-6 xl:w-fit'
      onSubmit={handleSubmit(() => {
        console.log('form');
      })}
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
      <Button variant='primary'>{'로그인'}</Button>
    </form>
  );
}

'use client';
import { useRouter } from 'next/router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { apiFetch } from '@/app/api/api';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import ButtonSpinner from '@/components/ui/ButtonSpinner';
import Input from '@/components/ui/Input/Input';
import { SignUpFormRegisterKey } from '@/form/register-key/auth';

interface SignupInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupInputs>();

  const router = useRouter();
  const signup: SubmitHandler<SignupInputs> = async (signupInputs) => {
    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify({
          ...signupInputs,
        }),
      });
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast({ message: error.message, eventType: 'error' });
      }
    }
  };

  return (
    <form
      className='flex-center w-full flex-col gap-6 xl:w-fit'
      onSubmit={handleSubmit(signup)}
    >
      <div className='flex-center w-full flex-col gap-4 xl:w-fit'>
        <Input
          label='이메일'
          placeholder='이메일을 입력해 주세요'
          className='w-full xl:w-[40rem]'
          error={errors.email?.message}
          {...register('email', SignUpFormRegisterKey.email())}
        />
        <Input
          label='닉네임'
          placeholder='닉네임을 입력해 주세요'
          className='w-full xl:w-[40rem]'
          error={errors.nickname?.message}
          {...register('nickname', SignUpFormRegisterKey.nickname())}
        />
        <Input
          label='비밀번호'
          placeholder='8자 이상 입력해 주세요'
          type='password'
          className='w-full xl:w-[40rem]'
          error={errors.password?.message}
          {...register('password', SignUpFormRegisterKey.password())}
        />
        <Input
          label='비밀번호 확인'
          placeholder='비밀번호를 한 번 더 입력해 주세요'
          type='password'
          className='w-full xl:w-[40rem]'
          error={errors.confirmPassword?.message}
          {...register(
            'confirmPassword',
            SignUpFormRegisterKey.confirmPassword(watch('password'))
          )}
        />
      </div>
      <Button variant='primary'>{'회원가입'}</Button>
    </form>
  );
}

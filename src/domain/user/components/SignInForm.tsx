'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import Input from '@/components/ui/Input/Input';
import Spinner from '@/components/ui/Spinner';
import { signInSchema } from '@/domain/user/schema';
import type { SignInFormData } from '@/domain/user/types';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const [, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignInFormData> = async (signinInputs) => {
    const res = await signIn('credentials', {
      ...signinInputs,
      type: 'signin',
      redirect: false,
    });

    if (res.error) {
      toast({ message: res.code || '', eventType: 'error' });
    } else {
      startTransition(() => {
        router.push('/');
        toast({ message: '로그인에 성공했습니다', eventType: 'success' });
      });
    }
  };

  return (
    <form
      className='flex-center w-full flex-col gap-6 xl:w-fit'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex-center w-full flex-col gap-4 xl:w-fit'>
        <Input
          label='이메일'
          placeholder='이메일을 입력해 주세요'
          className='w-full xl:w-[40rem]'
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label='비밀번호'
          placeholder='8자 이상 입력해 주세요'
          type='password'
          className='w-full xl:w-[40rem]'
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <Button variant='primary'>
        {isSubmitting ? <Spinner size='sm' /> : '로그인'}
      </Button>
    </form>
  );
}

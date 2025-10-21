'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import Input from '@/components/ui/Input/Input';
import Spinner from '@/components/ui/Spinner';
import type { SignupInputs } from '@/domain/auth/type';
import { SignUpFormRegisterKey } from '@/form/auth/register-key';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupInputs>();

  const [, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignupInputs> = async (signupInputs) => {
    const res = await signIn('credentials', {
      ...signupInputs,
      type: 'signup',
      redirect: false,
    });

    if (res.error) {
      toast({ message: res.code || '', eventType: 'error' });
    } else {
      startTransition(() => {
        router.push('/');
        router.refresh();
        toast({ message: '회원가입이 완료 되었습니다', eventType: 'success' });
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
      <Button variant='primary'>
        {isSubmitting ? <Spinner size='sm' /> : '회원가입'}
      </Button>
    </form>
  );
}

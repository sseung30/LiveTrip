'use client';
import { useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import ButtonSpinner from '@/components/ui/ButtonSpinner';
import Input from '@/components/ui/Input/Input';

interface SigninInputs {
  email: string;
  password: string;
}
export default function SignInForm() {
  const handleClick = () => {
    console.log('click');
  };

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
          {...register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: '이메일 형식으로 입력하세요',
            },
          })}
        />
        <Input
          label='비밀번호'
          placeholder='8자 이상 입력해주세요'
          type='password'
          className='w-full xl:w-[40rem]'
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {
              value: 8,
              message: '8자 이상 입력해 주세요',
            },
          })}
        />
      </div>
      <Button
        variant='primary'
        size='lg'
        state='active'
        width={364}
        height={54}
        onClick={handleClick}
      >
        {'로그인'}
      </Button>
    </form>
  );
}

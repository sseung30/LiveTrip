'use client';
import { useForm } from 'react-hook-form';
import Button from '@/components/button/Button';
import Input from '@/components/ui/Input/Input';
import { SignUpFormRegisterKey as profileFormRegisterKey } from '@/form/auth/register-key';

interface ProfileEditFormInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
export default function ProfileEditForm() {
  const nickname = '정만철';
  const email = 'example@test.com';
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileEditFormInputs>();

  console.log(errors);

  return (
    <form
      className='mb:gap-6 flex w-full flex-col gap-5'
      onSubmit={handleSubmit(() => {
        console.log('form');
      })}
    >
      <Input
        label='닉네임'
        placeholder={nickname}
        className='w-full'
        error={errors.nickname?.message}
        {...register('nickname', profileFormRegisterKey.nickname())}
      />
      <Input
        label='이메일'
        placeholder={email}
        className='w-full'
        error={errors.email?.message}
        {...register('email', profileFormRegisterKey.email())}
      />
      <Input
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.password?.message}
        {...register('password', profileFormRegisterKey.password())}
      />
      <Input
        label='비밀번호 확인'
        placeholder='비밀번호를 한 번 더 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.confirmPassword?.message}
        {...register(
          'confirmPassword',
          profileFormRegisterKey.confirmPassword(watch('password'))
        )}
      />
      <Button variant='primary' classNames='w-[7.5rem] self-center'>
        저장하기
      </Button>
    </form>
  );
}

'use client';
import { useSession } from 'next-auth/react';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { ApiError } from '@/api/api';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import Input from '@/components/ui/Input/Input';
import { mutateProfileEdit } from '@/domain/profile/api';
import type {
  ProfileEditFormInputs,
  ProfileEditFormProps,
} from '@/domain/profile/type';
import { SignUpFormRegisterKey as profileFormRegisterKey } from '@/form/auth/register-key';

export default function ProfileEditForm({
  nickname,
  email,
  sessionType,
}: ProfileEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileEditFormInputs>({
    defaultValues: {
      nickname,
      email,
    },
  });
  const { update } = useSession();
  const isKakaoAccount = sessionType === 'kakao';
  const onSubmit: SubmitHandler<ProfileEditFormInputs> = async (
    profileEditInputs
  ) => {
    try {
      const { nickname, password, email } = profileEditInputs;
      const profileImageUrl = null;

      await mutateProfileEdit({
        nickname,
        profileImageUrl,
        newPassword: password,
      });
      update({ nickname, profileImageUrl, email });
      toast({
        message: '프로필 정보가 변경 되었습니다',
        eventType: 'success',
      });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400) {
          toast({ message: error.message, eventType: 'error' });
        } else {
          toast({ message: '서버 에러가 발생했습니다', eventType: 'error' });
        }
      }
    }
  };

  return (
    <form
      className='mb:gap-6 flex w-full flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label='닉네임'
        placeholder={'닉네임을 입력해 주세요'}
        className='w-full'
        error={errors.nickname?.message}
        {...register('nickname', profileFormRegisterKey.nickname())}
      />
      <Input
        label='이메일'
        placeholder={'이메일을 입력해 주세요'}
        className='w-full'
        error={errors.email?.message}
        disabled={isKakaoAccount}
        {...register('email', profileFormRegisterKey.email())}
      />
      <Input
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.password?.message}
        autoComplete='new-password'
        {...register('password', profileFormRegisterKey.password())}
      />
      <Input
        label='비밀번호 확인'
        placeholder='비밀번호를 한 번 더 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.confirmPassword?.message}
        autoComplete='new-password'
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

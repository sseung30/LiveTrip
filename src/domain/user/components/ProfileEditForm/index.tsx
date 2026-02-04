'use client';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/api/api';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import Input from '@/components/ui/Input/Input';
import ProfileImageInput from '@/domain/user/components/ProfileEditForm/ProfileImageInput';
import { useProfileEditMutate } from '@/domain/user/queries/useProfileEditMutate';
import { useProfileImageCreateMutate } from '@/domain/user/queries/useProfileImageCreateMutate';
import {
  type ProfileEditFormData,
  profileEditFormSchema,
} from '@/domain/user/schema';
import { userQueryKeys } from '@/domain/user/utils/queryOptions';

interface ProfileEditFormProps {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
}
export default function ProfileEditForm({
  nickname,
  email,
  profileImageUrl,
}: ProfileEditFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditFormData>({
    defaultValues: {
      nickname,
      email,
    },
    resolver: zodResolver(profileEditFormSchema),
  });
  const {
    mutateAsync: profileEditMutateAsync,
    isPending: isProfileEditPending,
  } = useProfileEditMutate();
  const {
    mutateAsync: profileImageCreateMutateAsync,
    isPending: isImagePending,
  } = useProfileImageCreateMutate();

  const getProfileImageUrl = async (
    profileImageFile: FileList | null
  ): Promise<string | null> => {
    if (profileImageFile?.[0]) {
      const { profileImageUrl } = await profileImageCreateMutateAsync(
        profileImageFile[0]
      );

      return profileImageUrl;
    }

    return profileImageUrl;
  };

  const onSubmit: SubmitHandler<ProfileEditFormData> = async (
    profileEditInputs
  ) => {
    try {
      const { nickname, password, profileImageFile } = profileEditInputs;
      const profileImageUrl = await getProfileImageUrl(profileImageFile);

      await profileEditMutateAsync({
        nickname,
        profileImageUrl,
        newPassword: password,
      });
      toast({
        message: '프로필 정보가 변경 되었습니다',
        eventType: 'success',
      });
      queryClient.invalidateQueries({ queryKey: userQueryKeys.me() });
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
      <ProfileImageInput
        isPending={isImagePending || isProfileEditPending}
        register={register}
        profileImageUrl={profileImageUrl || ''}
        error={errors.profileImageFile?.message}
      />
      <Input
        label='닉네임'
        placeholder={'닉네임을 입력해 주세요'}
        className='w-full'
        error={errors.nickname?.message}
        {...register('nickname')}
      />
      <Input
        disabled
        label='이메일'
        className='w-full'
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label='비밀번호'
        placeholder='8자 이상 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.password?.message}
        autoComplete='new-password'
        {...register('password')}
      />
      <Input
        label='비밀번호 확인'
        placeholder='비밀번호를 한 번 더 입력해 주세요'
        type='password'
        className='w-full'
        error={errors.confirmPassword?.message}
        autoComplete='new-password'
        {...register('confirmPassword')}
      />

      <Button variant='primary' classNames='w-[7.5rem] self-center'>
        저장하기
      </Button>
    </form>
  );
}

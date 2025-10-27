'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { type ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiError } from '@/api/api';
import type { ProfileImageProps } from '@/components/side-menu/type';
import { toast } from '@/components/toast';
import Spinner from '@/components/ui/Spinner';
import { useProfileEditMutate } from '@/domain/auth/queries/useProfileEditMutate';
import { useProfileImageCreateMutate } from '@/domain/auth/queries/useProfileImageCreateMutate';
import {
  validateFileSizeAndToast,
  validateFileTypeAndToast,
} from '@/form/utils/validateImageFileAndToast';

export default function ProfileImageInput() {
  const defaultImage = '/images/default_profile.png';

  const { mutateAsync: profileEditMutateAsync } = useProfileEditMutate();
  const { mutateAsync: profileImageCreateMutateAsync } =
    useProfileImageCreateMutate();
  const [isLoading, setIsLoading] = useState(false);
  const { data: sessionData, update: updateSession } = useSession();
  const { register } = useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewImage = sessionData?.user.profileImageUrl || defaultImage;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    if (!validateFileTypeAndToast(file) || !validateFileSizeAndToast(file)) {
      return;
    }
    if (!sessionData) {
      return;
    }
    try {
      setIsLoading(true);
      await updateProfileImageAndSession(file);
      toast({
        message: '프로필 이미지가 변경되었습니다',
        eventType: 'success',
      });
    } catch (error) {
      if (error instanceof ApiError) {
        toast({ message: error.message, eventType: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const updateProfileImageAndSession = async (file: File) => {
    if (!sessionData) {
      return;
    }
    const { profileImageUrl } = await profileImageCreateMutateAsync(file);
    const { nickname, password } = sessionData.user;
    const editPromise = profileEditMutateAsync({
      nickname,
      newPassword: password,
      profileImageUrl,
    });
    const sessionPromise = updateSession({ profileImageUrl });

    await Promise.all([editPromise, sessionPromise]);
  };

  const { ref, ...rest } = {
    ...register('image', {
      onChange: handleImageChange,
    }),
  };
  const handleEditIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`flex-center relative flex-col`}>
      <input
        type='file'
        id='profile-image'
        accept='image/jpg, image/jpeg, image/png, image/gif, image/webp'
        className='hidden'
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        {...rest}
      />
      <div className='bg-gray-25 relative h-32 w-32 rounded-full'>
        {isLoading ? (
          <div className='absolute inset-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2'>
            <Spinner size='md' />
          </div>
        ) : (
          <Image
            priority
            src={previewImage}
            alt='프로필'
            width={128}
            height={128}
            className='aspect-1/1 cursor-pointer rounded-full object-cover'
            onClick={handleEditIconClick}
          />
        )}
        <button
          className='absolute right-2 bottom-2 flex items-center justify-center rounded-full bg-gray-100 p-1'
          type='button'
          onClick={handleEditIconClick}
        >
          <Image
            src='/icons/icon_add.svg'
            alt='edit'
            className='aspect-1/1'
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}

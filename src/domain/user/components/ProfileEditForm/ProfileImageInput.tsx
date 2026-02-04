'use client';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import Spinner from '@/components/ui/Spinner';
import type { ProfileEditFormData } from '@/domain/user/schema';
import {
  validateFileSizeAndToast,
  validateFileTypeAndToast,
} from '@/domain/user/utils/validateImageFileAndToast';

interface ProfileImageInputProps {
  register: UseFormRegister<ProfileEditFormData>;
  profileImageUrl: string | null;
  isPending: boolean;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}
export default function ProfileImageInput({
  register,
  profileImageUrl,
  isPending,
  error,
}: ProfileImageInputProps) {
  const defaultImage = '/images/default_profile.png';
  const [previewImage, setPreviewImage] = useState(
    profileImageUrl || defaultImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    if (!validateFileTypeAndToast(file) || !validateFileSizeAndToast(file)) {
      return;
    }
    const url = URL.createObjectURL(file);

    setPreviewImage(url);
  };

  const { ref, ...rest } = {
    ...register('profileImageFile', {
      onChange: validateImageInput,
    }),
  };
  const handleEditIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className={`flex-center relative flex-col`}>
      <input
        type='file'
        id='profile-image'
        accept='image/jpg, image/jpeg, image/png, image/webp'
        className='hidden'
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        {...rest}
      />
      <div className='bg-gray-25 relative h-32 w-32 rounded-full'>
        {isPending ? (
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
      <span>{error?.toString()}</span>
    </div>
  );
}

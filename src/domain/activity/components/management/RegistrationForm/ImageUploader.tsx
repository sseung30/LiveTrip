import Image from 'next/image';
import { type ChangeEvent, useId } from 'react';
import type { UploadedImage } from '@/domain/activity/types';

interface ImageUploaderProps {
  title: string;
  description: string;
  images: UploadedImage[] | null;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onRemove: (id: string) => void;
  maxCount: number;
  inputId?: string;
  required?: boolean;
}

export function ImageUploader({
  title,
  description,
  images,
  onUpload,
  onRemove,
  maxCount,
  inputId: providedId,
  required,
}: ImageUploaderProps) {
  const fallbackId = useId();
  const inputId = providedId ?? fallbackId;

  return (
    <section className='flex flex-col gap-4'>
      <div>
        <h2 className='text-lg font-semibold text-gray-900'>
          {title}
          {required ? <span className='ml-1 text-red-500'>*</span> : null}
        </h2>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>

      <div className='flex flex-wrap gap-4'>
        <label
          className='bg-gray-25 hover:border-primary-100 hover:text-primary-500 flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 text-center text-sm text-gray-500 transition'
          htmlFor={inputId}
        >
          <UploadIcon />
          <span>
            {images?.length}/{maxCount}
          </span>
        </label>

        {images?.map((image) => {
          return (
            <figure
              key={image.id}
              className='relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-100'
            >
              <Image
                width={112}
                height={112}
                src={image.src}
                alt='업로드된 이미지'
                className='h-full w-full object-cover'
              />
              <button
                type='button'
                className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white'
                onClick={() => {
                  onRemove(image.id);
                }}
              >
                <CloseIcon />
              </button>
            </figure>
          );
        })}
      </div>

      <input
        multiple
        id={inputId}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={onUpload}
      />
    </section>
  );
}

function UploadIcon() {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='1.5'
        y='1.5'
        width='25'
        height='25'
        rx='12.5'
        stroke='#C7C8CF'
        strokeWidth='1.5'
      />
      <path
        d='M14 9V19'
        stroke='#7A7A80'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M9 14H19'
        stroke='#7A7A80'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 3L9 9'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M9 3L3 9'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { InputProps } from '@/components/ui/Input/type';

export default function Input({
  label,
  placeholder = 'text',
  type = 'text',
  error,
  className = '',
  autoComplete = '',
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const hasError = Boolean(error);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (isPassword) {
      return showPassword ? 'text' : 'password';
    }

    return type;
  };

  const getBorderColor = () => {
    if (hasError) {
      return 'border-red-500';
    }
    if (isFocused) {
      return 'border-primary-500';
    }

    return 'border-gray-100';
  };

  return (
    <div className='flex w-full flex-col'>
      {label && (
        <label className='mb-2 text-sm font-medium text-gray-900'>
          {label}
          {rest.required ? <span className='ml-1 text-red-500'>*</span> : null}
        </label>
      )}

      <div className={`relative w-[350px] ${className}`}>
        <input
          {...rest}
          type={getInputType()}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`h-[54px] w-full rounded-2xl border px-4 ${isPassword ? 'pr-12' : ''} text-gray-950 transition-colors placeholder:text-gray-400 focus:outline-none ${getBorderColor()} disabled:bg-gray-25`}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />

        {isPassword && (
          <button
            type='button'
            className='absolute top-1/2 right-4 -translate-y-1/2'
            onClick={togglePasswordVisibility}
          >
            <Image
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
              width={24}
              height={24}
              src={
                showPassword
                  ? '/icons/icon_passwordhide.svg'
                  : '/icons/icon_passwordshow.svg'
              }
            />
          </button>
        )}
      </div>

      {hasError && (
        <span className='mt-1 ml-2 text-xs text-red-500'>
          {error?.toString()}
        </span>
      )}
    </div>
  );
}

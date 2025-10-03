'use client';
import Image from 'next/image';
import { type ReactNode, useEffect, useState } from 'react';
import errorImage from '@/components/toast/assets/error.svg';
import successImage from '@/components/toast/assets/success.svg';
import type { ToastType } from '@/components/toast/type';

export const toast = ({ message, eventType }: ToastType) => {
  const event = new CustomEvent('showToast', {
    detail: { message, eventType },
  });

  window.dispatchEvent(event);
};

const TOAST_DURATION = 3000;

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    const toastHandler = (e: CustomEventInit) => {
      const { message, eventType } = e.detail;

      setToasts((prev) => [...prev, { message, eventType }]);
      console.log(toasts);
      //NOTE: TOAST_DURATION이후 toasts 제거
      // setTimeout(() => {
      //   setToasts((prev) => prev.slice(1));
      // }, TOAST_DURATION);
    };

    window.addEventListener('showToast', toastHandler);

    return () => {
      window.removeEventListener('showToast', toastHandler);
    };
  }, [toasts]);

  return (
    <>
      <div className='absolute top-5 right-5 flex flex-col gap-2'>
        {toasts.map((_toast) => {
          return (
            <div
              key={`toast-${crypto.randomUUID()}`}
              className='flex-center text-18 gap-5 rounded-[1.875rem] bg-white px-8 py-4 font-medium shadow-sm'
            >
              <span>{getEventTypeImage(_toast.eventType)}</span>
              <span>{_toast.message}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
const getEventTypeImage = (eventType: string): ReactNode => {
  switch (eventType) {
    case 'success': {
      return <Image src={successImage} alt='체크 이미지' />;
    }
    case 'error': {
      return <Image src={errorImage} alt='X 이미지' />;
    }
    default: {
      return null;
    }
  }
};

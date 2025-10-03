'use client';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import errorImage from '@/components/toast/assets/error.svg';
import successImage from '@/components/toast/assets/success.svg';
import type { ToastComponentProps, ToastType } from '@/components/toast/type';

export const toast = ({ message, eventType }: ToastType) => {
  const event = new CustomEvent('showToast', {
    detail: { message, eventType },
  });

  window.dispatchEvent(event);
};
const TOAST_DURATION = 3000;

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const deleteToastByIndex = (deletedIndex: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== deletedIndex));
  };

  useEffect(() => {
    const handleShowToast = (e: CustomEventInit) => {
      const { message, eventType } = e.detail;

      setToasts((prev) => [...prev, { message, eventType }]);
      //NOTE: TOAST_DURATION이 흐르면 해당 toast 제거
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, TOAST_DURATION);
    };

    window.addEventListener('showToast', handleShowToast);

    return () => {
      window.removeEventListener('showToast', handleShowToast);
    };
  }, [toasts]);

  return (
    <>
      <div
        className='absolute top-5 right-5 flex flex-col gap-2'
        id='toast-container'
      >
        {toasts.map((_toast, index) => {
          return (
            <ToastComponent
              key={`toast-${crypto.randomUUID()}`}
              eventType={_toast.eventType}
              message={_toast.message}
              index={index}
              deleteToastByIndex={deleteToastByIndex}
            />
          );
        })}
      </div>
    </>
  );
}

function ToastComponent({
  eventType,
  message,
  index,
  deleteToastByIndex,
}: ToastComponentProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentToast = toastRef.current;

    if (!currentToast) {
      return;
    }
    currentToast.showPopover();
  }, []);

  const getEventTypeImage = (): ReactNode => {
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

  return (
    <div
      ref={toastRef}
      popover='manual'
      className='flex-center text-18 inset-auto right-5 left-auto gap-6 bg-white px-8 py-4 font-medium shadow-sm'
      style={{
        top: `${20 + index * 70}px`,
      }}
    >
      <div className='flex gap-4'>
        <span>{getEventTypeImage()}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={() => {
          deleteToastByIndex(index);
        }}
      >
        X
      </button>
    </div>
  );
}

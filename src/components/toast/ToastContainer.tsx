'use client';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import errorImage from '@/components/toast/assets/error.svg';
import successImage from '@/components/toast/assets/success.svg';
import type { ToastComponentProps, ToastType } from '@/components/toast/type';

/**
 * - toast
 * 토스트 알림을 화면에 표시하는 함수
 * CustomEvent를 발생시켜 ToastContainer에 토스트 표시를 요청합니다.
 *
 * @example
 * // 성공 메시지 표시
 * toast({ message: '저장되었습니다', eventType: 'success' });
 *
 * // 에러 메시지 표시
 * toast({ message: '오류가 발생했습니다', eventType: 'error' });
 *
 * Props:
 * - message - 토스트에 표시할 메시지 텍스트
 * - eventType - 토스트의 타입 ('success' | 'error')
 *                    - 'success': 성공 아이콘과 함께 표시
 *                    - 'error': 에러 아이콘과 함께 표시
 */
export const toast = ({ message, eventType }: ToastType) => {
  const event = new CustomEvent('showToast', {
    detail: { message, eventType },
  });

  window.dispatchEvent(event);
};
const TOAST_DURATION = 3000;

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const deleteToastByIndex = (deletedIndex: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== deletedIndex));
  };
  const deleteToast = () => {
    setToasts((prev) => prev.slice(1));
  };

  useEffect(() => {
    const handleShowToast = (e: CustomEventInit) => {
      const { message, eventType } = e.detail;

      if (toasts.length >= 3) {
        deleteToast();
      }
      setToasts((prev) => [...prev, { message, eventType }]);

      //NOTE: TOAST_DURATION이 흐르면 해당 toast 제거
      setTimeout(() => {
        deleteToast();
      }, TOAST_DURATION);
    };

    window.addEventListener('showToast', handleShowToast);

    return () => {
      window.removeEventListener('showToast', handleShowToast);
    };
  }, [toasts]);

  const transitionToasts = useTransition(toasts, {
    from: { opacity: 0, scale: 0.5 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  return (
    <>
      <div className='absolute flex flex-col gap-2' id='toast-container'>
        {transitionToasts((style, _toast, _, index) => {
          return (
            <ToastComponent
              key={`toast-${crypto.randomUUID()}`}
              eventType={_toast.eventType}
              message={_toast.message}
              index={index}
              style={style}
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
  style,
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
    <animated.div
      ref={toastRef}
      popover='manual'
      className='flex-center text-18 inset-auto right-1/2 bottom-40 left-1/2 w-max -translate-x-1/2 gap-6 rounded-[1.875rem] bg-white px-8 py-4 font-medium shadow-sm'
      style={{
        ...style,
        bottom: `${160 - index * 70}px`,
      }}
    >
      <div className='flex items-center gap-4'>
        <span>{getEventTypeImage()}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={() => {
          deleteToastByIndex(index);
        }}
      >
        <Image
          src='/icons/delete.svg'
          alt='삭제 아이콘'
          width={24}
          height={24}
        />
      </button>
    </animated.div>
  );
}

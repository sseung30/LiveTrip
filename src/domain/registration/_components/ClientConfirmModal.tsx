'use client';

import Image from 'next/image';
import WarningImage from '@/components/dialog/assets/warning.svg';

interface ClientConfirmModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

/**
 * 도메인 전용 클라이언트 확인 모달 컨텐츠
 * - AlertModalContents와 동일한 비주얼을 유지하면서
 * 서버 액션 대신 클라이언트 onConfirm/onCancel 콜백을 사용합니다.
 */
export default function ClientConfirmModal({
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isPending,
}: ClientConfirmModalProps) {
  return (
    <div className="flex-center w-80 flex-col gap-6 md:w-[25rem]">
      <div className="flex-center flex-col gap-2">
        <Image src={WarningImage} alt="경고 아이콘" />
        <h1 className="text-md font-bold whitespace-pre-line break-words text-center">
          {message}
        </h1>
      </div>
      <div className="flex-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-100 px-5 py-1"
          disabled={isPending}
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className="rounded-lg border bg-primary-500 px-5 py-1 text-white"
          disabled={isPending}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}


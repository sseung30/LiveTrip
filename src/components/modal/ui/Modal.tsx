/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * TODO:
 * - Headless Modal ui 컴포넌트 BaseModal
 * - modal state hook
 */

import type { PropsWithChildren, RefObject, SyntheticEvent } from 'react';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
}

export default function Modal({ modalRef, onClose, children }: ModalProps) {
  const handleClick = (e: SyntheticEvent) => {
    if (modalRef.current === e.target) {
      modalRef.current.close();
      onClose?.();
    }
  };

  return (
    <dialog
      className={'bg-white text-gray-950 rounded-[1.875rem]'}
      ref={modalRef}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}

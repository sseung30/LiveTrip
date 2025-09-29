/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { PropsWithChildren, RefObject, SyntheticEvent } from 'react';
import { cx } from '@/utils/cx';

interface ModalProps extends PropsWithChildren {
  modalRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
  classNames?: string;
}

export default function Modal({
  modalRef,
  onClose,
  classNames,
  children,
}: ModalProps) {
  const handleClick = (e: SyntheticEvent) => {
    if (modalRef.current === e.target) {
      modalRef.current.close();
      onClose?.();
    }
  };
  const positionCenter = 'inset-1/2 -translate-1/2';

  return (
    <dialog
      ref={modalRef}
      className={cx(
        `flex flex-col items-center rounded-[1.875rem] bg-white p-[1.875rem] text-gray-950 not-open:hidden backdrop:bg-black/50`,
        positionCenter,
        classNames
      )}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}

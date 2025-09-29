/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { PropsWithChildren, RefObject, SyntheticEvent } from 'react';
import { cx } from '@/utils/cx';

interface ModalProps extends PropsWithChildren {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
  classNames?: string;
}

export default function Modal({
  dialogRef,
  onClose,
  classNames,
  children,
}: ModalProps) {
  const handleClick = (e: SyntheticEvent) => {
    if (dialogRef.current === e.target) {
      dialogRef.current.close();
      onClose?.();
    }
  };
  const positionCenter = 'inset-1/2 -translate-1/2';

  return (
    <dialog
      ref={dialogRef}
      className={cx(
        `flex flex-col items-center rounded-[1.875rem] bg-white p-[1.875rem] text-gray-950 drop-shadow not-open:hidden backdrop:bg-black/50`,
        positionCenter,
        classNames
      )}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}

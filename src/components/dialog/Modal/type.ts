import type { PropsWithChildren, RefObject } from 'react';

export interface ModalProps extends PropsWithChildren {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
  classNames?: string;
}

export interface AlertModalContentsProps {
  message: string;
  confirmButtonText: string;
  rejectButtonText: string;
  confirmAction: (...args: unknown[]) => void;
  hideModal: () => void;
  isPending?: boolean;
}

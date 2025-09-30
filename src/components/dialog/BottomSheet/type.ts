import type { ReactNode, RefObject, SyntheticEvent } from 'react';

export interface BottomSheetProps {
  isOpen: boolean;
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
  hideDialog: () => void;
}

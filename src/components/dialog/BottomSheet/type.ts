import type { ReactNode, RefObject } from 'react';

export interface BottomSheetProps {
  isOpen: boolean;
  children: (actions: { closeDialog: () => void }) => ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
  hideDialog: () => void;
}
export interface CloseDialogParameter {
  onRest?: () => void;
  immediate?: boolean;
}

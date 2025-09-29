import { useRef } from 'react';

export default function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.showModal();
  };
  const hideDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.close();
  };

  return { dialogRef, openDialog, hideDialog };
}

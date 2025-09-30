import { useRef, useState } from 'react';
/**
 * HTML dialog 엘리먼트를 관리하기 위한 커스텀 훅
 * 모달 창을 열고 닫는 기능을 제공하며, dialog 엘리먼트에 대한 ref를 관리합니다.
 *
 * @returns 객체 형태로 다음 속성들을 반환:
 * - dialogRef: HTMLDialogElement에 대한 ref 객체 (ModalContainer 등에 전달)
 * - openDialog: 모달을 여는 함수 (showModal() 호출)
 * - hideDialog: 모달을 닫는 함수 (close() 호출)
 */

export default function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.showModal();
    setIsOpen(true);
  };
  const hideDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.close();
    setIsOpen(false);
  };

  return { dialogRef, openDialog, hideDialog, isOpen };
}

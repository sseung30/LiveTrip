'use client';
import { useActionState } from 'react';
import {
  AlertModalContents,
  ModalContainer,
  useDialog,
} from '@/components/dialog';
import { toast } from '@/components/toast';

const modalAction = async () => {
  console.log('modalAction');
  await new Promise((resolve) => {
    setTimeout(() => {
      toast({ message: '이미 사용 중인 이메일입니다.', eventType: 'error' });
      resolve('');
    }, 1500);
  });

  return { state: 'success' };
};

export default function ModalButton() {
  const [state, formAction, isPending] = useActionState(modalAction, {
    state: '',
  });
  const { dialogRef, openDialog, hideDialog } = useDialog();

  return (
    <>
      <ModalContainer dialogRef={dialogRef}>
        <AlertModalContents
          message='체험을 삭제하시겠습니까?'
          confirmButtonText='네'
          rejectButtonText='아니오'
          hideModal={hideDialog}
          confirmAction={formAction}
          isPending={isPending}
        />
      </ModalContainer>
      <button className='border px-5 py-1' onClick={openDialog}>
        modal open
      </button>
    </>
  );
}

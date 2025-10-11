'use client';
import { useActionState } from 'react';
import { BottomSheetContainer, useDialog } from '@/components/dialog';

const modalAction = async () => {
  console.log('modalAction');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 1500);
  });

  return { state: 'success' };
};

export default function BottomSheetButton() {
  const [state, formAction, isPending] = useActionState(modalAction, {
    state: '',
  });
  const { dialogRef, openDialog, hideDialog, isOpen } = useDialog();

  return (
    <>
      <BottomSheetContainer
        isOpen={isOpen}
        dialogRef={dialogRef}
        hideDialog={hideDialog}
      >
        {({ closeDialog }) => {
          return (
            <div>
              <button
                className='bg-primary-500 absolute right-5 p-3 text-white'
                onClick={closeDialog}
              >
                close button
              </button>
            </div>
          );
        }}
      </BottomSheetContainer>

      <button
        className='bg-primary-500 border px-5 py-1 text-white'
        onClick={openDialog}
      >
        bottomSheet open
      </button>
    </>
  );
}

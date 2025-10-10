import BottomSheetButton from '@/app/test/dialog/BottomSheetButton';
import ModalButton from '@/app/test/dialog/ModalButton';
import ToastButton from '@/app/test/dialog/ToastButton';

export default function Page() {
  return (
    <>
      <div className=''>
        <BottomSheetButton />
        <ModalButton />
        <ToastButton />
      </div>
    </>
  );
}

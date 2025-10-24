interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: ConfirmModalProps) {
  return (
    <div className='flex-center w-80 flex-col gap-6 md:w-[25rem]'>
      <div className='flex-center flex-col gap-1'>
        <h1 className='text-md font-bold whitespace-pre-line break-words text-center'>{message}</h1>
      </div>
      <div className='flex-center gap-3'>
        <button
          type='button'
          className='rounded-lg border border-gray-100 px-5 py-1'
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          type='button'
          className='bg-primary-500 rounded-lg border px-5 py-1 text-white'
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

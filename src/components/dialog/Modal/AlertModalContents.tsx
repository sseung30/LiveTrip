import Image from 'next/image';
import WarningImage from '@/components/dialog/assets/warning.svg';
import type { AlertModalContentsProps } from '@/components/dialog/Modal/type';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/button/Button';

/**
 * 경고 모달의 내용을 렌더링하는 컴포넌트
 *
 * - message: 모달에 표시할 경고 메시지
 * - confirmButtonText: 확인 버튼(blue primary color)에 표시할 텍스트
 * - rejectButtonText: 취소 버튼에 표시할 텍스트
 * - confirmAction: 확인 버튼 클릭 시 실행할 서버 액션
 * - hideModal: 모달을 숨기기 위해 호출할 함수 (취소 버튼 클릭 시)
 * - isPending: 액션의 로딩 상태
 */
export function AlertModalContents({
  message,
  confirmButtonText,
  rejectButtonText,
  confirmAction,
  hideModal,
  isPending,
}: AlertModalContentsProps) {
  return (
    <div className='flex-center w-80 flex-col gap-6 md:w-[25rem]'>
      <div className='flex-center flex-col gap-1'>
        <Image src={WarningImage} alt='경고 아이콘' />
        <h1 className='text-md font-bold'>{message}</h1>
      </div>
      <div className='flex-center gap-3'>
        <Button
          variant='secondary'
          style='accent'
          disabled={isPending}
          onClick={hideModal}
          classNames='w-34'
        >
          {rejectButtonText}
        </Button>
        <form action={confirmAction}>
          <Button variant='secondary' disabled={isPending} classNames='w-34'>
            {isPending ? <Spinner size='sm' /> : confirmButtonText}
          </Button>
        </form>
      </div>
    </div>
  );
}

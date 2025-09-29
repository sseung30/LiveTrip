/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { SyntheticEvent } from 'react';
import type { ModalProps } from '@/components/dialog/type';
import { cx } from '@/utils/cx';

/**
 * 모달 창을 렌더링하는 컨테이너 컴포넌트
 * dialog 엘리먼트를 사용하여 모달을 구현하며, 배경 클릭 시 자동으로 닫히는 기능을 제공합니다.
 *
 * - dialogRef: 모달 dialog 엘리먼트에 대한 ref 객체
 * - onClose: 모달이 닫힐 때 호출되는 콜백 함수 (선택사항)
 * - classNames: 모달에 추가로 적용할 CSS 클래스명 (선택사항)
 * - children: 모달 내부에 렌더링될 자식 컴포넌트들
 */

export default function ModalContainer({
  dialogRef,
  onClose,
  classNames,
  children,
}: ModalProps) {
  const handleClick = (e: SyntheticEvent) => {
    if (dialogRef.current === e.target) {
      dialogRef.current.close();
      onClose?.();
    }
  };
  const positionCenter = 'inset-1/2 -translate-1/2';

  return (
    <dialog
      ref={dialogRef}
      className={cx(
        `flex flex-col items-center rounded-[1.875rem] bg-white p-[1.875rem] text-gray-950 drop-shadow not-open:hidden backdrop:bg-black/50`,
        positionCenter,
        classNames
      )}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}

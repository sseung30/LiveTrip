import { type SyntheticEvent, useCallback, useEffect } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import type {
  BottomSheetProps,
  CloseDialogParameter,
} from '@/components/dialog/BottomSheet/type';

/**
 * 하단에서 올라오는 애니메이션과 드래그 제스처를 지원하는 바텀 시트 컴포넌트
 * dialog 엘리먼트를 사용하며, react-spring과 use-gesture를 활용하여
 * 부드러운 애니메이션과 직관적인 드래그 인터랙션을 제공합니다.
 *
 * Props:
 * - isOpen: 바텀 시트의 표시 여부를 제어하는 boolean 값
 * - children: render props 패턴으로 closeDialog 함수를 전달받는 함수형 children
 * - hideDialog: 시트를 DOM에서 숨기는 함수 (애니메이션 완료 후 호출)
 * - dialogRef: dialog 엘리먼트에 대한 ref 객체
 * - onClose: 시트가 닫힐 때 호출되는 콜백 함수 (선택사항)
 *
 * 상수 설정:
 * - OPEN_HEIGHT: 완전히 열린 상태의 y 위치 (0)
 * - CLOSE_HEIGHT: 완전히 닫힌 상태의 y 위치 (400)
 * - CLOSE_THRESHOLD: 자동으로 닫히는 드래그 임계값 (100px)
 * - SPRING_DURATION: 애니메이션 지속 시간 (140ms)
 *
 */

const OPEN_HEIGHT = 0;
const CLOSE_THRESHOLD = 100;
const CLOSE_HEIGHT = 400;
const SPRING_DURATION = 140;

export default function BottomSheet({
  isOpen,
  children,
  hideDialog: hideDialogElement,
  dialogRef,
  onClose,
}: BottomSheetProps) {
  const [{ y }, dialogSpring] = useSpring(() => {
    return {
      config: { duration: SPRING_DURATION, ...config.slow },
      y: OPEN_HEIGHT,
    };
  });

  const openDialogUI = useCallback(() => {
    dialogSpring.start({ y: OPEN_HEIGHT });
  }, [dialogSpring]);

  const closeDialogUI = useCallback(
    ({ onRest = () => '', immediate = false }: CloseDialogParameter) => {
      dialogSpring.start({
        y: CLOSE_HEIGHT,
        onRest,
        immediate,
      });
    },
    [dialogSpring]
  );
  const closeDialog = () => {
    closeDialogUI({
      onRest: () => {
        hideDialogElement();
        onClose?.();
      },
    });
  };
  const handleOutsideClick = (e: SyntheticEvent) => {
    if (dialogRef.current === e.target) {
      closeDialog();
    }
  };
  const dragBind = useDrag(({ down: mouseDown, movement: [, movementY] }) => {
    if (mouseDown) {
      // NOTE: 하단으로 드래그할떄 movementY가 양수 -> dialog의 y 포지션을 업데이트
      dialogSpring.start({ y: movementY > 0 ? movementY : 0, immediate: true });
    } else {
      const isCloseMotion = movementY > CLOSE_THRESHOLD;

      if (isCloseMotion) {
        closeDialogUI({
          onRest: () => {
            hideDialogElement();
            onClose?.();
          },
        });
      } else {
        openDialogUI();
      }
    }
  });

  // NOTE: Open일때 Spring UI 적용
  useEffect(() => {
    if (isOpen) {
      closeDialogUI({ immediate: true });
      openDialogUI();
    }
  }, [isOpen, dialogSpring, openDialogUI, closeDialogUI]);

  return (
    <animated.dialog
      ref={dialogRef}
      {...dragBind()}
      style={{ y }}
      className={
        'top-auto bottom-0 mx-auto flex h-96 w-dvw touch-none flex-col items-center rounded-t-[1.875rem] bg-white text-gray-950 not-open:hidden backdrop:bg-black/50'
      }
      onClick={handleOutsideClick}
    >
      <div className='h-full w-full p-[1.875rem]'>
        {children({ closeDialog })}
      </div>
    </animated.dialog>
  );
}

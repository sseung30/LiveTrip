import { type SyntheticEvent, useCallback, useEffect } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import type {
  BottomSheetProps,
  CloseDialogParameter,
} from '@/components/dialog/BottomSheet/type';

const OPEN_HEIGHT = 0;
const CLOSE_THRESHOLD = 100;
const CLOSE_HEIGHT = 400;
const SPRING_DURATION = 140;

export default function BottomSheet({
  isOpen,
  children,
  hideDialog: hideDialogElement,
  onClose,
  dialogRef,
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

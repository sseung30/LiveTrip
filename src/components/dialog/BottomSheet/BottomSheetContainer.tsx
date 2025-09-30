import { type SyntheticEvent, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import type { BottomSheetProps } from '@/components/dialog/BottomSheet/type';

const OPEN_HEIGHT = 0;
const CLOSE_THRESHOLD = 100;
const CLOSE_HEIGHT = 400;

export default function BottomSheet({
  isOpen,
  children,
  hideDialog: hideDialogElement,
  onClose,
  dialogRef,
}: BottomSheetProps) {
  const [{ y }, dialogSpring] = useSpring(() => ({ y: OPEN_HEIGHT }));

  const dragBind = useDrag(({ down: mouseDown, movement: [, movementY] }) => {
    if (mouseDown) {
      // NOTE: 하단으로 드래그할떄 movementY가 양수 -> dialog의 y 포지션을 업데이트
      dialogSpring.start({ y: movementY > 0 ? movementY : 0, immediate: true });
    } else {
      const isCloseMotion = movementY > CLOSE_THRESHOLD;

      console.log(isCloseMotion, movementY);
      if (isCloseMotion) {
        dialogSpring.start({ y: CLOSE_HEIGHT, onRest: onClose });
      } else {
        dialogSpring.start({ y: OPEN_HEIGHT });
      }
    }
  });
  const closeDialogUI = () => {
    dialogSpring.start({
      y: CLOSE_HEIGHT,
      onRest: () => {
        onClose?.();
      },
    });
  };
  const handleCloseClick = (e: SyntheticEvent) => {
    if (dialogRef.current === e.target) {
      closeDialogUI();
      hideDialogElement();
      onClose?.();
    }
  };

  useEffect(() => {
    if (isOpen) {
      dialogSpring.start({ y: CLOSE_HEIGHT, immediate: true });
      dialogSpring.start({ y: OPEN_HEIGHT });
    }
  }, [isOpen, dialogSpring]);

  return (
    <animated.dialog
      ref={dialogRef}
      {...dragBind()}
      style={{ y }}
      className={
        'bottom-0 mx-auto flex h-96 w-dvw touch-none flex-col items-center rounded-t-[1.875rem] bg-white text-gray-950 drop-shadow not-open:hidden backdrop:bg-black/50'
      }
      onClick={handleCloseClick}
    >
      <div className='h-full w-full p-[1.875rem]'>{children}</div>
    </animated.dialog>
  );
}

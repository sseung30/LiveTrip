import type { ReactNode, RefObject, SyntheticEvent } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface BottomSheetProps {
  isOpen: boolean;
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose?: (...args: unknown[]) => void;
}
export default function BottomSheet({
  isOpen,
  children,
  onClose,
  dialogRef,
}: BottomSheetProps) {
  const [{ y }, spring] = useSpring(() => ({ y: 0 }));
  const openHeight = 0;
  const closeThreshold = 100;

  const handleCloseClick = (e: SyntheticEvent) => {
    if (dialogRef.current === e.target) {
      dialogRef.current.close();
      onClose?.();
    }
  };
  const dragBind = useDrag(({ down: mouseDown, movement: [, mY] }) => {
    console.log(mouseDown, mY);

    if (mouseDown) {
      spring.start({ y: mY > 0 ? mY : 0, immediate: true });
    } else {
      if (mY > closeThreshold) {
        spring.start({ y: 400, onRest: onClose });
      } else {
        spring.start({ y: openHeight });
      }
    }
  });

  return (
    <>
      <animated.dialog
        ref={dialogRef}
        {...dragBind()}
        style={{ y }}
        className={
          'inset-1/2 top-full flex h-96 w-dvw -translate-x-1/2 -translate-y-full touch-none flex-col items-center rounded-t-[1.875rem] bg-white p-[1.875rem] text-gray-950 drop-shadow not-open:hidden backdrop:bg-black/50'
        }
      >
        {children}
      </animated.dialog>
    </>
  );
}

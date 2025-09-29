import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from 'react';

export const ModalContext = createContext<{
  mount: (element: ReactNode) => void;
  unmount: () => void;
} | null>(null);

/**
 * TODO:
 * - useCallback, useMemo 사용 고려
 */
export default function ModalProvider({ children }: PropsWithChildren) {
  const [modalComponent, setModalComponent] = useState<ReactNode>(null);

  const mount = (element: ReactNode) => {
    setModalComponent(element);
  };
  const unmount = () => {
    setModalComponent(null);
  };

  const context = { mount, unmount };

  return (
    <ModalContext.Provider value={context}>
      {children}
      {modalComponent}
    </ModalContext.Provider>
  );
}

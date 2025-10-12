import { createContext, useContext } from 'react';

export interface DropdownContextValue {
  isOpen: boolean;
  width?: number | undefined;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'Dropdown context is missing. Wrap your tree with <DropdownProvider>.'
    );
  }

  return context;
}

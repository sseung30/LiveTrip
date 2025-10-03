import { type ReactNode, useCallback, useState } from 'react';
import { DropdownContext } from '@/components/dropdown/dropdownContext';
import DropdownItems from '@/components/dropdown/DropdownItems';
import DropdownMenu from '@/components/dropdown/DropdownMenu';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger';
import useDropdownClose from '@/components/dropdown/useDropdownClose';

interface DropdownProps {
  children: ReactNode;
  width: number;
}

export default function Dropdown({ children, width }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const dropdownRef = useDropdownClose(close);

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle, width }}>
      <div
        ref={dropdownRef}
        className='relative h-[54px] rounded-2xl border text-gray-100'
        style={{ width }}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Items = DropdownItems;
Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;

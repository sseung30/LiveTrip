import { type ReactNode, useCallback, useState } from 'react';
import { DropdownContext } from '@/components/dropdown/dropdownContext';
import DropdownItems from '@/components/dropdown/DropdownItems';
import DropdownMenu from '@/components/dropdown/DropdownMenu';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger';
import useDropdownClose from '@/components/dropdown/useDropdownClose';
import { cx } from '@/utils/cx';

interface DropdownProps {
  children: ReactNode;
  width?: number;
}

const BASE = 'relative h-[54px] rounded-2xl border text-gray-100';

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

  const className = cx(BASE, width ? `w-[${width}px]` : 'w-full');

  console.log(className);

  return (
    <DropdownContext.Provider value={{ isOpen, open, close, toggle, width }}>
      <div ref={dropdownRef} className={className} style={{ width }}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Items = DropdownItems;
Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;

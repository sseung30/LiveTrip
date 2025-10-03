import type { ReactNode } from 'react';
import DropdownItems from '@/components/dropdown/DropdownItems';
import DropdownMenu from '@/components/dropdown/DropdownMenu';
import DropdownTrigger from '@/components/dropdown/DropdownTrigger';
import useDropdownClose from '@/components/dropdown/useDropdownClose';

interface DropdownProps {
  children: ReactNode;
  handleClose: () => void;
}

export default function Dropdown({ children, handleClose }: DropdownProps) {
  const dropdownRef = useDropdownClose(handleClose);

  return (
    <div
      ref={dropdownRef}
      className='relative h-[54px] rounded-2xl border text-gray-100'
    >
      {children}
    </div>
  );
}

Dropdown.Items = DropdownItems;
Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;

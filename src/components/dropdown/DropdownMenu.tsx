import type { ReactNode } from 'react';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';

interface DropdownMenuProps {
  children?: ReactNode;
  position?: string;
}

export default function DropdownMenu({
  children,
  position,
}: DropdownMenuProps) {
  const { isOpen, width } = useDropdownContext();

  return (
    <div>
      {isOpen && (
        <ul
          className={`${position} absolute z-10 flex w-full flex-col gap-1 rounded-2xl border bg-white px-3 py-3`}
          style={{ width }}
        >
          {children}
        </ul>
      )}
    </div>
  );
}
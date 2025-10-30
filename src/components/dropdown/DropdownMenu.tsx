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
          className={`${position} absolute z-10 flex w-full flex-col gap-1 overflow-y-auto rounded-2xl border border-gray-300 bg-white px-3 py-3 max-h-48 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]`}
          style={{ width }}
        >
          {children}
        </ul>
      )}
    </div>
  );
}

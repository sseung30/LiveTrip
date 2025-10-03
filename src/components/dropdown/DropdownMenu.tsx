import type { ReactNode } from 'react';

interface DropdownMenuProps {
  children?: ReactNode;
  width: number;
  isOpen: boolean;
  position?: string;
}

export default function DropdownMenu({
  children,
  isOpen,
  position,
}: DropdownMenuProps) {
  return (
    <div>
      {isOpen && (
        <ul
          className={`${position} absolute flex w-full flex-col gap-1 rounded-2xl border px-3 py-3`}
        >
          {children}
        </ul>
      )}
    </div>
  );
}

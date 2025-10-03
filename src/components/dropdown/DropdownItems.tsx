import type { ReactNode } from 'react';

interface DropdownItemsProps {
  children: ReactNode;
  value: string;
  onSelect: (value: string) => void;
}

export default function DropdownItems({
  children,
  value,
  onSelect,
}: DropdownItemsProps) {
  return (
    <button
      onClick={() => {
        onSelect(value);
      }}
    >
      <li className='hover:bg-primary-100 flex h-[48px] items-center px-4 text-gray-900 hover:rounded-xl'>
        {children}
      </li>
    </button>
  );
}

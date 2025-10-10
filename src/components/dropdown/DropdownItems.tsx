import type { ReactNode } from 'react';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';

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
  const { close } = useDropdownContext();

  return (
    <button
      onClick={() => {
        onSelect(value);
        close();
      }}
    >
      <li className='hover:bg-primary-100 flex h-[48px] items-center px-4 text-gray-900 hover:rounded-xl'>
        {children}
      </li>
    </button>
  );
}

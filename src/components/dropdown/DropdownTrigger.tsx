import Image from 'next/image';
import type { ReactNode } from 'react';
import ArrowDown from '@/components/dropdown/assets/arrow-down.svg';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';

interface DropDownTriggerProps {
  children: ReactNode;
}

export default function DropdownTrigger({ children }: DropDownTriggerProps) {
  const { toggle } = useDropdownContext();

  return (
    <button
      className='flex h-full w-full items-center justify-between px-5'
      onClick={toggle}
    >
      {children}
      <Image className='h-[24px] w-[24px]' src={ArrowDown} alt='메뉴 열기' />
    </button>
  );
}

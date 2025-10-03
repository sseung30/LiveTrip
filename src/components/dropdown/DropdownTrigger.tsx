import Image from 'next/image';
import type { ReactNode } from 'react';
import ArrowDown from '@/components/dropdown/assets/arrow-down.svg';

interface DropDownTriggerProps {
  children: ReactNode;
  handleToggle: () => void;
}

export default function DropdownTrigger({
  children,
  handleToggle,
}: DropDownTriggerProps) {
  return (
    <button
      className='flex h-full w-full items-center justify-between px-5'
      onClick={handleToggle}
    >
      {children}
      <Image className='h-[24px] w-[24px]' src={ArrowDown} alt='메뉴 열기' />
    </button>
  );
}

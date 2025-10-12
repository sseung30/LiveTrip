import Image from 'next/image';
import type { ReactNode } from 'react';
import ArrowDown from '@/components/dropdown/assets/arrow-down.svg';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';
import type { Variant } from '@/components/dropdown/type';
import { cx } from '@/utils/cx';

interface DropDownTriggerProps {
  variant: Variant;
  children: ReactNode;
}

const DESIGN = {
  detailPage: 'justify-between',
  mainPage: 'justify-center',
};

function getDesign(variant: Variant) {
  if (variant === 'detailPage') {
    return DESIGN.detailPage;
  }

  return DESIGN.mainPage;
}

export default function DropdownTrigger({
  variant,
  children,
}: DropDownTriggerProps) {
  const { toggle } = useDropdownContext();

  const BASE = 'flex h-full w-full items-center px-5';
  const className = cx(BASE, getDesign(variant));

  return (
    <button className={className} onClick={toggle}>
      {children}
      <Image className='h-[24px] w-[24px]' src={ArrowDown} alt='메뉴 열기' />
    </button>
  );
}

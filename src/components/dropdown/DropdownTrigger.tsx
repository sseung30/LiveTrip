import Image from 'next/image';
import type { ReactNode } from 'react';
import ArrowDown from '@/components/dropdown/assets/arrow-down.svg';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';
import type { Variant } from '@/components/dropdown/type';
import { cx } from '@/utils/cx';

interface DropDownTriggerProps {
  variant?: Variant;
  children: ReactNode;
}

const DESIGN = {
  detailPage: 'justify-between',
  mainPage: 'justify-center',
};

function getDesign(variant: Variant = 'mainPage') {
  if (variant === 'detailPage') {
    return DESIGN.detailPage;
  }

  return DESIGN.mainPage;
}

export default function DropdownTrigger({
  variant = 'mainPage',
  children,
}: DropDownTriggerProps) {
  const { toggle } = useDropdownContext();

  const BASE = 'flex h-full w-full items-center px-5 rounded-2xl focus:outline-none';
  const className = cx(BASE, getDesign(variant));

  return (
    <button className={className} 
       type="button" /**
       * ✅ 기본 submit 방지
       */
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 상위 전파 방지
        e.preventDefault(); // 혹시 모를 form submit 방지
        toggle();
      }}
    >
      {children}
      <Image className='h-[24px] w-[24px]' src={ArrowDown} alt='메뉴 열기' />
    </button>
  );
}

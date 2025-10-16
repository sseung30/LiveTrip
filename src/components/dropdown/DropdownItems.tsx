import type { ReactNode } from 'react';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';
import type { Variant } from '@/components/dropdown/type';
import { cx } from '@/utils/cx';

interface DropdownItemsProps {
  variant: Variant;
  children: ReactNode;
  value: string;
  onSelect: (value: string) => void;
}

const DESIGN = {
  detailPage: 'px-4',
  mainPage: 'justify-center',
};

function getDesign(variant: Variant) {
  if (variant === 'detailPage') {
    return DESIGN.detailPage;
  }

  return DESIGN.mainPage;
}

export default function DropdownItems({
  variant,
  children,
  value,
  onSelect,
}: DropdownItemsProps) {
  const { close } = useDropdownContext();

  const BASE =
    'hover:bg-primary-100 flex h-[48px] items-center text-gray-900 hover:text-gray-600 hover:rounded-xl';
  const className = cx(BASE, getDesign(variant));

  return (
    <button
        type="button"
        className={className}
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
          e.preventDefault();  // 혹시 모를 form submit 방지
          onSelect(value);
          close();
        }}
    >
      <li className={className}>{children}</li>
    </button>
  );
}

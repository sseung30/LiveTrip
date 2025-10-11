import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';

type Variant = 'primary' | 'secondary' | 'label' | 'filter';
type Emphasis = 'solid' | 'normal';

/* 높이, 반경 */
const HEIGHTS = {
  /* primary, label 용 */
  regular:
    'h-[41px] md:h-[48px] lg:h-[54px] rounded-xl md:rounded-[14px] lg:rounded-2xl',
  /* secondary용 */
  compact:
    'h-[34px] md:h-[48px] lg:h-[54px] rounded-xl md:rounded-[14px] lg:rounded-2xl',
  /* filter 용 */
  pill: 'h-[37px] lg:h-[44px] rounded-[100px]',
};

function getDimensions(variant: Variant) {
  if (variant === 'filter') {
    return HEIGHTS.pill;
  }
  if (variant === 'secondary') {
    return HEIGHTS.compact;
  }

  return HEIGHTS.regular;
}

/* 타이포(폰트) */
const baseFont = 'text-14 md:text-16 font-medium';

const TYPO: Record<Variant, Record<Emphasis, string>> = {
  primary: {
    solid: 'text-14 md:text-16 font-bold',
    normal: '',
  },
  secondary: {
    solid: baseFont,
    normal: baseFont,
  },
  label: {
    solid: baseFont,
    normal: baseFont,
  },
  filter: {
    solid: 'text-14 lg:text-16 font-bold',
    normal: 'text-14 lg:text-16 font-medium',
  },
};

/* 시각 톤 */
const TONE: Record<Variant, Record<Emphasis, string>> = {
  primary: {
    solid:
      'bg-primary-500 hover:bg-[#5BB2FF] text-white disabled:bg-gray-200 disabled:hover:bg-[#DADCE3] disabled:text-gray-50',
    normal: '',
  },
  secondary: {
    solid:
      'bg-primary-500 hover:bg-[#5BB2FF] text-white disabled:bg-white disabled:text-gray-200 disabled:hover:bg-[#FAFAFA] disabled:border disabled:border-gray-200',
    normal: 'bg-white hover:bg-[#FAFAFA] text-gray-600 border border-gray-200',
  },
  label: {
    solid: 'bg-primary-100 hover:bg-[#D1E9FF] text-gray-950',
    normal: 'text-gray-600 hover:bg-[#FAFAFA] ',
  },
  filter: {
    solid: 'bg-[#333333] hover:bg-[#4D4D4D] text-white',
    normal: 'border border-[#D8D8D8] bg-white hover:bg-[#FAFAFA] text-gray-950',
  },
};

const BASE =
  'inline-flex items-center justify-center text-center select-none gap-1 [&>img]:w-4 md:[&>img]:w-6 lg:[&>img]:w-6 [&>img]:h-4 md:[&>img]:h-6 lg:[&>img]:h-6';

interface BaseProps {
  variant: Variant;
  emphasis?: Emphasis;
  disabled: boolean;
  classNames?: string;
  children?: ReactNode;
  onClick: () => void;
}

export default function Button({
  variant,
  emphasis = 'solid',
  classNames,
  disabled,
  children,
  onClick,
}: BaseProps) {
  const dimensions = getDimensions(variant);

  const className = cx(
    BASE,
    dimensions,
    TYPO[variant][emphasis],
    TONE[variant][emphasis],
    classNames
  );

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

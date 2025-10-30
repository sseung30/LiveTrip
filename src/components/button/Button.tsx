import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';

type Variant = 'primary' | 'secondary' | 'label' | 'filter';
type Style = 'default' | 'accent';

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

const TYPO: Record<Variant, Record<Style, string>> = {
  primary: {
    default: 'text-14 md:text-16 font-bold',
    accent: '',
  },
  secondary: {
    default: baseFont,
    accent: baseFont,
  },
  label: {
    default: baseFont,
    accent: baseFont,
  },
  filter: {
    default: 'text-14 lg:text-16 font-bold',
    accent: 'text-14 lg:text-16 font-medium',
  },
};

/* 시각 톤 */
const TONE: Record<Variant, Record<Style, string>> = {
  primary: {
    default:
      'bg-primary-500 hover:bg-[#5BB2FF] text-white disabled:bg-gray-200 disabled:hover:bg-[#DADCE3] disabled:text-gray-50',
    accent: '',
  },
  secondary: {
    default:
      'bg-primary-500 hover:bg-[#5BB2FF] text-white disabled:bg-white disabled:text-gray-200 disabled:hover:bg-[#FAFAFA] disabled:border disabled:border-gray-200',
    accent: 'bg-white hover:bg-[#FAFAFA] text-gray-600 border border-gray-200',
  },
  label: {
    default: 'bg-primary-100 hover:bg-[#D1E9FF] text-gray-950',
    accent: 'text-gray-600 hover:bg-[#FAFAFA]',
  },
  filter: {
    default: 'bg-[#333333] hover:bg-[#4D4D4D] text-white [&_svg]:fill-white',
    accent: 'border border-[#D8D8D8] bg-white hover:bg-[#FAFAFA] text-gray-950',
  },
};

const BASE =
  'inline-flex items-center justify-center text-center select-none gap-1 [&>img]:w-4 md:[&>img]:w-6 lg:[&>img]:w-6 [&>img]:h-4 md:[&>img]:h-6 lg:[&>img]:h-6 transition-colors motion-safe:transition-transform motion-safe:transition-shadow duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow';

interface BaseProps {
  variant: Variant;
  style?: Style;
  disabled?: boolean;
  classNames?: string;
  children?: ReactNode;
  onClick?: (...args: unknown[]) => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant,
  style = 'default',
  classNames,
  disabled,
  children,
  onClick,
  type = 'submit',
}: BaseProps) {
  const dimensions = getDimensions(variant);

  const className = cx(
    BASE,
    dimensions,
    TYPO[variant][style],
    TONE[variant][style],
    'w-full',
    classNames
  );

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

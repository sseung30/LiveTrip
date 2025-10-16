// Registration/components/RoundIconButton.tsx

import type { ReactNode } from 'react';

interface RoundIconButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  variant?: 'primary' | 'neutral';
}

export function RoundIconButton({
  children,
  onClick,
  ariaLabel,
  variant = 'primary',
}: RoundIconButtonProps) {
  const baseClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border transition';
  const variantClass =
    variant === 'primary'
      ? 'border-primary-100 bg-white text-primary-500 hover:bg-primary-100'
      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`${baseClass} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

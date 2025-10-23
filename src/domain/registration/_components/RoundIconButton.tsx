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
    'inline-flex h-10 w-10 items-center justify-center rounded-full transition';
  const variantClass =
    variant === 'primary'
      ? 'bg-primary-500 text-white hover:bg-primary-600'
      : 'bg-gray-50 text-black hover:bg-gray-100';

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

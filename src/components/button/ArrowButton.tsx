import { cx } from '@/utils/cx';

interface ArrowButtonProps {
  onClick?: (...args: unknown[]) => any;
  ariaLabel: string;
  className?: string;
}
export function LeftArrowButton({
  onClick,
  ariaLabel,
  className,
}: ArrowButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        `absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white`,
        className
      )}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5L8.25 12l7.5-7.5'
        />
      </svg>
    </button>
  );
}
export function RightArrowButton({
  onClick,
  ariaLabel,
  className,
}: ArrowButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        `absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white`,
        className
      )}
      onClick={onClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='h-6 w-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.25 4.5l7.5 7.5-7.5 7.5'
        />
      </svg>
    </button>
  );
}

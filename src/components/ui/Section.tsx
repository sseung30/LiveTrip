import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
      <div className='leading-relaxed text-gray-700'>{children}</div>
      <div className='border-t border-gray-200'></div>
    </div>
  );
}

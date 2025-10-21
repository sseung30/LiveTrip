import type { ReactNode } from 'react';
import SideMenu from '@/components/side-menu';

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex max-w-[1200px] justify-center gap-8 px-4 py-8 md:px-12'>
      {/* 왼쪽: SideMenu (태블릿 이상에서만 표시) */}
      <aside className='hidden md:block'>
        <SideMenu size='large' activeItem='reservationStatus' />
      </aside>
      {children}
    </div>
  );
}

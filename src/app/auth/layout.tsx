import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='px-6 py-14 md:px-12'>{children}</div>
    </>
  );
}

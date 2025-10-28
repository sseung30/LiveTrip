import { type ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex-center mx-auto my-0 w-full flex-col gap-4 px-0 pt-10 md:gap-[1.875rem] md:pt-12 xl:w-[75rem] xl:gap-12 xl:px-10 xl:pt-14'>
      {children}
    </main>
  );
}

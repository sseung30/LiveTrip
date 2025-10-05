import type { ReactNode } from 'react';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='px-6 py-6 md:px-8 md:py-10'>{children}</div>
      <Footer />
    </>
  );
}

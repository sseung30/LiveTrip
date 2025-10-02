import '@/app/globals.css';
import Header from '@/components/header/Header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'LiveTrip',
  description: 'LiveTrip',
};
const pretendardVariable = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={pretendardVariable.variable}>
        <div className='font-pretendard'>
          <Header />
          {children}
          </div>
      </body>
    </html>
  );
}

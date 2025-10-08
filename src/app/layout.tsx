import '@/app/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProvider from '@/app/QueryProvider';
import { ToastContainer } from '@/components/toast/ToastContainer';

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
        {/* ✅ React Query Provider로 children 감싸기 */}
        <QueryProvider>
          <div className='font-pretendard'>
            {children}
            <ToastContainer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

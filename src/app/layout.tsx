import '@/app/globals.css';
import { cx } from 'class-variance-authority';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import QueryProvider from '@/app/QueryProvider';
import { ToastContainer } from '@/components/toast/ToastContainer';

export const metadata: Metadata = {
  title: 'LiveTrip',
  description: 'LiveTrip',
};
const pretendardVariable = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});
const notoSans = Noto_Sans({
  weight: ['300', '700'],
  subsets: ['latin'],
  variable: '--font-notosans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={cx(pretendardVariable.className, notoSans.variable)}>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy='beforeInteractive'
        />
        {/* ✅ React Query Provider로 children 감싸기 */}
        <QueryProvider>
          <div>
            {children}
            <ToastContainer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

import '@/app/globals.css';
import { cx } from 'class-variance-authority';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from '@/components/toast/ToastContainer';
import ReactQueryProvider from '@/utils/react-query/ReactQueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://live-trip-lac.vercel.app'),
  title: 'LiveTrip',
  description: '삶에 스며들 경험을 찾으세요. 무엇을 체험하고 싶으신가요?',
  openGraph: {
    images: '/images/open_graph.webp',
  },
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
        <ReactQueryProvider>
          <SessionProvider>
            <div>
              {children}
              <ToastContainer />
            </div>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

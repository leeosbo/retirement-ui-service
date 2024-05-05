import SiteLayout from '@/ui/SiteLayout';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthContextProvider from '@/store/auth-context';
import PageContextProvider from '@/store/page-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Retirement Planning',
  description: 'Retirement Planning System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
      </head>
      <body className={`${inter.className}`}>
        <AuthContextProvider>
          <PageContextProvider>
            <SiteLayout>{children}</SiteLayout>
          </PageContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

import AppLayout from '@/layout/AppLayout';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Lubby Cake',
  description: 'Lubby Cake - Bánh ngon mỗi ngày',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import RootLayoutProvider from '@/layouts/RootLayoutProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tu Mentor Estratégico y Legal',
  description: 'Combina la filosofía de crecimiento de Paul Graham con la normativa oficial de Chile. Respuestas precisas para construir, legalizar y escalar tu startup.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}

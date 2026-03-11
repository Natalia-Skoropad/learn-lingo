import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ToastProvider from '@/providers/ToastProvider';
import ModalRoot from '@/components/modals/ModalRoot/ModalRoot';

import Header from '@/components/header/Header/Header';
import TanStackProvider from '@/providers/TanStackProvider';

import './globals.css';

//===========================================================================

const roboto = Roboto({
  variable: '--font-family',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

//===========================================================================

const SITE_URL = 'https://learn-lingo.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LearnLingo',
    template: '%s | LearnLingo',
  },
  description:
    'LearnLingo helps you find experienced language tutors and improve your language skills with confidence.',

  openGraph: {
    title: 'LearnLingo',
    description:
      'LearnLingo helps you find experienced language tutors and improve your language skills with confidence.',
    url: SITE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnLingo preview image',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LearnLingo',
    description:
      'LearnLingo helps you find experienced language tutors and improve your language skills with confidence.',
    images: [
      '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
    ],
  },
};

//===========================================================================

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <ToastProvider />
          <ModalRoot />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;

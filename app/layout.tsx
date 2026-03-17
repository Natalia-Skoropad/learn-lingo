import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { getCurrentUserFromSession } from '@/lib/server/auth/session';

import AuthProvider from '@/providers/AuthProvider';
import ToastProvider from '@/providers/ToastProvider';

import Header from '@/components/header/Header/Header';
import ModalRootLazy from '@/components/modals/ModalRoot/ModalRootLazy';

import './globals.css';

//===========================================================================

const roboto = Roboto({
  variable: '--font-family',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

//===========================================================================

const SITE_URL = 'https://learn-lingo-ivory-six.vercel.app';

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
        url: '/og/learnlingo-og-cover.jpg',
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
    images: ['/og/learnlingo-og-cover.jpg'],
  },
};

//===========================================================================

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getCurrentUserFromSession();

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://learn-lingo-66650.firebaseapp.com"
        />
        <link rel="preconnect" href="https://apis.google.com" />
      </head>

      <body className={roboto.variable}>
        <AuthProvider initialUser={initialUser}>
          <Header />
          <ToastProvider />
          <ModalRootLazy />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { getCurrentAppUser } from '@/lib/server/profile/profile.server';

import {
  APP_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/constants/metadata';

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

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: APP_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

//===========================================================================

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getCurrentAppUser();

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

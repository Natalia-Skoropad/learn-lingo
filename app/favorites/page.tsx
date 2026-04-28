import type { Metadata } from 'next';

import {
  APP_URL,
  FAVORITES_DESCRIPTION,
  FAVORITES_OG_IMAGE_ALT,
  FAVORITES_TITLE,
  OG_IMAGE,
  SITE_NAME,
} from '@/lib/constants/metadata';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import FavoritesTeachers from '@/components/favorites/FavoritesTeachers/FavoritesTeachers';

import css from './page.module.css';

//===========================================================================

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: FAVORITES_TITLE,
  description: FAVORITES_DESCRIPTION,

  alternates: {
    canonical: '/favorites',
  },

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: FAVORITES_TITLE,
    description: FAVORITES_DESCRIPTION,
    url: '/favorites',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: FAVORITES_OG_IMAGE_ALT,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: FAVORITES_TITLE,
    description: FAVORITES_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

//===========================================================================

function FavoritesPage() {
  return (
    <main className={css.page}>
      <section className={css.section}>
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Favorites' }]}
          />

          <h1 className={css.title}>Favorites</h1>
          <p className={css.text}>
            Your saved teachers are collected here so you can quickly return to
            the tutors you liked most.
          </p>

          <FavoritesTeachers />
        </div>
      </section>
    </main>
  );
}

export default FavoritesPage;

import type { Metadata } from 'next';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import FavoritesTeachers from '@/components/favorites/FavoritesTeachers/FavoritesTeachers';

import css from './page.module.css';

//===========================================================================

const SITE_URL = 'https://learn-lingo-ivory-six.vercel.app';
const PAGE_URL = `${SITE_URL}/favorites`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Favorites | LearnLingo',
  description:
    'View your favorite language teachers on LearnLingo and quickly return to the tutors you saved.',

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: 'Favorites | LearnLingo',
    description:
      'View your favorite language teachers on LearnLingo and quickly return to the tutors you saved.',
    url: PAGE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/learnlingo-og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnLingo favorites page preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Favorites | LearnLingo',
    description:
      'View your favorite language teachers on LearnLingo and quickly return to the tutors you saved.',
    images: ['/learnlingo-og-cover.jpg'],
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

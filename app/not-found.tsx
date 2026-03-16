import type { Metadata } from 'next';
import Image from 'next/image';
import clsx from 'clsx';

import ButtonLink from '@/components/common/Button/ButtonLink';
import BackButton from '@/components/common/Button/BackButton';

import css from './shared-hero.module.css';

//===========================================================================

const SITE_URL = 'https://learn-lingo-ivory-six.vercel.app';
const PAGE_URL = `${SITE_URL}/404`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '404 | Page not found',
  description:
    'Sorry, the page you are looking for does not exist or may have been moved.',

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: '404 | Page not found',
    description:
      'Sorry, the page you are looking for does not exist or may have been moved.',
    url: PAGE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/404-page-girl.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnLingo 404 page preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '404 | Page not found',
    description:
      'Sorry, the page you are looking for does not exist or may have been moved.',
    images: ['/404-page-girl.jpg'],
  },
};

//===========================================================================

function NotFound() {
  return (
    <main className={css.page}>
      <section aria-labelledby="not-found-title">
        <div className="container">
          <div className={css.heroWrapper}>
            <div className={css.content}>
              <p className={css.kicker}>Oops... something went wrong</p>

              <h1 id="not-found-title" className={css.title}>
                Looks like this page got lost in translation
              </h1>

              <p className={css.text}>
                The page you are looking for does not exist, was moved, or never
                made it to class. Let’s get you back to a place where the words
                still make sense.
              </p>

              <ul className={css.actions}>
                <li>
                  <ButtonLink href="/" className={css.primaryButton}>
                    Go to homepage
                  </ButtonLink>
                </li>

                <li>
                  <BackButton className={css.secondaryButton}>
                    Go back
                  </BackButton>
                </li>
              </ul>
            </div>

            <div className={clsx(css.imageBox, css.imageBoxNeutral)}>
              <Image
                src="/404-page-girl.jpg"
                alt="Funny 404 illustration"
                fill
                priority
                sizes="(min-width: 1440px) 568px, (min-width: 768px) 50vw, 100vw"
                className={css.image}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;

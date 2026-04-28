import type { Metadata } from 'next';
import Image from 'next/image';
import clsx from 'clsx';

import {
  APP_URL,
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_IMAGE,
  NOT_FOUND_IMAGE_ALT,
  NOT_FOUND_TITLE,
  SITE_NAME,
} from '@/lib/constants/metadata';

import ButtonLink from '@/components/common/Button/ButtonLink';
import BackButton from '@/components/common/Button/BackButton';

import css from './shared-hero.module.css';

//===========================================================================

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: NOT_FOUND_TITLE,
  description: NOT_FOUND_DESCRIPTION,

  alternates: {
    canonical: '/404',
  },

  openGraph: {
    title: NOT_FOUND_TITLE,
    description: NOT_FOUND_DESCRIPTION,
    url: '/404',
    siteName: SITE_NAME,
    images: [
      {
        url: NOT_FOUND_IMAGE,
        width: 1200,
        height: 630,
        alt: NOT_FOUND_IMAGE_ALT,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: NOT_FOUND_TITLE,
    description: NOT_FOUND_DESCRIPTION,
    images: [NOT_FOUND_IMAGE],
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
                src={NOT_FOUND_IMAGE}
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

import type { Metadata } from 'next';
import Image from 'next/image';
import clsx from 'clsx';

import {
  APP_URL,
  HOME_DESCRIPTION,
  HOME_TITLE,
  OG_IMAGE,
  SITE_NAME,
} from '@/lib/constants/metadata';

import ButtonLink from '@/components/common/Button/ButtonLink';
import StatsSection from '@/components/home/StatsSection/StatsSection';

import css from './shared-hero.module.css';

//===========================================================================

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: HOME_TITLE,
  description: HOME_DESCRIPTION,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Curly red-haired girl sitting at the computer and sticking out her tongue',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

//===========================================================================

function Home() {
  return (
    <main>
      <section aria-labelledby="home-title">
        <div className="container">
          <div className={css.heroWrapper}>
            <div className={css.content}>
              <h1 id="home-title" className={css.title}>
                Unlock your potential with the best{' '}
                <span className={css.accent}>language</span> tutors
              </h1>

              <p className={css.text}>
                Embark on an exciting language journey with expert tutors.
                Improve your skills, build confidence, and reach new goals with
                experienced teachers from around the world.
              </p>

              <ButtonLink href="/teachers" className={css.heroButton}>
                Get started
              </ButtonLink>
            </div>

            <div className={clsx(css.imageBox, css.imageBoxAccent)}>
              <Image
                src="/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg"
                alt="Curly red-haired girl sitting at the computer and sticking out her tongue"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1440px) 568px, (min-width: 768px) 50vw, 100vw"
                className={css.image}
              />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
    </main>
  );
}

export default Home;

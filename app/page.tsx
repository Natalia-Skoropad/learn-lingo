import type { Metadata } from 'next';
import Image from 'next/image';

import Button from '@/components/common/Button/Button';
import StatsSection from '@/components/home/StatsSection/StatsSection';

import css from './page.module.css';

//===========================================================================

const SITE_URL = 'https://learn-lingo.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'LearnLingo | Find the best language tutors',
  description:
    'Unlock your potential with the best language tutors. Learn languages with experienced teachers from around the world.',

  openGraph: {
    title: 'LearnLingo | Find the best language tutors',
    description:
      'Unlock your potential with the best language tutors. Learn languages with experienced teachers from around the world.',
    url: SITE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
        width: 1200,
        height: 630,
        alt: 'Curly red-haired girl sitting at the computer and sticking out her tongue',
      },
    ],

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LearnLingo | Find the best language tutors',
    description:
      'Unlock your potential with the best language tutors. Learn languages with experienced teachers from around the world.',
    images: [
      '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
    ],
  },
};

//===========================================================================

function Home() {
  return (
    <main className={css.page}>
      <section className={css.hero} aria-labelledby="home-title">
        <div className="container">
          <div className={css.heroWrapper}>
            <div className={css.content}>
              <h1 id="home-title" className={css.title}>
                Unlock your potential with the best
                <span className={css.accent}>language</span> tutors
              </h1>

              <p className={css.text}>
                Embark on an Exciting Language Journey with Expert Language
                Tutors: Elevate your language proficiency to new heights by
                connecting with highly qualified and experienced tutors.
              </p>

              <Button className={css.heroButton}>Get started</Button>
            </div>

            <div className={css.imageBox}>
              <Image
                src="/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg"
                alt="Curly red-haired girl sitting at the computer and sticking out her tongue"
                fill
                priority
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

import type { Metadata } from 'next';
import Image from 'next/image';

import css from './page.module.css';

//===========================================================================

const SITE_URL = 'https://learn-lingo.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '',
  description: '',

  openGraph: {
    title: '',
    description: '',
    url: SITE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her tongue.jpg',
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    images: [
      '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her tongue.jpg',
    ],
  },
};

//===========================================================================

function Home() {
  return (
    <main className={css.page}>
      <div className="container">
        <h1 className={css.title}>
          Unlock your potential with the best language tutors
        </h1>
        <p className={css.text}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        {/*<Image
          src="/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her tongue.jpg"
          alt="Curly red-haired girl sitting at the computer and sticking out her tongue"
          fill
          priority
          sizes="100vw"
          className={css.bgImage}
        />*/}
      </div>
    </main>
  );
}

export default Home;

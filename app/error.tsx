'use client';

import Image from 'next/image';
import clsx from 'clsx';

import Button from '@/components/common/Button/Button';
import ButtonLink from '@/components/common/Button/ButtonLink';

import css from './shared-hero.module.css';

//===========================================================================

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

//===========================================================================

function ErrorPage({ reset }: Props) {
  return (
    <main className={css.page}>
      <section aria-labelledby="error-title">
        <div className="container">
          <div className={css.heroWrapper}>
            <div className={css.content}>
              <p className={css.kicker}>Oops... something went wrong</p>

              <h1 id="error-title" className={css.title}>
                We hit a small language barrier
              </h1>

              <p className={css.text}>
                Something unexpected happened while loading this page. Please
                try again in a moment or return to the homepage.
              </p>

              <ul className={css.actions}>
                <li>
                  <Button
                    type="button"
                    className={css.primaryButton}
                    onClick={reset}
                  >
                    Try again
                  </Button>
                </li>

                <li>
                  <ButtonLink
                    href="/"
                    className={css.secondaryButton}
                    variant="registration"
                  >
                    Go to homepage
                  </ButtonLink>
                </li>
              </ul>
            </div>

            <div className={clsx(css.imageBox, css.imageBoxNeutral)}>
              <Image
                src="/error-page.jpg"
                alt="Funny error illustration"
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

export default ErrorPage;

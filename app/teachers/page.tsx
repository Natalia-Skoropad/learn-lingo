import type { Metadata } from 'next';

import Breadcrumbs from '@/components/common/Breadcrumbs/Breadcrumbs';
import TeachersList from '@/components/teachers/TeachersList/TeachersList';
import { teachersService } from '@/lib/services/teachers.service';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';

import css from './page.module.css';

//===========================================================================

const SITE_URL = 'https://learn-lingo.vercel.app';
const PAGE_URL = `${SITE_URL}/teachers`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Teachers | LearnLingo',
  description:
    'Browse language teachers on LearnLingo. Find tutors by language, level, rating, lessons completed, and price per hour.',

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: 'Teachers | LearnLingo',
    description:
      'Browse language teachers on LearnLingo. Find tutors by language, level, rating, lessons completed, and price per hour.',
    url: PAGE_URL,
    siteName: 'LearnLingo',
    images: [
      {
        url: '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
        width: 1200,
        height: 630,
        alt: 'LearnLingo teachers page preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Teachers | LearnLingo',
    description:
      'Browse language teachers on LearnLingo. Find tutors by language, level, rating, lessons completed, and price per hour.',
    images: [
      '/curly-red-haired-girl-sitting-at-the-computer-and-sticking-out-her-tongue.jpg',
    ],
  },
};

//===========================================================================

async function TeachersPage() {
  const { teachers, nextOffset, hasMore, total } =
    await teachersService.getPage(DEFAULT_TEACHER_FILTERS);

  return (
    <main className={css.page}>
      <section className={css.section}>
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Teachers' }]}
          />

          <h1 className="visually-hidden">Teachers</h1>
          <p className="visually-hidden">
            Explore experienced language teachers and choose the tutor who best
            matches your goals, level, and budget.
          </p>

          <TeachersList
            initialTeachers={teachers}
            initialNextOffset={nextOffset}
            initialHasMore={hasMore}
            initialTotal={total}
          />
        </div>
      </section>
    </main>
  );
}

export default TeachersPage;

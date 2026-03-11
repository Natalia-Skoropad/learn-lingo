import type { Metadata } from 'next';

import TeacherCard from '@/components/teachers/TeacherCard/TeacherCard';
import { teachersService } from '@/lib/services/teachers.service';

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
  const teachers = await teachersService.getAll();

  return (
    <main>
      <section className={css.section}>
        <div className="container">
          <h1 className="visually-hidden">Teachers</h1>

          <ul className={css.list}>
            {teachers.map((teacher) => (
              <li key={teacher.id} className={css.item}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default TeachersPage;

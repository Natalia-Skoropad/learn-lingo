import type { Metadata } from 'next';
import type { TeacherFilters } from '@/types/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import { buildTeachersPath } from '../../utils/teachers.query';

//===============================================================

const SITE_URL = 'https://learn-lingo.vercel.app';

//===============================================================

function getActiveParts(filters: TeacherFilters): string[] {
  const parts: string[] = [];

  if (filters.language !== DEFAULT_TEACHER_FILTERS.language) {
    parts.push(`${filters.language} teachers`);
  }

  if (filters.level !== DEFAULT_TEACHER_FILTERS.level) {
    parts.push(`for ${filters.level}`);
  }

  if (filters.price !== DEFAULT_TEACHER_FILTERS.price) {
    parts.push(`at ${filters.price}$ per hour`);
  }

  return parts;
}

function getSeoTitle(filters: TeacherFilters): string {
  const parts = getActiveParts(filters);

  if (!parts.length) {
    return 'Teachers | LearnLingo';
  }

  return `${parts.join(' ')} | LearnLingo`;
}

function getSeoDescription(filters: TeacherFilters): string {
  const languagePart =
    filters.language !== DEFAULT_TEACHER_FILTERS.language
      ? `${filters.language} language tutors`
      : 'language tutors';

  const levelPart =
    filters.level !== DEFAULT_TEACHER_FILTERS.level
      ? ` for ${filters.level}`
      : '';

  const pricePart =
    filters.price !== DEFAULT_TEACHER_FILTERS.price
      ? ` with lessons at ${filters.price}$ per hour`
      : '';

  return `Browse ${languagePart}${levelPart}${pricePart} on LearnLingo. Compare profiles, experience, reviews, and choose the teacher who fits your goals.`;
}

//===============================================================

export function getTeachersCanonical(filters: TeacherFilters): string {
  return buildTeachersPath(filters, 1);
}

//===============================================================

export function getTeachersMetadata(
  filters: TeacherFilters,
  page: number
): Metadata {
  const title = getSeoTitle(filters);
  const description = getSeoDescription(filters);
  const canonicalPath = getTeachersCanonical(filters);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },

    robots:
      page > 1
        ? {
            index: false,
            follow: true,
          }
        : {
            index: true,
            follow: true,
          },

    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: 'LearnLingo',
      images: [
        {
          url: '/learnlingo-og-cover.jpg',
          width: 1200,
          height: 630,
          alt: 'LearnLingo teachers page preview',
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/learnlingo-og-cover.jpg'],
    },
  };
}

//===============================================================

export function getTeachersSeoText(filters: TeacherFilters) {
  const language =
    filters.language !== DEFAULT_TEACHER_FILTERS.language
      ? filters.language
      : 'language';

  const level =
    filters.level !== DEFAULT_TEACHER_FILTERS.level ? filters.level : null;

  const price =
    filters.price !== DEFAULT_TEACHER_FILTERS.price ? filters.price : null;

  const headingParts = [`${language} teachers`];

  if (level) headingParts.push(`for ${level}`);
  if (price) headingParts.push(`at ${price}$ per hour`);

  const heading = headingParts.join(' ');

  const paragraph1 = level
    ? `Explore ${language} tutors suitable for students at the ${level} stage. Compare experience, lesson style, and reviews to find a teacher who matches your pace and goals.`
    : `Explore experienced ${language} tutors on LearnLingo. Review profiles, compare teaching styles, and choose the teacher who best fits your learning goals.`;

  const paragraph2 = price
    ? `This selection includes teachers with lessons priced at ${price}$ per hour, so you can quickly focus on tutors that match your budget without losing sight of quality and experience.`
    : `Use filters to narrow the list by level and price, whether you are looking for a beginner-friendly teacher, a conversational practice tutor, or a more advanced learning path.`;

  const paragraph3 =
    level && price
      ? `If you are searching for structured ${language} lessons for ${level} learners within a clear budget, this filtered page helps you compare the most relevant options in one place.`
      : `Each teacher profile includes key details about languages spoken, lesson information, conditions, reviews, and hourly rate to help you make a confident choice.`;

  return {
    heading,
    paragraphs: [paragraph1, paragraph2, paragraph3],
  };
}

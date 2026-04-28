import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import TeachersPageContent from '@/app/teachers/TeachersPageContent';
import {
  buildTeachersPath,
  buildTeachersPathWithSearch,
  normalizeTeacherKeyword,
  parseTeacherSegments,
} from '@/lib/utils/teachers.query';

import { getTeachersMetadata } from '@/lib/server/teachers/teachers-seo';

//===============================================================

type Props = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    keyword?: string;
  }>;
};

//===============================================================

function buildCurrentPathFromSegments(segments?: string[]): string {
  if (!segments?.length) {
    return '/teachers';
  }

  return `/teachers/${segments.join('/')}`;
}

//===============================================================

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { filters, page } = parseTeacherSegments(resolvedParams.segments);
  const keyword = normalizeTeacherKeyword(resolvedSearchParams.keyword);

  return getTeachersMetadata(filters, page, keyword);
}

//===============================================================

async function TeachersRoutePage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { filters, page } = parseTeacherSegments(resolvedParams.segments);
  const keyword = normalizeTeacherKeyword(resolvedSearchParams.keyword);

  const currentPath = buildCurrentPathFromSegments(resolvedParams.segments);
  const canonicalPath = buildTeachersPath(filters, page);

  if (currentPath !== canonicalPath) {
    redirect(buildTeachersPathWithSearch(filters, page, keyword));
  }

  return (
    <TeachersPageContent filters={filters} page={page} keyword={keyword} />
  );
}

export default TeachersRoutePage;

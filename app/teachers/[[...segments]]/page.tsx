import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import TeachersPageContent from '@/app/teachers/TeachersPageContent';

import {
  buildTeachersPath,
  parseTeacherSegments,
} from '@/lib/utils/teachers.query';

import { getTeachersMetadata } from '@/lib/server/teachers/teachers-seo';

//===============================================================

type Props = {
  params: Promise<{
    segments?: string[];
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { filters, page } = parseTeacherSegments(resolvedParams.segments);

  return getTeachersMetadata(filters, page);
}

//===============================================================

async function TeachersRoutePage({ params }: Props) {
  const resolvedParams = await params;

  const { filters, page } = parseTeacherSegments(resolvedParams.segments);

  const currentPath = buildCurrentPathFromSegments(resolvedParams.segments);
  const canonicalPath = buildTeachersPath(filters, page);

  if (currentPath !== canonicalPath) {
    redirect(canonicalPath);
  }

  return <TeachersPageContent filters={filters} page={page} />;
}

export default TeachersRoutePage;

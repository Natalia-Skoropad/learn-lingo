import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import type { TeacherFilters } from '@/types/filters';
import {
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  PRICE_OPTIONS,
  SORT_OPTIONS,
} from '@/lib/constants/filters';

//===============================================================

type TeacherRouteState = {
  filters: TeacherFilters;
  page: number;
};

//===============================================================

const MAX_TEACHER_KEYWORD_LENGTH = 40;

//===============================================================

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function findOptionBySlug(
  slug: string,
  options: readonly string[]
): string | null {
  const match = options.find((option) => slugify(option) === slug);
  return match ?? null;
}

//===============================================================

export function parseTeacherSegments(segments?: string[]): TeacherRouteState {
  const filters: TeacherFilters = {
    ...DEFAULT_TEACHER_FILTERS,
  };

  let page = 1;

  if (!segments?.length) {
    return { filters, page };
  }

  for (const rawSegment of segments) {
    const segment = rawSegment.trim().toLowerCase();

    if (segment.startsWith('language-')) {
      const slug = segment.replace('language-', '');
      const language = findOptionBySlug(slug, LANGUAGE_OPTIONS);

      if (language) {
        filters.language = language;
      }

      continue;
    }

    if (segment.startsWith('level-')) {
      const slug = segment.replace('level-', '');
      const level = findOptionBySlug(slug, LEVEL_OPTIONS);

      if (level) {
        filters.level = level;
      }

      continue;
    }

    if (segment.startsWith('price-')) {
      const value = segment.replace('price-', '');

      if (PRICE_OPTIONS.includes(value)) {
        filters.price = value;
      }

      continue;
    }

    if (segment.startsWith('sort-')) {
      const slug = segment.replace('sort-', '');
      const sort = findOptionBySlug(slug, SORT_OPTIONS);

      if (sort) {
        filters.sort = sort as TeacherFilters['sort'];
      }

      continue;
    }

    if (segment.startsWith('page-')) {
      const rawPage = Number(segment.replace('page-', ''));

      if (Number.isInteger(rawPage) && rawPage > 0) {
        page = rawPage;
      }
    }
  }

  return { filters, page };
}

//===============================================================

export function buildTeachersPath(filters: TeacherFilters, page = 1): string {
  const segments: string[] = ['/teachers'];

  if (filters.language !== DEFAULT_TEACHER_FILTERS.language) {
    segments.push(`language-${slugify(filters.language)}`);
  }

  if (filters.level !== DEFAULT_TEACHER_FILTERS.level) {
    segments.push(`level-${slugify(filters.level)}`);
  }

  if (filters.price !== DEFAULT_TEACHER_FILTERS.price) {
    segments.push(`price-${filters.price}`);
  }

  if (filters.sort !== DEFAULT_TEACHER_FILTERS.sort) {
    segments.push(`sort-${slugify(filters.sort)}`);
  }

  if (page > 1) {
    segments.push(`page-${String(page)}`);
  }

  return segments.join('/');
}

//===============================================================

export function getTeachersCanonicalPathFromSegments(
  segments?: string[]
): string {
  const { filters, page } = parseTeacherSegments(segments);
  return buildTeachersPath(filters, page);
}

//===============================================================

export function normalizeTeachersPathname(pathname: string): string {
  const cleanedPath = pathname.replace(/\/+$/, '') || '/';
  const parts = cleanedPath.split('/').filter(Boolean);

  if (!parts.length || parts[0] !== 'teachers') {
    return cleanedPath;
  }

  const segments = parts.slice(1);
  return getTeachersCanonicalPathFromSegments(segments);
}

//===============================================================

export function getTeachersContextLabel(filters: TeacherFilters): string {
  const parts: string[] = [];

  if (filters.language !== DEFAULT_TEACHER_FILTERS.language) {
    parts.push(filters.language);
  }

  if (filters.level !== DEFAULT_TEACHER_FILTERS.level) {
    parts.push(filters.level);
  }

  if (filters.price !== DEFAULT_TEACHER_FILTERS.price) {
    parts.push(`${filters.price}$`);
  }

  return parts.length ? parts.join(' • ') : 'Teachers';
}

//===============================================================

export function normalizeTeacherKeyword(keyword?: string): string {
  return (
    keyword?.trim().replace(/\s+/g, ' ').slice(0, MAX_TEACHER_KEYWORD_LENGTH) ??
    ''
  );
}

//===============================================================

export function buildTeachersPathWithSearch(
  filters: TeacherFilters,
  page = 1,
  keyword = ''
): string {
  const path = buildTeachersPath(filters, page);
  const normalizedKeyword = normalizeTeacherKeyword(keyword);

  if (!normalizedKeyword) {
    return path;
  }

  const searchParams = new URLSearchParams({
    keyword: normalizedKeyword,
  });

  return `${path}?${searchParams.toString()}`;
}

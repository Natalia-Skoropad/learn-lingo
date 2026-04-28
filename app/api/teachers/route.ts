import { NextResponse } from 'next/server';

import { getTeachersPage } from '@/lib/server/teachers/teachers.server';
import { SORT_OPTIONS } from '@/lib/constants/filters';
import { DEFAULT_TEACHER_FILTERS } from '@/types/filters';
import type { TeacherFilters } from '@/types/filters';

//===============================================================

function parseFilters(searchParams: URLSearchParams): TeacherFilters {
  const rawSort = searchParams.get('sort')?.trim();

  return {
    language:
      searchParams.get('language')?.trim() || DEFAULT_TEACHER_FILTERS.language,
    level: searchParams.get('level')?.trim() || DEFAULT_TEACHER_FILTERS.level,
    price: searchParams.get('price')?.trim() || DEFAULT_TEACHER_FILTERS.price,
    sort:
      rawSort && SORT_OPTIONS.includes(rawSort as TeacherFilters['sort'])
        ? (rawSort as TeacherFilters['sort'])
        : DEFAULT_TEACHER_FILTERS.sort,
  };
}

function parsePage(searchParams: URLSearchParams): number {
  const rawPage = Number(searchParams.get('page'));
  return Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
}

//===============================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = parseFilters(searchParams);
    const page = parsePage(searchParams);
    const keyword = parseKeyword(searchParams);

    const result = await getTeachersPage({
      filters,
      page,
      keyword,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/teachers error:', error);

    return NextResponse.json(
      { message: 'Failed to load teachers' },
      { status: 500 }
    );
  }
}

//===============================================================

function parseKeyword(searchParams: URLSearchParams): string {
  return searchParams.get('keyword')?.trim().replace(/\s+/g, ' ') ?? '';
}

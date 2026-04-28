import type { Teacher } from '@/types/teacher';
import type { TeacherFilters } from '@/types/filters';

import { requestJson } from '@/lib/services/http.service';

//===============================================================

export type TeachersPageResult = {
  teachers: Teacher[];
  page: number;
  perPage: number;
  total: number;
  hasMore: boolean;
  nextPage: number | null;
};

type TeacherResponse = {
  teacher?: Teacher;
  message?: string;
};

type TeachersResponse = TeachersPageResult & {
  message?: string;
};

//===============================================================

function createTeachersApiQuery(
  filters: TeacherFilters,
  page = 1,
  keyword = ''
): string {
  const searchParams = new URLSearchParams();

  if (filters.language !== 'All') {
    searchParams.set('language', filters.language);
  }

  if (filters.level !== 'All') {
    searchParams.set('level', filters.level);
  }

  if (filters.price !== 'All') {
    searchParams.set('price', filters.price);
  }

  if (keyword.trim()) {
    searchParams.set('keyword', keyword.trim());
  }

  if (page > 1) {
    searchParams.set('page', String(page));
  }

  const queryString = searchParams.toString();
  return queryString ? `/api/teachers?${queryString}` : '/api/teachers';
}

//===============================================================

async function getTeachersPage(
  filters: TeacherFilters,
  page = 1,
  keyword = ''
): Promise<TeachersPageResult> {
  return requestJson<TeachersResponse>(
    createTeachersApiQuery(filters, page, keyword),
    {
      method: 'GET',
      cache: 'no-store',
      fallbackErrorMessage: 'Failed to load teachers',
    }
  );
}

//===============================================================

async function getTeacherById(teacherId: string): Promise<Teacher> {
  const data = await requestJson<TeacherResponse>(
    `/api/teachers/${encodeURIComponent(teacherId)}`,
    {
      method: 'GET',
      cache: 'no-store',
      fallbackErrorMessage: 'Failed to load teacher',
    }
  );

  if (!data.teacher) {
    throw new Error(data.message || 'Failed to load teacher');
  }

  return data.teacher;
}

//===============================================================

export const teachersService = {
  getPage: getTeachersPage,
  getById: getTeacherById,
};

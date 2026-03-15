import type { Teacher } from '@/types/teacher';
import type { TeacherFilters } from '@/types/filters';

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

function createTeachersApiQuery(filters: TeacherFilters, page = 1): string {
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

  if (page > 1) {
    searchParams.set('page', String(page));
  }

  const queryString = searchParams.toString();
  return queryString ? `/api/teachers?${queryString}` : '/api/teachers';
}

//===============================================================

async function getTeachersPage(
  filters: TeacherFilters,
  page = 1
): Promise<TeachersPageResult> {
  const response = await fetch(createTeachersApiQuery(filters, page), {
    method: 'GET',
    cache: 'no-store',
  });

  const data = (await response
    .json()
    .catch(() => null)) as TeachersResponse | null;

  if (!response.ok || !data) {
    throw new Error(data?.message || 'Failed to load teachers');
  }

  return data;
}

//===============================================================

async function getTeacherById(teacherId: string): Promise<Teacher> {
  const response = await fetch(
    `/api/teachers/${encodeURIComponent(teacherId)}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  const data = (await response
    .json()
    .catch(() => null)) as TeacherResponse | null;

  if (!response.ok || !data?.teacher) {
    throw new Error(data?.message || 'Failed to load teacher');
  }

  return data.teacher;
}

//===============================================================

export const teachersService = {
  getPage: getTeachersPage,
  getById: getTeacherById,
};

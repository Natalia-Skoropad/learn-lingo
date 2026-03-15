import 'server-only';

import { adminDb } from '@/lib/firebase/admin';

import type { Teacher } from '@/types/teacher';
import type { TeacherFilters } from '@/types/filters';

//===============================================================

const TEACHERS_COLLECTION = 'teachers';
const TEACHERS_PER_PAGE = 4;

export type TeachersPageResult = {
  teachers: Teacher[];
  page: number;
  perPage: number;
  total: number;
  hasMore: boolean;
  nextPage: number | null;
};

type GetTeachersParams = {
  filters: TeacherFilters;
  page?: number;
};

//===============================================================

function getTeacherOnlineStatus(id: string): boolean {
  return id.charCodeAt(id.length - 1) % 2 === 0;
}

function mapTeacher(id: string, data: FirebaseFirestore.DocumentData): Teacher {
  return {
    id,
    name: data.name,
    surname: data.surname,
    languages: Array.isArray(data.languages) ? data.languages : [],
    levels: Array.isArray(data.levels) ? data.levels : [],
    rating: typeof data.rating === 'number' ? data.rating : 0,
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
    price_per_hour:
      typeof data.price_per_hour === 'number' ? data.price_per_hour : 0,
    lessons_done: typeof data.lessons_done === 'number' ? data.lessons_done : 0,
    avatar_url: typeof data.avatar_url === 'string' ? data.avatar_url : '',
    lesson_info: typeof data.lesson_info === 'string' ? data.lesson_info : '',
    conditions: Array.isArray(data.conditions) ? data.conditions : [],
    experience: typeof data.experience === 'string' ? data.experience : '',
    isOnline: getTeacherOnlineStatus(id),
  };
}

function matchesLevelFilter(teacher: Teacher, level: string): boolean {
  if (level === 'All') return true;
  return teacher.levels.includes(level);
}

//===============================================================

export async function getTeachersPage({
  filters,
  page = 1,
}: GetTeachersParams): Promise<TeachersPageResult> {
  const normalizedPage = Number.isInteger(page) && page > 0 ? page : 1;

  let query: FirebaseFirestore.Query = adminDb
    .collection(TEACHERS_COLLECTION)
    .orderBy('__name__');

  if (filters.language !== 'All') {
    query = query.where('languages', 'array-contains', filters.language);
  }

  if (filters.price !== 'All') {
    query = query.where('price_per_hour', '==', Number(filters.price));
  }

  const snapshot = await query.get();

  const filteredTeachers = snapshot.docs
    .map((doc) => mapTeacher(doc.id, doc.data()))
    .filter((teacher) => matchesLevelFilter(teacher, filters.level));

  const total = filteredTeachers.length;
  const startIndex = (normalizedPage - 1) * TEACHERS_PER_PAGE;
  const endIndex = startIndex + TEACHERS_PER_PAGE;

  const teachers = filteredTeachers.slice(startIndex, endIndex);
  const hasMore = endIndex < total;
  const nextPage = hasMore ? normalizedPage + 1 : null;

  return {
    teachers,
    page: normalizedPage,
    perPage: TEACHERS_PER_PAGE,
    total,
    hasMore,
    nextPage,
  };
}

//===============================================================

export async function getTeacherById(
  teacherId: string
): Promise<Teacher | null> {
  const normalizedTeacherId = teacherId.trim();

  if (!normalizedTeacherId) return null;

  const snapshot = await adminDb
    .collection(TEACHERS_COLLECTION)
    .doc(normalizedTeacherId)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return mapTeacher(snapshot.id, snapshot.data() ?? {});
}

//===============================================================

export async function getTeachersByIds(ids: string[]): Promise<Teacher[]> {
  if (!ids.length) return [];

  const uniqueIds = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];

  const teachers = await Promise.all(uniqueIds.map((id) => getTeacherById(id)));

  const teachersMap = new Map<string, Teacher>();

  teachers.forEach((teacher) => {
    if (teacher) {
      teachersMap.set(teacher.id, teacher);
    }
  });

  return ids
    .map((id) => teachersMap.get(id))
    .filter((teacher): teacher is Teacher => Boolean(teacher));
}

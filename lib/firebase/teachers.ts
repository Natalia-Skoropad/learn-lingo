import {
  collection,
  documentId,
  getDocs,
  orderBy,
  query,
  where,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';

import { db } from './config';

import type { Teacher } from '@/types/teacher';
import type { TeacherFilters } from '@/types/filters';

//===============================================================

const TEACHERS_PER_PAGE = 4;
const FIRESTORE_IN_LIMIT = 10;

//===============================================================

export type TeachersPageResult = {
  teachers: Teacher[];
  nextOffset: number | null;
  hasMore: boolean;
  total: number;
};

//===============================================================

function buildTeachersConstraints(filters: TeacherFilters): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (filters.language !== 'All') {
    constraints.push(where('languages', 'array-contains', filters.language));
  }

  if (filters.price !== 'All') {
    constraints.push(where('price_per_hour', '==', Number(filters.price)));
  }

  return constraints;
}

//===============================================================

function getTeacherOnlineStatus(id: string): boolean {
  return id.charCodeAt(id.length - 1) % 2 === 0;
}

function mapTeacherWithStatus(
  doc: QueryDocumentSnapshot<DocumentData>
): Teacher {
  return {
    id: doc.id,
    ...doc.data(),
    isOnline: getTeacherOnlineStatus(doc.id),
  } as Teacher;
}

function matchesLevelFilter(teacher: Teacher, level: string): boolean {
  if (level === 'All') return true;
  return teacher.levels.includes(level);
}

//===============================================================

export async function getTeachersPage(
  filters: TeacherFilters,
  offset = 0
): Promise<TeachersPageResult> {
  const teachersRef = collection(db, 'teachers');
  const filterConstraints = buildTeachersConstraints(filters);

  const teachersQuery = query(
    teachersRef,
    ...filterConstraints,
    orderBy(documentId())
  );

  const snapshot = await getDocs(teachersQuery);

  const filteredTeachers = snapshot.docs
    .map((doc) => mapTeacherWithStatus(doc))
    .filter((teacher) => matchesLevelFilter(teacher, filters.level));

  const total = filteredTeachers.length;
  const teachers = filteredTeachers.slice(offset, offset + TEACHERS_PER_PAGE);
  const nextOffset =
    offset + TEACHERS_PER_PAGE < total ? offset + TEACHERS_PER_PAGE : null;

  return {
    teachers,
    nextOffset,
    hasMore: nextOffset !== null,
    total,
  };
}

//===============================================================

export async function getTeachersByIds(ids: string[]): Promise<Teacher[]> {
  if (!ids.length) return [];

  const teachersRef = collection(db, 'teachers');
  const chunks: string[][] = [];

  for (let i = 0; i < ids.length; i += FIRESTORE_IN_LIMIT) {
    chunks.push(ids.slice(i, i + FIRESTORE_IN_LIMIT));
  }

  const snapshots = await Promise.all(
    chunks.map((chunk) =>
      getDocs(query(teachersRef, where(documentId(), 'in', chunk)))
    )
  );

  const teachersMap = new Map<string, Teacher>();

  snapshots.forEach((snapshot) => {
    snapshot.docs.forEach((doc) => {
      teachersMap.set(doc.id, mapTeacherWithStatus(doc));
    });
  });

  return ids.map((id) => teachersMap.get(id)).filter(Boolean) as Teacher[];
}

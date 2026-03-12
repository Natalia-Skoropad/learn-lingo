import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from './config';
import type { Teacher } from '@/types/teacher';

//===============================================================

const TEACHERS_PER_PAGE = 4;
const FIRESTORE_IN_LIMIT = 10;

//===============================================================

export type TeachersPageResult = {
  teachers: Teacher[];
  lastId: string | null;
  hasMore: boolean;
};

//===============================================================

export async function getTeachersPage(
  lastVisibleId?: string | null
): Promise<TeachersPageResult> {
  const teachersRef = collection(db, 'teachers');

  const teachersQuery = lastVisibleId
    ? query(
        teachersRef,
        orderBy(documentId()),
        startAfter(lastVisibleId),
        limit(TEACHERS_PER_PAGE)
      )
    : query(teachersRef, orderBy(documentId()), limit(TEACHERS_PER_PAGE));

  const snapshot = await getDocs(teachersQuery);

  const teachers = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Teacher[];

  const lastId = snapshot.docs.length
    ? snapshot.docs[snapshot.docs.length - 1].id
    : null;

  return {
    teachers,
    lastId,
    hasMore: snapshot.docs.length === TEACHERS_PER_PAGE,
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
      teachersMap.set(doc.id, {
        id: doc.id,
        ...doc.data(),
      } as Teacher);
    });
  });

  return ids.map((id) => teachersMap.get(id)).filter(Boolean) as Teacher[];
}

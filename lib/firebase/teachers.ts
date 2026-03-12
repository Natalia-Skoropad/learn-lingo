import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import { db } from './config';

import type { Teacher } from '@/types/teacher';

//===============================================================

const TEACHERS_PER_PAGE = 4;

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

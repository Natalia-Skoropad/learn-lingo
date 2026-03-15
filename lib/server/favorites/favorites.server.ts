import 'server-only';

import { FieldValue } from 'firebase-admin/firestore';

import { adminDb } from '@/lib/firebase/admin';
import { getCurrentUserFromSession } from '@/lib/server/auth/session';
import { getTeachersByIds } from '@/lib/server/teachers/teachers.server';

import type { Teacher } from '@/types/teacher';

//===============================================================

type UserFavoritesDoc = {
  favorites?: string[];
};

//===============================================================

async function requireSessionUser() {
  const user = await getCurrentUserFromSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

//===============================================================

export async function getFavoriteTeacherIdsForCurrentUser(): Promise<string[]> {
  const user = await requireSessionUser();

  const userRef = adminDb.collection('users').doc(user.uid);
  const snapshot = await userRef.get();

  if (!snapshot.exists) return [];

  const data = snapshot.data() as UserFavoritesDoc | undefined;
  return Array.isArray(data?.favorites) ? data!.favorites : [];
}

//===============================================================

export async function getFavoriteTeachersForCurrentUser(): Promise<Teacher[]> {
  const ids = await getFavoriteTeacherIdsForCurrentUser();

  if (!ids.length) return [];

  return getTeachersByIds(ids);
}

//===============================================================

export async function addTeacherToCurrentUserFavorites(
  teacherId: string
): Promise<void> {
  const user = await requireSessionUser();

  const userRef = adminDb.collection('users').doc(user.uid);

  await userRef.set(
    {
      favorites: FieldValue.arrayUnion(teacherId),
    },
    { merge: true }
  );
}

//===============================================================

export async function removeTeacherFromCurrentUserFavorites(
  teacherId: string
): Promise<void> {
  const user = await requireSessionUser();

  const userRef = adminDb.collection('users').doc(user.uid);

  await userRef.set(
    {
      favorites: FieldValue.arrayRemove(teacherId),
    },
    { merge: true }
  );
}

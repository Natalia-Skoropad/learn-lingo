import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { db } from './config';

//===============================================================

type UserFavorites = {
  favorites?: string[];
};

//===============================================================

export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.data() as UserFavorites;
  return Array.isArray(data.favorites) ? data.favorites : [];
}

//===============================================================

export async function addTeacherToFavorites(
  userId: string,
  teacherId: string
): Promise<void> {
  const userRef = doc(db, 'users', userId);

  await setDoc(
    userRef,
    {
      favorites: arrayUnion(teacherId),
    },
    { merge: true }
  );
}

//===============================================================

export async function removeTeacherFromFavorites(
  userId: string,
  teacherId: string
): Promise<void> {
  const userRef = doc(db, 'users', userId);

  await setDoc(
    userRef,
    {
      favorites: arrayRemove(teacherId),
    },
    { merge: true }
  );
}

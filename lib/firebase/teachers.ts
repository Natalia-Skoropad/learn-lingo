import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

import type { Teacher } from '@/types/teacher';

//===============================================================

export async function getTeachers(): Promise<Teacher[]> {
  const snapshot = await getDocs(collection(db, 'teachers'));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Teacher[];
}

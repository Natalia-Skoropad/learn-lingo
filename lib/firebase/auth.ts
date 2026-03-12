import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from './config';
import type { AppUser } from '@/types/auth';

//===============================================================

type RegisterParams = {
  fullName: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

//===============================================================

function mapAuthUser(user: User): AppUser {
  return {
    uid: user.uid,
    name: user.displayName || 'User',
    email: user.email || '',
  };
}

//===============================================================

async function getUserProfile(uid: string): Promise<AppUser | null> {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    uid,
    name: data.name || 'User',
    email: data.email || '',
  };
}

//===============================================================

export async function registerUser({
  fullName,
  email,
  password,
}: RegisterParams): Promise<AppUser> {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credentials.user, {
    displayName: fullName,
  });

  await setDoc(doc(db, 'users', credentials.user.uid), {
    uid: credentials.user.uid,
    name: fullName,
    email,
    favorites: [],
    createdAt: serverTimestamp(),
  });

  return {
    uid: credentials.user.uid,
    name: fullName,
    email: credentials.user.email || email,
  };
}

//===============================================================

export async function loginUser({
  email,
  password,
}: LoginParams): Promise<AppUser> {
  const credentials = await signInWithEmailAndPassword(auth, email, password);

  const profile = await getUserProfile(credentials.user.uid);

  return (
    profile || {
      uid: credentials.user.uid,
      name: credentials.user.displayName || 'User',
      email: credentials.user.email || email,
    }
  );
}

//===============================================================

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

//===============================================================

export function observeAuthState(
  callback: (user: AppUser | null) => void
): () => void {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    const profile = await getUserProfile(user.uid);

    callback(profile || mapAuthUser(user));
  });
}

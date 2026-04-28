import type { AppUser } from '@/types/auth';
import { APP_URL } from '@/lib/constants/app';

import {
  requestJson,
  requestJsonOrNull,
  requestVoid,
} from '@/lib/services/http.service';

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

type ResetPasswordParams = {
  email: string;
};

type AuthResponse = {
  user: AppUser;
  ok?: boolean;
  message?: string;
};

//===============================================================

async function createServerSession(idToken: string): Promise<AppUser> {
  const data = await requestJson<AuthResponse>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
    fallbackErrorMessage: 'Failed to create server session',
  });

  if (!data.user) {
    throw new Error(data.message || 'Failed to create server session');
  }

  return data.user;
}

//===============================================================

export async function registerUser({
  fullName,
  email,
  password,
}: RegisterParams): Promise<AppUser> {
  const [
    { createUserWithEmailAndPassword, updateProfile },
    { doc, serverTimestamp, setDoc },
    { getFirebaseAuth, getFirebaseDb },
  ] = await Promise.all([
    import('firebase/auth'),
    import('firebase/firestore'),
    import('@/lib/firebase/config'),
  ]);

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();

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
    phone: '',
    avatarUrl: '',
    favorites: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const idToken = await credentials.user.getIdToken(true);
  return createServerSession(idToken);
}

//===============================================================

export async function loginUser({
  email,
  password,
}: LoginParams): Promise<AppUser> {
  const [
    { signInWithEmailAndPassword },
    { doc, getDoc, serverTimestamp, setDoc },
    { getFirebaseAuth, getFirebaseDb },
  ] = await Promise.all([
    import('firebase/auth'),
    import('firebase/firestore'),
    import('@/lib/firebase/config'),
  ]);

  const auth = getFirebaseAuth();
  const db = getFirebaseDb();

  const credentials = await signInWithEmailAndPassword(auth, email, password);

  const profileRef = doc(db, 'users', credentials.user.uid);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    await setDoc(
      profileRef,
      {
        uid: credentials.user.uid,
        name: credentials.user.displayName || 'User',
        email: credentials.user.email || email,
        phone: '',
        avatarUrl: '',
        favorites: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  const idToken = await credentials.user.getIdToken(true);
  return createServerSession(idToken);
}

//===============================================================

export async function logoutUser(): Promise<void> {
  const [{ signOut }, { getFirebaseAuth }] = await Promise.all([
    import('firebase/auth'),
    import('@/lib/firebase/config'),
  ]);

  const auth = getFirebaseAuth();

  await requestVoid('/api/auth/logout', {
    method: 'POST',
    fallbackErrorMessage: 'Failed to clear server session',
  });

  await signOut(auth);
}

//===============================================================

export async function getCurrentUser(): Promise<AppUser | null> {
  const data = await requestJsonOrNull<AuthResponse>('/api/auth/me', {
    method: 'GET',
    cache: 'no-store',
    fallbackErrorMessage: 'Failed to fetch current user',
  });

  return data?.user ?? null;
}

//===============================================================

export async function resetUserPassword({
  email,
}: ResetPasswordParams): Promise<void> {
  const [{ sendPasswordResetEmail }, { getFirebaseAuth }] = await Promise.all([
    import('firebase/auth'),
    import('@/lib/firebase/config'),
  ]);

  const auth = getFirebaseAuth();

  auth.useDeviceLanguage();

  await sendPasswordResetEmail(auth, email, {
    url: `${APP_URL}/auth/action`,
    handleCodeInApp: false,
  });
}

//===============================================================

export const authService = {
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  getCurrentUser,
  resetPassword: resetUserPassword,
};

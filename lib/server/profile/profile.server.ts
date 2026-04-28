import 'server-only';

import { FieldValue, Timestamp } from 'firebase-admin/firestore';

import { adminDb } from '@/lib/firebase/admin';
import { getCurrentUserFromSession } from '@/lib/server/auth/session';

import type { AppUser } from '@/types/auth';
import type { UserProfile } from '@/types/profile';

//===============================================================

const USERS_COLLECTION = 'users';

//===============================================================

type UserProfileDoc = {
  uid?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  favorites?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

//===============================================================

function serializeTimestamp(value?: Timestamp): string | undefined {
  return value?.toDate().toISOString();
}

function mapUserProfile(
  uid: string,
  data: UserProfileDoc | undefined,
  fallback: AppUser
): UserProfile {
  return {
    uid,
    name:
      typeof data?.name === 'string' && data.name.trim()
        ? data.name
        : fallback.name,
    email:
      typeof data?.email === 'string' && data.email.trim()
        ? data.email
        : fallback.email,
    phone:
      typeof data?.phone === 'string' && data.phone.trim()
        ? data.phone
        : undefined,
    avatarUrl:
      typeof data?.avatarUrl === 'string' && data.avatarUrl.trim()
        ? data.avatarUrl
        : undefined,
    favorites: Array.isArray(data?.favorites) ? data.favorites : [],
    createdAt: serializeTimestamp(data?.createdAt),
    updatedAt: serializeTimestamp(data?.updatedAt),
  };
}

function toAppUser(profile: UserProfile): AppUser {
  return {
    uid: profile.uid,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    avatarUrl: profile.avatarUrl,
    createdAt: profile.createdAt,
  };
}

//===============================================================

export async function getUserProfileByUid(
  uid: string,
  fallback: AppUser
): Promise<UserProfile> {
  const userRef = adminDb.collection(USERS_COLLECTION).doc(uid);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const profileData = {
      uid,
      name: fallback.name,
      email: fallback.email,
      favorites: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await userRef.set(profileData, { merge: true });

    return {
      uid,
      name: fallback.name,
      email: fallback.email,
      favorites: [],
    };
  }

  return mapUserProfile(
    uid,
    snapshot.data() as UserProfileDoc | undefined,
    fallback
  );
}

//===============================================================

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const sessionUser = await getCurrentUserFromSession();

  if (!sessionUser) {
    return null;
  }

  return getUserProfileByUid(sessionUser.uid, sessionUser);
}

//===============================================================

export async function getCurrentAppUser(): Promise<AppUser | null> {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    return null;
  }

  return toAppUser(profile);
}

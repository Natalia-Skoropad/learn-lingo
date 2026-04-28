import 'server-only';

import { FieldValue, Timestamp } from 'firebase-admin/firestore';

import { adminDb, adminAuth } from '@/lib/firebase/admin';
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
  avatarPath?: string;
};

export type UpdateCurrentUserProfilePayload = {
  name?: string;
  email?: string;
  phone?: string | null;
};

export type UpdateCurrentUserAvatarPayload = {
  avatarUrl: string | null;
  avatarPath: string | null;
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
    avatarPath:
      typeof data?.avatarPath === 'string' && data.avatarPath.trim()
        ? data.avatarPath
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
    avatarPath: profile.avatarPath,
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

//===============================================================

export async function updateCurrentUserProfile(
  payload: UpdateCurrentUserProfilePayload
): Promise<AppUser> {
  const sessionUser = await getCurrentUserFromSession();

  if (!sessionUser) {
    throw new Error('Unauthorized');
  }

  const userRef = adminDb.collection(USERS_COLLECTION).doc(sessionUser.uid);
  const updateData: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  const authUpdateData: {
    displayName?: string;
  } = {};

  if (typeof payload.name === 'string') {
    const name = payload.name.trim();

    if (name.length < 2 || name.length > 20) {
      throw new Error('Name must contain 2–20 characters');
    }

    updateData.name = name;
    authUpdateData.displayName = name;
  }

  if (typeof payload.email === 'string') {
    throw new Error(
      'Email change requires additional verification and will be added separately.'
    );
  }

  if ('phone' in payload) {
    const phone = payload.phone?.trim();

    if (phone) {
      const isValidPhone = /^[+]?[\d\s()-]{7,20}$/.test(phone);

      if (!isValidPhone) {
        throw new Error('Enter a valid phone number');
      }

      updateData.phone = phone;
    } else {
      updateData.phone = FieldValue.delete();
    }
  }

  if (Object.keys(authUpdateData).length > 0) {
    await adminAuth.updateUser(sessionUser.uid, authUpdateData);
  }

  await userRef.set(updateData, { merge: true });

  const profile = await getUserProfileByUid(sessionUser.uid, {
    uid: sessionUser.uid,
    name:
      typeof updateData.name === 'string' ? updateData.name : sessionUser.name,
    email:
      typeof updateData.email === 'string'
        ? updateData.email
        : sessionUser.email,
  });

  return toAppUser(profile);
}

//===============================================================

export async function updateCurrentUserAvatar({
  avatarUrl,
  avatarPath,
}: UpdateCurrentUserAvatarPayload): Promise<AppUser> {
  const sessionUser = await getCurrentUserFromSession();

  if (!sessionUser) {
    throw new Error('Unauthorized');
  }

  const userRef = adminDb.collection(USERS_COLLECTION).doc(sessionUser.uid);

  const updateData: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (avatarUrl && avatarPath) {
    updateData.avatarUrl = avatarUrl;
    updateData.avatarPath = avatarPath;

    await adminAuth.updateUser(sessionUser.uid, {
      photoURL: avatarUrl,
    });
  } else {
    updateData.avatarUrl = FieldValue.delete();
    updateData.avatarPath = FieldValue.delete();

    await adminAuth.updateUser(sessionUser.uid, {
      photoURL: null,
    });
  }

  await userRef.set(updateData, { merge: true });

  const profile = await getUserProfileByUid(sessionUser.uid, {
    uid: sessionUser.uid,
    name: sessionUser.name,
    email: sessionUser.email,
  });

  return toAppUser(profile);
}

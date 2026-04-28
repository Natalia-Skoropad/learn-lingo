import type { AppUser } from '@/types/auth';
import type { UserProfile } from '@/types/profile';

import { requestJson } from '@/lib/services/http.service';

//===============================================================

type ProfileResponse = {
  profile?: UserProfile;
  message?: string;
};

type UpdateProfilePayload = {
  name?: string;
  email?: string;
  phone?: string | null;
};

type UpdateProfileResponse = {
  user?: AppUser;
  ok?: boolean;
  message?: string;
};

//===============================================================

async function getCurrentProfile(): Promise<UserProfile> {
  const data = await requestJson<ProfileResponse>('/api/profile', {
    method: 'GET',
    cache: 'no-store',
    fallbackErrorMessage: 'Failed to load profile',
  });

  if (!data.profile) {
    throw new Error(data.message || 'Failed to load profile');
  }

  return data.profile;
}

//===============================================================

async function updateCurrentProfile(
  payload: UpdateProfilePayload
): Promise<AppUser> {
  const data = await requestJson<UpdateProfileResponse>('/api/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    fallbackErrorMessage: 'Failed to update profile',
  });

  if (!data.user) {
    throw new Error(data.message || 'Failed to update profile');
  }

  return data.user;
}

//===============================================================

async function uploadAvatar(file: File): Promise<AppUser> {
  const formData = new FormData();
  formData.append('avatar', file);

  const data = await requestJson<UpdateProfileResponse>('/api/profile/avatar', {
    method: 'POST',
    body: formData,
    fallbackErrorMessage: 'Failed to upload avatar',
  });

  if (!data.user) {
    throw new Error(data.message || 'Failed to upload avatar');
  }

  return data.user;
}

//===============================================================

async function deleteAvatar(): Promise<AppUser> {
  const data = await requestJson<UpdateProfileResponse>('/api/profile/avatar', {
    method: 'DELETE',
    fallbackErrorMessage: 'Failed to delete avatar',
  });

  if (!data.user) {
    throw new Error(data.message || 'Failed to delete avatar');
  }

  return {
    ...data.user,
    avatarUrl: undefined,
    avatarPath: undefined,
  };
}

//===============================================================

export const profileService = {
  getCurrent: getCurrentProfile,
  updateCurrent: updateCurrentProfile,
  uploadAvatar,
  deleteAvatar,
};

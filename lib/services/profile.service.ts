import type { AppUser } from '@/types/auth';
import type { UserProfile } from '@/types/profile';

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
  const response = await fetch('/api/profile', {
    method: 'GET',
    cache: 'no-store',
  });

  const data = (await response
    .json()
    .catch(() => null)) as ProfileResponse | null;

  if (!response.ok || !data?.profile) {
    throw new Error(data?.message || 'Failed to load profile');
  }

  return data.profile;
}

//===============================================================

async function updateCurrentProfile(
  payload: UpdateProfilePayload
): Promise<AppUser> {
  const response = await fetch('/api/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response
    .json()
    .catch(() => null)) as UpdateProfileResponse | null;

  if (!response.ok || !data?.user) {
    throw new Error(data?.message || 'Failed to update profile');
  }

  return data.user;
}

//===============================================================

export const profileService = {
  getCurrent: getCurrentProfile,
  updateCurrent: updateCurrentProfile,
};

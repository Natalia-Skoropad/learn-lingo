import type { UserProfile } from '@/types/profile';

//===============================================================

type ProfileResponse = {
  profile?: UserProfile;
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

export const profileService = {
  getCurrent: getCurrentProfile,
};

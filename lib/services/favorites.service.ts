import type { Teacher } from '@/types/teacher';

//===============================================================

type FavoritesResponse = {
  teachers?: Teacher[];
  message?: string;
};

//===============================================================

async function getFavoriteTeachers(): Promise<Teacher[]> {
  const response = await fetch('/api/favorites', {
    method: 'GET',
    cache: 'no-store',
  });

  if (response.status === 401) {
    return [];
  }

  const data = (await response
    .json()
    .catch(() => null)) as FavoritesResponse | null;

  if (!response.ok || !data?.teachers) {
    throw new Error(data?.message || 'Failed to load favorite teachers');
  }

  return data.teachers;
}

//===============================================================

async function addFavorite(teacherId: string): Promise<void> {
  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teacherId }),
  });

  const data = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to add favorite');
  }
}

//===============================================================

async function removeFavorite(teacherId: string): Promise<void> {
  const response = await fetch(
    `/api/favorites/${encodeURIComponent(teacherId)}`,
    {
      method: 'DELETE',
    }
  );

  const data = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to remove favorite');
  }
}

//===============================================================

export const favoritesService = {
  getTeachers: getFavoriteTeachers,
  add: addFavorite,
  remove: removeFavorite,
};

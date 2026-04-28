import type { Teacher } from '@/types/teacher';

import { requestJsonOrNull, requestVoid } from '@/lib/services/http.service';

//===============================================================

type FavoritesResponse = {
  teachers?: Teacher[];
  message?: string;
};

//===============================================================

async function getFavoriteTeachers(): Promise<Teacher[]> {
  const data = await requestJsonOrNull<FavoritesResponse>('/api/favorites', {
    method: 'GET',
    cache: 'no-store',
    fallbackErrorMessage: 'Failed to load favorite teachers',
  });

  return data?.teachers ?? [];
}

//===============================================================

async function addFavorite(teacherId: string): Promise<void> {
  await requestVoid('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teacherId }),
    fallbackErrorMessage: 'Failed to add favorite',
  });
}

//===============================================================

async function removeFavorite(teacherId: string): Promise<void> {
  await requestVoid(`/api/favorites/${encodeURIComponent(teacherId)}`, {
    method: 'DELETE',
    fallbackErrorMessage: 'Failed to remove favorite',
  });
}

//===============================================================

export const favoritesService = {
  getTeachers: getFavoriteTeachers,
  add: addFavorite,
  remove: removeFavorite,
};

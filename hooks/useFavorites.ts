'use client';

import { useCallback, useEffect } from 'react';

import type { Teacher } from '@/types/teacher';

import { useAuth } from '@/hooks/useAuth';
import { useFavoritesStore } from '@/lib/store/favoritesStore';

//===============================================================

export function useFavorites() {
  const { isAuthenticated, isAuthReady } = useAuth();

  const ids = useFavoritesStore((state) => state.ids);
  const teachers = useFavoritesStore((state) => state.teachers);
  const isLoading = useFavoritesStore((state) => state.isLoading);
  const isLoaded = useFavoritesStore((state) => state.isLoaded);
  const updatingIds = useFavoritesStore((state) => state.updatingIds);

  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const resetFavorites = useFavoritesStore((state) => state.resetFavorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isAuthenticated) {
      resetFavorites();
      return;
    }

    if (!isLoaded) {
      loadFavorites().catch(console.error);
    }
  }, [isAuthReady, isAuthenticated, isLoaded, loadFavorites, resetFavorites]);

  const isFavorite = useCallback(
    (teacherId: string) => ids.includes(teacherId),
    [ids]
  );

  const isUpdating = useCallback(
    (teacherId: string) => updatingIds.includes(teacherId),
    [updatingIds]
  );

  const toggleFavorite = useCallback(
    async (teacher: Teacher): Promise<'added' | 'removed'> => {
      if (ids.includes(teacher.id)) {
        await removeFavorite(teacher.id);
        return 'removed';
      }

      await addFavorite(teacher);
      return 'added';
    },
    [ids, addFavorite, removeFavorite]
  );

  return {
    favoriteIds: ids,
    favoriteTeachers: teachers,
    isFavoritesLoading: isLoading,
    isFavoritesLoaded: isLoaded,
    isFavorite,
    isUpdating,
    toggleFavorite,
  };
}

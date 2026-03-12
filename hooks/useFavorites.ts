'use client';

import { useCallback, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useFavoritesStore } from '@/lib/store/favoritesStore';

//===============================================================

export function useFavorites() {
  const { user, isAuthenticated, isAuthReady } = useAuth();

  const ids = useFavoritesStore((state) => state.ids);
  const isLoading = useFavoritesStore((state) => state.isLoading);
  const loadedForUserId = useFavoritesStore((state) => state.loadedForUserId);
  const updatingIds = useFavoritesStore((state) => state.updatingIds);

  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);
  const resetFavorites = useFavoritesStore((state) => state.resetFavorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isAuthenticated || !user) {
      resetFavorites();
      return;
    }

    if (loadedForUserId !== user.uid) {
      loadFavorites(user.uid).catch(console.error);
    }
  }, [
    isAuthReady,
    isAuthenticated,
    user,
    loadedForUserId,
    loadFavorites,
    resetFavorites,
  ]);

  const isFavorite = useCallback(
    (teacherId: string) => ids.includes(teacherId),
    [ids]
  );

  const isUpdating = useCallback(
    (teacherId: string) => updatingIds.includes(teacherId),
    [updatingIds]
  );

  const toggleFavorite = useCallback(
    async (teacherId: string): Promise<'added' | 'removed'> => {
      if (!user) {
        throw new Error('User is not authenticated');
      }

      if (ids.includes(teacherId)) {
        await removeFavorite(user.uid, teacherId);
        return 'removed';
      }

      await addFavorite(user.uid, teacherId);
      return 'added';
    },
    [user, ids, addFavorite, removeFavorite]
  );

  return {
    favoriteIds: ids,
    isFavoritesLoading: isLoading,
    isFavorite,
    isUpdating,
    toggleFavorite,
  };
}

import { create } from 'zustand';
import { favoritesService } from '@/lib/services/favorites.service';

//===============================================================

type FavoritesState = {
  ids: string[];
  isLoading: boolean;
  loadedForUserId: string | null;
  updatingIds: string[];

  loadFavorites: (userId: string) => Promise<void>;
  resetFavorites: () => void;
  addFavorite: (userId: string, teacherId: string) => Promise<void>;
  removeFavorite: (userId: string, teacherId: string) => Promise<void>;
};

//===============================================================

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  isLoading: false,
  loadedForUserId: null,
  updatingIds: [],

  loadFavorites: async (userId) => {
    set({ isLoading: true });

    try {
      const ids = await favoritesService.getIds(userId);

      set({
        ids,
        isLoading: false,
        loadedForUserId: userId,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetFavorites: () =>
    set({
      ids: [],
      isLoading: false,
      loadedForUserId: null,
      updatingIds: [],
    }),

  addFavorite: async (userId, teacherId) => {
    const { updatingIds, ids } = get();

    if (updatingIds.includes(teacherId)) return;

    set({
      updatingIds: [...updatingIds, teacherId],
      ids: ids.includes(teacherId) ? ids : [...ids, teacherId],
    });

    try {
      await favoritesService.add(userId, teacherId);
    } catch (error) {
      set((state) => ({
        ids: state.ids.filter((id) => id !== teacherId),
      }));
      throw error;
    } finally {
      set((state) => ({
        updatingIds: state.updatingIds.filter((id) => id !== teacherId),
      }));
    }
  },

  removeFavorite: async (userId, teacherId) => {
    const { updatingIds, ids } = get();

    if (updatingIds.includes(teacherId)) return;

    set({
      updatingIds: [...updatingIds, teacherId],
      ids: ids.filter((id) => id !== teacherId),
    });

    try {
      await favoritesService.remove(userId, teacherId);
    } catch (error) {
      set((state) => ({
        ids: state.ids.includes(teacherId)
          ? state.ids
          : [...state.ids, teacherId],
      }));
      throw error;
    } finally {
      set((state) => ({
        updatingIds: state.updatingIds.filter((id) => id !== teacherId),
      }));
    }
  },
}));

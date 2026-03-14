import { create } from 'zustand';

import { favoritesService } from '@/lib/services/favorites.service';
import type { Teacher } from '@/types/teacher';

//===============================================================

type FavoritesState = {
  teachers: Teacher[];
  ids: string[];
  isLoading: boolean;
  isLoaded: boolean;
  updatingIds: string[];

  loadFavorites: () => Promise<void>;
  resetFavorites: () => void;
  addFavorite: (teacher: Teacher) => Promise<void>;
  removeFavorite: (teacherId: string) => Promise<void>;
};

//===============================================================

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  teachers: [],
  ids: [],
  isLoading: false,
  isLoaded: false,
  updatingIds: [],

  loadFavorites: async () => {
    set({ isLoading: true });

    try {
      const teachers = await favoritesService.getTeachers();

      set({
        teachers,
        ids: teachers.map((teacher) => teacher.id),
        isLoading: false,
        isLoaded: true,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetFavorites: () =>
    set({
      teachers: [],
      ids: [],
      isLoading: false,
      isLoaded: false,
      updatingIds: [],
    }),

  addFavorite: async (teacher) => {
    const { updatingIds, ids, teachers } = get();

    if (updatingIds.includes(teacher.id)) return;

    set({
      updatingIds: [...updatingIds, teacher.id],
      ids: ids.includes(teacher.id) ? ids : [...ids, teacher.id],
      teachers: teachers.some((item) => item.id === teacher.id)
        ? teachers
        : [...teachers, teacher],
    });

    try {
      await favoritesService.add(teacher.id);
    } catch (error) {
      set((state) => ({
        ids: state.ids.filter((id) => id !== teacher.id),
        teachers: state.teachers.filter((item) => item.id !== teacher.id),
      }));
      throw error;
    } finally {
      set((state) => ({
        updatingIds: state.updatingIds.filter((id) => id !== teacher.id),
      }));
    }
  },

  removeFavorite: async (teacherId) => {
    const { updatingIds, ids, teachers } = get();

    if (updatingIds.includes(teacherId)) return;

    const removedTeacher = teachers.find((teacher) => teacher.id === teacherId);

    set({
      updatingIds: [...updatingIds, teacherId],
      ids: ids.filter((id) => id !== teacherId),
      teachers: teachers.filter((teacher) => teacher.id !== teacherId),
    });

    try {
      await favoritesService.remove(teacherId);
    } catch (error) {
      set((state) => ({
        ids: state.ids.includes(teacherId)
          ? state.ids
          : [...state.ids, teacherId],
        teachers:
          removedTeacher &&
          !state.teachers.some((teacher) => teacher.id === teacherId)
            ? [...state.teachers, removedTeacher]
            : state.teachers,
      }));
      throw error;
    } finally {
      set((state) => ({
        updatingIds: state.updatingIds.filter((id) => id !== teacherId),
      }));
    }
  },
}));

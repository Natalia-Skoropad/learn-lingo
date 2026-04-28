import { create } from 'zustand';

import type { AppUser } from '@/types/auth';

//===============================================================

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type ResetPasswordData = {
  email: string;
};

type AuthState = {
  user: AppUser | null;
  isLoading: boolean;
  isAuthReady: boolean;
  isAuthenticated: boolean;

  hydrateAuth: (user: AppUser | null) => void;
  initAuth: () => Promise<void>;
  register: (data: RegisterData) => Promise<AppUser>;
  login: (data: LoginData) => Promise<AppUser>;
  logout: () => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;

  updateUser: (patch: Partial<AppUser>) => void;
};

//===============================================================

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthReady: false,
  isAuthenticated: false,

  hydrateAuth: (user) => {
    set({
      user,
      isLoading: false,
      isAuthReady: true,
      isAuthenticated: Boolean(user),
    });
  },

  initAuth: async () => {
    set((state) => ({
      isLoading: state.isAuthReady ? state.isLoading : true,
    }));

    try {
      const { authService } = await import('@/lib/services/auth.service');
      const user = await authService.getCurrentUser();

      set({
        user,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: Boolean(user),
      });
    } catch (error) {
      console.error('initAuth error:', error);

      set({
        user: null,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: false,
      });
    }
  },

  register: async (data) => {
    set({ isLoading: true });

    try {
      const { authService } = await import('@/lib/services/auth.service');
      const user = await authService.register(data);

      set({
        user,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        isLoading: false,
        isAuthReady: true,
      });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const { authService } = await import('@/lib/services/auth.service');
      const user = await authService.login(data);

      set({
        user,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({
        isLoading: false,
        isAuthReady: true,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      const { authService } = await import('@/lib/services/auth.service');
      await authService.logout();

      set({
        user: null,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetPassword: async (data) => {
    set({ isLoading: true });

    try {
      const { authService } = await import('@/lib/services/auth.service');
      await authService.resetPassword(data);

      set({
        isLoading: false,
        isAuthReady: true,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateUser: (patch) => {
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          ...patch,
        },
        isAuthenticated: true,
        isAuthReady: true,
      };
    });
  },
}));

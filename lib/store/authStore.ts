import { create } from 'zustand';

import { authService } from '@/lib/services/auth.service';
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

  initAuth: () => () => void;
  register: (data: RegisterData) => Promise<AppUser>;
  login: (data: LoginData) => Promise<AppUser>;
  logout: () => Promise<void>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
};

//===============================================================

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthReady: false,
  isAuthenticated: false,

  initAuth: () => {
    set({ isLoading: true });

    const unsubscribe = authService.observeAuthState((user) => {
      set({
        user,
        isLoading: false,
        isAuthReady: true,
        isAuthenticated: Boolean(user),
      });
    });

    return unsubscribe;
  },

  register: async (data) => {
    set({ isLoading: true });

    try {
      const user = await authService.register(data);

      set({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const user = await authService.login(data);

      set({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return user;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await authService.logout();

      set({
        user: null,
        isLoading: false,
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
      await authService.resetPassword(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

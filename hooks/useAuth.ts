import { useAuthStore } from '@/lib/store/authStore';

//===============================================================

export function useAuth() {
  return {
    user: useAuthStore((state) => state.user),
    isLoading: useAuthStore((state) => state.isLoading),
    isAuthReady: useAuthStore((state) => state.isAuthReady),
    isAuthenticated: useAuthStore((state) => state.isAuthenticated),
    hydrateAuth: useAuthStore((state) => state.hydrateAuth),
    initAuth: useAuthStore((state) => state.initAuth),
    register: useAuthStore((state) => state.register),
    login: useAuthStore((state) => state.login),
    logout: useAuthStore((state) => state.logout),
    resetPassword: useAuthStore((state) => state.resetPassword),
    updateUser: useAuthStore((state) => state.updateUser),
  };
}

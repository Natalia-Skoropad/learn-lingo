'use client';

import { useEffect, useRef } from 'react';

import type { AppUser } from '@/types/auth';
import { useAuthStore } from '@/lib/store/authStore';

//===============================================================

type Props = {
  children: React.ReactNode;
  initialUser: AppUser | null;
};

//===============================================================

function AuthProvider({ children, initialUser }: Props) {
  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    useAuthStore.setState({
      user: initialUser,
      isLoading: false,
      isAuthReady: true,
      isAuthenticated: Boolean(initialUser),
    });

    initializedRef.current = true;
  }

  useEffect(() => {
    void useAuthStore.getState().initAuth();
  }, []);

  return <>{children}</>;
}

export default AuthProvider;

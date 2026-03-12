'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

//===============================================================

type Props = {
  children: React.ReactNode;
};

//===============================================================

function AuthProvider({ children }: Props) {
  const { initAuth } = useAuth();

  useEffect(() => {
    const unsubscribe = initAuth();
    return unsubscribe;
  }, [initAuth]);

  return <>{children}</>;
}

export default AuthProvider;
